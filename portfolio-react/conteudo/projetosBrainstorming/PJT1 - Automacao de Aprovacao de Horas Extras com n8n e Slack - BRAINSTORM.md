# PJT1 - Automação de Aprovação de Horas Extras com n8n e Slack

## 1️⃣ Resumo

Automação que elimina o processo manual de validação de horas extras no RH, analisando relatórios de ponto e acionando automaticamente profissionais e gestores via canal de comunicação interna para abertura e aprovação de chamados na plataforma de chamados da empresa.

---

## 2️⃣ Problema de Negócio (Dor)

O processo de aprovação era realizado manualmente pelo RH, de forma diária.

A profissional responsável precisava:

- Extrair o relatório do ponto
- Filtrar colaboradores com horas extras
- Verificar se o chamado havia sido aberto
- Cobrar os colaboradores individualmente

Com cerca de 300 registros de horas extras por mês, esse processo gerava sobrecarga operacional, alto consumo de tempo e limitava a atuação do RH em atividades mais estratégicas.

---

## 3️⃣ Solução

Desenvolvi um fluxo automatizado no n8n, executando diariamente, que:

- Consome automaticamente o relatório de ponto em CSV
- Identifica colaboradores com horas extras registradas
- Verifica se existe ticket correspondente na plataforma de chamados
- Envia mensagens diretas na plataforma de comunicação interna:
    - Para o colaborador, quando o chamado não foi aberto
    - Para o gestor, quando o chamado existe mas está pendente de aprovação

O fluxo utiliza um usuário específico na plataforma de comunicação, com uma persona própria e com nome, tornando a comunicação mais natural e aumentando a taxa de resposta dos envolvidos.

Lógicas em **Javascript** foram aplicadas para:

- Tratamento e normalização dos dados
- Formatação dinâmica das mensagens
- Ajuste automático de texto conforme quantidade de horas/minutos extras

---

## 4️⃣ Stack / Ferramentas

- n8n
- Javascript
- Google Sheets
- Plataforma de comunicação interna
- Sistema de chamados
- Sistema interno de ponto

---

## 4️⃣ Resultado / Impacto

- **Eliminação de aproximadamente 2 horas diárias** de trabalho manual do RH
- Redução significativa de sobrecarga operacional
- Maior padronização e controle do processo de validação
- Liberação do tempo da profissional de RH para atuação em projetos mais estratégicos

---

## 5️⃣ Mídia

- Vídeo curto demonstrando o funcionamento da automação (ambiente controlado, sem dados sensíveis)

**Fun fact:**

Esse foi o primeiro **projeto de automação com persona** implementado na empresa, utilizando um agente que interage como uma colaboradora real.

---

## 6️⃣ Links

- LinkedIn: post detalhado planejado para publicação futura