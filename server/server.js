const express = require('express');
const cors = require('cors');
const path = require('path');
const empireData = require('./empire-data.js');
const ClusterConnector = require('./cluster-connector.js');

const app = express();
const PORT = process.env.PORT || 5002; // Nouveau port pour Empire v2

// Initialiser connexion cluster
const clusterConnector = new ClusterConnector();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// API Routes

// Empire Architecture - Nouvelle API v2
app.get('/api/empire', (req, res) => {
  res.json({
    layers: empireData.hierarchy,
    flows: empireData.flows,
    metadata: empireData.metadata,
    priorities: empireData.priorities
  });
});

// Backward compatibility avec v1
app.get('/api/architecture', (req, res) => {
  res.json({
    layers: empireData.hierarchy,
    flows: empireData.flows
  });
});

// Empire Metrics temps réel avec données cluster
app.get('/api/empire/metrics', async (req, res) => {
  try {
    // Récupérer métriques cluster réelles
    const clusterMetrics = await clusterConnector.getClusterMetrics();
    
    const empireMetrics = {
      timestamp: new Date().toISOString(),
      
      // Métriques cluster réelles
      cluster: clusterMetrics.cluster,
      nodePools: clusterMetrics.nodePools,
      namespaces: clusterMetrics.namespaces,
      services: clusterMetrics.services,
    
    // Métriques globales Empire
    empire: {
      projectsActive: empireData.hierarchy.reduce((total, layer) => 
        total + (layer.components?.length || 0), 0),
      totalRevenue: generateRandomRevenue(50000, 150000),
      systemHealth: Math.random() > 0.1 ? "healthy" : "warning",
      nexiaUptime: "99.9%"
    },

    // KPIs par projet majeur
    projects: {
      onlyoneapi: {
        apiCalls: Math.floor(Math.random() * 50000) + 100000,
        activeClients: Math.floor(Math.random() * 50) + 200,
        uptime: Math.random() > 0.05 ? "99.9%" : "99.5%",
        revenue: generateRandomRevenue(15000, 45000)
      },
      
      usineAffiliation: {
        articlesProduced: Math.floor(Math.random() * 20) + 30,
        domainsActive: Math.floor(Math.random() * 50) + 200,
        affiliationRevenue: generateRandomRevenue(8000, 25000),
        rentalRevenue: generateRandomRevenue(3000, 8000)
      },

      kreach: {
        developmentProgress: "85%",
        opportunitiesDetected: Math.floor(Math.random() * 10) + 15,
        marketAnalysis: "Active",
        deploymentStatus: "Staging"
      },

      kvibe: {
        campaignsRunning: Math.floor(Math.random() * 5) + 3,
        viralContent: Math.floor(Math.random() * 100) + 200,
        engagement: (Math.random() * 5 + 3).toFixed(1) + "%",
        socialReach: Math.floor(Math.random() * 50000) + 100000
      }
    },

    // Infrastructure
    infrastructure: {
      kubernetesHealth: Math.random() > 0.1 ? "healthy" : "warning",
      podsRunning: Math.floor(Math.random() * 10) + 35,
      memoryUsage: (Math.random() * 30 + 50).toFixed(1) + "%",
      cpuUsage: (Math.random() * 40 + 30).toFixed(1) + "%"
    },

    // Alertes & Actions
    alerts: generateAlerts(),
    recentActions: [
      { time: "15:00", action: `Cluster BlueOcean connected: ${clusterMetrics.cluster.totalNodes} nodes`, status: "success" },
      { time: "14:45", action: "Empire Dashboard v2 real-time metrics active", status: "success" },
      { time: "14:30", action: "KREACH deployment staging", status: "success" }
    ],
    
    // Informations connexion
    connectionStatus: {
      cluster: clusterConnector.isConnected(),
      kubernetes: clusterMetrics.cluster.status,
      realTimeData: clusterConnector.isConnected() ? 'live' : 'simulated'
    }
  };

  res.json(empireMetrics);
  } catch (error) {
    console.error('❌ Erreur API /api/empire/metrics:', error);
    res.status(500).json({ error: 'Erreur récupération métriques cluster' });
  }
});

// Métriques legacy pour compatibilité v1
app.get('/api/metrics/realtime', (req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    pipeline: {
      articlesInProgress: Math.floor(Math.random() * 10) + 5,
      queueSize: Math.floor(Math.random() * 50) + 20,
      processingTime: Math.floor(Math.random() * 300) + 120
    },
    revenue: {
      todayTotal: generateRandomRevenue(500, 1500),
      affiliation: generateRandomRevenue(300, 900),
      location: generateRandomRevenue(100, 300),
      newsletter: generateRandomRevenue(50, 150)
    },
    traffic: {
      activeVisitors: Math.floor(Math.random() * 500) + 200,
      pageviews: Math.floor(Math.random() * 10000) + 5000,
      conversions: Math.floor(Math.random() * 50) + 20
    }
  });
});

// Commandes Nexia (futur)
app.post('/api/nexia/command', (req, res) => {
  const { command, project, action } = req.body;
  
  // Simulation réponse commande vocale
  const response = {
    timestamp: new Date().toISOString(),
    command: command,
    project: project,
    action: action,
    status: "executed",
    result: `Command "${command}" executed for project ${project}`
  };
  
  console.log(`🎙️ Nexia Command: ${command} → ${project} → ${action}`);
  res.json(response);
});

// Directus Integration endpoints (futur)
app.get('/api/directus/collections', (req, res) => {
  res.json({
    collections: [
      "empire_projects",
      "nexia_commands", 
      "business_metrics",
      "infrastructure_status",
      "alerts_notifications"
    ],
    status: "ready"
  });
});

// Fonctions utilitaires
function generateRandomRevenue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAlerts() {
  const possibleAlerts = [
    { level: "info", message: "KREACH staging deployment successful", time: "14:30" },
    { level: "warning", message: "OnlyOneAPI API rate limit approaching", time: "14:25" },
    { level: "urgent", message: "FASTCASH deadline in 24h - Priority absolute", time: "14:00" },
    { level: "success", message: "Empire revenue target 85% achieved", time: "13:45" }
  ];
  
  return possibleAlerts.filter(() => Math.random() > 0.6);
}

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    service: 'Empire Dashboard v2',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    emperor: 'Ludovic Pilet',
    nexia: 'Operational'
  });
});

// Servir le React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Démarrage serveur
app.listen(PORT, () => {
  console.log(`🏰 Empire Dashboard v2 démarré sur le port ${PORT}`);
  console.log(`👑 Supervision Empire BlueOcean active`);
  console.log(`🧠 Nexia Interface disponible sur http://localhost:${PORT}`);
  console.log(`📊 API Empire: http://localhost:${PORT}/api/empire`);
});