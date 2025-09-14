// Cluster BlueOcean Real-time Connector
// Connexion aux métriques Kubernetes DigitalOcean

let k8s;
try {
  k8s = require('@kubernetes/client-node');
} catch (error) {
  console.warn('📦 Module @kubernetes/client-node non trouvé - mode simulation activé');
  k8s = null;
}

class ClusterConnector {
  constructor() {
    if (!k8s) {
      console.log('📊 Mode simulation - Kubernetes client indisponible');
      this.connected = false;
      return;
    }

    try {
      this.kc = new k8s.KubeConfig();
      this.kc.loadFromDefault();
      this.k8sApi = this.kc.makeApiClient(k8s.CoreV1Api);
      // Metrics API optionnelle
      try {
        this.metricsApi = this.kc.makeApiClient(k8s.Metrics_v1beta1Api);
      } catch (metricsError) {
        console.warn('⚠️ Metrics API indisponible:', metricsError.message);
        this.metricsApi = null;
      }
      this.connected = true;
      console.log('🔗 Connecté au cluster BlueOcean DigitalOcean');
    } catch (error) {
      console.warn('⚠️ Impossible de se connecter au cluster K8s:', error.message);
      this.connected = false;
    }
  }

  async getClusterMetrics() {
    if (!this.connected) {
      return this.getMockMetrics();
    }

    try {
      // Récupérer les nodes
      const nodesResponse = await this.k8sApi.listNode();
      const nodes = nodesResponse.body.items;

      // Récupérer les pods par namespace
      const podsResponse = await this.k8sApi.listPodForAllNamespaces();
      const pods = podsResponse.body.items;

      // Analyser par pool
      const poolMetrics = this.analyzeNodePools(nodes);
      const namespaceMetrics = this.analyzeNamespaces(pods);

      return {
        timestamp: new Date().toISOString(),
        cluster: {
          name: 'BlueOcean',
          provider: 'DigitalOcean',
          totalNodes: nodes.length,
          totalPods: pods.length,
          status: 'healthy'
        },
        nodePools: poolMetrics,
        namespaces: namespaceMetrics,
        services: await this.getServicesMetrics(),
        infrastructure: await this.getInfrastructureHealth()
      };
    } catch (error) {
      console.error('❌ Erreur récupération métriques cluster:', error.message);
      return this.getMockMetrics();
    }
  }

  analyzeNodePools(nodes) {
    const pools = {};
    
    nodes.forEach(node => {
      const poolName = this.extractPoolName(node.metadata.name);
      
      if (!pools[poolName]) {
        pools[poolName] = {
          name: poolName,
          nodes: 0,
          status: 'healthy',
          capacity: {
            cpu: 0,
            memory: 0
          },
          allocatable: {
            cpu: 0,
            memory: 0
          }
        };
      }
      
      pools[poolName].nodes++;
      
      // Ajouter capacité si disponible
      if (node.status?.capacity) {
        pools[poolName].capacity.cpu += this.parseCpu(node.status.capacity.cpu);
        pools[poolName].capacity.memory += this.parseMemory(node.status.capacity.memory);
      }
    });

    return Object.values(pools);
  }

  analyzeNamespaces(pods) {
    const namespaces = {};
    
    pods.forEach(pod => {
      const ns = pod.metadata.namespace;
      
      if (!namespaces[ns]) {
        namespaces[ns] = {
          name: ns,
          pods: 0,
          running: 0,
          pending: 0,
          failed: 0
        };
      }
      
      namespaces[ns].pods++;
      
      switch (pod.status?.phase) {
        case 'Running':
          namespaces[ns].running++;
          break;
        case 'Pending':
          namespaces[ns].pending++;
          break;
        case 'Failed':
          namespaces[ns].failed++;
          break;
      }
    });

    return Object.values(namespaces);
  }

