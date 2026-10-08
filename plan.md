# KSAN Relay Website — Claude Code Build Spec

## 1. Project Goal

Build a **fast, static, research-focused website** for **KSAN Relay**, positioned as an independent quantitative research firm focused on:

- quantitative research
- computational finance
- systematic methods
- statistics
- mathematics
- physics-inspired modeling
- computer science
- optimization
- market microstructure
- time-series analysis

The site must **not** imply that KSAN Relay manages client money, offers investment products, guarantees returns, or provides regulated investment advice.

The website should feel like a **serious research lab / quantitative firm**, not a fintech SaaS app or consumer trading platform.

---

## 2. Tech Stack

Use a standard **React + Vite** frontend.

Recommended scaffold:

- **Vite**
- **React**
- **TypeScript**
- **React Router**
- **Vercel** for hosting
- static frontend only
- no backend
- no database
- no authentication
- no server-side business logic
- no API routes

Suggested setup:

```bash
npm create vite@latest ksan-relay -- --template react-ts
cd ksan-relay
npm install
npm install react-router-dom @tsparticles/react tsparticles-slim lucide-react clsx
```

Recommended supporting libraries:

- `@tsparticles/react` + `tsparticles-slim` for interactive background particles
- `lucide-react` for icons
- `framer-motion` only for tiny hover/page transitions if needed; **never** for scroll-linked animation
- `clsx` for conditional class handling
- `vite-plugin-svgr` if SVG components are useful
- optionally `tailwindcss` if utility-first styling materially speeds implementation

Prefer external libraries instead of hand-implementing complex visual or interactive systems.

Do **not** build a custom particle engine.

---

## 3. Deployment Target

Deploy to **Vercel** as a static site.

Requirements:

- static export
- HTTPS
- custom domain-ready
- optimized asset delivery
- minimal client-side JS
- no unnecessary runtime dependencies
- no backend dependency
- no user database
- no server sessions

The final site should build with:

```bash
npm run build
```

and produce a static Vite `dist/` output that deploys cleanly to Vercel.

---

# 4. Visual Direction

## Core aesthetic

Follow a:

**Swiss-tech + mathematical research + dark Vercel-inspired aesthetic**

Design characteristics:

- highly structured
- editorial
- minimal
- precise
- geometric
- research-oriented
- dense enough to feel serious
- never cluttered
- no gimmicky startup illustrations
- no gradients everywhere
- no neon cyberpunk styling
- no scrolling animations

Think:

- Vercel
- Swiss International Style
- scientific computing
- research papers
- mathematical notation
- physics diagrams
- terminal / code aesthetics
- institutional quant research

---

## 5. Color System

Use approximately:

- **75% AMOLED black**
- **25% pure white**

Primary background:

```css
#000000
```

Primary foreground:

```css
#FFFFFF
```

Important:

- **Do not use grey text.**
- Text should be white.
- Secondary hierarchy should come from:
  - font size
  - font weight
  - opacity
  - spacing
  - borders
  - layout
- Avoid introducing visible grey color values for body copy.

Allowed:

- pure black
- pure white
- transparent white overlays
- low-opacity white borders
- subtle white glow

Avoid:

- blue
- purple
- beige
- grey typography
- colored gradients

---

# 6. Background Behavior

The background itself must remain **fixed/static**.

Only the document/content layer should scroll.

Implementation concept:

```txt
Viewport
├── Fixed full-screen black background
├── Fixed interactive particle layer
└── Scrollable document/content layer
```

The particle layer must:

- stay fixed to the viewport
- not scroll with the page
- respond subtly to cursor / touch position
- remain low-density
- look mathematical / computational rather than decorative
- remain performant
- never reduce text readability
- use white particles only
- use subtle connection lines only if visually restrained

Use `tsParticles`.

Do not create particles manually.

---

# 7. Navbar

Build a **floating pill navbar**.

Characteristics:

- fixed near top center
- rounded pill shape
- high transparency
- frosted glass
- strong backdrop blur
- thin white translucent border
- no grey fill
- compact
- minimal
- should feel similar to modern Vercel navigation

Example visual direction:

```txt
[ KSAN RELAY ] [ Research ] [ About ] [ GitHub ] [ Contact ]
```

Use:

- transparent black base
- `backdrop-filter: blur(...)`
- thin low-opacity white border
- subtle white outer glow
- pure white text

