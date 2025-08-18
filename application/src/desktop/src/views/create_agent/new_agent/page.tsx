import { useState } from "react";
import { TextInput, PrimaryButton } from "../../../components/ui";

export default function NewAgentAdd() {
  const [agentName, setAgentName] = useState("");
  const [agentDescription, setAgentDescription] = useState("");
  const [agentCode, setAgentCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para criar o agente
    console.log("Criando agente:", { agentName, agentDescription, agentCode });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Criar Novo Agente</h1>
          <p className="text-xl text-gray-600">Configure as informações básicas do seu agente de IA</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <TextInput
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="Nome do agente"
                label="Nome do Agente"
                required
              />
            </div>

            <div>
              <TextInput
                value={agentDescription}
                onChange={(e) => setAgentDescription(e.target.value)}
                placeholder="Descrição do que o agente faz"
                label="Descrição"
                required
              />
            </div>

            <div>
              <TextInput
                value={agentCode}
                onChange={(e) => setAgentCode(e.target.value)}
                placeholder="Código ou URL do agente"
                label="Código/URL do Agente"
                required
              />
            </div>

            <div className="pt-6">
              <PrimaryButton
                type="submit"
                className="w-full"
                disabled={!agentName || !agentDescription || !agentCode}
              >
                Criar Agente
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}