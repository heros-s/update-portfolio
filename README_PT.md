# Heros Dinão — Portfolio React

Portfolio técnico de Business Analytics, Automação e Engenharia de Dados. Stack moderno com Next.js, Power BI, n8n e Python.

## Sobre

Transformo processos manuais em sistemas inteligentes. Construo dashboards estratégicos, automações com IA e pipelines de dados que elimnam trabalho repetitivo e apoiam decisões em escala.

**Área de foco:** Automação, BI & FP&A, Data Engineering, People Analytics, FinOps.

## Projetos em Produção

| Projeto | Categoria | Stack | Impacto |
|---------|-----------|-------|---------|
| **Automação de Horas Extras** | Automação | n8n, Slack, JavaScript | ~2h/dia economizadas |
| **Dashboard Financeiro** | BI | Power BI, DAX | Análise 1h30min mais rápida |
| **Pipeline de Mailing** | Data Eng | Python, PostgreSQL, SFTP | 57% mais rápido (+27% eficiência) |
| **Monitoramento de Créditos IA** | FinOps | Looker Studio, Google Sheets | Previsão de esgotamento de créditos |
| **Dashboard eNPS** | People Analytics | Power BI, DAX | Eliminou 200+ slides manuais |
| **Automação ESG** | Automação | Google Apps Script, Google Maps API | 150+ colaboradores em segundos |
| **Web Scraping Salarial** | Data Eng | Python, Selenium, Pandas | 100+ cargos pesquisados automaticamente |

## Stack

**Frontend:** Next.js, React, TypeScript, Tailwind CSS, Framer Motion, next-intl  
**Backend:** API integrations (n8n, Slack, Google, SFTP)  
**BI/Analytics:** Power BI, DAX, Google Sheets, Looker Studio  
**Automação:** n8n, Python, Google Apps Script  
**Data:** PostgreSQL, pandas, ETL  
**Deploy:** Vercel, Google Analytics  

## Estrutura do Projeto

```
portfolio-react/
├── app/
│   ├── [locale]/                    # i18n routing (pt, en)
│   ├── components/                  # Componentes reutilizáveis
│   │   ├── HeroSection.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectPageClient.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── TechStackCarousel.tsx
│   │   └── ...
│   ├── globals.css
│   └── layout.tsx
├── i18n/                            # Configuração i18n
│   ├── routing.ts
│   ├── navigation.ts
│   └── request.ts
├── messages/                        # Traduções
│   ├── pt.json
│   └── en.json
├── conteudo/                        # Documentação dos projetos (brainstorm + site)
└── package.json
```

## Internacionalização (i18n)

Site disponível em **Português (BR)** e **English**.

- Routing dinâmico via `next-intl`
- Mensagens centralizadas em JSON
- Alternância de idioma com flag/rótulo
- Canonical URLs e hreflang tags para SEO

## Design & UX

- **Dark theme** com acentos cyan (`#06B6D4`)
- **Tipografia dinâmica:** animação de typing effect no hero
- **Animações:** ScrollReveal (fade-in), floating cards, particle background
- **Responsivo:** mobile-first, breakpoints md/lg
- **Acessibilidade:** ARIA labels, semantic HTML, focus states

## Dados dos Projetos

Projetos definidos em `app/[locale]/projetos/data/projects.json`:

- **ID, slug, título, subtítulo**
- **Problema, solução, impacto (arrays de strings)**
- **Stack técnica e categorias**
- **Imagens e vídeos (YouTube embeds)**
- **Métricas estruturadas em objetos**
- **Status:** produção, produção-mock, descontinuado

Conteúdo traduzido via chaves i18n: `projects.items.{projectKey}.{field}`

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar dev server
npm run dev

# Build para produção
npm run build
npm start

# Lint
npm run lint
```

Acesse `http://localhost:3000` (redirecionará para `/pt` por padrão). <br>
Link do site hospedado via vercel https://herosdinao.vercel.app

## Deploy

Hospedado em **Vercel** com CI/CD automático do repositório.

- **Domain:** herosdinao.vercel.app
- **Environment:** Node.js 18+, Next.js 16
- **Analytics:** Vercel Analytics + Google Analytics (GA4)

## Contato

Formulário de contato integrado com **Formspree** (`mgolaqyj`).

Links diretos:
- **LinkedIn:** https://www.linkedin.com/in/heros-dinao
- **GitHub:** https://github.com/heros-s
- **WhatsApp:** https://wa.me/5541996664586

## Licença

Não especificada. Portfólio pessoal.

---

**Última atualização:** abril/2026  
**Autor:** Heros Dinão | Business Analytics & Automation
