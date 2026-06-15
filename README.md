# simoneloop.github.io

> Personal portfolio of **Simonpaolo "Simone" Lopez** — Generative AI Engineer · ML & Data Science · Full-stack developer.

<p>
  <a href="https://simoneloop.github.io"><img src="https://img.shields.io/badge/live-simoneloop.github.io-1C3C3C?style=for-the-badge&logo=github&logoColor=white" alt="live site"/></a>
</p>
<p>
  <img src="https://img.shields.io/badge/Angular-15-DD0031?style=flat-square&logo=angular&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Angular%20Material-757DE8?style=flat-square&logo=angular&logoColor=white"/>
</p>

🔗 **Live:** https://simoneloop.github.io

A single-page portfolio built with Angular, featuring an interactive **3D globe**
(Three.js) and a fully **bilingual** UI (English / Italian).

## ✨ Features
- **Home** — animated intro ("GenAI engineer · Data scientist · Full-stack developer").
- **About** — short bio.
- **Skills & Featured projects** — categorized stack (GenAI/LLM, ML & Data Science,
  Full-stack, Languages, Game dev) and project cards (multi-agent BDI platform,
  the open-source Claude Code skills marketplace, deep-learning work, E-TREND,
  the IBM SpaceX capstone, and the live 3D platforms e-archeo.it & Codex4D).
- **Contact** — quick links to get in touch.
- **Interactive 3D globe** — rendered with Three.js (`globus` component).
- **i18n** — English & Italian via `@ngx-translate` (`src/assets/language/*.json`).

## 🛠️ Tech stack
Angular 15 · Angular Material · Three.js · `@ngx-translate` · FontAwesome · TypeScript.

## 📁 Structure
```text
src/app/
├── home/        # landing / hero
├── about/       # bio
├── skills/      # skills + project-card/
├── contact/     # contact + link-card/
├── globus/      # Three.js 3D globe
├── navbar/      # navigation
└── loading/     # loading screen
src/assets/
├── language/    # en.json, it.json (i18n)
├── font/        # Three.js typeface + Chakra Petch
└── img/         # icons & textures
```

## 🚀 Local development
Prerequisites: **Node.js 18+** and npm.

```bash
npm install      # install dependencies
npm start        # dev server at http://localhost:4200 (ng serve, live reload)
npm run build    # production build → dist/pws
npm test         # unit tests (Karma + Jasmine)
```

## 🌐 Deployment
Automated via **GitHub Actions** ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)):
every push to `main` builds the app, copies `index.html` → `404.html` (SPA
deep-link fallback), and publishes `dist/pws` to **GitHub Pages** at
https://simoneloop.github.io.

## 👤 Author
**Simonpaolo Lopez** — [@simoneloop](https://github.com/simoneloop) ·
[LinkedIn](https://www.linkedin.com/in/s-loop)
