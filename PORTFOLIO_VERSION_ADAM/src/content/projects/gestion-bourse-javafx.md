---
name: 'Projet de Gestion Boursière - Application Web (JavaFX)'
description: "Application JavaFX de gestion de portefeuille d'actions pour traders - Interface complète avec achat/vente d'actions et gestion de base de données MySQL."
tags: ['Développement Full Stack']
image: '../../../public/static/Dev_Full_Stack_Bourse/image_representative_bourse.png'
link: 'https://github.com/Adammm75/GESTION_BOURSE_SPRING_BOOT_L3_INFO/tree/main/GESTION_BOURSE_SPRING_BOOT_L3_INFO'
startDate: '2024-01-15'
endDate: '2024-05-30'
---

# 📊 Projet de Gestion Boursière - Application Web (JavaFX)

## 📋 Table des Matières

1. [🎯 Objectif du Projet](#-objectif-du-projet)
2. [🗄️ Base de Données](#️-base-de-données)
3. [🖥️ Interface Utilisateur](#️-interface-utilisateur)
4. [🔄 Cas d'Utilisation - Vente d'Actions](#-cas-dutilisation--vente-dactions)
5. [🛒 Achat d'Actions](#-achat-dactions)
6. [⚙️ Technologies Utilisées](#️-technologies-utilisées)
7. [✅ Conclusion](#-conclusion)

## 📁 Code Source

### 💻 [Voir le Code Source sur GitHub](https://github.com/Adammm75/GESTION_BOURSE_SPRING_BOOT_L3_INFO/tree/main/GESTION_BOURSE_SPRING_BOOT_L3_INFO)
*Repository contenant le code source complet de l'application de gestion boursière, incluant les interfaces utilisateur, la logique métier et les scripts de base de données.*

## 🎯 Objectif du Projet

### Finalité
L'application a pour but de **gérer le portefeuille d'actions** détenues par des traders.

### Fonctionnalités Principales
- **Visualiser** les traders et leurs portefeuilles
- **Acheter** ou **vendre** des actions selon des règles précises
- **Mettre à jour** dynamiquement la base de données
- **Gérer** les transactions financières en temps réel

### Public Cible
- **Traders** : Gestion personnelle de portefeuille
- **Administrateurs** : Supervision des transactions
- **Analystes** : Suivi des performances

## 🗄️ Base de Données

### Structure `bddbourse`
La base de données est composée de **trois tables principales** :

#### 📊 Tables Principales
- **Trader** : Identifie chaque trader (Milo, Clara, Enzo, Noa, Lilou)
- **Action** : Liste des actions disponibles (AAPL, MSFT, TWTR, IBM, etc.)
- **Acheter** : Relation entre trader et action (quantité, montant d'achat)

**👉 Structure de la base de données :**

![Base de données Bourse](/static/Dev_Full_Stack_Bourse/bddBourse.png)

### Modèle Relationnel
```sql
Trader(id_trader, nom, prenom)
Action(symbole, nom_entreprise, prix_unitaire)
Acheter(id_trader, symbole, quantite, montant_achat, date_achat)
```

### Contraintes Métier
- **Clés étrangères** : Intégrité référentielle
- **Quantités positives** : Contrôle des saisies
- **Historique** : Traçabilité des transactions

## 🖥️ Interface Utilisateur

### Architecture JavaFX
L'application propose **plusieurs écrans principaux** développés avec une interface moderne :

#### 🏠 Écran d'Accueil
**Liste des traders**

Interface permettant de sélectionner un trader pour consulter son portefeuille.

#### 📈 Portefeuille d'un Trader
**Actions possédées**

**👉 Vue du portefeuille trader :**

![Actions Traders](/static/Dev_Full_Stack_Bourse/actions_traders.png)

- **Visualisation** des actions détenues
- **Quantités** et **valeurs** en temps réel
- **Performance** du portefeuille

#### 💰 Interface de Vente
**Modification de quantité**

**👉 Interface de vente d'actions :**

![Vendre Action](/static/Dev_Full_Stack_Bourse/vendre_action.png)

- **Sélection** de l'action à vendre
- **Saisie** de la quantité
- **Validation** automatique des contraintes

#### 🛒 Interface d'Achat
**Actions non possédées**

**👉 Actions disponibles à l'achat :**

![Actions Non Possédées](/static/Dev_Full_Stack_Bourse/actionsnonpossedées.png)

- **Catalogue** des actions disponibles
- **Prix** en temps réel
- **Formulaire** d'achat intuitif

## 🔄 Cas d'Utilisation - Vente d'Actions

### Logique de Validation
**Trois scénarios** sont gérés lors de la vente :

#### ❌ Scenario 1 : Quantité Insuffisante
- **Condition** : Quantité demandée > disponible
- **Résultat** : Erreur affichée, transaction annulée
- **Exemple** : Trader possède 6 actions → essaie d'en vendre 8 → **impossible**

#### ✔️ Scenario 2 : Vente Partielle
- **Condition** : Quantité demandée < disponible
- **Résultat** : Vente partielle, mise à jour du portefeuille
- **Exemple** : Trader possède 6 actions → vend 2 → **reste 4**

#### ✔️ Scenario 3 : Vente Totale
- **Condition** : Quantité demandée = disponible
- **Résultat** : Vente totale, suppression de l'action du portefeuille
- **Exemple** : Trader possède 4 actions → vend 4 → **l'action disparaît**

### Workflow de Vente
```
Sélection Action → Saisie Quantité → Validation → Mise à jour BDD → Confirmation
```

## 🛒 Achat d'Actions

### Processus d'Achat
1. **Affichage** des actions non encore détenues par le trader
2. **Sélection** de l'action désirée
3. **Saisie** : quantité et prix d'achat
4. **Validation** et ajout au portefeuille
5. **Mise à jour** automatique de la base

### Règles de Gestion
- **Actions disponibles** : Filtrées selon le portefeuille actuel
- **Prix dynamique** : Mise à jour en temps réel
- **Validation** : Contrôles automatiques
- **Traçabilité** : Enregistrement complet des transactions

## ⚙️ Technologies Utilisées

### Stack Technique
- **JavaFX** : Développement de l'interface graphique moderne
- **MySQL** : Gestion de la base de données (tables Trader, Action, Acheter)
- **SQL** : Requêtes optimisées de gestion des achats/ventes
- **JDBC** : Connectivité base de données

### Architecture
- **MVC Pattern** : Séparation claire des responsabilités
- **DAO Pattern** : Accès aux données structuré
- **Observer Pattern** : Mise à jour temps réel des interfaces
- **Singleton** : Gestion des connexions DB

### Outils de Développement
- **IntelliJ IDEA** : Environnement de développement
- **Scene Builder** : Design des interfaces FXML
- **MySQL Workbench** : Gestion de la base de données
- **Git** : Versioning du code

## ✅ Conclusion

### Réalisations Techniques
Ce projet illustre parfaitement :

✅ **Modélisation UML** d'un système de gestion boursière
✅ **Programmation événementielle** en JavaFX
✅ **Intégration base de données** relationnelle dans une application métier
✅ **Logique métier** claire de gestion de portefeuille, proche de cas réels

### Compétences Développées
- **Développement JavaFX** avancé avec interfaces dynamiques
- **Conception base de données** avec contraintes métier
- **Gestion des transactions** financières
- **Architecture logicielle** robuste et maintenable
- **UX/UI Design** pour applications financières

### Cas d'Usage Réels
- **Simulation** de trading pour formation
- **Gestion** de portefeuilles personnels
- **Outil pédagogique** pour comprendre les marchés
- **Base** pour applications financières plus complexes

### Impact et Valeur Ajoutée
- **Interface intuitive** pour traders débutants
- **Logique robuste** de validation des transactions
- **Architecture extensible** pour nouvelles fonctionnalités
- **Performance** optimisée pour gestion en temps réel

---

## 🛠️ Technologies Clés

- **JavaFX** : Interface graphique riche et moderne
- **MySQL** : Base de données relationnelle robuste
- **JDBC** : Connectivité et transactions sécurisées
- **Architecture MVC** : Code maintenable et extensible

---

*Projet démontrant une maîtrise complète du développement d'applications financières avec JavaFX, de la modélisation métier à l'interface utilisateur optimisée.*
