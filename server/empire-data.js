// BlueOcean Dashboard - Architecture Data v2.0
// Basé sur l'analyse complète de l'écosystème /Users/ludovicpilet/PROJECTS

const blueoceanData = {
  metadata: {
    name: "BlueOcean Ecosystem",
    version: "2.0.0",
    supervisor: "Ludovic Pilet",
    projects: 10,
    infrastructure: "Kubernetes DigitalOcean",
    lastUpdate: "2025-09-13"
  },
  
  // Hiérarchie Empire
  hierarchy: [
    {
      id: "layer-0",
      name: "Empereur Visionnaire",
      level: 0,
      color: "#FFD700",
      components: [
        {
          id: "ludovic",
          name: "Ludovic Pilet",
          description: "Entrepreneur TDAH - Visionnaire et Architecte Empire",
          type: "emperor",
          position: { x: 400, y: 50 },
          metrics: {
            projectsActive: 10,
            revenueTargets: "€2.3M ARR",
            focusMode: "FASTCASH Priority"
          },
          connections: ["nexia"]
        }
      ]
    },
    
    {
      id: "layer-1", 
      name: "Intelligence Centrale",
      level: 1,
      color: "#E3F2FD",
      components: [
        {
          id: "nexia",
          name: "Nexia IA",
          description: "Premier Ministre IA - Superviseur Empire BlueOcean",
          type: "ai-supervisor",
          position: { x: 400, y: 150 },
          metrics: {
            voiceCommands: "∞",
            projectsSupervised: 10,
            uptimeTarget: "99.9%"
          },
          connections: ["directus", "claude-code"],
          interfaces: [
            { name: "Dashboard", url: "http://localhost:5010/help" },
            { name: "Console", url: "http://localhost:6003" },
            { name: "Visualizer", url: "http://localhost:3000" }
          ]
        }
      ]
    },

    {
      id: "layer-2",
      name: "Hub Opérationnel",
      level: 2, 
      color: "#F3E5F5",
      components: [
        {
          id: "directus",
          name: "Directus Hub",
          description: "Bras droit Nexia - Centralisation données & contrôle Empire",
          type: "data-hub",
          position: { x: 300, y: 250 },
          metrics: {
            collections: "50+",
            apiCalls: "100k/day",
            projectsConnected: 10
          },
          connections: ["all-projects"],
          capabilities: [
            "Dashboard unifié Empire",
            "KPIs temps réel tous projets", 
            "Interface commandes Nexia",
            "Workflows inter-projets"
          ]
        },
        {
          id: "claude-code",
          name: "Claude Code",
          description: "Interface technique - Traducteur visions → Code",
          type: "technical-interface", 
          position: { x: 500, y: 250 },
          metrics: {
            projectsManaged: "∞",
            codeGenerated: "Daily",
            contextSwitching: "Instant"
          },
          connections: ["all-projects"]
        }
      ]
    },

    {
      id: "layer-3",
      name: "Projets Opérationnels",
      level: 3,
      color: "#E8F5E8", 
      components: [
        {
          id: "onlyoneapi",
          name: "OnlyOneAPI",
          description: "SaaS B2B Platform - 401 endpoints déployés",
          type: "saas-platform",
          position: { x: 100, y: 350 },
          metrics: {
            endpoints: 401,
            sites: 4,
            clients: "B2B Active",
            uptime: "99.9%"
          },
          status: "production",
          revenue: { percentage: 30, monthly: "Confidentiel" },
          urls: [
            "https://onlyoneapi.com",
            "https://developer.onlyoneapi.com", 
            "https://portal.onlyoneapi.com",
            "https://community.onlyoneapi.com"
          ]
        },
        
        {
          id: "usine-affiliation",
          name: "Usine Affiliation", 
          description: "230 domaines - Monétisation contenu + location",
          type: "content-factory",
          position: { x: 300, y: 350 },
          metrics: {
            domains: 230,
            articlesPerDay: 50,
            affiliationPrograms: 15,
            rentalRate: "18%"
          },
          status: "production",
          revenue: { 
            target: "€2.3M ARR",
            sources: {
              affiliation: "60%",
              rental: "25%", 
              newsletter: "10%",
              ads: "5%"
            }
          },
          subComponents: ["agents-ia", "strapi", "n8n", "nextjs"]
        },

        {
          id: "kreach", 
          name: "KREACH",
          description: "AI Market Intelligence (KONQER Brand)",
          type: "ai-intelligence",
          position: { x: 500, y: 350 },
          metrics: {
            architecture: "Kubernetes + Kaniko",
            environment: "Hybrid Mac/Cloud",
            ports: "5001/9090"
          },
          status: "development-85%",
          brand: "KONQER"
        },

        {
          id: "kvibe",
          name: "KVIBE",
          description: "Social Marketing Automation Platform", 
          type: "social-marketing",
          position: { x: 700, y: 350 },
          metrics: {
            campaigns: "50+",
            viralContent: "Mega-batches",
            foundingMembers: "1500+ messages"
          },
          status: "development-85%",
          legacy: "Rich campaign history"
        }
      ]
    },

    {
      id: "layer-4",
      name: "Projets Support",
      level: 4,
      color: "#FFF3E0",
      components: [
        {
          id: "holding",
          name: "HOLDING",
          description: "Gestion Corporate VALDELIA - 100% opérationnel",
          type: "corporate",
          position: { x: 150, y: 450 },
          metrics: {
            status: "100% operational",
            frontend: "localhost:5016",
            backend: "localhost:5009"
          },
          status: "production"
        },

        {
          id: "business-automation",
          name: "Business Automation",
          description: "Challenge €27,700 en 7 jours - Agents 24/7",
          type: "automation",
          position: { x: 350, y: 450 },
          metrics: {
            businessLines: 7,
            agents24_7: "Active",
            cockpitDashboard: "Ready"
          },
          status: "development-70%"
        },

        {
          id: "endpoints", 
          name: "ENDPOINTS",
          description: "GitHub Intelligence Mining - Référence architecture",
          type: "intelligence-mining",
          position: { x: 550, y: 450 },
          metrics: {
            digicleverCompliance: "100%",
            architectureScore: "100/100",
            githubMining: "Operational"
          },
          status: "production",
          isReference: true
        },

        {
          id: "digital-tools",
          name: "Digital Tools",
          description: "Suite outils support écosystème",
          type: "tools-suite",
          position: { x: 700, y: 450 },
          metrics: {
            tools: "10+",
            onlyoneapiConsole: "7 pages brief",
            calculators: "Multiple"
          },
          status: "development-60%"
        }
      ]
    },

    {
      id: "layer-5", 
      name: "Infrastructure Partagée",
      level: 5,
      color: "#E0F2F1",
      components: [
        {
          id: "kubernetes-cluster",
          name: "Cluster BlueOcean",
          description: "Infrastructure Kubernetes DigitalOcean centralisée",
          type: "infrastructure",
          position: { x: 200, y: 550 },
          metrics: {
            nodes: 6,
            pods: "45+",
            uptime: "99.9%",
            provider: "DigitalOcean"
          },
          services: [
            "PostgreSQL: postgres-central.platform:5432",
            "Redis: platform-pool-redis-master.platform:6379", 
            "N8N: n8n-service.platform:5678",
            "Monitoring: prometheus.monitoring:9090"
          ]
        },

        {
          id: "ports-allocation",
          name: "Allocation Ports",
          description: "Coordination centralisée ports écosystème",
          type: "coordination",
          position: { x: 500, y: 550 },
          allocation: {
            "OnlyOneAPI Sites": "9080-9083",
            "Tools & Calculators": "5001-5007", 
            "APIs Backend": "8001, 9090",
            "NEXTGEN": "7000-7099"
          }
        }
      ]
    }
  ],

  // Flux inter-projets
  flows: [
    {
      id: "command-flow",
      name: "Flux Commandes Nexia",
      type: "primary",
      color: "#2196F3",
      path: ["ludovic", "nexia", "directus", "all-projects"]
    },
    
    {
      id: "data-flow", 
      name: "Flux Données Empire",
      type: "secondary",
      color: "#FF9800", 
      path: ["all-projects", "directus", "nexia", "ludovic"]
    },

    {
      id: "revenue-flow",
      name: "Flux Revenus",
      type: "revenue",
      color: "#4CAF50",
      path: ["onlyoneapi", "usine-affiliation", "kreach", "directus"]
    },

    {
      id: "synergy-flow",
      name: "Synergies Business",
      type: "business",
      color: "#9C27B0",
      path: ["endpoints", "usine-affiliation", "kreach", "kvibe"]
    }
  ],

  // Priorités actuelles
  priorities: {
    urgent: ["FASTCASH - 15-25K€ en 24-48H"],
    immediate: ["Nexia Phase 1 Siri", "KREACH finalisation"],
    shortTerm: ["Empire Dashboard", "KVIBE déploiement"],
    mediumTerm: ["Nexia ChatGPT Voice", "Synergies revenue"]
  }
};

module.exports = blueoceanData;