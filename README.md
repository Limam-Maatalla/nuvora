# Nuvora — Focus. Learn. Grow.

Nuvora is a React + Vite + Material UI starter application for personal focus, digital awareness, study planning, community discussion, and a demo AI assistant. It includes Arabic, French, and English UI dictionaries, light/dark themes, profile preferences, privacy and contact pages, and a demo-only engineering dashboard.

## Requirements

- Windows 10/11
- Node.js **22 LTS or newer** (npm is included). Download from https://nodejs.org/.
- VS Code (recommended): https://code.visualstudio.com/

## Run on Windows PowerShell

1. Extract `Nuvora.zip` to a folder such as `C:\Projects\Nuvora`.
2. Open PowerShell and move into the folder:
   ```powershell
   cd C:\Projects\Nuvora
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Start the development server:
   ```powershell
   npm run dev
   ```
5. Open the local URL printed in PowerShell (usually `http://localhost:5173`). Stop it with `Ctrl+C`.
6. Open the folder in VS Code with `code .` (if the VS Code command is installed).

## Build and preview

```powershell
npm run build
npm run preview
```

The production output is written to `dist/`. A successful build verifies compilation and bundling, not backend integrations or production security.

## Project structure

```text
Nuvora/
├── public/
├── src/
│   ├── app/                 # Router and app composition
│   ├── components/          # Reusable UI and layout
│   ├── content/             # Privacy-policy content
│   ├── context/             # Language and theme preferences
│   ├── hooks/               # Shared hooks
│   ├── pages/               # Route-level screens
│   ├── services/             # Contact, assistant, and analytics adapters
│   ├── theme/               # MUI theme setup
│   ├── translations/        # Arabic, French, English dictionaries
│   ├── utils/               # Local storage helpers
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── vite.config.js
```

## Features and limitations

- **Dashboard:** overview and quick links to the main tools.
- **Digital Awareness:** manual daily check-ins and a simple local summary. Browsers cannot automatically read a person's phone/app usage through this UI.
- **Study Planner:** create, complete, and remove study tasks; data is stored in this browser's local storage.
- **Discussion:** example prompts with local like/save/complete interactions; no shared community backend yet.
- **AI Assistant:** local demo responses only. Connect a server-side AI endpoint before describing this as a real AI integration. Do not place API secrets in frontend code or `VITE_*` variables.
- **Profile:** display name, email, language, theme, and notification preferences are local demo settings.
- **Languages:** English, French, Arabic. Arabic switches text direction to RTL; review every page and component for production-grade RTL before release.
- **Light/dark mode:** saved locally.
- **Contact:** form validation and demo service; it does not send an email until a real backend/API is configured.
- **Privacy Policy:** starter wording only. Review it against the deployed data collection, vendors, cookies, analytics, and AI processing before publishing.
- **Engineering Dashboard:** mock metrics are explicitly labeled demo data. The demo access gate is **not authentication**. It is a UI demonstration, not a security boundary. A real deployment must use server-side identity, authorization, audit logging, and trusted analytics APIs.

## Engineering dashboard demo

Visit `/engineering-access`. In development mode, the sample demo phrase is `NUVORA-DEMO`. This is intentionally public and is not a secret. Do not rely on it to protect real information. In production the demo gate is disabled unless a proper server-side auth system is implemented.

## Edit the project

- Add pages in `src/pages/` and register routes in `src/app/AppRouter.jsx`.
- Put shared components in `src/components/`.
- Add translated strings to all three dictionaries in `src/translations/`.
- Adjust colors and MUI defaults in `src/theme/createAppTheme.js`.
- Keep integrations behind service modules in `src/services/`.

## GitHub

Create an empty repository on GitHub, then from the project directory:

```powershell
git init
git add .
git commit -m "Initial Nuvora app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/Nuvora.git
git push -u origin main
```

Replace the remote URL with your repository. Never commit `.env`, passwords, API keys, access tokens, or private keys. For GitHub Pages, configure Vite's `base` path and a SPA-compatible routing strategy; for the simplest deployment, use a host that supports Vite/SPA rewrites.

## Before production

1. Implement server-side authentication and authorization for admin/engineering routes.
2. Connect analytics to a trusted backend and avoid collecting unnecessary personal data.
3. Configure a real contact endpoint and AI provider server-side.
4. Add tests, error monitoring, accessibility checks, and a reviewed privacy notice.
5. Run `npm audit` and review dependency updates.
