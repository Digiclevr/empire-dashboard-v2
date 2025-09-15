# 🔍 Diagnostic Périodique - Écosystème Digiclevr/BlueOcean

## 📋 PROMPT COMPLET POUR DIAGNOSTIC

```
🕐 Effectue un diagnostic complet de l'écosystème Digiclevr/BlueOcean selon ce protocole :

## 1. 🔐 AUDIT SÉCURITÉ REPOSITORIES
- Liste TOUS les repositories Digiclevr (originaux + forks) avec statut privé/public
- Vérifier que TOUS les repositories originaux sont PRIVÉS
- Alerter immédiatement si un repository original est PUBLIC
- Format tableau : Nom | URL | Statut | Type (ORIGINAL/FORK)

## 2. ☸️ SANTÉ CLUSTER KUBERNETES
- Status cluster BlueOcean : `kubectl cluster-info`
- Nodes disponibles : `kubectl get nodes -o wide`
- Pods par namespace : `kubectl get pods --all-namespaces`
- Services critiques platform : `kubectl get svc -n platform`
- Vérifier PostgreSQL/Redis centralisés
- CPU/Memory usage si metrics disponibles

## 3. 🚀 APPLICATIONS EN COURS
- Ports actifs localhost : `lsof -i :5002 -i :3002 -i :9080-9083 -i :5001-5007 -i :8001 -i :9090`
- Processus Node.js/Python : `ps aux | grep -E "(node|npm|python)" | grep -v grep`
- Services Docker si utilisés : `docker ps`
- Applications cluster : statut déploiements K8s

## 4. 📊 MÉTRIQUES EMPIRE DASHBOARD
- Status API Empire : `curl -s http://localhost:5002/health`
- Métriques cluster : `curl -s http://localhost:5002/api/empire/metrics`
- Connection cluster : vérifier si données réelles ou simulées
- Frontend React : http://localhost:3002 accessible

## 5. 🎯 PROJETS PRIORITAIRES STATUS
### FASTCASH (URGENCE)
- Statut opération 15-25K€ en 24-48H
- Setup Mautic + Apollo + Stripe
- Monitoring FASTCASH-STATUS-15MIN.md

### KREACH (KONQER Brand)
- Architecture Kubernetes + Kaniko finalisée
- Environment hybride Mac/Cloud
- Ports 5003/8001 conformes OnlyOneAPI

### NEXIA IA SUPERVISOR
- Phase 1 Siri spécifications
- Empire Dashboard v2 déployé
- Voice interface roadmap

### OnlyOneAPI SaaS B2B
- 4 sites production (marketing, portal, developer, community)
- API 401 endpoints déployés
- Status monitoring client B2B

## 6. 🏗️ INFRASTRUCTURE CRITIQUE
### Services Centralisés BlueOcean
- PostgreSQL : postgres-central.platform:5432
- Redis : platform-pool-redis-master.platform:6379
- N8N : n8n-service.platform:5678
- Monitoring : prometheus.monitoring:9090

### Ports Allocation Compliance
- OnlyOneAPI Sites : 9080-9083 ✅
- Tools & Calculators : 5001-5007 ✅
- APIs Backend : 8001, 9090 ✅
- NEXTGEN : 7000-7099 ✅

## 7. 📈 REVENUE TRACKING
- NEXTGEN : €2.3M ARR target (230 domaines)
- OnlyOneAPI : B2B expansion status
- KREACH : Monétisation intelligence market
- Synergies revenue entre applications

## 8. 🚨 ALERTES & ACTIONS REQUISES
- Identifier blockers critiques
- Deadline FASTCASH respect
- Conflits ports applications
- Services down ou dégradés
- Sécurité compromises

## 9. 🎮 RECOMMANDATIONS PROCHAINES ÉTAPES
- Actions immédiates < 1H
- Priorités court terme < 24H
- Optimisations moyen terme < 1 semaine
- Évolutions long terme < 1 mois

## 10. 📊 MÉTRIQUES PERFORMANCE
- Uptime cluster BlueOcean
- Latency APIs critiques
- Utilisation ressources (CPU/Memory/Storage)
- Throughput applications

FORMAT RÉPONSE :
✅ = OK / ⚠️ = Attention / ❌ = Critique / 🔍 = Investigation requise

TEMPS ESTIMÉ DIAGNOSTIC : 15-20 minutes maximum
FRÉQUENCE RECOMMANDÉE : 2x/jour (matin + soir)
```

## 🛠️ COMMANDES RAPIDES DIAGNOSTIC

### Cluster Health
```bash
kubectl cluster-info
kubectl get nodes --no-headers | wc -l
kubectl get pods --all-namespaces | grep -E "(Pending|Error|CrashLoop)"
```

### Applications Status  
```bash
lsof -i :5002 && echo "✅ Empire Dashboard Backend"
lsof -i :3002 && echo "✅ Empire Dashboard Frontend"
curl -s http://localhost:5002/health | jq '.status'
```

### Security Audit
```bash
gh repo list Digiclevr --limit 100 --json name,visibility,isFork | jq -r '.[] | select(.isFork == false and .visibility == "PUBLIC") | .name'
```

### Infrastructure Check
```bash
kubectl get svc -n platform | grep -E "(postgres|redis)"
kubectl top nodes 2>/dev/null || echo "Metrics server indisponible"
```

---

**📋 Utilisation :**
1. Copier le prompt complet
2. Coller dans Claude Code
3. Exécution automatique du diagnostic
4. Rapport consolidé en 15-20min

**🎯 Objectif :** Supervision proactive écosystème BlueOcean avec identification rapide des problèmes critiques.