Do not make it opaque.

### Mobile / small-width behavior

Navbar must collapse cleanly on smaller screens.

Use:

- compact brand mark
- hamburger/menu icon
- expandable dropdown/panel
- keyboard accessible behavior
- touch-friendly hit targets

Do not allow navbar items to wrap awkwardly.

---

# 8. Card Design

Cards should use:

- pure black background
- thin white border
- white glow around cards
- crisp geometric spacing
- no grey fill
- no heavy drop shadow
- no glassmorphism overload

White glow should be restrained and professional.

Example concept:

```css
box-shadow:
  0 0 18px rgba(255,255,255,0.06),
  inset 0 0 0 1px rgba(255,255,255,0.10);
```

Keep glow subtle.

---

# 9. Typography

Typography should feel:

- technical
- editorial
- mathematical
- institutional

Use a clean sans-serif.

Preferred options:

- Geist
- Inter
- IBM Plex Sans
- Space Grotesk
- JetBrains Mono for code/math labels only

Recommended:

- **Geist** for main UI
- **JetBrains Mono** for small labels, equations, metadata, code-like accents

Use typography hierarchy rather than color hierarchy.

---

# 10. Motion

## Important

**No scroll-triggered animations.**

Do not use:

- parallax scrolling
- sections flying in on scroll
- scroll-linked transforms
- rotating 3D objects on scroll
- GSAP ScrollTrigger
- cinematic scroll sequences

Allowed:

- tiny hover transitions
- button hover
- navbar expansion
- subtle card border/glow change
- particle pointer interaction
- page transition fade if extremely fast

Keep all motion restrained.

---

# 11. Site Architecture

Build the following routes:

```txt
/
├── /research
├── /about
├── /contact
├── /privacy
├── /terms
└── /disclaimer
```

Optionally:

```txt
/publications
```

only if needed later.

---

# 12. Homepage

The homepage should immediately explain what KSAN Relay does.

## Hero

Use:

### KSAN RELAY

### Quantitative Research & Computational Finance

Suggested copy:

> KSAN Relay is an independent quantitative research firm studying systematic methods in financial markets through mathematics, statistics, computation, and scientific modeling.

Primary actions:

- Research
- About

Secondary external links:

- GitHub
- LinkedIn

Avoid CTAs such as:

- Invest
- Start Trading
- Join Fund
- Get Signals
- Generate Alpha

---

## 13. Homepage Sections

### A. Research Areas

Use 4–6 cards.

Suggested areas:

#### Statistical Modeling
Time-series methods, probability, inference, and model validation.

#### Systematic Methods
Rule-based and data-driven approaches to studying financial markets.

#### Computational Finance
Simulation, numerical methods, optimization, and quantitative modeling.

#### Market Microstructure
Research into execution, liquidity, price formation, and market behavior.

#### Optimization
Convex optimization, parameter search, model selection, and numerical methods.

#### Scientific Computing
High-performance numerical workflows, reproducibility, and research tooling.

---

### B. Research Philosophy

Short section emphasizing:

- evidence over narratives
- reproducibility
- statistical rigor
- explicit assumptions
- model validation
- research transparency where appropriate

Possible line:

> Research should be falsifiable, reproducible, and explicit about its assumptions.

---

### C. Mathematical / Physics / CS Identity

Integrate subtle technical visual elements such as:

- equations
- matrices
- vectors
- derivatives
- stochastic process notation
- Fourier / signal concepts
- graph/network notation
- code fragments
- tiny coordinate systems
- computational diagrams

These should be **decorative but meaningful**, not random math wallpaper.

Example small notation:

```txt
∂X/∂t
E[X_t | F_t]
∇f(x)
Σ
λ
P(X_{t+1} | X_t)
```

Do not overdo it.

---

### D. Open Research / Engineering

Mention:

- selected tooling
- reproducible experiments
- research code
- technical notes

Link to GitHub.

Suggested copy:

> Selected implementations, experimental tooling, and reproducible research infrastructure may be published through the KSAN Relay GitHub organization.

---

# 14. Research Page

Route:

```txt
/research
```

For now, keep it intentionally sparse.

Requirements:

- pure black
- minimal
- no fake papers
- no placeholder fake performance charts
- no invented strategies
- no fake citations
- no fake returns

Suggested content:

### Research

