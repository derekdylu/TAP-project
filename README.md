# ㄟ今晚吃什麼 (Cooking Game)

<img width="1920" height="1080" alt="1776402359104-proj_TAP" src="https://github.com/user-attachments/assets/9b45e6dd-f227-488a-8c5a-eb984d96a68a" />

An educational mobile web game about Taiwan Agricultural Product Production and Certification (TAP), originally created in 2022 for a National Taiwan University agricultural economics research project.

## Project status

This repository contains a self-contained, browser-only version of the game. The original MongoDB, SendGrid, and Heroku services are no longer used and are not required to play.

The current build:

- bundles the original cuisine and ingredient catalog with the frontend;
- stores game progress, optional nicknames, scores, and comments only in the player's browser;
- does not collect email addresses or send survey responses to a server;
- does not provide a supported production backend or research-data pipeline.

The interface and educational content remain primarily in Traditional Chinese.

## Play and controls

Use a portrait-oriented browser window at least 320 pixels wide. The game is controlled by touch or mouse input. Press `F` to enter or leave fullscreen mode; `Esc` also exits fullscreen.

Browser data can be removed at any time by clearing local storage for the site.

## Requirements

- Node.js 24 or newer
- npm, included with Node.js

## Local development

```bash
cd frontend
npm ci
npm run dev
```

Open the local URL printed by Vite. The development server does not need environment variables or external services.

## Tests and production build

```bash
cd frontend
npm test
npm run build
npm audit --audit-level=high
```

The static production output is written to `frontend/dist/`. To inspect it locally:

```bash
cd frontend
npm run preview
```

## Repository layout

- `frontend/src/Components/` — game screens and reusable interface components
- `frontend/src/Containers/` — top-level game, score, feed, and about views
- `frontend/src/data/` — bundled cuisine and ingredient catalog
- `frontend/src/Utils/Axios.js` — compatibility-named browser storage adapter; it makes no HTTP requests
- `frontend/src/Images/` — original visual and audio assets
- `.github/workflows/ci.yml` — reproducible test, build, and dependency-audit checks
- `netlify.toml` — static-site deployment configuration

## Contribution scope

This project is maintained as a browser-only web game. Contributions should focus on security, build reproducibility, accessibility, documentation, and the existing educational experience rather than new online services or data collection. See [CONTRIBUTING.md](CONTRIBUTING.md).

Please use private vulnerability reporting when it is available, and never disclose live credentials in an issue. See [SECURITY.md](SECURITY.md).

## Credits and third-party material

The original project was commissioned by an NTU agricultural economics research group and developed by a student team. The owner has confirmed redistribution permission for the retained project code and assets. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for the music attribution and dependency notice.

## License

The software source code is available under the [MIT License](LICENSE). Original images, animation, and audio under `frontend/src/Images/` are not covered by the MIT License; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
