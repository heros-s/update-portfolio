# DESIGN.md — Revitalização do portfólio

Contrato de design do site. Toda página (home e `/projetos/[slug]`) usa estes tokens, fontes e componentes. Token novo entra aqui antes de entrar no código.

**Direção escolhida: B, "Log de execução"** (27/11/2026). Esboços das três direções: https://claude.ai/artifact/TsV4h14XyEgpWM5KF4Bv7D

---

## 1. Diagnóstico (estado anterior)

Scanner `avoid-ai-design` + leitura dos componentes:

| Sev. | Onde | O que lia como "IA genérica" | Status |
|---|---|---|---|
| P0 | `TechStackCarousel.tsx:58` | Título com gradiente `bg-clip-text` | fase 2 |
| P0 (inferido) | `HeroSection.tsx` | Hero centralizado + typewriter + partículas + 4 cards flutuando | fase 2 |
| P1 | layouts | Geist sem par (fonte padrão do Next) | **resolvido (fase 1)** |
| P1 | `HeroSection`, `Navbar`, `ProjectMedia` | Glassmorphism (`backdrop-blur`) por reflexo | fases 2 e 5 |
| P1 | `AboutSection`, `ProjectProblem` | Borda colorida lateral em todo bloco | fases 4 e 5 |
| P1 | `AboutSection` | Três cards de ícone em quadrado | fase 4 |
| P1 | site todo | Paleta de uma nota: preto + ciano em tudo | tokens prontos (fase 1); ciano sai nas fases 2–5 |
| P1 | `ProjectCard`, `ProjectMedia` | Mesmo `rounded-2xl` + borda em toda superfície | fase 3 |
| P2 | `TechStackCarousel` | Faixa de logos rolando infinita | fase 2 |
| P2 | `ScrollReveal` | Fade-up de 30px em tudo | **resolvido (fase 1)**: 12px, 400ms, curva própria |
| P2 | `AboutSection` | Barra de progresso 87.5% | fase 4 |

O conteúdo é muito específico (300 registros de hora extra, 200+ slides, ciclo de 15–20 min → 7 min, a persona Isadora) e o visual era genérico. A direção B faz o visual falar a língua do trabalho.

---

## 2. Direção: "Log de execução"

**De onde vem:** o trabalho do Heros roda sozinho. São fluxos n8n diários, pipelines horários e agentes no Slack. O artefato nativo desse mundo é o **histórico de execuções**: status, nome do fluxo, quando rodou, quanto tempo levou, o que mudou. O site é o painel de execuções de uma pessoa: cada projeto é um fluxo que rodou e deu certo, e a carreira é um histórico de deploys.

**Ideia de layout em uma frase:** listas densas em linhas (tabela de execuções), separadas por fios finos, com a fonte mono reservada para o que é dado de máquina (status, timestamps, nomes de fluxo, durações) e a sans para o que é texto humano.

**Assinatura (o único lugar onde gastamos ousadia):**
> **O histórico de deploys roda com o scroll.** A seção de trajetória é um painel de log fixo (`position: sticky`, ~250vh). Conforme o visitante rola, as linhas de deploy entram uma a uma (`v1.0 2024-07 Control Desk…` até `v4.0 2026-07 Analista de Inteligência Corporativa I`), com um contador "em execução há X anos e Y meses" que avança junto com o scroll (`motion` `useScroll` → `useTransform`). A última linha fica com o status âmbar `◐ rodando`, porque a carreira está em andamento.

**Motivo secundário (repete com disciplina):** **Antes → depois** em cada execução: o "antes" em cinza riscado e o "depois" em claro, virando via `@number-flow/react` quando a linha entra na tela.

### Guarda contra o clichê "terminal"
- Sem prompt `$`, sem cursor piscando, sem texto digitando, sem verde fósforo, sem scanlines.
- Mono **só** em dado de máquina; nunca em rótulo decorativo nem em CAIXA ALTA.
- Verde só significa sucesso; âmbar só significa "rodando" ou ação. Nenhuma cor é decorativa.
- O título e os textos longos são sans, grandes e humanos.

---

## 3. Tokens (implementados em `app/globals.css`)

Tema único escuro.

| Token | Valor | Papel |
|---|---|---|
| `background` | `#141614` | Chão: grafite com leve tom verde (não é preto puro nem azul-ardósia) |
| `surface` | `#1D201C` | Linha ativa, hover |
| `sunken` | `#0E100E` | Bloco de log (painel da trajetória, detalhes de execução) |
| `foreground` | `#E9E7DF` | Texto |
| `muted-foreground` | `#9A9C94` | Timestamps, legendas, o "antes" (6.5:1 sobre o chão) |
| `border` | `#2C302C` | Fios entre linhas |
| `run` | `#E8A33D` | Âmbar "rodando": links, foco, ação principal, status em andamento |
| `ok` | `#5BC48B` | **Só** status de sucesso |
| `fail` | `#E5675A` | **Só** erro (validação do formulário) |

