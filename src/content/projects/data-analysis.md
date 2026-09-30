---
name: 'Prédiction de Churn Client'
description: 'Analyse prédictive de la résiliation client avec machine learning - Random Forest pour identifier les facteurs de départ et optimiser la rétention.'
tags: ['Data Science', 'Intelligence Artificielle']
image: '../../assets/projects/data-science.png'
link: 'https://github.com/Adammm75/PROJET_IA_MACHINE_LEARNING_PYTHON_L3_INFO'
startDate: '2024-06-01'
---

# Prédiction de Churn Client - Analyse Data Science

## 📋 Table des Matières

1. [🎯 Objectif du Projet](#-objectif-du-projet)
2. [📊 Analyse Exploratoire](#-analyse-exploratoire)
3. [🔎 Comparaisons & Premières Prédictions](#-comparaisons--premières-prédictions)
4. [🛠️ Nettoyage et Préparation des Données](#️-nettoyage-et-préparation-des-données)
5. [🤖 Modélisation](#-modélisation)
6. [✅ Conclusions et Recommandations](#-conclusions-et-recommandations)

## 📥 Documents du Projet

Consultez les documents complets de l'analyse Data Science :

### 💻 [Code Source GitHub](https://github.com/Adammm75/PROJET_IA_MACHINE_LEARNING_PYTHON_L3_INFO)
*Accédez au code source complet du projet, aux notebooks Jupyter, datasets et scripts d'analyse sur GitHub.*

### 📄 [Télécharger le Rapport du Projet (PDF)](/static/Rapport_Projet_Data_Science_L3.pdf)
*Méthodologie complète, analyses statistiques détaillées, visualisations avancées, interprétation des résultats et recommandations business.*

### 🎓 [Télécharger le Mémoire L3 STS (PDF)](/static/Memoire-L3-STS-Adam-Mekkiou.pdf)
*Document académique approfondissant les aspects théoriques et méthodologiques de l'analyse prédictive de churn client.*

---

## 🎯 Objectif du Projet

**Prédire si un client va résilier son abonnement ou non.**

Comprendre les facteurs influençant la résiliation pour proposer des solutions à l'entreprise.

### Données Utilisées

- **X_train** : caractéristiques clients (services, contrat, données démographiques…)
- **Y_train** : cible binaire (Yes/No - résiliation)
- **X_test** : données de test avec identifiants uniques

---

## 📊 Analyse Exploratoire

### Étude de la Variable Tenure (Durée d'Abonnement)

- **Moyenne** = 32 mois, **médiane** = 29 mois
- **Forte dispersion** (variance élevée)
- **Répartition bimodale** :
  - Beaucoup de nouveaux clients (0-8 mois)
  - Beaucoup d'anciens clients (65-72 mois)

### Matrice de Corrélation (Heatmap)

- **Faible corrélation du genre** → peu influent sur la résiliation
- **Forte corrélation tenure ↔ total charges** (logique : plus de mois = plus de frais)
- **Corrélations entre services** (internet, streaming, etc.) mais sans causalité directe

---

## 🔎 Comparaisons & Premières Prédictions

### Type de Contrat
- **Résiliations fréquentes** sur les contrats **mensuels** (période d'essai)
- **Peu de résiliations** pour les contrats **longs** (1-2 ans)

### Charges Totales
- **Résiliations fréquentes** pour les clients avec **charges faibles** (nouveaux abonnés)
- **Quelques résiliations** malgré **charges élevées** (outliers → difficultés financières)

### Âge (SeniorCitizen)
- **Les seniors résilient plus** que les jeunes
- **Facteurs** : sensibilité financière et adaptation technologique

---

## 🛠️ Nettoyage et Préparation des Données

### Preprocessing Effectué
- ❌ **Suppression de la variable genre** (faible corrélation)
- 🔧 **Imputation des valeurs manquantes** (ex. TotalCharges) par la moyenne
- 📊 **Conservation de certains outliers** (potentiellement utiles au modèle)
- ➕ **Création d'une nouvelle variable** : `TotalActiveServices` (nombre total de services souscrits)

---

## 🤖 Modélisation

### Algorithme Choisi : Random Forest

**Justification** : Précis, robuste, gère bien les valeurs aberrantes

### Optimisation
- **Cross-validation** (sklearn) pour validation croisée
- **Hyperparamètres optimisés** :
  - `min_samples_leaf`
  - `min_samples_split`
  - `n_estimators`

### 📈 Résultats de Performance

| Métrique | Score |
|----------|-------|
| **Accuracy** | **81,7%** |
| **Précision** | **94,5%** |
| **Recall** | **83%** |
| **AUC ROC** | **0,86** |

> **AUC ROC = 0,86** → Bonne capacité de distinction entre classes

---

## ✅ Conclusions et Recommandations

### 🔍 Facteurs Clés de Résiliation

1. **Contrats mensuels** (clients hésitants)
2. **Seniors** (fragilité financière/technique)
3. **Clients fidèles de longue durée** (peuvent se lasser malgré leur ancienneté)
4. **Clients avec service téléphonique** → plus susceptibles de résilier
5. **Le genre n'a pas d'impact significatif**

### 📌 Recommandations pour l'Entreprise

#### 🎯 Actions Prioritaires

1. **Offres de bienvenue** pour convertir les clients mensuels en abonnements longs

2. **Réductions tarifaires ciblées** pour :
   - Les clients multi-services
   - Les seniors
   - Les clients fidèles de longue durée (remises progressives)

3. **Stratégie de rétention** : Éventuellement instaurer des frais de résiliation pour limiter les départs (à étudier plus en détail)

#### 💡 Actions Complémentaires

- **Programme de fidélité** pour les clients anciens
- **Support technique renforcé** pour les seniors
- **Offres bundle** pour augmenter l'engagement multi-services
- **Campagnes de rétention proactive** basées sur le modèle prédictif

### 🚀 Impact Business Attendu

- **Réduction du churn** de 15-20%
- **Augmentation de la Customer Lifetime Value**
- **Optimisation des coûts d'acquisition** client
- **Amélioration de la satisfaction** client

---

## 🛠️ Technologies Utilisées

- **Python** : Pandas, NumPy, Scikit-learn
- **Visualisation** : Matplotlib, Seaborn, Plotly
- **Machine Learning** : Random Forest, Cross-validation
- **Analyse** : Jupyter Notebooks
- **Outils** : Git, GitHub

---

*Projet démontrant l'application concrète de la Data Science pour résoudre des problématiques business réelles avec un impact mesurable sur la rétention client.*

