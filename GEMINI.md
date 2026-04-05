# Gemini CLI: Vibe Coding Standards

This project is a monorepo designed for rapid "vibe coding" and experimental web projects, hosted at `vibe.nuty.works`.

## Project Architecture
- **Root Application (Hub):** The main landing page and dashboard located in `/apps/hub`. It is served at the root (`vibe.nuty.works/`).
- **Vibes (Subprojects):** Individual, independent experiments located in `/vibes/*`. They are served at sub-paths (e.g., `vibe.nuty.works/sample-vibe/`).
- **Build Orchestration:** `scripts/build.mjs` manages the assembly of all projects into a single `dist/` folder. The Hub is placed at the root, and each Vibe is placed in its respective subdirectory.

## Terminology & Separation
- **Vibes vs. Hub:** The term "Vibe" refers strictly to the individual projects inside the `/vibes/` directory.
- **The Hub is NOT a Vibe:** The Hub must never be listed as a "vibe" or placed within the `/vibes/` directory. It is the host platform.
- **Isolation:** Each Vibe must be fully self-contained. While they may link back to the Hub (`/`), they should not share styling or logic with it.

## Tech Stack & Conventions
- **Framework:** React + TypeScript + Vite.
- **Styling:** Tailwind CSS v4 (using `@tailwindcss/postcss`).
- **Design Language:** High-contrast dark mode, bold typography, glassmorphism, and vibrant gradients.
- **Responsiveness:** Always use mobile-first Tailwind classes (`p-4 sm:p-8`, `text-4xl sm:text-6xl`).

## Workflow Mandates
1.  **Git Operations:** NEVER execute `git commit` or `git push` unless explicitly requested by the user for a specific task.
2.  **Creating a New Vibe:****
    - Scaffold in `/vibes/`.
    - Use relative base paths in `vite.config.ts` (`base: './'`).
    - Register the new Vibe only in the Hub's navigation (`apps/hub/src/App.tsx`).
2.  **Building:**
    - Run `npm run build` from the root.
    - Cloudflare Pages will serve the resulting `dist/` directory.
3.  **No Conflation:**
    - The Hub must remain distinct as the platform, not as a content item within its own directory of Vibes.

## CI/CD (GitHub Actions)
The project is automatically built and deployed to Cloudflare Pages on every push to `main`.
- **Workflow:** `.github/workflows/deploy.yml`
- **Required Secrets:**
  - `CLOUDFLARE_API_TOKEN`: Cloudflare API token with "Cloudflare Pages" edit permissions.
  - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID.

## Cloudflare Pages Configuration
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/`