Classes Tailwind: `bg-background`, `bg-surface`, `bg-sunken`, `text-run`, `text-ok`, `text-fail`, `border-border`, `text-muted-foreground`. Os componentes shadcn herdam por `primary = run`, `ring = run`, `destructive = fail`.

Regras: nenhum gradiente; nenhuma sombra; raio `2px` (`--radius: 0.125rem`); foco = contorno âmbar 2px; seleção de texto = âmbar.

### Tipografia (implementada em `app/layout.tsx`)
| Papel | Fonte | Uso |
|---|---|---|
| Texto humano | **IBM Plex Sans** 400/600/700 (`font-sans`) | Títulos, parágrafos, nomes de projeto |
| Dado de máquina | **IBM Plex Mono** 400/500 (`font-mono`) | Status, timestamps, slugs de fluxo, durações, antes→depois |

As duas famílias vêm da IBM, de documentação técnica: casam por origem, não por moda. Escala (px): 13 / 15 / 17 / 20 / 28 / 44 / 92. Títulos 700 com `letter-spacing: -0.03em`.

### Espaço
Base 4px; seção 72–88px vertical; container `max-w-[1200px] px-10` (mobile `px-4`). Linhas de execução: 18px de padding vertical, fio de 1px entre elas.

---

## 4. Página por página

### Home
1. **Abertura:** linha de status `● ativo · 7 fluxos entregues` (mono, verde só no ponto), título grande "Heros Dinão automatiza o trabalho que ninguém deveria fazer à mão.", subtítulo com a stack real em texto. Ao carregar, os três blocos entram em cascata (60ms), uma vez. **Saem:** partículas, typewriter, cards flutuantes.
2. **Faixa de logos: sai.** A stack aparece dentro de cada execução.
3. **Execuções (projetos):** tabela de linhas `status · fluxo · antes → depois · frequência`. Nome do fluxo em mono (`aprovacao-horas-extras`) com o título humano ao lado. Filtros `ToggleGroup` com rótulo `filtro:` em mono; a lista reordena com **AutoAnimate**. Hover = fundo `surface`. Mobile: cada linha vira bloco empilhado.
4. **Histórico de deploys (assinatura):** painel fixo descrito acima; os diferenciais ("visão de negócio antes de código" etc.) aparecem como notas de commit em sans abaixo de cada deploy. Formação = linha final `▸ próximo deploy: Sistemas de Informação, 8º semestre`.
5. **Contato:** "Abrir chamado" como metáfora leve: formulário shadcn (`Field`/`Input`/`Textarea`) em bloco `sunken`, mensagem de sucesso como uma execução `● sucesso · resposta em até 24h`. Mantém Formspree e validações (erros em `fail`).
6. **Rodapé:** uma linha: `uptime desde jul/2024` · LinkedIn · GitHub · PT/EN.

### Página de case (`/projetos/[slug]`) = detalhe de execução
Estrutura como a tela de uma execução do n8n: cabeçalho com status, slug, frequência e stack; depois os **nós** em sequência: `Contexto → Problema → Solução → Impacto → Aprendizados`, cada um um bloco com o nome do nó em mono e o texto em sans.
- Barra fina de progresso de leitura em `run` (`@motion-primitives/scroll-progress`).
- Problema: números do antes em cinza; ao rolar, ganham o risco e o depois entra (NumberFlow).
- **Antes simulado (ver §6):** comparação antes/depois com `@motion-primitives/image-comparison`.
- Mídia em moldura `sunken` com legenda mono. Sem glassmorphism.
- Fim: "próxima execução" com o nome e o antes→depois do próximo case.

---

## 5. Sistema de movimento

**Regra: movimento só onde ele carrega informação.** Implementado na fase 1: `MotionProvider` (`reducedMotion="user"`) no layout e `ScrollReveal` padronizado. Regra da fase 6: nada acima da dobra começa invisível (título e subtítulo da abertura são o LCP). `framer-motion` foi removido; tudo importa de `motion/react`.

| Uso | Ferramenta | Spec |
|---|---|---|
| Entrada padrão de bloco | `ScrollReveal` (`motion`, `whileInView`, `once`) | opacidade + `y` 12px, 400ms, `cubic-bezier(0.2, 0, 0, 1)` |
| Cascata da abertura | `motion` `staggerChildren` | 60ms entre blocos, só no carregamento |
| Histórico de deploys | `motion` `useScroll` + `useTransform` | linhas entram por faixa de progresso; contador de tempo atrelado ao scroll |
| Antes → depois | `@number-flow/react` | dispara ao entrar na tela |
| Lista filtrada | `@formkit/auto-animate` | no `<ul>` das execuções |
| Status "rodando" | CSS | pulso de opacidade lento (2s) **só** no ponto âmbar; parado com reduced-motion |
| Troca de página | nenhuma | `PageTransition` removido na fase 6: deixava a página invisível até hidratar e atrasava o LCP |

Com `prefers-reduced-motion`: sem deslocamento, o log da trajetória aparece completo, os números aparecem no valor final.

