import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, PrimaryButton, SecondaryButton } from "../../components/ui";
import { Card, AgentCard } from "../../components/ui";

interface Chat {
  id: string;
  agentName: string;
  agentDescription: string;
  lastMessage: string;
  timestamp: Date;
  agentCode: string;
}

export default function ChatsPage() {
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      setIsLoading(true);
      // Simular carregamento de chats - substitua pela chamada real da API
      const mockChats: Chat[] = [
        {
          id: "1",
          agentName: "Assistente de Tradução",
          agentDescription: "Traduz textos entre diferentes idiomas",
          lastMessage: "Olá! Como posso ajudar com traduções hoje?",
          timestamp: new Date(),
          agentCode: "translator_agent"
        },
        {
          id: "2",
          agentName: "Analisador de Código",
          agentDescription: "Analisa e sugere melhorias em código",
          lastMessage: "Seu código está bem estruturado!",
          timestamp: new Date(Date.now() - 3600000),
          agentCode: "code_analyzer"
        }
      ];
      setChats(mockChats);
    } catch (error) {
      console.error("Erro ao carregar chats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatSelect = (code: string) => {
    navigate(`/chat/${code}`);
  };

  const filteredChats = chats.filter(chat =>
    chat.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meus Chats</h1>
          <p className="text-xl text-gray-600">Continue suas conversas com agentes de IA</p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <TextInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar chats..."
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>

        {/* Chats List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        ) : filteredChats.length === 0 ? (
          <Card className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Nenhum chat encontrado</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? "Tente ajustar sua pesquisa" : "Inicie uma conversa com um agente para começar"}
            </p>
            {!searchTerm && (
              <div className="space-y-3">
                <PrimaryButton onClick={() => navigate("/agents_user")}>
                  Ver Agentes
                </PrimaryButton>
                <SecondaryButton onClick={() => navigate("/create_agent")}>
                  Criar Agente
                </SecondaryButton>
              </div>
            )}
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredChats.map((chat) => (
              <Card
                key={chat.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleChatSelect(chat.agentCode)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{chat.agentName}</h3>
                    <p className="text-sm text-gray-600 mb-2">{chat.agentDescription}</p>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xs text-gray-400">
                      {chat.timestamp.toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-xs text-gray-400">
                      {chat.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
