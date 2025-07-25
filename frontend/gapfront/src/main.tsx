import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./views/home/page";
import Layout from "./layouts/layout";
import AgentsPage from "./views/agents_page/page";
import ChatsPage from "./views/chats_page/page";
import AddHostPage from "./views/create_agent/add_host/page";
import NewAgentAdd from "./views/create_agent/new_agent/page";
import AddImagePage from "./views/create_agent/add_image/page";
import InjectPhase from "./views/create_agent/security/page";
import ChatAgentPage from "./views/chat/page";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route index element={<App />} />
        <Route element={<Layout/>}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/agents_user" element={<AgentsPage/>} />
        <Route path="/user_chats" element={<ChatsPage />} />
        <Route path="/create_agent" element={<AddHostPage />} />
        <Route path="/create_agent/new_agent" element={<NewAgentAdd />} />
        <Route path="/create_agent/add_image" element={<AddImagePage />} />
        <Route path="/create_agent/security" element={<InjectPhase />} />
        <Route path="/agent_page" element={<HomePage />} />
        <Route path="/chat/:code" element={<ChatAgentPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
