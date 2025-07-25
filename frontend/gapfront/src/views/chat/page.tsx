import { useState, useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
import DefaultInput from "../../components/inputs/DefaultInput";
import DefaultBtn from "../../components/butttons/DefaultBtn";
import { useParams } from "react-router";

function isURL(str: string): boolean {
  return /^https?:\/\//i.test(str);
}

export default function ChatAgentPage() {
  const { code } = useParams(); // URL ou nome do arquivo
  const [messages, setMessages] = useState([
    { from: "agent", text: "Olá! Sou sua IA, como posso ajudar?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (newMessage.trim() === "") return;

    const userMsg = { from: "user", text: newMessage };
    setMessages((prev) => [...prev, userMsg]);
    console.log(code)

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

      setMessages((prev) => [...prev, { from: "agent", text: agentReplyText }]);
    } catch (err) {
        console.log(err)
      setMessages((prev) => [
        ...prev,
        { from: "agent", text: "Erro ao se comunicar com o agente." },
      ]);
    }

    setNewMessage("");
  };

  return (
    <section className="w-full h-full flex flex-col items-center">
      <div className="w-full py-4 px-8 bg-Primary text-white text-xl font-semibold">
        Chat com Agente
      </div>

      <div className="w-5/6 flex-1 overflow-y-auto p-6 flex flex-col gap-4 max-h-[75vh]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[60%] px-4 py-2 drop-shadow-MainText shadow-2xl rounded-xl ${
              msg.from === "user"
                ? "bg-Snow text-MainText self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="w-5/6 flex items-center gap-4 py-4 px-2 flex-col">
        <div className="flex-1 w-full">
          <DefaultInput
            Value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            placeholder="Digite sua mensagem..."
          />
        </div>
        <DefaultBtn value="Enviar" onPress={handleSend} />
      </div>
    </section>
  );
}
