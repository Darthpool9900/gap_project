import { useState, useRef, useEffect } from "react";
import { TextInput, EmailInput, PrimaryButton, SecondaryButton } from "./components/ui";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./services/chain/service";
import "./App.css";

type RegisterResponse = {
  status: "success" | "error";
  data?: string;
  message?: string;
};

function App() {
  const navigate = useNavigate();
  const [create, setCreate] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fileData, setFileData] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const cachedUserData = localStorage.getItem("userData");
    if (cachedUserData) {
      setFileData(cachedUserData);
      setMessage("Dados do usuário carregados do cache.");
    }
  }, []);

  const saveFile = (data: string) => {
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "user_data.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleRegister = async () => {
    if (!username || !email) {
      setMessage("Nome de usuário e email são obrigatórios");
      return;
    }
    
    try {
      setIsLoading(true);
      const payload = { username, email };
      const response = (await registerUser(payload)) as RegisterResponse;

      if (response.status === "success") {
        const jsonStr = JSON.stringify(response);
        saveFile(jsonStr);
        setMessage("Usuário registrado com sucesso! Salvando seus dados...");
        setFileData(jsonStr);
        localStorage.setItem("userData", jsonStr);
        setCreate(false);
      } else {
        setMessage("Falha no registro: " + response.message);
      }
    } catch (err) {
      setMessage("Erro ao registrar usuário");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (
        file.type === "application/json" ||
        file.type === "text/plain" ||
        file.name.endsWith(".json") ||
        file.name.endsWith(".txt")
      ) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          try {
            JSON.parse(text);
            setFileData(text.trim());
            setMessage("Arquivo carregado. Você pode fazer login agora.");
          } catch {
            setMessage("Arquivo JSON inválido.");
          }
        };
        reader.readAsText(file);
      } else {
        setMessage("Apenas arquivos JSON ou texto (.json ou .txt) são permitidos");
      }
    }
  };

  const openFileDialog = () => {
    inputFileRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (
        file.type === "application/json" ||
        file.type === "text/plain" ||
        file.name.endsWith(".json") ||
        file.name.endsWith(".txt")
      ) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          try {
            JSON.parse(text);
            setFileData(text.trim());
            setMessage("Arquivo carregado. Você pode fazer login agora.");
          } catch {
            setMessage("Arquivo JSON inválido.");
          }
        };
        reader.readAsText(file);
      } else {
        setMessage("Apenas arquivos JSON ou texto (.json ou .txt) são permitidos");
      }
    }
  };

  const handleLogin = () => {
    if (!fileData) {
      setMessage("Por favor, carregue seus dados de usuário para fazer login");
      return;
    }

    try {
      JSON.parse(fileData);
      localStorage.setItem("userData", fileData);
      setMessage("Login realizado com sucesso!");
      navigate("home");
    } catch {
      setMessage("Formato de dados de usuário inválido");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GAP Project</h1>
          <p className="text-gray-600">Plataforma de Agentes de IA</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          {create ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Criar Conta</h2>
                <p className="text-gray-600">Comece sua jornada com agentes de IA</p>
              </div>
              
              <TextInput
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Seu nome de usuário"
                label="Nome de usuário"
                required
              />
              
              <EmailInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu email"
                label="Email"
                required
              />
              
              <PrimaryButton 
                onClick={handleRegister}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Criando..." : "Criar Conta"}
              </PrimaryButton>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Fazer Login</h2>
                <p className="text-gray-600">Acesse sua conta para continuar</p>
              </div>
              
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
                  dragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={openFileDialog}
              >
                {fileData ? (
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Arquivo carregado</p>
                      <p className="text-xs text-gray-500 mt-1">Clique para alterar</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Arraste e solte seu arquivo</p>
                      <p className="text-xs text-gray-500 mt-1">ou clique para selecionar</p>
                    </div>
                  </div>
                )}
                
                <input
                  ref={inputFileRef}
                  type="file"
                  className="hidden"
                  accept=".json,.txt"
                  onChange={handleFileChange}
                />
              </div>
              
              <PrimaryButton 
                onClick={handleLogin} 
                disabled={!fileData}
                className="w-full"
              >
                Fazer Login
              </PrimaryButton>
            </div>
          )}
        </div>

        {/* Toggle Mode */}
        <div className="text-center mt-6">
          <SecondaryButton
            onClick={() => {
              setCreate(!create);
              setMessage("");
              setFileData(null);
              setUsername("");
              setEmail("");
            }}
            variant="ghost"
            className="text-blue-600 hover:text-blue-700"
          >
            {create ? "Já tem uma conta? Faça login" : "Não tem uma conta? Crie uma"}
          </SecondaryButton>
        </div>

        {/* Message */}
        {message && (
          <div className={`mt-4 p-4 rounded-xl text-center ${
            message.includes("sucesso") || message.includes("carregado") || message.includes("cache")
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-red-100 text-red-700 border border-red-200"
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
