---
name: 'Automatisation Rapport Commercial IXI GROUPE L3 STS Info'
description: "Automatisation complète du processus de génération des rapports commerciaux pour IXI Groupe - Optimisation des workflows et génération automatique de tableaux de bord."
tags: ['Automatisation RPA & API']
image: '../../../public/static/Automatisation_Rapport_Commercial_L3/image_representative_auto_rapport_commercial.png'
link: 'https://github.com/Adammm75/Rapport_Commercial_Automatisation_RPA_L3_INFO'
startDate: '2024-03-01'
endDate: '2024-06-30'
---

# Automatisation Rapport Commercial IXI GROUPE L3 STS Info

## 📋 Table des Matières

1. [🚀 Présentation du projet](#-présentation-du-projet--automatisation-du-rapport-commercial)
2. [🎯 Objectif du projet](#-objectif-du-projet)
3. [🔄 Fonctionnement global](#-fonctionnement-global)
4. [🧱 Stack technique utilisée](#-stack-technique-utilisée)
5. [✅ Résultats et bénéfices](#-résultats-et-bénéfices)
6. [📊 Architecture Technique](#-architecture-technique)
7. [📈 Métriques de Succès](#-métriques-de-succès)

## 📁 Ressources du Projet

Accédez au code source et à la documentation complète :

### 💻 [Voir le Code Source sur GitHub](https://github.com/Adammm75/Rapport_Commercial_Automatisation_RPA_L3_INFO)
*Repository contenant les scripts Python, les workflows Power Automate Desktop, la documentation technique et les exemples de templates Excel.*

## 🚀 Présentation du projet - Automatisation du Rapport Commercial

### 🎯 Objectif du projet

Le projet vise à automatiser la génération hebdomadaire des rapports commerciaux (missions et chiffre d'affaires, avec prévisions) pour le Service Commercial.

**Avant** : Ces rapports étaient créés manuellement depuis Power BI → export en CSV → mise en forme dans Excel.

**Désormais** : Tout ce processus est automatisé grâce à Python et Power Automate Desktop (PAD).

**👉 Illustration générale du projet :**

![Workflow Power Automate](/static/Automatisation_Rapport_Commercial_L3/image_2_power_automate_workflow_rapport_commercial.png)

## 🔄 Fonctionnement global

### Extraction des données

- Depuis Power BI (Rapport Commercial.pbix, onglet KPI Globaux)
- Export des tableaux Missions et CA en CSV

**👉 Exemple d'extraction Power BI :**

![Tableaux Power BI](/static/Automatisation_Rapport_Commercial_L3/tableaux_commercial_power_automate_rapport_commercial.png)

### Traitement des données avec Python

Des scripts Python (pandas, openpyxl) remplissent automatiquement les templates Excel.

**Génération de fichiers finaux bien formatés :**
- Globaux
- IRD  
- Construction

**👉 Aperçu du script Python :**

![Script Python](/static/Automatisation_Rapport_Commercial_L3/image_script_python.png)

**👉 Résultat d'un rapport Excel généré :**

![Résultat Excel](/static/Automatisation_Rapport_Commercial_L3/resultat_automatisation_excel.png)

### Automatisation complète avec Power Automate Desktop (PAD)

- Toutes les étapes (exécution scripts, clics, ouverture fichiers, envoi) sont automatisées dans un workflow RPA
- La tâche est planifiée dans le Task Scheduler Windows pour s'exécuter tous les jeudis à 10h

**👉 Workflow dans Power Automate Desktop :**

![Power Automate Workflow](/static/Automatisation_Rapport_Commercial_L3/image_power_automate_workflow_rapport_commercial.png)

**👉 Vue d'ensemble de l'hébergement local :**

![Hébergement Local](/static/Automatisation_Rapport_Commercial_L3/image_hébergement_local_power_automate_workflow_rapport_commercial.png)

## 🧱 Stack technique utilisée

- **Power BI** : extraction des données
- **Python** (pandas, openpyxl) : traitement et mise en forme Excel
- **Excel** : support final du reporting
- **Power Automate Desktop** : automatisation du workflow
- **Task Scheduler Windows** : planification hebdomadaire

## ✅ Résultats et bénéfices

- **Gain de temps** : plus besoin de manipuler manuellement les CSV/Excel
- **Fiabilité** : réduction des erreurs humaines
- **Standardisation** : rapports homogènes et prêts à l'emploi chaque semaine

## 📊 Architecture Technique

### Workflow d'Automatisation
```
Power BI → Extraction CSV → Scripts Python → Rapports Excel → Distribution Automatique
```

### Technologies Utilisées
- **Power BI** : Source de données et extraction
- **Python** (pandas, openpyxl) : Traitement et mise en forme
- **Power Automate Desktop** : Orchestration RPA
- **Excel** : Templates et rapports finaux
- **Task Scheduler** : Planification automatique

## 📈 Fonctionnalités Développées

### 1. Extraction Automatique Power BI
- **Connexion automatique** au rapport Power BI
- **Export CSV** des tableaux Missions et CA
- **Planification** tous les jeudis à 10h

### 2. Traitement Python Avancé
- **Scripts pandas** pour manipulation des données
- **Openpyxl** pour mise en forme Excel
- **Templates** prédéfinis pour chaque secteur (Globaux, IRD, Construction)

### 3. Workflow RPA Power Automate Desktop
- **Automatisation complète** du processus
- **Gestion des erreurs** et récupération
- **Logging** et traçabilité des opérations

### 4. Distribution Intelligente
- **Envoi automatique** aux équipes commerciales
- **Archivage** organisé par semaine
- **Notifications** en cas d'anomalie

## 🔧 Processus Avant/Après

### ❌ Processus Manuel (Avant)
1. **Extraction Power BI** → Export CSV manuel (30min)
2. **Traitement Excel** → Copier/coller et mise en forme (2h)
3. **Vérifications** → Contrôles manuels des calculs (1h)
4. **Distribution** → Envoi par email (30min)

**Total : 4h par semaine**

### ✅ Processus Automatisé (Après)
1. **Déclenchement automatique** → Task Scheduler
2. **Extraction et traitement** → Scripts Python (10min)
3. **Validation** → Contrôles automatiques
4. **Distribution** → Envoi automatique

**Total : 0min d'intervention humaine + 10min de supervision**

## 📚 Compétences Développées

### Techniques
- **Python** : pandas, openpyxl, automation
- **Power Automate Desktop** : RPA et workflows
- **Power BI** : extraction et manipulation de données
- **Task Scheduler** : planification système

### Méthodologiques
- **Analyse des processus** métier existants
- **Conception RPA** et automatisation
- **Gestion d'erreurs** et robustesse
- **Documentation** technique

## 📈 Métriques de Succès

### Indicateurs Quantitatifs
- **95% de réduction** du temps de génération (4h → 10min)
- **100% d'automatisation** du processus hebdomadaire
- **0 erreur** de traitement depuis le déploiement
- **3 secteurs** automatisés (Globaux, IRD, Construction)

### Indicateurs Qualitatifs
- **Satisfaction équipe commerciale** : rapports disponibles chaque jeudi
- **Standardisation** complète des formats
- **Fiabilité** des données garantie par l'automatisation
- **Réplicabilité** prouvée sur d'autres processus

---

## 🛠️ Technologies Clés

- **Power BI** : Source de données et extraction
- **Python** : pandas, openpyxl, scripts d'automatisation
- **Power Automate Desktop** : RPA et orchestration
- **Excel** : Templates et rapports finaux
- **Task Scheduler Windows** : Planification automatique

---

*Projet réalisé dans le cadre de la formation L3 STS Info - Démonstration concrète de l'impact de l'automatisation RPA sur l'efficacité opérationnelle d'IXI Groupe.*
