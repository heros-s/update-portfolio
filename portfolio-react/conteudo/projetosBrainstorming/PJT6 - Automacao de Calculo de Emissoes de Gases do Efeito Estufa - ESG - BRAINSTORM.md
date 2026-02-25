# PJT6 - Automação de Cálculo de Emissões de Gases do Efeito Estufa

## 1️⃣ Visão Geral do Projeto

### **Título:**

Automação de Cálculo de Distância para Relatórios de Emissões de Gases do Efeito Estufa (ESG)

### **Contexto:**

Projeto desenvolvido para o **Head de Governança Corporativa e Compliance (DPO)** com o objetivo de apoiar a criação do primeiro relatório de ESG da empresa.

A solução automatiza o cálculo da **distância terrestre** entre o endereço de cada colaborador e a sede da empresa, etapa fundamental para estimativas de emissões relacionadas ao deslocamento dos profissionais.

---

## 2️⃣ Problema de Negócio

- O relatório de ESG estava sendo criado **pela primeira vez**
- A empresa possui **mais de 150 colaboradores**
- Calcular manualmente:
    - A distância do endereço de cada profissional até a sede
    - Considerando **trajeto real**, e não distância em linha reta
        
        seria extremamente:
        
        - Demorado
        - Sujeito a erros
        - Pouco escalável
- A planilha precisava se manter atualizada conforme **novos profissionais fossem adicionados**

---

## 3️⃣ Objetivo da Solução

Criar uma automação que permitisse:

- Calcular automaticamente a distância terrestre entre:
    - Endereço do colaborador
    - Sede da empresa
- Atualizar os cálculos sempre que a base fosse alterada
- Reduzir drasticamente o esforço manual
- Servir como base confiável para análises e reportes de ESG

---

## 4️⃣ Público-Alvo

- Head de Governança Corporativa e Compliance (DPO)

Projeto focado em **reporte estratégico**, não em operação diária.

---

## 5️⃣ Dados de Entrada & Regras de Cálculo

### **Dados utilizados:**

- Nome do colaborador
- Endereço residencial
- Modelo de trabalho (presencial ou híbrido)
- Dias presenciais
- Meio de transporte
- Tipo de combustível

### **Regras:**

- Cálculo da distância deve considerar **trajeto terrestre real**
- Não utilizar distância em linha reta
- Utilização de API do **Google Maps** apenas para cálculo da distância (KM)

---

## 6️⃣ Automação & Funcionamento

- Implementação via **JavaScript no Google Apps Script**
- Código embutido diretamente na planilha do Google Sheets
- Inclusão de um **botão customizado na interface do Sheets**
- Execução manual:
    - Ao clicar no botão, o script recalcula automaticamente as distâncias (inclusive em casos de mudança de endereços)

---

## 7️⃣ Saída da Solução

- Preenchimento automático de uma coluna com:
    - Distância (em KM) entre o endereço do colaborador e a sede da empresa
- Base pronta para:
    - Estimativas de emissões de gases do efeito estufa
    - Consolidação
    - Cálculo médio de deslocamento

---

## 8️⃣ Ferramentas & Stack

- Google Sheets
- JavaScript (via Google Apps Script)
- API do Google Maps (para cálculo de distância)

---

## 9️⃣ Impacto Gerado

- Eliminação de um processo manual inviável
- Redução significativa de tempo operacional
- Padronização dos cálculos
- Viabilização do relatório ESG
- Possibilidade de análises futuras, como:
    - Estimativa média de emissões diárias
    - Avaliação de impacto ambiental do deslocamento dos colaboradores

---

## 🔐 Demonstração no Portfólio

- Projeto exibido com **dados 100% fictícios**
- Possibilidade de mostrar:
    - Código do Apps Script
    - Botão customizado no Sheets
    - Execução da automação
- Sem restrições de confidencialidade

---

## 🧭 Posicionamento no Portfólio

- Categoria: **Automação & ESG**
- Ênfase em:
    - Sustentabilidade
    - Governança
    - Automação de processos analíticos
- Hierarquia:
    - Abaixo do Dashboard de Experiência do Colaborador (eNPS)

---

## 🛜 O que vai para o site vs Notion

### ✅ Vai para o site

- Problema de negócio
- Solução
- Automação (como funciona)
- Impacto
- Stack
- Print / vídeo curto da execução

### 🧠 Fica no Notion

- Detalhes técnicos do Apps Script
- Decisões de design (manual vs automático)
- Bastidores do relatório ESG