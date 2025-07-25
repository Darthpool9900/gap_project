## Documentação Técnica: Cliente e Servidor de Tradução com Controle Descentralizado para Blockchain

## Visão Geral

Este sistema implementa uma solução para tradução de texto usando modelos de linguagem, desenhada para funcionar com controle **descentralizado** e integrado a uma blockchain. O serviço é acessado via rotas que estão registradas na chain, e apenas o proprietário autorizado pode executar ou controlar o serviço.

Há dois componentes principais:

**Script CLI local** — execução no computador do usuário, normalmente um node da blockchain, para garantir controle individual e descentralizado.
- **Servidor FastAPI dedicado** — serviço HTTP que pode ser hospedado em servidor externo, porém o controle e a autorização permanecem descentralizados via blockchain.

---

## Controle Descentralizado via Blockchain

- **Registro da rota na blockchain:** O endpoint da API é registrado na chain, garantindo que a invocação do serviço seja autorizada e auditável.
- **Propriedade exclusiva:** Somente o dono da chain (ou usuário autorizado via blockchain) pode controlar quem acessa o serviço, mantendo o poder de decisão descentralizado.
- **Segurança e Imutabilidade:** A blockchain garante que alterações indevidas na rota ou controle do serviço sejam facilmente detectáveis.

---

## Design dos Componentes

| Aspecto                   | CLI Script (Execução Local)                 | Servidor FastAPI (Servidor Dedicado)           |
|--------------------------|--------------------------------------------|------------------------------------------------|
| Execução                 | Local no computador do usuário (node)      | Serviço HTTP hospedado remotamente               |
| Entrada                  | Argumento via linha de comando (`sys.argv`) | JSON via POST HTTP                                |
| Comunicação com Modelo   | Chamada HTTP para endpoint registrado na chain | Chamada HTTP para mesmo endpoint via API REST  |
| Controle do Serviço      | Controlado via execução local autorizada pela chain | Controlado por blockchain, com acesso descentralizado |
| Automação e Determinismo | Total, não-interativo e reproduzível        | Total, acessível remotamente com autorização da chain |

---

## Funcionamento Geral

1. A rota do serviço de tradução está registrada na blockchain, vinculada a um dono.
2. O dono da chain configura qual serviço está ativo e pode ser chamado.
3. O script CLI local ou o servidor FastAPI executa a tradução conforme autorização da blockchain.
4. O prompt e formato das requisições são padronizados para garantir auditabilidade e previsibilidade.
5. Resultados são usados em transações ou contratos inteligentes, garantindo confiança no sistema.

---
