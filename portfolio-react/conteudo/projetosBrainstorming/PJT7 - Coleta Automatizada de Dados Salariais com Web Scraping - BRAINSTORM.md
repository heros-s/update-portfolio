# PJT7 - Coleta Automatizada de Dados Salariais com Web Scraping

## 1️⃣ Visão Geral

Este projeto consiste em uma automação desenvolvida para **coleta de médias salariais de mercado** de cargos específicos, com o objetivo de apoiar decisões estratégicas de **RH e gestão financeira**. A solução permitiu comparar salários praticados internamente com a média do mercado brasileiro e definir faixas salariais mais realistas para cargos existentes e futuras vagas.

O foco principal foi **escala e eficiência**: eliminar a necessidade de pesquisas manuais cargo a cargo em um cenário com mais de **100 cargos diferentes**.

---

## 2️⃣ Contexto e Problema

A empresa possuía uma base interna com mais de 100 cargos, entre posições já existentes e novas vagas previstas. Pesquisar manualmente a média salarial de cada cargo em plataformas públicas demandaria muito tempo e esforço operacional.

Era necessário:

- Agilidade na pesquisa salarial
- Padronização dos dados coletados
- Redução de esforço manual
- Apoio à definição de salários competitivos

---

## 3️⃣ Objetivo do Projeto

- Automatizar a coleta de **salário médio de mercado** por cargo
- Gerar uma base estruturada para análise salarial
- Apoiar decisões de abertura de vagas e revisão de remuneração
- Economizar tempo e reduzir risco de distorções salariais

---

## 4️⃣ Stakeholders

- Time de **Recursos Humanos (RH)**
- **Gestão Financeira**
- Lideranças envolvidas na definição de novas vagas

---

## 5️⃣ Fonte de Dados

- Plataforma pública de referência salarial (Glassdoor)
- Pesquisa realizada a partir do **nome do cargo**, retornando a média salarial praticada no mercado brasileiro

---

## 6️⃣ Solução Desenvolvida

Foi desenvolvido um script em **Python** capaz de:

- Ler uma base contendo a lista de cargos
- Realizar buscas automáticas na plataforma de salários
- Extrair o **salário médio** correspondente a cada cargo
- Gerar um arquivo `.CSV` estruturado para análise

Devido ao uso de componentes dinâmicos na página, a solução utilizou **web scraping dinâmico**.

---

## 7️⃣ Tecnologias Utilizadas

- **Python**
- **Selenium** (web scraping dinâmico)
- **Pandas** (tratamento e estruturação dos dados)

---

## 8️⃣ Pipeline Simplificado

1. Leitura da base de cargos
2. Automação da navegação e busca por cargo
3. Extração do salário médio
4. Tratamento e padronização dos valores
5. Geração de arquivo `.CSV` com:
    - Cargo
    - Salário médio de mercado

---

## 9️⃣ Métricas e Outputs

- Salário médio praticado no mercado por cargo
- Base salarial padronizada para análise comparativa

A visualização dos dados foi feita diretamente em planilha, devido à simplicidade da estrutura (duas colunas).

---

## 🔟 Impacto Gerado

- Economia significativa de tempo operacional
- Redução do risco de abrir vagas com salários fora do padrão de mercado
- Melhoria na taxa de adesão às vagas
- Suporte direto à tomada de decisão de RH e Financeiro

---

## 🧠 Aprendizados Técnicos

- Primeiro contato prático com **web scraping**
- Uso de **Selenium** para lidar com páginas dinâmicas
- Estruturação e tratamento de dados coletados automaticamente
- Entendimento de limitações técnicas de fontes externas

---

## ✅ Considerações

O projeto foi executado sob demanda, principalmente em momentos de revisão salarial e abertura de novas vagas. Para apresentação em portfólio, os dados exibidos são **mockados**, preservando informações sensíveis.