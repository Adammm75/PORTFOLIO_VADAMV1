---
name: 'Logbook'
description: "L'application Logbook est une solution éducative innovante conçue pour les enseignants du collège, du lycée, de l'enseignement supérieur et les formateurs. Elle vise à faciliter la correction des copies en permettant l'enregistrement de commentaires oraux personnalisés pour chaque élève."
tags: ['Développement Full Stack', 'Intelligence Artificielle']
image: '../../assets/projects/logbook.png'
link: 'https://github.com/Adammm75/SYMPHONY_HACKATHON_PROJET_FINAL_LOGBOOK_L3_INFO'
startDate: '2025-03-30'
endDate: '2025-12-15'
---
# Navigation (titres du menu)

- Accueil
- Fonctionnalités  
- Pour les professeurs
- Pour les étudiants
- Comment ça marche
- Sécurité & Tech
- Témoignages
- Tarifs
- FAQ
- Se connecter / Essayer gratuitement

## Accueil (Hero)

**Vous allez aimer corriger !**

Corrigez plus vite et mieux avec des notes vocales transcrites automatiquement et partagées à vos élèves.

## 🚀 Accès au Projet

<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin: 2rem 0;">
  <a href="https://github.com/Adammm75/SYMPHONY_HACKATHON_PROJET_FINAL_LOGBOOK_L3_INFO" target="_blank" rel="noopener noreferrer" style="background: linear-gradient(135deg, #24292F, #57606A); color: #fff; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1);">🐙 Code GitHub</a>
  <a href="https://www.logbook.education/" target="_blank" rel="noopener noreferrer" style="background: linear-gradient(135deg, #F59E0B, #D97706); color: #000; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1);">🌐 Site en Direct</a>
</div>

## 📚 Documentation

<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin: 2rem 0;">
  <a href="/static/doc technique_loogbook.pdf" download="doc technique_loogbook.pdf" style="background: linear-gradient(135deg, #FCD34D, #F59E0B); color: #000; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1);">📋 Documentation Technique</a>
  <a href="/static/doc_user_logbook.pdf" download="doc_user_logbook.pdf" style="background: linear-gradient(135deg, #FCD34D, #F59E0B); color: #000; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1);">👥 Documentation Utilisateur</a>
</div>

### Points forts
- **Espace professeur** (vue admin), création de devoirs, enregistrement audio et transcription liée à un élève et un devoir, écoute/téléchargement des audios
- **Côté élève**, accès simple à ses commentaires transcrits

### Ils nous font confiance
*(Placeholders logos établissement/académie)*

## Fonctionnalités

- ⚡ **Transcription quasi temps réel** pendant l'enregistrement du commentaire
- 👨‍🏫 **Espace Professeur** (admin) : créer/éditer des devoirs, gérer les transcriptions, écouter et télécharger les audios
- 👨‍🎓 **Espace Étudiant** : consulter les commentaires associés à ses devoirs
- 🔐 **Rôles & connexion sécurisée** (Étudiant / Admin-Professeur)
- ☁️ **Stockage cloud** des fichiers audio & texte (AWS S3)
- 🔌 **Intégration API** (Gladia pour la transcription)

## Pour les professeurs

1. **Créez un devoir**, lancez l'enregistrement, sélectionnez le micro, liez l'élève et sauvegardez
2. **Écoutez, téléchargez ou supprimez** un commentaire, relancez un enregistrement si besoin

## Pour les étudiants

**Accédez à "Mes commentaires"** et consultez la transcription liée à chaque devoir.

## Comment ça marche

1. **Parlez** : vous enregistrez un commentaire vocal pour un devoir et un élève (choix du micro)
2. **L'IA transcrit** en quasi temps réel ; l'audio/texte sont stockés en S3
3. **Partage** : le professeur gère ses transcriptions ; l'élève lit/écoute ses retours

## Sécurité & Tech

### Stack technique
- **Symfony** (PHP ≥8.1)
- **Docker** (MySQL)
- **AWS S3**
- **API Gladia**
- **Composer**

### Routes clés
- Inscription : `/register`
- Connexion : `/`
- API Gladia : `/api/gladia/session`
- Création transcription : `transcription/new`
- Vues prof : `/transcription`
- Vues étudiant : `/mesCommentaires`

### S3 & CORS
Configuration recommandée (GET/HEAD, origine locale) pour un usage dev fluide.

## Témoignages

*"Je parle, la transcription se fait toute seule. Mes élèves gagnent en clarté sur les attentes."*

*(Placeholders de 2-3 avis : prof collège/lycée, IUT/Université)*

## Tarifs

- **Essai gratuit** - toutes les fonctionnalités de base (limites d'upload et de minutes d'audio)
- **Pro Enseignant** - enregistrements illimités, export, support prioritaire
- **Établissement** - comptes prof/élèves, SSO, espace dédié et SLA

## FAQ

### Qui peut voir les commentaires ?
Les élèves voient uniquement leurs commentaires ; les professeurs disposent d'une vue admin avec gestion complète.

### Peut-on télécharger les audios ?
Oui, côté professeur depuis l'administration des commentaires.

### Quelles intégrations techniques ?
API Gladia pour la transcription ; stockage AWS S3 pour audio/texte.

### Quelles routes pour démarrer en dev ?
`register`, `transcription/new`, `mesCommentaires`, etc. (voir la section Sécurité & Tech).