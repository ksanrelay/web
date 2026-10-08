# KSAN Relay — website

Static site for KSAN Relay, an independent quantitative research firm. Built with React, Vite, TypeScript and React Router, and deployed to Vercel. It has no backend, no database, no authentication and no analytics.

## Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run lint
npm run build     # type-check + static build to dist/
npm run preview   # serve dist/ with the production security headers
```

## Configuration

| Variable        | Required | Effect |
| --------------- | -------- | ------ |
| `VITE_SITE_URL` | No       | Public origin, e.g. `https://ksanrelay.com`. When set, the build adds canonical/`og:url` tags and an absolute `og:image`, and it emits `sitemap.xml` and a `Sitemap:` line in `robots.txt`. |

Set `VITE_SITE_URL` in the Vercel **Production** environment only after the custom domain is connected. Leave it unset for previews.

`VITE_*` variables are compiled into client JavaScript and are public. Never put secrets in them.

Contact details (email, GitHub, LinkedIn) and per-page titles and descriptions are in `src/site.ts`.

## Deployment (Vercel)

`vercel.json` configures:

- the Vite framework preset and the `dist/` output
- an SPA rewrite, so direct visits to `/research` etc. load `index.html`
- security headers: CSP, HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, COOP
- long-lived caching for hashed files in `/assets`

The CSP is `'self'`-only. Fonts are self-hosted through `@fontsource`, and no third-party scripts, styles or fonts are loaded. If you add any external resource, update the CSP in **both** `vercel.json` and `vite.config.ts` (preview headers), and update the privacy policy.

Vercel adds `X-Robots-Tag: noindex` to preview deployments by default, so staging URLs are not indexed.

## Structure

```
src/
├── components/   Navbar, MobileNav, ParticleBackground, PageShell, Section, ResearchCard,
│                 TechnicalLabel, EquationAccent, Footer, ExternalLink, LogoMark
├── pages/        Home, Research, About, Contact, Privacy, Terms, Disclaimer, NotFound
├── styles/       global.css (design tokens + all styles)
├── site.ts       contact details and route metadata (also used by vite.config.ts)
└── usePageMeta.ts
```

The particle layer (`tsParticles`) is lazy-loaded after first paint. It uses fewer particles on small or low-power devices and stops moving when `prefers-reduced-motion` is set.

## Legal pages

The Disclaimer, Terms of Use and Privacy Policy are **general templates, not legal advice**. Have a qualified lawyer review them before relying on them commercially, and before KSAN Relay begins any regulated activity (including any applicable Indian/SEBI requirements).

## Account security

Turn on 2FA (passkeys where possible) for the GitHub and Vercel accounts. Dependabot (`.github/dependabot.yml`) opens weekly dependency update PRs.

## Licensing

Website content: © 2026 KSAN Relay. All rights reserved. Research code and publications are licensed individually, and each one states its own license.
