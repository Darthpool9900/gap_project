import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, PrimaryButton, SecondaryButton } from "../../../components/ui";

export default function AddHostPage() {
  const navigate = useNavigate();
  const [serverAddress, setServerAddress] = useState("");
  const [agentName, setAgentName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para configurar o host
    console.log("Configurando host:", { serverAddress, agentName });
    navigate("/create_agent/new_agent");
  };

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Configurar Servidor</h1>
          <p className="text-xl text-gray-600">Configure as informações do seu servidor para o agente</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <TextInput
                value={serverAddress}
                onChange={(e) => setServerAddress(e.target.value)}
                placeholder="Endereço do servidor (ex: localhost:8000)"
                label="Endereço do Servidor"
                required
              />
            </div>

            <div>
              <TextInput
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="Nome para o agente"
                label="Nome do Agente"
                required
              />
            </div>

            <div className="pt-6 flex gap-4">
              <SecondaryButton
                type="button"
                onClick={handleBack}
                className="flex-1"
              >
                Voltar
              </SecondaryButton>
              
              <PrimaryButton
                type="submit"
                className="flex-1"
                disabled={!serverAddress || !agentName}
              >
                Próximo
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
