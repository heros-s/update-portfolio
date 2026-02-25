# PJT5 - Dashboard de Experiência do Colaborador (eNPS)

## 1️⃣ Visão Geral do Projeto

### **Título:**

Dashboard de Experiência do Colaborador (eNPS & People Analytics)

### **Contexto:**

Dashboard desenvolvido para apoiar o **RH e a diretoria** na análise dos resultados da pesquisa de clima organizacional (eNPS), substituindo um processo manual extremamente trabalhoso por uma solução analítica, dinâmica e escalável.

O projeto foi criado para **apresentação dos resultados à alta gestão**, mas passou a ser utilizado continuamente como ferramenta de apoio à tomada de decisão.

---

## 2️⃣ Problema de Negócio

Antes da solução:

- A análise era feita de forma **manual e exaustiva**
- A cada pesquisa:
    - Extração de um relatório `.CSV` da plataforma de HXM
    - Criação manual de gráficos
    - Captura de prints
    - Elaboração de uma apresentação com **mais de 200 slides**
- Processo altamente:
    - Demorado
    - Repetitivo
    - Propenso a erros
- Métricas só eram analisadas **pontualmente**, no momento da apresentação

Além disso:

- Pouca flexibilidade para análises mais profundas
- Dificuldade em identificar padrões, tendências e oportunidades de melhoria

---

## 3️⃣ Objetivo da Solução

Criar um dashboard que permitisse:

- Analisar a **satisfação geral dos colaboradores**
- Comparar resultados entre pesquisas
- Identificar **oportunidades de melhoria** por área, pilar e liderança
- Apoiar ações preventivas para reduzir **risco de turnover**
- Reduzir drasticamente o esforço operacional do RH

---

## 4️⃣ Público-Alvo

- Profissionais de RH
- Diretoria
- Lideranças da empresa

Dashboard pensado para:

- Análises estratégicas
- Apresentações executivas
- Uso contínuo entre uma pesquisa e outra

---

## 5️⃣ Fonte de Dados & Modelagem

**Fonte principal:**

- Relatório `.CSV` extraído da plataforma de gestão de pessoas (HXM)

**Periodicidade:**

- Pesquisa quadrimestral

**Tratamento e modelagem:**

- Consolidação histórica de todas as pesquisas
- Criação de colunas calculadas para:
    - Identificação do quadrimestre da pesquisa
    - Classificação de favorabilidade via range através da nota (favorável, neutro, desfavorável)
- Conversão das notas (1 a 5) para escala alinhada ao padrão utilizado pelo CEO
- Relacionamento com base externa de liderança (coordenadores e heads por setor), permitindo análises por liderança mesmo com pesquisa anônima
- Tratamento de *stop words* para higienização da **word cloud** de comentários:

---

## 6️⃣ Principais Métricas & Análises

### Cards principais

- Nota média geral da empresa
- Atingimento de meta por setor
- Evolução percentual em relação à pesquisa anterior
- Quantidade de respondentes
- Quantidade de comentários
- Percentual de respostas favoráveis, neutras e desfavoráveis

### Filtros globais

- Quadrimestre
- Departamento
- Pilar (categoria da pergunta)
- Favorabilidade

### Visualizações

- Tabela expansível:
    - Pilar → perguntas → nota média
- Gráfico de barras:
    - Distribuição de favorabilidade por pilar
- Gráfico de rosca:
    - Favoráveis x neutras x desfavoráveis
- Gráfico de linhas:
    - Evolução quadrimestral
    - Parâmetro de filtro para alternar entre nota média ou % de favoráveis
- Análises comparativas:
    - Departamento vs pesquisas anteriores
    - Pilar vs pesquisas anteriores
- Análise por liderança:
    - Gestores (coordenadores)
    - Heads
- Deep dive dos comentários:
    - Tabela com departamento, pergunta, comentário e favorabilidade
    - Contagem dinâmica de comentários por tipo
    - Word cloud dinâmica

---

## 7️⃣ Ferramentas & Stack

- Power BI
- CSV (plataforma HXM)
- Base externa de liderança (relacionamento)

---

## 8️⃣ Desafios Técnicos

- Criação de colunas calculadas para:
    - Quadrimestre
    - Favorabilidade
- Comparações entre pesquisas com intervalos irregulares
- Medidas DAX para evolução histórica
- Implementação da word cloud com tratamento de stop words

---

## 9️⃣ Impacto Gerado

- Redução drástica do tempo gasto pelo RH na preparação das análises
- Eliminação da necessidade de apresentações extensas e manuais
- Maior clareza e objetividade na leitura dos resultados
- Possibilidade de análises contínuas, não apenas pontuais
- Geração de novos insights antes inexistentes

---

## 🔐 Demonstração no Portfólio

- Versão com **dados 100% fictícios**
- Exibição de:
    - Prints do dashboard
    - Vídeo curto navegando pelas análises
- Sem restrições de confidencialidade

---

## 🧭 Posicionamento no Portfólio

- Categoria: **Business Intelligence & People Analytics**
- Ênfase em:
    - Experiência do colaborador
    - Análise estratégica de clima organizacional
- Hierarquia:
    - Abaixo do Dashboard de Créditos de IA
    - Acima da Pipeline de Dados Automatizada

---

## 🛜 O que vai para o site vs Notion

### ✅ Vai para o site

- Problema
- Solução
- Principais métricas
- Visualizações-chave
- Impacto
- Stack
- Prints / vídeo

### 🧠 Fica no Notion

- Detalhes completos de modelagem
- Bastidores técnicos (DAX, lógica de comparação)
- Decisões de design analítico