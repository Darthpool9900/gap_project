# Agent Marketplace on ICP

## Overview (English)

A decentralized marketplace for AI agents on the Internet Computer Protocol (ICP). Users can create, buy, and run agents locally. Each agent is linked to its creator (author) and can be purchased using ICP tokens. The marketplace is fully on-chain, and agent code is available for local execution.

**You can test the application by running the `test_marketplace.sh` script inside the `scripts` folder.**

### Features
- Create and publish AI agents
- Buy agents with ICP tokens
- Local execution of agent code
- Categorization and search
- Manage agent listings (activate/deactivate)
- Purchase history and statistics
- Author is always linked to the agent (ICP principal)

### Architecture
```
Frontend (React/Tauri)
        │
        ▼
ICP Canister (Rust)
        │
        ▼
Local Agent Execution
```

### Project Structure
```
backend/
├── src/backend/src/    # Rust source code
│   ├── lib.rs
│   ├── models.rs
│   └── routes.rs
├── src/backend/backend.did  # Candid interface
├── examples/marketplace_example.py  # Usage example
├── scripts/test_marketplace.sh      # Automated test script
├── README.md
```

### Installation & Usage
- Requires [DFX](https://internetcomputer.org/docs/current/developer-docs/setup/install/) and [Rust](https://rustup.rs/)

```bash
# Clone the repository
git clone <repository-url>
cd backend

# Start DFX
dfx start --background --clean

# Deploy the canister
dfx deploy

# Check canister status
dfx canister status backend
```

### API (Summary)
- `create_agent(CreateAgentRequest) -> MarketplaceResponse`
- `buy_agent(BuyAgentRequest) -> MarketplaceResponse`
- `update_agent(text, CreateAgentRequest) -> MarketplaceResponse`
- `toggle_agent_listing(text) -> MarketplaceResponse`
- `get_agent(text) -> opt Agent`
- `get_all_agents() -> vec Agent`
- `get_agents_by_category(text) -> vec Agent`
- `get_user_agents(text) -> vec Agent`
- `get_agent_listing(text) -> opt AgentListing`
- `get_active_listings() -> vec AgentListing`
- `get_user_purchases(text) -> vec Purchase`
- `marketplace_stats() -> MarketplaceResponse`

### Example Agent (Python)
```python
def translate_text(text, source_lang, target_lang):
    # Agent implementation
    return translated_text
```

---

# Marketplace de Agentes no ICP

## Visão Geral (Português BR)

Um marketplace descentralizado de agentes de IA no Internet Computer Protocol (ICP). Usuários podem criar, comprar e executar agentes localmente. Cada agente é vinculado ao seu criador (autor) e pode ser comprado com ICP. O marketplace é totalmente on-chain e o código do agente fica disponível para execução local.

**Você pode testar o funcionamento da aplicação executando o script `test_marketplace.sh` dentro da pasta `scripts`.**

### Funcionalidades
- Criar e publicar agentes de IA
- Comprar agentes com ICP
- Execução local do código do agente
- Categorização e busca
- Gerenciar listings (ativar/desativar)
- Histórico de compras e estatísticas
- Autor sempre vinculado ao agente (principal do ICP)

### Arquitetura
```
Frontend (React/Tauri)
        │
        ▼
Canister ICP (Rust)
        │
        ▼
Execução Local do Agente
```

### Estrutura do Projeto
```
backend/
├── src/backend/src/    # Código Rust
│   ├── lib.rs
│   ├── models.rs
│   └── routes.rs
├── src/backend/backend.did  # Interface Candid
├── examples/marketplace_example.py  # Exemplo de uso
├── scripts/test_marketplace.sh      # Script de teste automatizado
├── README.md
```

### Instalação & Uso
- Requer [DFX](https://internetcomputer.org/docs/current/developer-docs/setup/install/) e [Rust](https://rustup.rs/)

```bash
# Clone o repositório
git clone <repository-url>
cd backend

# Inicie o DFX
dfx start --background --clean

# Deploy do canister
dfx deploy

# Verifique o status
dfx canister status backend
```

### API (Resumo)
- `create_agent(CreateAgentRequest) -> MarketplaceResponse`
- `buy_agent(BuyAgentRequest) -> MarketplaceResponse`
- `update_agent(text, CreateAgentRequest) -> MarketplaceResponse`
- `toggle_agent_listing(text) -> MarketplaceResponse`
- `get_agent(text) -> opt Agent`
- `get_all_agents() -> vec Agent`
- `get_agents_by_category(text) -> vec Agent`
- `get_user_agents(text) -> vec Agent`
- `get_agent_listing(text) -> opt AgentListing`
- `get_active_listings() -> vec AgentListing`
- `get_user_purchases(text) -> vec Purchase`
- `marketplace_stats() -> MarketplaceResponse`

### Exemplo de Agente (Python)
```python
def translate_text(text, source_lang, target_lang):
    # Implementação do agente
    return translated_text
```

---

## Next Steps / Próximos Passos

- Integration with real ICP payments / Integração com pagamentos reais ICP
- Agent review and rating system / Sistema de avaliações e reviews dos agentes
- Secure sandbox (like Docker containers) for agent execution / Sandbox (similar aos containers do docker) seguro para execução de agentes
- Analytics and performance/consumption metrics for agents / Analytics e métricas de desempenho e consumo dos agentes
- Web frontend to buy agents from anywhere / Frontend web para realizar compra de agentes de qualquer local
- Remote agent execution / Execução remota de agentes

## Contribution
1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/FeatureName`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/FeatureName`)
5. Open a Pull Request

## Contato / Contact
- Email: [victor.legat.cerqueira@gmail.com]
- GitHub: [@brenaki]
- Discord: [@brenaki]

---

**Built for the ICP ecosystem / Feito para o ecossistema ICP**