> Research at KSAN Relay is currently ongoing. Selected work will be published when it reaches an appropriate level of methodological and technical maturity.

Additional line:

> Some research may remain private during active development and validation.

Optional metadata-style labels:

```txt
STATUS        ACTIVE
PUBLICATIONS  FORTHCOMING
FOCUS         QUANTITATIVE METHODS
```

Do not write “Coming Soon” in a generic SaaS style.

---

# 15. About Page

Explain KSAN Relay clearly.

Suggested structure:

### About KSAN Relay

> KSAN Relay is an independent quantitative research organization focused on the application of mathematics, statistics, physics-inspired modeling, and computer science to financial markets.

Research interests may include:

- quantitative finance
- systematic methods
- time-series analysis
- statistical learning
- optimization
- market microstructure
- computational methods
- simulation
- scientific computing

Do not claim:

- assets under management
- clients
- institutional mandates
- proprietary trading operations
- investment performance

unless these become factually true later.

---

# 16. Contact Page

Keep it minimal.

Display:

- email
- LinkedIn
- GitHub

Example:

```txt
Email     mail@ksanrelay.com
GitHub    github.com/ksanrelay
LinkedIn  linkedin.com/company/ksan-relay
```

Do not use a contact form initially.

Reason:

- no backend required
- no spam handling
- less attack surface
- less personal data processing
- simpler privacy obligations

Use `mailto:` for email.

---

# 17. Legal Positioning

The site must clearly avoid presenting KSAN Relay as:

- a hedge fund
- a broker
- an investment adviser
- a portfolio manager
- an asset manager
- a signal service
- a financial product distributor
- a guaranteed-return service

unless those activities later become legally and factually accurate.

Do not use claims such as:

- “guaranteed returns”
- “consistent alpha”
- “beat the market”
- “risk-free”
- “profitable strategy”
- “institutional asset management”
- “invest with us”
- “SEBI approved”
- “SEBI registered”

unless independently verified and legally applicable.

---

# 18. Disclaimer Page

Route:

```txt
/disclaimer
```

Use clear language similar to:

> KSAN Relay publishes quantitative, computational, and financial research for informational, educational, and research purposes only. Nothing published on this website constitutes investment advice, financial advice, a recommendation, solicitation, or an offer to buy or sell any security, derivative, financial instrument, or investment product.

Include:

> Any models, simulations, backtests, hypothetical results, or historical analyses may rely on assumptions and may not reflect actual trading conditions. Past performance, simulated performance, or research findings do not guarantee future results.

Also include:

> KSAN Relay makes no representation that information published on this website is complete, error-free, or suitable for any particular investment decision.

Do not claim legal immunity.

---

# 19. Terms of Use

Route:

```txt
/terms
```

Cover:

- informational use
- research-only nature
- no investment advice
- no warranty of accuracy
- no guarantee of availability
- no guarantee of financial performance
- intellectual property
- acceptable use
- external links
- changes to website/content
- limitation of liability to the extent permitted by law

Do not copy another firm's legal terms verbatim.

Make clear this is a general template and should be reviewed by a qualified lawyer before being relied on commercially.

---

# 20. Privacy Policy

Route:

```txt
/privacy
```

Architect the website so the policy can remain simple.

The site should intentionally collect as little data as possible.

Prefer:

- no accounts
- no newsletter
- no contact form
- no advertising pixels
- no behavioral tracking
- no third-party marketing trackers
- no payment collection
- no user database

If analytics are needed later, use privacy-respecting analytics and update the policy.

Current policy should state, subject to final legal review, that the site may process:

- basic hosting/security logs
- IP/device/network metadata automatically generated by hosting infrastructure
- information voluntarily sent through email

Do not claim “we collect absolutely nothing” unless technically verified.

---

# 21. Copyright / Intellectual Property

Footer:

```txt
© 2026 KSAN Relay. All rights reserved.
```

For research publications, licensing should be explicitly stated per publication.

Potential split:

- website content → all rights reserved
- selected source code → separately licensed
- research code → separately licensed
- papers → copyright KSAN Relay unless another license is stated

Do not automatically apply MIT license to all research content.

---

# 22. Security Requirements

A static-only architecture is preferred specifically to reduce attack surface.

## No backend

Avoid:

- databases
- authentication
- file uploads
- admin dashboard
- payment processing
- custom CMS
- public write APIs
- user-generated content

