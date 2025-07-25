# Documentação Técnica: Cliente e Servidor de Tradução com Controle Descentralizado para Blockchain

## Visão Geral

Este sistema implementa uma solução de tradução de texto utilizando modelos de linguagem, projetada para funcionar com **controle descentralizado** e integrada a uma blockchain. O serviço é acessado por meio de rotas registradas na cadeia, e somente o proprietário autorizado pode executar ou controlar o serviço.

Há dois componentes principais:

- **Script CLI local** — executado no computador do usuário, normalmente um nó da blockchain, para garantir controle individual e descentralizado.
- **Servidor FastAPI dedicado** — um serviço HTTP que pode ser hospedado em um servidor externo, mas o controle e a autorização permanecem descentralizados via blockchain.

---

## Controle Descentralizado via Blockchain

- **Registro de rota na blockchain:** O endpoint da API é registrado na cadeia, garantindo que a invocação do serviço seja autorizada e auditável.
- **Propriedade exclusiva:** Somente o proprietário da cadeia (ou usuário autorizado via blockchain) pode controlar o acesso ao serviço, mantendo o poder de decisão descentralizado.

- **Segurança e imutabilidade:** O blockchain garante que alterações não autorizadas na rota ou no controle de serviço sejam facilmente detectadas.

---

## Design de Componentes

| Aspecto | Script CLI (Execução Local) | Servidor FastAPI (Servidor Dedicado) |
|--------------------------|--------------------------------------------|------------------------------------------------|
| Execução | Local na máquina do usuário (nó) | Serviço HTTP hospedado remotamente |
| Entrada | Argumento de linha de comando (`sys.argv`) | JSON via HTTP POST |
| Comunicação do Modelo | Chamada HTTP para endpoint registrado na cadeia | Chamada HTTP para o mesmo endpoint via API REST |
| Controle de Serviço | Controlado por execução local autorizada pela cadeia | Controlado por blockchain com acesso descentralizado |
| Automação e Determinismo | Totalmente automatizado, não interativo, reproduzível | Totalmente automatizado, acessível remotamente com autorização da cadeia |

---

## Fluxo de Trabalho Geral

1. A rota do serviço de tradução é registrada na blockchain, vinculada a um proprietário.
2. O proprietário da cadeia configura qual serviço está ativo e pode ser chamado.
3. O script CLI local ou o servidor FastAPI realiza a tradução conforme autorizado pela blockchain.
4. Os prompts e formatos de solicitação são padronizados para garantir auditabilidade e previsibilidade.
5. Os resultados são usados em transações ou contratos inteligentes, garantindo a confiabilidade do sistema.

---

---
# Technical Documentation: Translation Client and Server with Decentralized Control for Blockchain

## Overview

This system implements a text translation solution using language models, designed to work with **decentralized control** and integrated with a blockchain. The service is accessed via routes registered on the chain, and only the authorized owner can execute or control the service.

There are two main components:

- **Local CLI script** — runs on the user's computer, typically a blockchain node, to ensure individual and decentralized control.
- **Dedicated FastAPI server** — an HTTP service that can be hosted on an external server, but control and authorization remain decentralized via the blockchain.

---

## Decentralized Control via Blockchain

- **Route registration on the blockchain:** The API endpoint is registered on-chain, ensuring that service invocation is authorized and auditable.
- **Exclusive ownership:** Only the chain owner (or authorized user via blockchain) can control service access, maintaining decentralized decision power.
- **Security and immutability:** The blockchain guarantees that unauthorized changes to the route or service control are easily detected.

---

## Component Design

| Aspect                   | CLI Script (Local Execution)               | FastAPI Server (Dedicated Server)               |
|--------------------------|--------------------------------------------|------------------------------------------------|
| Execution                | Local on user's machine (node)              | HTTP service hosted remotely                      |
| Input                    | Command line argument (`sys.argv`)          | JSON via HTTP POST                                |
| Model Communication      | HTTP call to endpoint registered on chain  | HTTP call to the same endpoint via REST API      |
| Service Control          | Controlled via local execution authorized by chain | Controlled by blockchain with decentralized access |
| Automation & Determinism | Fully automated, non-interactive, reproducible | Fully automated, remotely accessible with chain authorization |

---

## General Workflow

1. The translation service route is registered on the blockchain, linked to an owner.
2. The chain owner configures which service is active and callable.
3. The local CLI script or the FastAPI server performs translation as authorized by the blockchain.
4. Prompts and request formats are standardized to ensure auditability and predictability.
5. Results are used in transactions or smart contracts, ensuring system trustworthiness.

---
