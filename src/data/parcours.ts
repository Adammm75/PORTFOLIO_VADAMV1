/**
 * Parcours content — experiences, formations and certifications.
 * Texts are kept verbatim from the previous version of the site.
 */

export type Experience = {
  id: number
  title: string
  company: string
  period: string
  location: string
  isCurrent: boolean
  achievements: string[]
  logo?: string
}

export type Education = {
  id: number
  title: string
  school: string
  period: string
  location: string
  isSearching: boolean
  specialization: string
  link?: string
  logo?: string
}

export type Certification = {
  id: number
  title: string
  organization: string
  type: string
  link?: string
  logo?: string
}

export const parcours: {
  experience: Experience[]
  education: Education[]
  certifications: Certification[]
} = {
  experience: [
    {
      id: 1,
      title: "Apprenti en Développement Informatique chez IXI GROUPE",
      company: "IXI GROUPE",
      period: "Septembre 2024 - Septembre 2025",
      location: "Paris",
      isCurrent: true,
      achievements: [
        "Business Process Automation with Low-Code/No-Code Tools - Design and deployment of automated workflows using platforms such as n8n, Make, and Power Automate to optimize internal processes and enhance operational efficiency",
        "Development of Innovative Solutions to Support Employees - Creation of automated software solutions aimed at simplifying teams' daily tasks, by integrating API services such as Avensys and OneDrive to improve productivity and collaboration",
        "Data Extraction and Analysis for Decision-Making Reporting - Use of SQL queries to extract and transform data, followed by the creation of interactive dashboards with Power BI, providing actionable insights to various teams",
        "Integration of Third-Party Services via APIs into Workflows - Integration of external services (Avensys API, OneDrive API) into automated processes, ensuring seamless communication between the different applications and systems used within the company",
        "Implementation of Machine Learning Models for Prediction and Forecasting - Development and deployment of machine learning models using libraries such as Scikit-Learn and TensorFlow, to perform predictive analytics on business data, such as demand forecasting and trend anticipation",
        "Participation in Agile IT Project Management - Collaboration with teams to plan and execute IT projects using agile methodologies, particularly Scrum, ensuring the delivery of efficient solutions tailored to user needs"
      ],
      logo: "/static/logo-ixi-groupe.png"
    },
    {
      id: 2,
      title: "Stagiaire en Développement Informatique AM MOBILE",
      company: "AM MOBILE",
      period: "Janvier 2024 - Février 2024",
      location: "Paris",
      isCurrent: false,
      achievements: [
        "Developed a dynamic e-commerce website using WordPress, with SEO optimization",
        "Configured and managed web hosting, including security and backup measures",
        "Created a stock and supply management application using JavaFX, backed by a database",
        "Optimized and maintained implemented solutions to ensure performance and reliability"
      ]
    }
  ],
  education: [
    {
      id: 1,
      title: "Master MIAGE Parcours Systèmes d'Information Fiables et Intelligence des données en Alternance",
      school: "Université Paris Nanterre",
      period: "Septembre 2025 - Septembre 2027",
      location: "Paris",
      isSearching: false,
      specialization: "La formation Miage (Méthodes Informatiques Appliquées à la Gestion d'Entreprises) se situe par essence au carrefour de l'informatique et de la gestion d'entreprises. Le diplôme de Master Miage « Systèmes d'information fiables et intelligence des données » de l'Université Paris Nanterre propose une double compétence et vise la formation des futurs acteurs du développement des organisations capables d'accompagner et de piloter les évolutions de la stratégie des entreprises et des évolutions technologiques numériques. Il se prépare en deux années avec deux formats possibles d'organisation des études : classique avec un stage en entreprise en fin de chacune des deux années ou apprentissage avec alternance de périodes à l'université et de périodes en entreprise tout au long de chacune des deux années.",
      link: "https://formations.parisnanterre.fr/fr/formations-2024-2025/les-formations/master-lmd-05/methodes-informatiques-appliquees-a-la-gestion-des-entreprises-miage-master-JWQG2CKZ.html",
      logo: "/static/upn.jpg"
    },
    {
      id: 2,
      title: "Licence Général STS Informatique en Alternance Parcours Développement d'Applications Logicielles en Alternance",
      school: "CNAM Paris",
      period: "Septembre 2024 - Septembre 2025",
      location: "Paris",
      isSearching: false,
      specialization: "Ce diplôme offre une formation générale couvrant les principaux domaines de l'informatique : développement, programmation, réseaux, multimédia, systèmes, architecture des machines, génie logiciel, recherche opérationnelle, systèmes d'informations, systèmes industriels. Il s'adresse plus particulièrement aux salariés du domaine informatique recherchant une valorisation de leur pratique quotidienne en vue d'une promotion ou d'un changement d'employeur, mais il peut accueillir également des salariés d'autres domaines en phase de reconversion.",
      link: "https://formation.cnam.fr/rechercher-par-discipline/licence-informatique-1085631.kjsp?RF=",
      logo: "/static/cnam.png"
    },
    {
      id: 3,
      title: "Brevet Technicien Supérieur Services Informatiques aux Organisations option SLAM",
      school: "Lycée Le Rebours",
      period: "Septembre 2022 - Juin 2024",
      location: "Paris",
      isSearching: false,
      specialization: "Participer à la production et à la fourniture de services informatiques. Réaliser ou adapter des solutions d'infrastructures, assurer le fonctionnement optimal des équipements (SISR). Maîtriser les langages et outils informatiques (SLAM). Développer, adapter, maintenir des programmes et des solutions applicatives (SLAM).",
      link: "https://www.lerebours.fr/formation/enseignement-superieur/bts-services-informatique-aux-organisations-sio/",
      logo: "/static/Le-Rebours_logo.png"
    }
  ],
  certifications: [
    {
      id: 1,
      title: "Configuration d'agents d'IA / Chat Bots, API, mémoire, modèle LLM",
      organization: "Udemy NBN",
      type: "Certification IA",
      link: "https://www.udemy.com/certificate/UC-c3864151-7969-4e4a-83d8-ebd6e17c4739/",
      logo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
    },
    {
      id: 2,
      title: "Programming essentials in Python",
      organization: "Cisco Networking Academy",
      type: "Certification Développement Informatique",
      link: "https://www.credly.com/badges/b476a0a2-7849-40ee-a957-af59f5bbbd89",
      logo: "/static/cisco.png"
    }
  ]
}