unless added later with a clear requirement.

## Required security practices

### Accounts

Enable:

- GitHub 2FA
- Vercel 2FA
- passkeys where available

### Secrets

Never expose:

- API keys
- tokens
- credentials
- private URLs
- `.env` files
- service-account files

Remember:

Any value bundled into client-side JavaScript is public.

Do not put secrets in Vite `VITE_*` environment variables. These variables are intentionally exposed to the browser bundle.

## HTTP Security Headers

Configure strong headers where compatible:

```txt
Content-Security-Policy
Strict-Transport-Security
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
```

Avoid unsafe inline scripts where possible.

Recommended starting point:

```txt
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

Use a CSP appropriate to the actual final asset/library configuration.

For Vercel + Vite, configure security headers through `vercel.json` where practical.

## Dependencies

- minimize dependency count
- use established packages
- pin/lock dependencies
- maintain lockfile
- enable Dependabot
- update vulnerable dependencies
- remove abandoned packages
- avoid unnecessary client libraries

---

# 23. Performance Requirements

The site should feel extremely fast.

Target:

- excellent Lighthouse performance
- minimal JavaScript
- no large autoplay media
- optimized images
- compressed assets
- lazy-load below-fold noncritical content
- preload only critical fonts/assets
- avoid layout shift
- avoid oversized icon packages
- avoid unnecessary re-renders
- keep particle count responsive to device capability
- disable/reduce particle complexity on mobile
- respect `prefers-reduced-motion`

Do not load heavy 3D frameworks unless a real requirement emerges.

---

# 24. Responsive Design

The website must work cleanly on:

- desktop
- laptop
- tablet
- mobile

Desktop:

- generous whitespace
- wide research-oriented grid
- floating pill navbar

Mobile:

- collapsed navbar
- single-column cards
- readable typography
- no horizontal overflow
- particle density reduced
- large enough touch targets

---

# 25. Accessibility

Maintain:

- semantic heading hierarchy
- keyboard navigation
- visible focus states
- sufficient contrast
- accessible menu controls
- descriptive link labels
- meaningful alt text
- support for reduced motion

Pure black and white should still preserve readable hierarchy through typography and spacing.

---

# 26. Vercel-Inspired Design Rules

Follow these principles:

- information-first
- minimal ornamentation
- strong typography
- monochrome
- precise spacing
- subtle borders
- compact controls
- clear grid
- high responsiveness
- instant interactions
- no gratuitous effects

Do not blindly clone Vercel's website.

Use the principles, not copied assets/layouts.

---

# 27. Component Structure

Suggested component architecture:

```txt
src/
├── components/
│   ├── Navbar.tsx
│   ├── MobileNav.tsx
│   ├── ParticleBackground.tsx
│   ├── PageShell.tsx
│   ├── Section.tsx
│   ├── ResearchCard.tsx
│   ├── TechnicalLabel.tsx
│   ├── EquationAccent.tsx
│   ├── Footer.tsx
│   └── ExternalLink.tsx
├── pages/
│   ├── Home.tsx
│   ├── Research.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Privacy.tsx
│   ├── Terms.tsx
│   └── Disclaimer.tsx
├── App.tsx
├── main.tsx
└── styles/
    └── global.css
```

Use `react-router-dom` for routing.

Keep components small and reusable.

---

# 28. Homepage Suggested Layout

```txt
FIXED PARTICLE BACKGROUND

        [ Floating Navbar ]

----------------------------------

KSAN RELAY

Quantitative Research
& Computational Finance

Independent research in systematic
methods, statistics, mathematics,
and computation.

[ Research ] [ About ]

----------------------------------

01 / RESEARCH AREAS

[ Statistical Modeling ]
[ Systematic Methods ]
[ Computational Finance ]
[ Market Microstructure ]
[ Optimization ]
[ Scientific Computing ]

----------------------------------

02 / PRINCIPLES

Evidence over narrative.
Explicit assumptions.
Reproducible methods.
Statistical validation.

----------------------------------

03 / OPEN RESEARCH

Selected implementations,
technical notes, and tooling.

[ GitHub → ]

----------------------------------

