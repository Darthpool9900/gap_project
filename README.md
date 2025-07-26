
# 🤖 Decentralized AI Agent Marketplace

## 🧭 Overview

This project is a **decentralized marketplace for AI agents**, allowing developers to publish, users to purchase, and apps to run AI agents in a secure, permissionless way. The core idea is to make AI services composable, transparent, and independent of centralized platforms.

By combining Tauri (for a desktop frontend), Rust backend, and the Internet Computer (IC) for smart contracts, we enable a fully decentralized experience — from user interactions to code execution and agent ownership.

---

## 📦 Project Structure

### 🖥️ Frontend (Tauri + React)
- Built with **Tauri** for a lightweight and secure desktop experience.
- Written in **TypeScript + React**.
- Sends commands to the backend (Rust) via Tauri’s IPC bridge.
- Key feature: code editor, marketplace browser, and wallet connect UI.

### 🔧 Backend (Rust + Python runtime)
- Rust handles IPC requests from the frontend.
- Python code is saved in a temp file and executed with arguments using the local Python runtime.
- Logs are handled via `env_logger`.

```rust
let output = Command::new("python")
    .arg(&temp_filename)
    .arg(&message)
    .output();
```

### ⛓️ Blockchain (Internet Computer - Rust Canister)
- Smart contract (canister) stores:
  - Agents (code, price, metadata)
  - Listings (on sale)
  - Purchases (transactions)
  - Users and agent ownership

- Uses `ic_cdk` APIs and stable `HashMap`s:

```rust
thread_local! {
    static AGENTS: RefCell<HashMap<String, Agent>> = RefCell::new(HashMap::new());
}
```

---

## ✨ Key Features
- 🧠 Upload and run AI agent code dynamically
- 🏪 List agents for sale, buy with ICP, store ownership on-chain
- 📦 Desktop interface (via Tauri)
- ⛓️ Fully decentralized logic (agents stored and transacted on-chain)

---

## 🖼️ Screenshots


- Homepage UI
  
     <img width="589" height="361" alt="image" src="https://github.com/user-attachments/assets/3b2b522f-6362-40a0-8cb7-4fc5833db3e8" />

- Agent upload modal

  <img width="694" height="382" alt="image" src="https://github.com/user-attachments/assets/705b6692-0fd7-4913-b154-f9b4ba6c4282" />

- Agent chat

  <img width="738" height="381" alt="image" src="https://github.com/user-attachments/assets/c2dce2d7-9ba0-4060-a223-3398fa7248bd" />

- MarketPlace

  <img width="694" height="382" alt="image" src="https://github.com/user-attachments/assets/6f427091-c8a5-4f0f-a2c9-01550a2c0d7e" />


---

## 📥 How to Run

```bash
# Install dependencies
npm install && dfx start --background

# Deploy canisters
dfx deploy

# Run Tauri app
npm run tauri dev
```

> Make sure Python is installed and accessible in your system PATH for backend code execution.

---

## 🙋 Motivation

We aim to **democratize access to AI** by making agent execution and ownership open, traceable, and uncensorable. Instead of depending on cloud APIs, users can **run, own, and monetize agents directly** from their machine and the chain.

---
