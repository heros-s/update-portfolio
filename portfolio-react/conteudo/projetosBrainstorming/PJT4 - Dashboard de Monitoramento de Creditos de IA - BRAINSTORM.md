# PJT4 - Dashboard de Monitoramento de Créditos de IA

## 1️⃣ Visão Geral do Projeto

### **Título:**

Dashboard de Monitoramento de Créditos de IA (BI & FinOps)

### **Contexto:**

Dashboard desenvolvido para a **diretoria, CEO e equipe de Inteligência Corporativa**, com o objetivo de monitorar o consumo de créditos de uma plataforma corporativa de modelos de IA, uma plataforma **Credit-based**.

Antes da solução, **não existia qualquer controle estruturado** sobre o uso dos créditos, o que gerava riscos financeiros e falta de visibilidade estratégica.

---

## 2️⃣ Problema de Negócio

- Ausência total de visibilidade sobre:
    - Quem estava consumindo créditos
    - Quanto cada área consumia
    - Se o consumo estava trazendo retorno real
- Ocorrência de **picos inesperados de consumo**, sem explicação clara
- Risco de **esgotamento prematuro dos créditos**, impactando operações críticas
- Dificuldade da alta gestão em tomar decisões preventivas

---

## 3️⃣ Objetivo da Solução

Criar um dashboard que permitisse:

- **Prever em quantas semanas os créditos seriam esgotados**
- Monitorar o consumo de créditos ao longo do tempo
- Identificar consumo por **profissional** e **setor**
- Calcular a **média semanal de consumo**
- Apoiar decisões estratégicas sobre uso e investimento em IA

---

## 4️⃣ Público-Alvo

- CEO
- Diretoria
- Time de Inteligência Corporativa

Dashboard pensado para **alta gestão**, com foco em clareza, objetividade e tomada de decisão rápida.

---

## 5️⃣ Fonte de Dados & Modelagem

**Fonte de dados:**

- Arquivo `.CSV` enviado semanalmente pelo fornecedor da plataforma de IA

**Tratamento dos dados:**

- Limpeza e padronização das informações de consumo
- Extração de:
    - Nome do usuário
    - E-mail de acesso
    - Créditos consumidos
- Criação de uma **tabela auxiliar (oculta)** para realizar um *de-para* entre usuários e seus respectivos setores
- Relacionamento entre:
    - Consumo por colaborador
    - Estrutura organizacional (setores)

Atualização **manual semanal**, escolhida propositalmente por simplicidade e baixo custo operacional.

---

## 6️⃣ Principais Métricas & Indicadores

- **Projeção de esgotamento dos créditos**
    - Estimativa de quantas semanas restam com base no ritmo atual

> 🎯 Cereja do bolo: cálculo de previsão de término dos créditos, permitindo ação preventiva da gestão.
> 
- Consumo total de créditos
- Consumo ao longo das semanas
- Consumo médio semanal
- Consumo por:
    - Profissional
    - Área / setor

---

## 7️⃣ Ferramentas & Stack

- Looker Studio (visualização)
- Google Sheets (tratamento, modelagem e relacionamento de dados)

---

## 8️⃣ Diferenciais do Projeto

- Introdução de **FinOps aplicado a IA**, tema emergente
- Visibilidade completa sobre consumo de modelos de IA
- Apoio direto à governança e controle financeiro
- Dashboard moderno, minimalista e focado em decisão
- Projeto criado poucas semanas após adoção da plataforma, evitando problemas futuros

---

## 9️⃣ Impacto Gerado

- Redução de riscos financeiros relacionados ao consumo descontrolado
- Capacidade de identificar rapidamente usos indevidos ou ineficientes
- Apoio à avaliação de ROI do uso de IA por área
- Feedback positivo sobre visual e clareza do dashboard

---

## 🔐 Demonstração no Portfólio

- Versão com **dados 100% fictícios**
- Possibilidade de exibir:
    - Prints do dashboard
    - Vídeo curto navegando pelas métricas
- Sem restrições de confidencialidade

---

## 🧭 Posicionamento no Portfólio

- Categoria: **Business Intelligence & FinOps**
- Ênfase em:
    - Governança de IA
    - Análise estratégica
    - Controle de custos
- Hierarquia:
    - Abaixo do Dashboard Financeiro Estratégico
    - Acima da Pipeline de Dados Automatizada
    - Tema forte por ser **atual e relevante no mercado**

---

## 🛜 O que vai para o site vs Notion

### ✅ Vai para o site

- Visão geral
- Problema
- Solução
- Métricas principais
- Impacto
- Stack
- Prints / vídeo

### 🧠 Fica no Notion

- Detalhe de modelagem
- Decisões técnicas (manual vs automático)
- Bastidores do projeto