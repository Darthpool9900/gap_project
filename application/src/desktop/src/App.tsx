import { useState, useRef, useEffect } from "react";
import DefaultInput from "./components/inputs/DefaultInput";
import DefaultBtn from "./components/butttons/DefaultBtn";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./services/chain/service"; // ajuste caminho se precisar
import "./App.css";

type RegisterResponse = {
  status: "success" | "error";
  data?: string; // hash para salvar no arquivo txt
  message?: string;
  // Pode ter mais campos no JSON salvo, se quiser adaptar aqui
};

function App() {
  const navigate = useNavigate();
  const [create, setCreate] = useState(false);

  // Campos create
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Login (json inteiro carregado)
  const [fileData, setFileData] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  // Mensagem para o usuário
  const [message, setMessage] = useState("");

  // Se já tiver cache no localStorage, carrega para estado ao montar
  useEffect(() => {
    const cachedUserData = localStorage.getItem("userData");
    if (cachedUserData) {
      setFileData(cachedUserData);
      setMessage("Cached user data loaded.");
    }
  }, []);

  // Função para salvar arquivo txt no download
  const saveFile = (data: string) => {
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "user_data.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Função que registra o usuário
  const handleRegister = async () => {
    if (!username || !email) {
      setMessage("Username and email are required");
      return;
    }
    try {
      const payload = { username, email };
      const response = (await registerUser(payload)) as RegisterResponse;

      if (response.status === "success") {
        // Salvar JSON inteiro da resposta no arquivo txt
        const jsonStr = JSON.stringify(response);
        saveFile(jsonStr);
        setMessage("User registered! Saving your data file...");
        // Atualizar estado e localStorage com JSON completo
        setFileData(jsonStr);
        localStorage.setItem("userData", jsonStr);
        setCreate(false);
      } else {
        setMessage("Registration failed: " + response.message);
      }
    } catch (err) {
      setMessage("Error registering user");
    }
  };

  // Drag & drop handlers para arquivo txt/json
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
            // Valida se JSON válido
            JSON.parse(text);
            setFileData(text.trim());
            setMessage("File loaded. You can now login.");
          } catch {
            setMessage("Invalid JSON file.");
          }
        };
        reader.readAsText(file);
      } else {
        setMessage("Only JSON or plain text (.json or .txt) files allowed");
      }
    }
  };

  // Abrir seletor de arquivo ao clicar
  const openFileDialog = () => {
    inputFileRef.current?.click();
  };

  // Ler arquivo selecionado pelo seletor
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
            setMessage("File loaded. You can now login.");
          } catch {
            setMessage("Invalid JSON file.");
          }
        };
        reader.readAsText(file);
      } else {
        setMessage("Only JSON or plain text (.json or .txt) files allowed");
      }
    }
  };

  // Login: verifica se arquivo JSON está carregado, salva no localStorage e navega
  const handleLogin = () => {
    if (!fileData) {
      setMessage("Please load your user data file to login");
      return;
    }

    try {
      JSON.parse(fileData); // Validate JSON format
      localStorage.setItem("userData", fileData); // Salva no cache
      setMessage("Login successful!");
      navigate("home");
    } catch {
      setMessage("Invalid user data format");
    }
  };

  return (
    <main className="bg-Snow w-screen h-screen flex justify-center flex-col items-center">
      <form
        className="flex w-1/4 h-auto flex-col justify-center items-center gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="w-64 h-64 bg-Snow rounded-full drop-shadow-xl shadow-MainText m-4"></div>

        {create ? (
          <>
            <DefaultInput
              type="text"
              Value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
            />
            <DefaultInput
              type="email"
              Value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
            <DefaultBtn value="Create Account" onPress={handleRegister} />
          </>
        ) : (
          <>
            <div
              className={`w-full h-24 border-2 border-dashed rounded-md flex justify-center items-center cursor-pointer
                ${
                  dragActive
                    ? "border-BlueWhale bg-BlueWhale/20"
                    : "border-gray-400 bg-transparent"
                }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={openFileDialog}
            >
              {fileData ? (
                <pre className="text-BlueWhale max-w-full max-h-24 overflow-auto whitespace-pre-wrap break-all">
                  {fileData.substring(0, 200)}...
                </pre>
              ) : (
                <p className="text-gray-500">
                  Drag and drop your user data file here, or click to select
                </p>
              )}
              <input
                ref={inputFileRef}
                type="file"
                className="hidden"
                accept=".json,.txt"
                onChange={handleFileChange}
              />
            </div>
            <DefaultBtn value="Login" onPress={handleLogin} disabled={!fileData} />
          </>
        )}
      </form>

      <span className="m-2">
        {create ? "Don't have an account? click" : "Have an account? click"}
        <button
          onClick={() => {
            setCreate(!create);
            setMessage("");
            setFileData(null);
            setUsername("");
            setEmail("");
          }}
          className="appearance-none w-auto h-auto p-1 text-BlueWhale text-base"
        >
          here
        </button>
      </span>

      {message && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">{message}</div>
      )}
    </main>
  );
}

export default App;
