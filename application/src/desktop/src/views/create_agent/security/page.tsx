import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, PrimaryButton, SecondaryButton } from "../../../components/ui";

export default function SecurityPage() {
  const navigate = useNavigate();
  const [securityKey, setSecurityKey] = useState("");
  const [confirmKey, setConfirmKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (securityKey !== confirmKey) {
      alert("As chaves de segurança não coincidem!");
      return;
    }
    // Lógica para finalizar a criação do agente
    console.log("Agente criado com sucesso!");
    navigate("/agents_user");
  };

  const handleBack = () => {
    navigate("/create_agent/add_image");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Configurações de Segurança</h1>
          <p className="text-xl text-gray-600">Configure as chaves de segurança para o seu agente</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <TextInput
                value={securityKey}
                onChange={(e) => setSecurityKey(e.target.value)}
                placeholder="Chave de segurança"
                label="Chave de Segurança"
                type="password"
                required
              />
            </div>

            <div>
              <TextInput
                value={confirmKey}
                onChange={(e) => setConfirmKey(e.target.value)}
                placeholder="Confirme a chave de segurança"
                label="Confirmar Chave"
                type="password"
                required
                error={securityKey && confirmKey && securityKey !== confirmKey}
                errorMessage="As chaves não coincidem"
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
                disabled={!securityKey || !confirmKey || securityKey !== confirmKey}
              >
                Finalizar Criação
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
