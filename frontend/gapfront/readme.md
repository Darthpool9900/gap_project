
# 📘 Documentação Técnica do Projeto

## 📑 Sumário

- [🧩 Components](#components)
- [🧱 Layouts](#layouts)
- [🔗 Services/Chain](#serviceschain)
- [📄 Views](#views)
- [🖥️ Tauri Backend (Rust)](#tauri-backend-rust)

---

## 🧩 Components

### `AddButn.tsx`
**Path:** `src/components/butttons/AddButn.tsx`

- **Componente:** `AddBtn`
- **Props:**
```ts
onPress?: MouseEventHandler
```
- **Imports:**
```ts
import { MouseEventHandler } from "react";
import { Plus } from "phosphor-react";
```
📝 _Botão com ícone de adição. Usado para criar ou adicionar itens._

---

### `DefaultBtn.tsx`
**Path:** `src/components/butttons/DefaultBtn.tsx`

- **Componente:** `DefaultBtn`
- **Props:**
```ts
value: string
onPress?: React.MouseEventHandler
```
📝 _Botão genérico com rótulo. Componente reutilizável para ações diversas._

---

### `ProfileCard.tsx`
**Path:** `src/components/cards/ProfileCard.tsx`

- **Componente:** `ProfileCard`
- **Imports:**
```ts
import { UserCircle } from "phosphor-react";
import React, { useState, useEffect } from "react";
```
- **Hooks:** `useState`, `useEffect`  
✅ JSX Render Detectado  
📝 _Exibe um cartão com dados do perfil do usuário._

---

### `UserAiCards.tsx`
**Path:** `src/components/cards/UserAiCards.tsx`

- **Componente:** `GeneralCards`
- **Props:**
```ts
name: string;
desc: string;
price: number; // valor em ICP (ex: 1.23)
url?: string;  // será usada como code na rota
```
- **Imports:**
```ts
import { useNavigate } from "react-router-dom";
import DefaultBtn from "../butttons/DefaultBtn";
import { Robot } from "phosphor-react";
```
- **Hooks:** `useNavigate`  
📝 _Cartão interativo com botão para acessar detalhes de um "Agent"._

---

### `DefaultInput.tsx`
**Path:** `src/components/inputs/DefaultInput.tsx`

- **Componente:** `DefaultInput`
- **Props:**
```ts
type: string;
Value: string;
onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
placeholder?: string;
```
📝 _Input controlado, genérico, com suporte a placeholders e eventos._

---

## 🧱 Layouts

### `layout.tsx`
**Path:** `src/layouts/layout.tsx`

- **Componente:** `Layout`
- **Imports:**
```ts
import React from "react";
import { Outlet, Link } from "react-router-dom";
import ProfileCard from "../components/cards/ProfileCard";
```
- **Hooks:** `user_chats`  
✅ JSX Render Detectado  
📝 _Define a estrutura principal da aplicação, incluindo barra de navegação e renderização de conteúdo via rotas._

---

## 🔗 Services/Chain

### `service.ts`
**Path:** `src/services/chain/service.ts`

- **Elemento:** `CANISTER_ID`
- **Imports:**
```ts
import { IDL } from '@dfinity/candid'
```
📝 _Contém definições de IDL e configuração de comunicação com o Canister no Internet Computer._

---

## 📄 Views

### `agents_page/page.tsx`
**Path:** `src/views/agents_page/page.tsx`

- **Componente:** `AgentsPage`
- **Hooks:** `useEffect`, `useState`  
📝 _Página que lista agentes existentes disponíveis para interação._

---

### `chat/page.tsx`
**Path:** `src/views/chat/page.tsx`

- **Componente:** `ChatPage`
- **Hooks:** `useParams`, `useEffect`, `useState`  
📝 _Página de chat com agente específico, capturando `agent_code` pela URL._

---

### `chats_page/page.tsx`
**Path:** `src/views/chats_page/page.tsx`

- **Componente:** `ChatsPage`  
📝 _Página que lista os chats iniciados pelo usuário. Renderiza uma lista interativa com navegação._

---

### `create_agent/add_host/page.tsx`
**Path:** `src/views/create_agent/add_host/page.tsx`

📝 _Etapa do fluxo de criação de um agente. Permite adicionar o host (identificador de onde será executado)._

---

### `create_agent/add_image/page.tsx`
**Path:** `src/views/create_agent/add_image/page.tsx`

📝 _Etapa para adicionar imagem personalizada ao agente._

---

### `create_agent/new_agent/page.tsx`
**Path:** `src/views/create_agent/new_agent/page.tsx`

📝 _Formulário para configurar um novo agente com nome, descrição e parâmetros._

---

### `create_agent/security/page.tsx`
**Path:** `src/views/create_agent/security/page.tsx`

📝 _Etapa de configuração de segurança para o agente criado._

---

### `home/page.tsx`
**Path:** `src/views/home/page.tsx`

📝 _Página inicial do app. Provavelmente exibe informações gerais, destaques ou dashboard._

---

## 🖥️ Tauri Backend (Rust)
**Path:** `src-tauri/src/main.rs`

Este arquivo contém a lógica de backend da aplicação Tauri, escrita em Rust. Ele expõe uma função ao frontend via #[tauri::command] e é responsável por executar código Python dinamicamente com base no input do usuário.

* Recebe dois parâmetros do frontend:

    - code: código Python como string

    - message: argumento de entrada para o script

* Cria um arquivo temporário .py com o código recebido.

* Executa o script Python com std::process::Command

* Retorna a saída ou erro da execução para o frontend.

* Faz logging completo usando o crate log.

✅ _Segurança e isolamento: O código é executado em um ambiente isolado via arquivo temporário._

---

## 📁 Localização dos arquivos temporários

Os arquivos Python gerados são salvos em:
```rust
std::env::temp_dir().join("my_tauri_agents")
```
---
## 🛡️ Observações de segurança
* A execução dinâmica de código pode representar riscos.

* É altamente recomendado implementar validação/sandbox para código recebido.

---

# 📘 Technical Project Documentation

## 📑 Summary

- [🧩 Components](#components)
- [🧱 Layouts](#layouts)
- [🔗Services/Chain](#serviceschain)
- [📄 Views](#views)
- [🖥️ Tauri Backend (Rust)](#tauri-backend-rust)

---

## 🧩 Components

### `AddButn.tsx`
**Path:** `src/components/butttons/AddButn.tsx`

- **Component:** `AddBtn`
- **Props:**
```ts
onPress?: MouseEventHandler
```
- **Imports:**
```ts
import { MouseEventHandler } from "react";
import { Plus } from "phosphor-react";
```
📝 _Button with a plus icon. Used to create or add items._

---

### `DefaultBtn.tsx`
**Path:** `src/components/buttons/DefaultBtn.tsx`

- **Component:** `DefaultBtn`
- **Props:**
```ts
value: string
onPress?: React.MouseEventHandler
```
📝 _Generic button with a label. Reusable component for various actions._

---

### `ProfileCard.tsx`
**Path:** `src/components/cards/ProfileCard.tsx`

- **Component:** `ProfileCard`
- **Imports:**
```ts
import { UserCircle } from "phosphor-react";
import React, { useState, useEffect } from "react";
```
- **Hooks:** `useState`, `useEffect`
✅ JSX Render Detected
📝 _Displays a card with user profile data._

---

### `UserAiCards.tsx`
**Path:** `src/components/cards/UserAiCards.tsx`

- **Component:** `GeneralCards`
- **Props:**
```ts
name: string;
desc: string;
price: number; // value in ICP (e.g., 1.23)
url?: string; // will be used as code in the route
```
- **Imports:**
```ts
import { useNavigate } from "react-router-dom";
import DefaultBtn from "../buttons/DefaultBtn";
import { Robot } from "phosphor-react";
```
- **Hooks:** `useNavigate`
📝 _Interactive card with button to access details of an "Agent"._

---

### `DefaultInput.tsx`
**Path:** `src/components/inputs/DefaultInput.tsx`

- **Component:** `DefaultInput`
- **Props:**
```ts
type: string;
Value: string;
onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
placeholder?: string;
```
📝 _Controlled, generic input, with support for placeholders and events._

---

## 🧱 Layouts

### `layout.tsx`
**Path:** `src/layouts/layout.tsx`

- **Component:** `Layout`
- **Imports:**
```ts
import React from "react";
import { Outlet, Link } from "react-router-dom";
import ProfileCard from "../components/cards/ProfileCard";
```
- **Hooks:** `user_chats`
✅ JSX Render Detected
📝 _Defines the main structure of the application, including the navigation bar and content rendering via routes._

---

## 🔗 Services/Chain

### `service.ts`
**Path:** `src/services/chain/service.ts`

- **Element:** `CANISTER_ID`
- **Imports:**
```ts
import { IDL } from '@dfinity/candid'
```
📝 _Contains IDL definitions and configuration for communicating with the Canister on the Internet Computer._

---

## 📄 Views

### `agents_page/page.tsx`
**Path:** `src/views/agents_page/page.tsx`

- **Component:** `AgentsPage`
- **Hooks:** `useEffect`, `useState`
📝 _Page that lists existing agents available for interaction._

---

### `chat/page.tsx`
**Path:** `src/views/chat/page.tsx`

- **Component:** `ChatPage`
- **Hooks:** `useParams`, `useEffect`, `useState`
📝 _Chat page with a specific agent, capturing `agent_code` via URL._

---

### `chats_page/page.tsx`
**Path:** `src/views/chats_page/page.tsx`

- **Component:** `ChatsPage`
📝 _Page that lists chats initiated by the user. Renders an interactive list with navigation._

---

### `create_agent/add_host/page.tsx`
**Path:** `src/views/create_agent/add_host/page.tsx`

📝 _Step in the agent creation flow. Allows you to add the host (identifier from where it will be executed).

---

### `create_agent/add_image/page.tsx`
**Path:** `src/views/create_agent/add_image/page.tsx`

📝 _Step to add a custom image to the agent.

---

### `create_agent/new_agent/page.tsx`
**Path:** `src/views/create_agent/new_agent/page.tsx`

📝 _Form to configure a new agent with a name, description, and parameters.

---

### `create_agent/security/page.tsx`
**Path:** `src/views/create_agent/security/page.tsx`

📝 _Step to configure security for the agent created._

---

### `home/page.tsx`
**Path:** `src/views/home/page.tsx`

📝 _App home page. Probably displays general information, highlights, or a dashboard._

---

## 🖥️ Tauri Backend (Rust)
**Path:** `src-tauri/src/main.rs`

This file contains the backend logic of the Tauri application, written in Rust. It exposes a function to the frontend via #[tauri::command] and is responsible for dynamically executing Python code based on user input.

* Receives two parameters from the frontend:

- code: Python code as a string

- message: input argument for the script

* Creates a temporary .py file with the received code.

* Executes the Python script with std::process::Command

* Returns execution output or errors to the frontend.

* Performs full logging using the crate log.

✅ _Security and isolation: The code runs in an isolated environment via a temporary file._

---

## 📁 Location of temporary files

The generated Python files are saved in:
```rust
std::env::temp_dir().join("my_tauri_agents")
```
---
## 🛡️ Security Notes
* Dynamic code execution can pose risks.

* It is highly recommended to implement validation/sandboxing for incoming code.

---
