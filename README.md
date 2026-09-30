# Portfolio — Mekkiou Adam

![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Portfolio personnel de **Mekkiou Adam** — développeur spécialisé en Intelligence
Artificielle, Data Science et automatisation. Site statique, sans back-end, servi
tel quel par n'importe quel hébergeur.

---

## ✨ Direction artistique — « Obsidian / Signal »

La refonte repose sur un système de design unique, décliné en **thème sombre et
thème clair** — aucune couleur n'est écrite en dur dans les composants, tout
passe par les variables de `src/styles/global.css`.

| | Sombre | Clair |
|---|---|---|
| Fond | obsidienne `oklch(0.16 …)` | papier ivoire `oklch(0.97 …)` |
| Accent | vert acide `oklch(0.88 0.19 122)` | vert forêt `oklch(0.45 0.13 122)` |
| Secondaire | violet plasma | violet plasma |
| Typo display | Clash Display | Clash Display |
| Typo texte / mono | Geist / Geist Mono | Geist / Geist Mono |

L'ambiance est composée de trois couches fixes : halos radiaux animés
(`.ambient`), grille technique (`.gridlines`) et grain de film (`.grain`).

### Expérience & animations

- **Curseur personnalisé** — point + anneau élastique, s'agrandit sur les
  éléments interactifs (désactivé au toucher et en `prefers-reduced-motion`).
- **Palette de commandes `⌘K` / `Ctrl K`** — recherche des projets, des sections
  et des actions (CV, copie de l'e-mail, thème, réseaux), navigation clavier.
- **Hero** — champ de particules sur canvas qui réagit à la souris, titre animé
  lettre par lettre, rotation des intitulés de poste, portrait en parallaxe 3D.
- **Barre de progression de lecture** et **scroll spy** dans la navigation.
- **Bandeau de stack** en trois lignes à défilement inversé (CSS pur).
- **Bento d'expertise** avec halo qui suit le pointeur.
- **Parcours** en frise verticale, ligne de progression liée au scroll, onglets
  animés et cartes dépliables.
- **Projets** filtrables avec animations de layout et filtre synchronisé à l'URL
  (`/projects?tag=Data%20Science`).
- Toutes les animations respectent `prefers-reduced-motion`, et le contenu reste
  visible sans JavaScript.

---

## 🛠️ Stack

- **[Astro 5](https://astro.build/)** — génération statique, îlots React
- **[React 19](https://react.dev/)** + **[Framer Motion](https://www.framer.com/motion/)**
- **[Tailwind CSS 4](https://tailwindcss.com/)**
- **[MDX](https://mdxjs.com/)** + Expressive Code, KaTeX
- **[Satori](https://github.com/vercel/satori)** — cartes Open Graph générées au build

---

## 🚀 Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # astro check + build statique dans dist/
npm run preview  # prévisualiser le build
```

Node **20+** requis.

---

## ⚙️ Personnalisation

| Quoi | Où |
|---|---|
| **URL du site** (canonical, OG, sitemap, RSS) | `src/site.config.ts` — **à changer après déploiement** |
| Identité, description, réseaux, technologies | `src/consts.ts` |
| Photo de profil | `public/static/profile.jpg` (image actuellement générique) |
| Expériences, formations, certifications | `src/data/parcours.ts` |
| Domaines d'expertise | `src/components/react/expertise.tsx` |
| Projets | `src/content/projects/*.md` |
| CV & lettres de recommandation | `public/static/` + `DOCUMENTS` dans `src/consts.ts` |
| Couleurs, typo, ombres | `src/styles/global.css` |
| Endpoint du formulaire | `FORM_ENDPOINT` dans `src/components/react/contact-form.tsx` (voir `CONTACT_FORM_SETUP.md`) |

### Ajouter un projet

Créer `src/content/projects/mon-projet.md` :

```md
---
name: 'Titre du projet'
description: "Une phrase de résumé."
tags: ['Intelligence Artificielle', 'Data Science']
image: '../../../public/static/mon-image.png'
link: 'https://github.com/Adammm75/mon-repo'   # optionnel
startDate: '2025-01-15'
endDate: '2025-06-30'
---

Contenu en Markdown…
```

L'image de couverture est redimensionnée et convertie en WebP au build, la carte
Open Graph est générée automatiquement.

### Analytics

Les scripts d'analytics du template d'origine (Google Analytics, PostHog, Ahrefs)
ont été retirés : ils pointaient vers les comptes de l'auteur du template. Pour
en ajouter, insérer le tag dans `src/layouts/Layout.astro`.

---

## 📦 Déploiement

Le build produit un site **100 % statique** dans `dist/` — ni adaptateur, ni
fonction serveur, ni base de données.

- **Netlify** — configuration prête dans `netlify.toml` (`npm run build`, publish `dist`)
- **Vercel / Cloudflare Pages / GitHub Pages** — build `npm run build`, dossier `dist`

Après le premier déploiement, mettre à jour `SITE_URL` dans
`src/site.config.ts` avec le domaine réel.

---

## 📁 Structure

```
src/
├── components/
│   ├── react/          # îlots interactifs (hero, nav, palette, parcours…)
│   ├── ui/             # primitives
│   ├── Footer.astro  Head.astro  Section.astro  …
├── content/projects/   # contenu des projets (Markdown)
├── data/parcours.ts    # expériences, formations, certifications
├── layouts/Layout.astro
├── pages/              # /, /projects, /projects/[id], 404, rss, robots, OG
├── styles/             # global.css (design system) + typography.css
├── consts.ts           # identité et contenu du site
└── site.config.ts      # URL de production
```

---

## 📄 Licence

MIT — voir [LICENSE](LICENSE).

Ce portfolio est parti du template open-source
[cojocaru-david/portfolio](https://github.com/cojocaru-david/portfolio) ; la
direction artistique, l'architecture des composants et le contenu actuels sont
propres à ce projet.
