import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../../components/ui";
import { Card, InfoCard } from "../../components/ui";
import { getAllAgents } from "../../services/chain/service";

interface Agent {
  id: string;
  name: string;
  description: string;
  price: number;
  code: string;
  image?: string;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      setIsLoading(true);
      const agentsData = await getAllAgents();
      setAgents(agentsData || []);
    } catch (error) {
      console.error("Erro ao carregar agentes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAgentSelect = (code: string) => {
    navigate(`/chat/${code}`);
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-blue-50 overflow-y-auto">
      {/* Hero Section */}
      <div className="px-8 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight mb-6">
            What you will
            <br />
            choose today?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubra e interaja com agentes de IA inteligentes que podem ajudar em suas tarefas diárias
          </p>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <PrimaryButton onClick={() => navigate("/agents_user")}>
              Explorar Agentes
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate("/create_agent")}>
              Criar Novo Agente
            </SecondaryButton>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Agentes Recomendados</h2>
            <p className="text-gray-600">Agentes selecionados especialmente para você</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          ) : agents.length === 0 ? (
            <Card className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Houston... we got a problem</h3>
              <p className="text-gray-600 mb-6">Não foi possível carregar os agentes no momento</p>
              <PrimaryButton onClick={loadAgents}>
                Tentar Novamente
              </PrimaryButton>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agents.slice(0, 4).map((agent) => (
                <Card
                  key={agent.id}
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleAgentSelect(agent.code)}
                >
                  <div className="space-y-4">
                    {agent.image && (
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    )}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{agent.description}</p>
                      {agent.price > 0 && (
                        <p className="text-sm font-medium text-blue-600">R$ {agent.price.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="px-8 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Por que escolher nossa plataforma?</h2>
            <p className="text-gray-600">Recursos que tornam a interação com agentes de IA mais eficiente</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Acesso Rápido"
              description="Use Ctrl+Space para acessar o input global de qualquer lugar"
            />

            <InfoCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              title="Agentes Inteligentes"
              description="Conecte-se com agentes especializados para suas necessidades"
            />

            <InfoCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Interface Moderna"
              description="Design intuitivo e responsivo para uma experiência excepcional"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
