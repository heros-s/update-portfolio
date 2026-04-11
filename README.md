# Heros Dinão — Portfolio React

Technical portfolio of Business Analytics, Automation and Data Engineering. Modern stack with Next.js, Power BI, n8n and Python.

## About

I transform manual processes into intelligent systems. Building strategic dashboards, AI-powered automations and data pipelines that eliminate repetitive work and support decisions at scale.

Focus areas: Automation, BI & FP&A, Data Engineering, People Analytics, FinOps.

## Projects in Production

| Project | Category | Stack | Impact |
|---------|----------|-------|--------|
| **HR Overtime Automation** | Automation | n8n, Slack, JavaScript | ~2h/day saved |
| **Financial Dashboard** | BI | Power BI, DAX | 1h30min faster analysis |
| **Mailing Data Pipeline** | Data Eng | Python, PostgreSQL, SFTP | 57% faster (+27% efficiency) |
| **AI Credits Monitoring** | FinOps | Looker Studio, Google Sheets | Credit depletion forecast |
| **eNPS Employee Dashboard** | People Analytics | Power BI, DAX | Eliminated 200+ manual slides |
| **ESG Automation** | Automation | Google Apps Script, Google Maps API | 150+ employees in seconds |
| **Salary Benchmarking Scraper** | Data Eng | Python, Selenium, Pandas | 100+ positions researched automatically |

## Tech Stack

Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion, next-intl <br>
Backend: API integrations (n8n, Slack, Google, SFTP) <br>
BI/Analytics: Power BI, DAX, Google Sheets, Looker Studio <br>
Automation: n8n, Python, Google Apps Script <br>
Data: PostgreSQL, pandas, ETL <br>
Deploy: Vercel, Google Analytics <br>

## Project Structure

```
portfolio-react/
├── app/
│   ├── [locale]/                    # i18n routing (pt, en)
│   ├── components/                  # Reusable components
│   │   ├── HeroSection.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectPageClient.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── TechStackCarousel.tsx
│   │   └── ...
│   ├── globals.css
│   └── layout.tsx
├── i18n/                            # i18n configuration
│   ├── routing.ts
│   ├── navigation.ts
│   └── request.ts
├── messages/                        # Translations
│   ├── pt.json
│   └── en.json
├── conteudo/                        # Project documentation
└── package.json
```

## Internationalization

Site available in Portuguese (BR) and English.

Dynamic routing via next-intl
Centralized message translations in JSON
Language switching with flag/label
Canonical URLs and hreflang tags for SEO

## Design & UX

Dark theme with cyan accents (#06B6D4)
Dynamic typography: typing effect animation in hero
Animations: ScrollReveal (fade-in), floating cards, particle background
Responsive: mobile-first, md/lg breakpoints
Accessibility: ARIA labels, semantic HTML, focus states

## Project Data

Projects defined in app/[locale]/projetos/data/projects.json:

ID, slug, title, subtitle
Problem, solution, impact (string arrays)
Tech stack and categories
Images and videos (YouTube embeds)
Structured metrics in objects
Status: production, production-mock, discontinued

Content translated via i18n keys: projects.items.{projectKey}.{field}

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
npm start

# Lint
npm run lint
```

Access http://localhost:3000 (redirects to /pt by default).
Hosted site link via Vercel https://herosdinao.vercel.app

## Deployment

Hosted on Vercel with automatic CI/CD from repository.

Domain: herosdinao.vercel.app
Environment: Node.js 18+, Next.js 16
Analytics: Vercel Analytics + Google Analytics (GA4)

## Contact

Contact form integrated with Formspree (mgolaqyj).

Direct links: <br>
LinkedIn: https://www.linkedin.com/in/heros-dinao <br>
GitHub: https://github.com/heros-s <br>
WhatsApp: https://wa.me/5541987537615 <br>

## License

Not specified. Personal portfolio.

---

Last updated: April 2026
Author: Heros Dinão | Business Analytics & Automation
