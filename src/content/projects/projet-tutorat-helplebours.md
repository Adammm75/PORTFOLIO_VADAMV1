---
name: 'Projet Tutoré - HelpLeRebours (JavaFX)'
description: "Application Windows JavaFX pour service d'entraide pédagogique - Gestion des demandes de soutien, matching étudiant-tuteur et administration des séances."
tags: ['Développement Full Stack']
image: '../../assets/projects/image-representative-tutorat.png'
link: 'https://github.com/Adammm75/EPREUVE-E5-PROJET-TUTORAT-LEREBOURS-JAVAFX'
startDate: '2024-02-01'
endDate: '2024-06-15'
---

# Projet Tutoré - HelpLeRebours (JavaFX)

## 📋 Table des Matières

1. [🎯 Contexte](#-contexte)
2. [💻 Environnement Technique](#-environnement-technique)
3. [⚙️ Fonctionnalités Développées](#️-fonctionnalités-développées)
4. [🔄 Processus d'Appariement (Matching)](#-processus-dappariement-matching)
5. [📋 Règles Fonctionnelles](#-règles-fonctionnelles)
6. [🚀 Perspectives d'Amélioration](#-perspectives-damélioration)
7. [🎯 Conclusion](#-conclusion)

## 📁 Code Source

### 💻 [Voir le Code Source sur GitHub](https://github.com/Adammm75/EPREUVE-E5-PROJET-TUTORAT-LEREBOURS-JAVAFX)
*Repository contenant le code source JavaFX complet, la base de données SQL et la documentation technique du projet HelpLeRebours.*

## 🎯 Contexte

### Commanditaire
**Service scolarité du lycée Le Rebours**

### Objectif
Offrir aux étudiants un **service informatisé d'entraide pédagogique** :
- Soutien aux devoirs
- Aide pour les TP
- Préparation aux examens

### Principe de Fonctionnement
**Système basé sur l'offre et la demande :**
- Un étudiant peut **proposer ses compétences** dans une matière
- Un autre peut **formuler une demande d'aide**
- L'administrateur gère les **matières, salles et planification**

**👉 Schéma UML et Base de Données :**

![Schéma UML BDD](/static/Dev_Full_Stack_Tutorat/schéma_uml_bdd.png)

## 💻 Environnement Technique

### Stack Technologique
- **JavaFX** : Interface graphique moderne
- **Scene Builder** : Construction des IHM en FXML
- **IntelliJ IDEA** : IDE principal de développement
- **MySQL** : Base de données relationnelle
- **Architecture MVC** : Séparation vues/contrôleurs/logique métier

### Base de Données
**Fichier** : `bddHelpLeRebours.sql`

**👉 Structure de la base de données :**

![Base de données](/static/Dev_Full_Stack_Tutorat/bdd1.png)

### Architecture
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    View     │ => │ Controller  │ => │    Model    │
│   (FXML)    │    │   (Java)    │    │   (MySQL)   │
└─────────────┘    └─────────────┘    └─────────────┘
```

## ⚙️ Fonctionnalités Développées

### 👨‍🎓 Pour un Étudiant

#### 1. Authentification
**Se connecter au système**

**👉 Interface de connexion :**

![Login](/static/Dev_Full_Stack_Tutorat/login.png)

#### 2. Gestion des Demandes
**Créer, modifier et visualiser ses demandes d'aide**

**👉 Création de demande :**

![Création Demande](/static/Dev_Full_Stack_Tutorat/creation_demande.png)

**👉 Liste des demandes :**

![Demandes](/static/Dev_Full_Stack_Tutorat/demandes.png)

#### 3. Gestion des Compétences
- **Créer** ses compétences dans différentes matières
- **Modifier** et **visualiser** ses offres de soutien
- **Consulter** les demandes compatibles avec ses compétences

#### 4. Statistiques Personnelles
- Soutiens réalisés
- Demandes non satisfaites
- Historique des sessions

### 👨‍💼 Pour un Administrateur

#### 1. Gestion Administrative
- **Se connecter** avec droits administrateur
- **Gérer** les matières et sous-matières
- **Administrer** les salles disponibles

#### 2. Affectation des Soutiens
- **Mise en relation** étudiant demandeur ↔ étudiant tuteur
- **Attribution** des salles
- **Validation** des plannings

#### 3. Suivi et Statistiques
- **Suivre** l'état des soutiens (en cours, terminés)
- **Produire** des statistiques globales :
  - Par matière
  - Par niveau
  - Par étudiant

## 🔄 Processus d'Appariement (Matching)

### Workflow Automatisé

1. **Demande** : Étudiant fait une demande → choix matière + sous-matières
2. **Recherche** : Le système recherche un étudiant avec la compétence correspondante
3. **Correspondance** : Si match trouvé → création automatique d'un soutien
4. **Validation** : L'administrateur attribue la salle et valide le planning

### Algorithme de Matching
```
Demande(matière, niveau) → Recherche(compétences) → Validation(contraintes) → Soutien
```

## 📋 Règles Fonctionnelles

### Contraintes Métier
- **Niveau requis** : Un étudiant peut aider uniquement un autre d'un niveau inférieur d'au moins 2 ans
- **Limitation temporelle** : Chaque demande a une `date_fin_demande`
- **Administration** : Seul l'administrateur gère les sous-matières
- **Statuts** : Suivi précis → en cours / terminé / sans soutien

### Gestion des Droits
- **Étudiant** : CRUD sur ses demandes/compétences uniquement
- **Administrateur** : Accès complet + gestion système

## 🚀 Perspectives d'Amélioration

### Extensions Fonctionnelles
- **Notifications automatiques** : Mail/alertes en temps réel
- **Génération de rapports PDF** pour le service scolarité
- **Interface responsive** pour utilisation mobile
- **Portail web** accessible hors du lycée

### Améliorations Techniques
- **API REST** pour interconnexion avec autres systèmes
- **Module de calendrier** intégré
- **Chat intégré** pour communication tuteur-élève
- **Analytics** avancés pour optimiser les matchings

## 🎯 Conclusion

### Réalisations Techniques
Le projet **HelpLeRebours** est une **application Windows ergonomique** développée avec des technologies modernes :

✅ **Architecture MVC** maîtrisée
✅ **Gestion de cas concrets** (demande/compétence/soutien)
✅ **Modélisation UML** et base de données optimisée
✅ **Gestion multi-rôles** (Étudiant et Administrateur)

### Compétences Développées
- **Développement JavaFX** avec Scene Builder
- **Architecture logicielle** MVC
- **Conception base de données** MySQL
- **UX/UI Design** pour applications desktop
- **Gestion de projet** en équipe

### Impact Attendu
**Résultat** : Un outil **fonctionnel, ergonomique et évolutif** qui :
- Facilite le **soutien entre étudiants**
- Optimise la **gestion administrative**
- Améliore l'**efficacité pédagogique**

---

## 🛠️ Technologies Clés

- **JavaFX** : Interface graphique moderne et responsive
- **Scene Builder** : Design FXML intuitif
- **MySQL** : Base de données relationnelle robuste
- **IntelliJ IDEA** : Environnement de développement intégré
- **Architecture MVC** : Séparation claire des responsabilités

---

*Projet démontrant la maîtrise complète du développement d'applications desktop avec JavaFX, de la conception UML au déploiement final.*
