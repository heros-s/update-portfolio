# PJT6 - Automação de Cálculo de Emissões de Gases do Efeito Estufa (ESG)

## 1. Visão Geral do Projeto

Automação desenvolvida para **calcular a distância percorrida por colaboradores até a sede da empresa**, com foco na geração de insumos para **relatórios de ESG** e governança corporativa.

---

## 2. Problema de Negócio

A empresa precisava iniciar a construção de um relatório ESG, mas:

- O cálculo de deslocamento dos colaboradores nunca havia sido feito
- A empresa possui mais de 150 profissionais
- Calcular manualmente a distância de cada endereço até a sede era inviável
- O processo precisava ser reaproveitável e escalável

---

## 3. Objetivo

Automatizar o cálculo de distância entre:

- Endereço do colaborador
- Endereço da sede da empresa

Garantindo:

- Precisão (trajeto terrestre, não linha reta)
- Facilidade de atualização
- Base confiável para futuras análises ambientais

---

## 4. Solução Desenvolvida

Criação de uma **automação integrada ao Google Sheets**, onde:

- Os dados dos colaboradores são inseridos em uma planilha
- Um script em Apps Script consulta o Google Maps
- A distância real do trajeto é calculada automaticamente
- Um botão na interface permite atualizar os cálculos sempre que a base muda

---

## 5. Tecnologias Utilizadas

- Google Sheets
- JavaScript
- Google Apps Script
- Google Maps (consulta de rotas)

---

## 6. Usuários e Stakeholders

- Head de Governança Corporativa e Compliance (DPO)
- Área de ESG
- Gestão executiva (uso indireto em relatórios)

---

## 7. Impacto Gerado

- Economia significativa de tempo
- Eliminação de erros manuais
- Viabilização do relatório ESG
- Criação de uma base sólida para análises futuras de emissões
- Possibilidade de estimar impactos ambientais do deslocamento diário

---

## 8. Demonstração no Portfólio

No portfólio serão apresentados:

- Print da planilha com dados mockados
- Print do botão de execução da automação
- Print do resultado da coluna de distância preenchida

**Categoria:** Automação / ESG

**Status:** Em produção (exibição com dados mockados)

---

## Mídias recomendadas para este projeto

Para deixar esse projeto bem forte visualmente:

- 📄 1 print da planilha (input de dados)
- 🔘 1 print do botão de execução no Sheets
- 📏 1 print da coluna de distância calculada
- 🧩 (Opcional) 1 diagrama simples explicando o fluxo da automação