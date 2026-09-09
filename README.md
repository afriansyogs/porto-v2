# Afrians Yoga — Portfolio v2 (`porto-v2`)

> **Clean · Minimal · Modern · Fun** — A high-performance monochrome developer portfolio built with Svelte 5, SvelteKit 2, Tailwind CSS v4, and GSAP. Styled like a developer's workstation with interactive elements including a 3D Cloudee avatar, a functional macOS VSCode window, dual-track tech marquee, and verified contact backend.

---

## Tech Stack

- **Framework**: [Svelte 5](https://svelte.dev) (Runes: `$state`, `$derived`, `$props`, `{@attach}`) + [SvelteKit 2](https://kit.svelte.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + OKLCH semantic design tokens
- **Animations & Physics**: [GSAP](https://gsap.com) (ScrollTrigger choreography) + Custom 2.5D Spring & rAF Physics
- **Icons**: [Lucide Svelte](https://lucide.dev)
- **Validation**: [Zod](https://zod.dev)
- **Email Delivery**: [Resend REST API](https://resend.com)
- **Theme**: [mode-watcher](https://github.com/svecosystem/mode-watcher) (Dark by default, system-aware)
- **Typography**: Space Grotesk (Headings), Inter (Body), JetBrains Mono (Code/Labels)

---

## Features

- **Interactive 3D Cloudee Avatar**: Head tilt and parallax eye tracking with mouse follow, random blinking intervals, idle breathing float, dynamic theme-reactive glow, and playful squash-and-stretch click reactions.
- **Developer Workspace Motif**: About section rendered as a authentic macOS VSCode editor with tabs, real file tree switching (`ABOUT.md` / `EDUCATION.md`), and animated statistics.
- **Active Toolchain Marquee**: Infinite opposite-direction scrolling rows displaying 23 production tool icons in full color.
- **Production Deployments**: Responsive project cards with custom spotlight cursor glow and dithered media aesthetics.
- **Commit Log Timeline**: Single-sided career history with scrubbed scroll-progress line fill and pulsating entry nodes.
- **End-to-End Contact Flow**: Resend API integration with server-side validation, honeypot anti-spam, per-IP rate limiting, and fallback `mailto:`.
- **SEO & Structured Data**: Complete JSON-LD metadata (`Person`, `ProfilePage`, `CreativeWork`, `FAQPage`), dynamic XML sitemap, robots.txt, and Open Graph tags.
- **Accessibility & Performance**: Full keyboard navigation, `prefers-reduced-motion` compliance across all effects, and 60fps GPU-accelerated transforms.

---

## Project Structure

```
porto-v2/
├── md/                         # Design system, PRD, Rules & Task tracker
│   ├── DESIGN.md               # Visual design system & token definitions
│   ├── PRD.md                  # Product requirements & specifications
│   ├── RULES.md                # Strict TypeScript & Svelte 5 standards
│   └── TASKS.md                # Implementation milestones tracker
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── common/         # Shell, Docks, Buttons, SEO, Effects
│   │   │   └── features/       # Avatar, Hero, About, Skills, Projects, Experience, FAQ, Contact
│   │   ├── data/               # Single source of truth for portfolio content
│   │   │   ├── profile.ts      # Bio, links, and resume path
│   │   │   ├── about.ts        # Markdown content for VSCode tabs
│   │   │   ├── education.ts    # Education credentials
│   │   │   ├── skills.ts       # Toolchain & stack icons
│   │   │   ├── projects.ts     # Featured deployments
│   │   │   ├── experience.ts   # Career history
│   │   │   └── faq.ts          # Frequently asked questions
│   │   ├── schemas/            # Zod validation schemas
│   │   ├── server/             # Resend API integration
│   │   └── utils/              # Motion helpers, cn utility, site config
│   └── routes/
│       ├── +layout.svelte      # Root layout & mode-watcher setup
│       ├── +page.svelte        # Single-page portfolio composition
│       ├── +page.server.ts     # Form actions & contact handler
│       ├── layout.css          # Semantic CSS tokens & utility classes
│       └── sitemap.xml/        # Dynamic XML sitemap generator
└── static/
    ├── cv/                     # Resume / CV PDF storage
    └── img/                    # Static assets & OG images
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (or pnpm / bun)

### Installation

```bash
# Clone the repository
git clone https://github.com/afriansyogs/porto-v2.git
cd porto-v2

# Install dependencies
npm install
```

### Environment Configuration

Copy `.env.example` to `.env` and provide your credentials:

```bash
cp .env.example .env
```

| Variable                 | Description                                        | Default / Example        |
| ------------------------ | -------------------------------------------------- | ------------------------ |
| `RESEND_API_KEY`         | API Key from [Resend](https://resend.com/api-keys) | `re_123...`              |
| `CONTACT_RECEIVER_EMAIL` | Inbox email where contact messages arrive          | `afriansyoga@gmail.com`  |
| `CONTACT_SENDER_EMAIL`   | Verified sender email in Resend                    | `onboarding@resend.dev`  |
| `PUBLIC_SITE_URL`        | Public site domain for SEO & canonical URLs        | `https://yourdomain.com` |

---

## Available Scripts

| Command           | Description                                               |
| ----------------- | --------------------------------------------------------- |
| `npm run dev`     | Starts Vite development server at `http://localhost:5173` |
| `npm run build`   | Compiles production-ready bundle                          |
| `npm run preview` | Locally serves the production build                       |
| `npm run check`   | Runs Svelte diagnostic compiler & TypeScript verification |
| `npm run lint`    | Runs Prettier format checks and ESLint verification       |
| `npm run format`  | Auto-formats code with Prettier and Tailwind plugins      |

---

## Content Customization

Per the project design guidelines, all personal data, copywriting, and projects are centralized in `src/lib/data/`. To personalize the portfolio:

1. **Profile & Socials**: Edit `src/lib/data/profile.ts`
2. **Resume / CV**: Place your PDF file in `static/cv/placeholder.pdf`
3. **About & Education**: Edit markdown strings in `src/lib/data/about.ts` and `src/lib/data/education.ts`
4. **Skills**: Add or update tools in `src/lib/data/skills.ts`
5. **Projects**: Edit entries in `src/lib/data/projects.ts`
6. **Career History**: Edit timeline items in `src/lib/data/experience.ts`
7. **FAQ**: Update questions and answers in `src/lib/data/faq.ts`

---

## Quality Gates & Verification

- **TypeScript**: Strict mode with zero `any` policy.
- **Svelte 5**: Modern runes (`$state`, `$derived`, `$props`) with zero legacy Svelte 3/4 syntax.
- **Performance**: High frame rate scrolling, deferred canvas/rAF updates, zero unconstrained image dimensions.
- **Accessibility**: WCAG contrast compliant, keyboard accessible tabs and accordions, `prefers-reduced-motion` enabled.

---

## License

MIT © [Afrians Yoga](https://github.com/afriansyogs)