Footer
```

---

# 29. Math / Physics / CS Styling

Use subtle notation as visual language.

Potential visual motifs:

```txt
∂/∂t
∇f(x)
Σ
λ
Δ
E[X]
P(A|B)
xᵀAx
FFT
O(n log n)
```

Potential microcopy:

```txt
MODEL / VALIDATE / ITERATE
SIGNAL / NOISE
STATE / TRANSITION
OBSERVE / INFER
```

Do not turn the website into a fake terminal.

Do not use random matrix rain.

---

# 30. Logo Usage

Use the KSAN Relay relay/pulse mark.

Logo presentation:

- pure white mark on black
- use monochrome
- no color variants required initially
- preserve generous clear space
- favicon should use the mark only
- navbar may use mark + “KSAN RELAY”

If the logo image contains grey/metallic gradients, create a clean white monochrome version for primary UI usage.

---

# 31. Content Tone

Copy should be:

- concise
- technical
- factual
- understated
- research-oriented

Avoid:

- startup hype
- marketing superlatives
- vague AI claims
- “revolutionizing finance”
- “next-generation”
- “cutting-edge” unless specifically substantiated
- “world-class”
- “industry-leading”

Prefer concrete descriptions.

---

# 32. SEO Metadata

Use clear metadata.

Homepage title:

```txt
KSAN Relay — Quantitative Research & Computational Finance
```

Description:

```txt
KSAN Relay is an independent quantitative research firm focused on systematic methods, statistical modeling, computational finance, and scientific computing.
```

Research:

```txt
KSAN Relay Research
```

About:

```txt
About KSAN Relay
```

Add:

- Open Graph metadata
- favicon
- canonical URL once domain is purchased
- sitemap
- robots.txt

Do not index staging URLs if avoidable.

---

# 33. Domain Readiness

The site should work on a temporary Vercel domain initially.

Because routing is client-side, configure Vercel so direct visits to routes such as `/research` resolve to `index.html`.

Example `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

If prerendering is introduced later, adjust this configuration accordingly.

Later, connect:

```txt
ksanrelay.com
```

Do not hardcode the Vercel preview URL into content.

Keep domain references configurable.

---

# 34. Static Site Constraint

This is critical:

**The entire website should remain a static Vite frontend.**

Do not add:

- Supabase
- Firebase
- Clerk
- Auth0
- MongoDB
- PostgreSQL
- Redis
- Express / custom Node backend
- serverless functions
- analytics requiring invasive tracking

unless explicitly requested later.

---

# 35. What Not to Build

Do not build:

- login
- dashboard
- trading interface
- portfolio tracker
- live market prices
- contact database
- newsletter backend
- CMS
- blog admin
- trading signals
- investor portal
- performance dashboard

This is a research firm's institutional website, not a product platform.

---

# 36. Final Quality Checklist

Before considering the site complete:

- [ ] Site builds successfully with Vite
- [ ] `npm run build` produces a valid static `dist/`
- [ ] Deploys to Vercel
- [ ] All routes work directly
- [ ] Fixed particle background works
- [ ] Page content scrolls independently
- [ ] No scroll-triggered animation exists
- [ ] Mobile navbar collapses correctly
- [ ] Navbar is frosted and highly transparent
- [ ] AMOLED black dominates visual area
- [ ] White is the only foreground/text color
- [ ] No grey body text
- [ ] Cards have restrained white glow
- [ ] No backend exists
- [ ] No secrets are included in client bundle
- [ ] Research page does not invent publications/results
- [ ] Disclaimer exists
- [ ] Terms exist
- [ ] Privacy page exists
- [ ] Footer contains copyright
- [ ] GitHub/LinkedIn links are external and safe
- [ ] Lighthouse performance is strong
- [ ] Mobile layout has no overflow
- [ ] Reduced motion is respected
- [ ] Security headers are configured where possible

---

# 37. Important Legal/Compliance Note

The legal pages above are **general drafting guidance, not legal advice**.

The website should be structured conservatively, but no design, disclaimer, or terms page can make a business “unsuable” or fully eliminate regulatory/legal exposure.

Before KSAN Relay:

- sells research,
- provides securities recommendations,
- accepts outside capital,
- manages client funds,
- offers advisory services,
- markets investment products,
- or begins regulated financial activity,

the firm's legal/regulatory positioning should be reviewed independently, including any applicable Indian/SEBI requirements.

For the current website, keep the positioning strictly focused on:

> **Independent quantitative research and computational finance.**
