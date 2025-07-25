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
