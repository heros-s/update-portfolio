# PJT1 - Automação de Aprovação de Horas Extras com n8n e Slack

## 1. Visão Geral

Projeto de automação desenvolvido para calcular, consolidar e padronizar o controle de horas extras de colaboradores, reduzindo retrabalho manual, erros operacionais e aumentando a confiabilidade das informações para áreas financeiras e de gestão.

O foco principal foi transformar um processo manual e suscetível a falhas em um fluxo automatizado, rastreável e escalável, integrando dados brutos, regras de negócio e disparo de mensagens via RPA.

---

## 2. Problema de Negócio

O processo anterior apresentava:

- Processo **100% manual**, repetitivo e diário
- Risco de **atraso na abertura de chamados**
- Horas extras não contabilizadas corretamente impactavam **bônus e folha de pagamento**
- Baixa escalabilidade e alto custo de tempo para o RH

Isso impactava diretamente o tempo da equipe, a confiabilidade dos números e a tomada de decisão.

---

## 3. Solução Desenvolvida

Foi desenvolvida uma automação utilizando **n8n** que executa diariamente o processo de ponta a ponta:

1. Baixa automática do relatório de horas extras do sistema de ponto
2. Identificação de colaboradores com horas extras registradas
3. Verificação automática se o chamado foi aberto na plataforma de chamados
4. Envio de mensagens diretas no Slack:
    - Para o colaborador, quando o chamado não foi aberto
    - Para o gestor, quando o chamado está pendente de aprovação
5. Lógica de fallback que notifica o responsável técnico caso IDs de usuários não sejam encontrados na base

O robô possui uma persona própria — **Isadora** — comunicando-se de forma clara e padronizada com os envolvidos.

---

## 4. Tecnologias e Ferramentas

- n8n
- Slack
- Plataforma de chamados
- Google Sheets
- JavaScript

*(Ferramentas escolhidas visando rapidez de implementação, confiabilidade e fácil manutenção.)*

---

## 5. Arquitetura da Solução (Resumo)

1. Entrada de dados brutos (apontamento de horas)
2. Tratamento e validação dos dados
3. Aplicação das regras de horas extras
4. Consolidação dos resultados
5. Disparo automático de alertas para o profissional que não registrou HE

---

## 6. Resultados e Impacto

- ⏱️ **Economia média de ~2 horas por dia**
    
    → ~10 horas por semana
    
    → ~40 horas por mês
    
- Eliminação quase total do trabalho manual nesse processo
- RH atuando de forma mais estratégica
- Processo padronizado e com maior confiabilidade

---

## 7. Aprendizados Técnicos

- Desenvolvimento de fluxos de disparo automático de mensagens
- Estruturação de código focada em manutenção

---

## 8. Mídia Recomendada para o Portfólio

- Screenshot da planilha antes da automação
- Screenshot da base final gerada automaticamente
- Diagrama simples do fluxo da automação
- (Opcional) GIF curto mostrando execução do script

---

**Tags:** Automação • n8n • Processos • RPA • Eficiência Operacional

---

[Rascunho (antes de mudar o modelo)](PJT1%20-%20Automa%C3%A7%C3%A3o%20de%20Aprova%C3%A7%C3%A3o%20de%20Horas%20Extras%20com%20/Rascunho%20(antes%20de%20mudar%20o%20modelo)%202f797d2f53da8037bde3c8b8802e91f6.md)