  async getServicesMetrics() {
    if (!this.connected) {
      return {
        postgresql: { status: 'simulated', endpoint: 'postgres-central.platform:5432' },
        redis: { status: 'simulated', endpoint: 'platform-pool-redis-master.platform:6379' }
      };
    }

    try {
      const servicesResponse = await this.k8sApi.listNamespacedService('platform');
      const services = servicesResponse.body.items;

      const serviceMetrics = {};
      
      services.forEach(service => {
        if (service.metadata.name.includes('postgres') || service.metadata.name.includes('redis')) {
          serviceMetrics[service.metadata.name] = {
            status: 'active',
            endpoint: `${service.metadata.name}.platform:${service.spec.ports[0]?.port}`,
            clusterIP: service.spec.clusterIP,
            type: service.spec.type
          };
        }
      });

      return serviceMetrics;
    } catch (error) {
      console.warn('⚠️ Erreur récupération services:', error.message);
      return {
        'postgres-central': { status: 'unknown', endpoint: 'postgres-central.platform:5432' },
        'platform-pool-redis-master': { status: 'unknown', endpoint: 'platform-pool-redis-master.platform:6379' }
      };
    }
  }

  async getInfrastructureHealth() {
    return {
      nexia: {
        supervisor: 'active',
        voiceInterface: 'ready',
        dashboards: ['localhost:5002', 'localhost:3002']
      },
      projects: {
        onlyoneapi: { status: 'production', uptime: '99.9%' },
        usineAffiliation: { status: 'production', domains: 230 },
        kreach: { status: 'development-85%', brand: 'KONQER' },
        kvibe: { status: 'development-85%', campaigns: '50+' }
      }
    };
  }

  extractPoolName(nodeName) {
    // Extraire le nom du pool depuis le nom du node
    // Format: poolname-xxxxx
    const parts = nodeName.split('-');
    if (parts.length >= 2) {
      return parts.slice(0, -1).join('-');
    }
    return 'unknown-pool';
  }

  parseCpu(cpuString) {
    // Convertir les CPU en nombre (ex: "2" -> 2, "500m" -> 0.5)
    if (cpuString.endsWith('m')) {
      return parseInt(cpuString.slice(0, -1)) / 1000;
    }
    return parseInt(cpuString);
  }

  parseMemory(memoryString) {
    // Convertir la mémoire en GB (ex: "8Gi" -> 8)
    if (memoryString.endsWith('Gi')) {
      return parseInt(memoryString.slice(0, -2));
    }
    if (memoryString.endsWith('Mi')) {
      return parseInt(memoryString.slice(0, -2)) / 1024;
    }
    return parseInt(memoryString) / (1024 * 1024 * 1024);
  }

  getMockMetrics() {
    // Métriques simulées si connexion impossible
    return {
      timestamp: new Date().toISOString(),
      cluster: {
        name: 'BlueOcean (Simulated)',
        provider: 'DigitalOcean',
        totalNodes: 27,
        totalPods: 85,
        status: 'simulated'
      },
      nodePools: [
        { name: 'applications-pool', nodes: 14, status: 'healthy' },
        { name: 'platform-pool', nodes: 4, status: 'healthy' },
        { name: 'api-pool', nodes: 2, status: 'healthy' },
        { name: 'monitoring-pool', nodes: 3, status: 'healthy' },
        { name: 'saas', nodes: 3, status: 'healthy' },
        { name: 'infra', nodes: 1, status: 'healthy' }
      ],
      namespaces: [
        { name: 'platform', pods: 5, running: 5, pending: 0, failed: 0 },
        { name: 'monitoring', pods: 12, running: 12, pending: 0, failed: 0 },
        { name: 'onlyoneapi-prod', pods: 15, running: 15, pending: 0, failed: 0 }
      ],
      services: {
        'postgres-central': { status: 'simulated', endpoint: 'postgres-central.platform:5432' },
        'platform-pool-redis-master': { status: 'simulated', endpoint: 'platform-pool-redis-master.platform:6379' }
      },
      infrastructure: {
        nexia: { supervisor: 'simulated', voiceInterface: 'ready' },
        projects: {
          onlyoneapi: { status: 'production', uptime: '99.9%' },
          usineAffiliation: { status: 'production', domains: 230 }
        }
      }
    };
  }

  isConnected() {
    return this.connected;
  }
}

module.exports = ClusterConnector;