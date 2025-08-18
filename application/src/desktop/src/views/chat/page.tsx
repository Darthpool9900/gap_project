import { useState, useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
import { TextInput, PrimaryButton } from "../../components/ui";
import { useParams } from "react-router";

function isURL(str: string): boolean {
  return /^https?:\/\//i.test(str);
}

export default function ChatAgentPage() {
  const { code } = useParams(); // URL ou nome do arquivo
  const [messages, setMessages] = useState([
    { from: "agent", text: "Olá! Sou sua IA, como posso ajudar?", timestamp: new Date() },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (newMessage.trim() === "" || isLoading) return;

    const userMsg = { from: "user", text: newMessage, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setNewMessage("");
    setIsLoading(true);

    try {
      let agentReplyText = "";

      if (code && isURL(code)) {
        // Código é uma URL - chama direto o endpoint do agente
        const response = await fetch(code, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ texto: newMessage, idioma: "inglês" }),
        });
        const data = await response.json();
        agentReplyText = data.traducao || data.reply || "Sem resposta do agente.";
      } else {
        // Código é um arquivo local - usa invoke do Tauri para rodar comando Rust
        agentReplyText = await invoke<string>("run_agent_code", {
          code: code,
          message: newMessage,
        });
      }

      setMessages((prev) => [...prev, { from: "agent", text: agentReplyText, timestamp: new Date() }]);
    } catch (err) {
      console.log(err);
      setMessages((prev) => [
        ...prev,
        { from: "agent", text: "Erro ao se comunicar com o agente.", timestamp: new Date() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Chat com Agente</h1>
            <p className="text-sm text-gray-500">Conectado ao agente: {code}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${
                msg.from === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-900 border border-gray-200"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={`text-xs mt-2 ${
                msg.from === "user" ? "text-blue-100" : "text-gray-400"
              }`}>
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-500">Agente está digitando...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-4">
            <div className="flex-1">
              <TextInput
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                disabled={isLoading}
              />
            </div>
            <PrimaryButton
              onClick={handleSend}
              disabled={isLoading || !newMessage.trim()}
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </PrimaryButton>
          </form>

          <div className="mt-3 text-center">
            <p className="text-xs text-gray-400">
              Use <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+Space</kbd> para abrir o input global
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
