import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, PrimaryButton, SecondaryButton } from "../../components/ui";
import { Card, AgentCard } from "../../components/ui";
import { getAllAgents } from "../../services/chain/service";

interface Agent {
  id: string;
  name: string;
  description: string;
  price: number;
  code: string;
  image?: string;
}

export default function AgentsPage() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meus Agentes</h1>
          <p className="text-xl text-gray-600">Gerencie e interaja com seus agentes de IA</p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <TextInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar agentes..."
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </div>
          <PrimaryButton onClick={() => navigate("/create_agent")}>
            Criar Novo Agente
          </PrimaryButton>
        </div>

        {/* Agents Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        ) : filteredAgents.length === 0 ? (
          <Card className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Nenhum agente encontrado</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? "Tente ajustar sua pesquisa" : "Crie seu primeiro agente para começar"}
            </p>
            {!searchTerm && (
              <PrimaryButton onClick={() => navigate("/create_agent")}>
                Criar Primeiro Agente
              </PrimaryButton>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                name={agent.name}
                description={agent.description}
                price={`R$ ${agent.price.toFixed(2)}`}
                code={agent.code}
                image={agent.image}
                onSelect={handleAgentSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
