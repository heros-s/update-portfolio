# PJT3 - Pipeline de Dados Automatizada para Campanhas de Mailing

## 1️⃣ Contexto

As campanhas de mailing da empresa eram alimentadas por bases de dados integradas diretamente no banco PostgreSQL, recebidas de clientes parceiros. A partir dessas bases, os mailings eram gerados por meio de queries SQL já estruturadas no layout exigido pelo discador.

Antes da automação, esse processo dependia totalmente da execução manual e recorrente minha e de outros operadores ao longo do dia.

---

## 2️⃣ Problema

O processo manual exigia que, **a cada hora**, alguém:

- executasse queries no banco PostgreSQL
- aguardasse a finalização
- exportasse os resultados em CSV
- importasse os arquivos no discador via SFTP
- garantisse que o mailing correto fosse ativado

Esse fluxo acontecia **das 08:00 às 20:00, de segunda a sábado**, e apresentava vários riscos:

- erro humano (query errada, importação de arquivo na campanha incorreta)
- atrasos na ativação das campanhas
- dependência total de um operador técnico
- alta carga operacional e repetitiva

Além disso, o projeto surgiu em um momento crítico: minha **transição de área**, exigindo uma solução que substituísse completamente a execução humana.

---

## 3️⃣ Objetivo do Projeto

- Automatizar integralmente a geração e ativação dos mailings
- Eliminar dependência humana em um processo crítico
- Garantir consistência, pontualidade e escalabilidade
- Permitir que futuros operadores focassem em atividades estratégicas

---

## 4️⃣ Solução Implementada

Desenvolvi uma **pipeline de dados automatizada**, executada via agendamento horário, que:

1. Executa queries SQL diretamente no PostgreSQL
2. Exporta os resultados em arquivos CSV
3. Nomeia os arquivos dinamicamente com data e hora
    
    *(ex: `mailing_campanha_22-12_10-00.csv`)*
    
4. Envia automaticamente os arquivos para pastas mapeadas via SFTP
5. Ao detectar o arquivo, o discador inicia a campanha de forma automática

O processo roda **de hora em hora**, dentro do intervalo operacional definido.

---

## 5️⃣ Arquitetura do Fluxo (alto nível)

→ PostgreSQL

→ Query SQL

→ Script Python

→ CSV tratado

→ Pasta mapeada via SFTP

→ Discador inicia campanha automaticamente

---

## 6️⃣ Tecnologias Utilizadas

- **Python**
    - `psycopg3` (integração com PostgreSQL)
    - `paramiko` (SFTP)
    - `pandas` (manipulação e exportação de dados)
- **PostgreSQL**
- **SFTP**
- **Agendador de Tarefas do Windows**
- **Excel / CSV**

---

## 7️⃣ Funcionalidades-Chave

- Execução automática de queries SQL
- Geração de múltiplos mailings por execução (segmentação por campanha)
- Tratamento dinâmico de nomes de arquivos
- Exportação automática para pastas específicas por campanha
- Integração direta com o discador via SFTP
- Execução totalmente headless (sem intervenção humana)

---

## 8️⃣ Principais Desafios

- Aprendizado e implementação de integrações Python com:
    - PostgreSQL (`psycopg3`)
    - SFTP (`paramiko`)
- Contorno de limitações internas (GPO)
- Garantir estabilidade e tolerância a falhas de conexão, utilizando fallbacks e tratativas de erro
- Criar uma solução robusta mesmo sem infraestrutura dedicada (rodando em máquina local)

---

## 9️⃣ Impacto Gerado

- Redução do tempo de execução de **15–20 min → ~7 min por ciclo**
- Eliminação total do trabalho manual recorrente
- Menos campanhas paradas
- Menor ociosidade das IAs de robocall
- **Aumento de até 27% na eficiência das campanhas**
- Melhora direta nas taxas de conversão e acordos/base

---

## 🔟 Considerações de Segurança & LGPD

O projeto não manipula dados sensíveis em nível de origem.

Regras de LGPD, opt-in e consentimento acontecem **antes da entrada dos dados no banco**, fora do escopo da automação.

---

## 📝 Demonstração no Portfólio

✔️ Versão com dados fictícios

✔️ Código do script Python

✔️ Processo de agendamento (BAT + Task Scheduler)

✔️ Fluxo completo de execução até o CSV final

🚫 Não será exibida a campanha rodando no discador, por sensibilidade corporativa.

---

## ♟️ Posicionamento do Projeto

**Automação + Engenharia de Dados aplicada a operações críticas**

Este projeto demonstra:

- pensamento sistêmico
- domínio de automação end-to-end
- integração entre dados, infraestrutura e negócio
- foco em impacto real, não apenas técnico