---

## 6. "Antes" simulado: regra de honestidade

Não existem prints do processo antigo. O "antes" será **reconstruído** a partir do que cada case descreve, com estas regras:

1. **Sempre rotulado** no cabeçalho do quadro e com nota acima dele: `reconstituição ilustrativa, não é print original`.
2. **Feito em HTML/SVG, não em imagem gerada:** fica nítido, leve, acessível e obviamente esquemático (sem fingir ser uma captura).
3. **Só com fatos do case**, sem inventar número: valores que seriam inventados (nomes, horas, cifras) aparecem tarjados.

| Projeto | Antes reconstruído |
|---|---|
| pjt1 Horas extras | Planilha de ponto com ~300 linhas e colunas "chamado aberto?" preenchidas à mão + lista de DMs de cobrança manual |
| pjt2 Financeiro | Excel bruto: abas soltas, células amarelas de consolidação manual |
| pjt3 Mailing | Checklist manual de um ciclo de 15–20 min (baixar, tratar, subir via SFTP), repetido de hora em hora |
| pjt5 eNPS | Pilha de 200+ slides em miniatura |
| pjt6 ESG | Estimativa genérica de distância × trajeto real do Maps |
| pjt4, pjt7 | Sem comparação (o case não descreve um "antes" visual) |

---

## 7. Bibliotecas: o que usar e o que evitar

| Fonte | Usar | Evitar (e por quê) |
|---|---|---|
| shadcn (Base UI) | `button`, `badge`, `toggle-group`, `sheet` (menu mobile), `field`/`input`/`textarea`/`label`, `tooltip`, `separator` (instalados, já herdam os tokens) | — |
| `motion` | scroll, log, entradas | loops decorativos |
| `@number-flow/react` | antes→depois | contador em número que não é métrica |
| `@formkit/auto-animate` | lista filtrada | — |
| `swapy` | **opcional, fase 6** | usar só pra ter drag |
| Base UI / React Aria | primitivos acessíveis | — |
| `@motion-primitives` | `scroll-progress`, `image-comparison` | `spotlight`, `glow-effect`, `dock`, `text-shimmer`, `text-scramble` (clichê hacker) |
| `@fancy` | nada por enquanto | `text-rotate` (é o typewriter de novo) |
| `@react-bits` | nada | `DecryptedText`, `FuzzyText`, fundos animados: puxam pro clichê terminal |
| `@magicui` / `@aceternity` | nada | `terminal`, marquee, beams, spotlight: os maiores clichês |
| `@cult-ui` / `@skiper-ui` / `@coss` | revisar se faltar algo | — |

Adicionar componente de registry: `npx shadcn@latest add @motion-primitives/scroll-progress`.

---

## 8. Fases de execução

| Fase | Entrega | Status |
|---|---|---|
| **1. Fundação** | Tokens B no `globals.css`, IBM Plex via `next/font` (Geist removida), `framer-motion` → `motion/react`, `MotionProvider` com reduced-motion, `ScrollReveal` e `PageTransition` padronizados | **feito** |
| **2. Abertura + navegação** | Nova abertura; apagar `ParticlesBackground`, `TechStackCarousel`, CSS legado (`animate-scroll`, `animate-float-*`); navbar sólida com `sheet` no mobile; rodapé de uma linha | **feito** |
| **3. Execuções** | Lista em linhas, `ToggleGroup` + AutoAnimate, antes→depois com NumberFlow; campos `fluxo`/`contagem` no `projects.json` + `run` (antes, depois, frequência) nas traduções | **feito** |
| **4. Histórico de deploys** | `Trajetoria.tsx`: painel sticky (300vh, só desktop sem reduced-motion), deploy ativo expandido, contador de tempo atrelado ao scroll, formação como "próximo deploy", princípios em lista abaixo | **feito** |
| **5. Página de case** | `ProjectPageClient`: cabeçalho de execução + metadados, barra de progresso de leitura (própria, com `motion`), mídia com zoom em `Dialog`, nós com rótulo fixo, cadeia de nós para `architecture`/`pipeline`, "próxima execução"; `Reconstrucao.tsx` (§6) para pjt1, 2, 3, 5 e 6. O slider `image-comparison` ficou de fora: a reconstituição é HTML e não há print do antes para comparar | **feito** |
| **6. Contato e acabamento** | Contato em painel `sunken` com `Field`/`Input`/`Textarea` (labels visíveis, erros com `aria-invalid`/`aria-describedby`, `reset` do Formspree no lugar do reload); `lang` por idioma no `<html>`; canonical por idioma; `scroll-margin-top` nas âncoras; LCP corrigido. Lighthouse mobile (localhost): acessibilidade 100/100, performance 73 (home) e 81 (case). Swapy não usado: nenhum lugar pediu drag de verdade | **feito** |

Cada fase fecha com: `npm run build` passando, scanner `avoid-ai-design` sem P0, teste com `prefers-reduced-motion`, revisão em 375px.
