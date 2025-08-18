import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DefaultBtn from "../../../components/butttons/DefaultBtn";
import DefaultInput from "../../../components/inputs/DefaultInput";
import { createAgent } from "../../../services/chain/service";

type UserData = {
  username: string;
  email: string;
};

function useUserDataCache(): UserData | null {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      try {
        setUserData(JSON.parse(data));
      } catch {
        console.warn("Erro ao parsear userData do localStorage.");
      }
    }
  }, []);

  return userData;
}

export default function AddHostPage() {
  const navigate = useNavigate();
  const userData = useUserDataCache();

  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");

  const [form, setForm] = useState({
    agentCode: "", // conteúdo do arquivo ou url
    agentName: "",
    price: "",
    description: "",
    version: "",
    category: "General",
    fileName: "", // opcional, para mostrar nome do arquivo carregado
    url: "", // url para o servidor externo
  });

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const text = await file.text(); // lê o conteúdo do arquivo como texto

    setForm((prev) => ({
      ...prev,
      agentCode: text,
      fileName: file.name,
    }));
  };

  const reqCreate = async () => {
    const now = Date.now();

    if (uploadMode === "file" && !form.agentCode) {
      alert("Por favor, envie um arquivo com o código do agente.");
      return;
    }

    if (uploadMode === "url" && !form.url) {
      alert("Por favor, informe a URL do servidor externo.");
      return;
    }

    const payload = {
      id: now.toString(),
      name: form.agentName,
      description: form.description,
      code: uploadMode === "file" ? form.agentCode : form.url,
      price: Number(form.price) || 0,
      author: userData?.username ?? "anonymous",
      category: form.category.toLowerCase(),
      version: form.version || "1.0.0",
      created_at: now,
      updated_at: now,
      downloads: 0,
      rating: 0.0,
    };

    try {
      const response = await createAgent(payload);
      console.log("Resposta da API:", response);
      navigate("/agents_user");
    } catch (error) {
      console.error("Erro ao criar:", error);
      alert("Ocorreu um erro ao criar. Tente novamente.");
    }
  };

  return (
    <section className="w-full h-full flex justify-center flex-col items-center">
      <div className="w-3/5 h-auto flex justify-center flex-col items-start p-8 gap-8">
        <div className="w-full h-auto flex justify-between items-center">
          <h1 className="text-4xl text-MainText font-bold">A new hope</h1>
          {userData && <span className="text-MainText text-lg">👤 {userData.username}</span>}
        </div>
        <span className="text-2xl text-SubGray w-4/5">
          Just share with everyone on the planet, maybe it is useful for someone.
        </span>
      </div>

      <form
        className="w-4/6 h-auto flex justify-center items-center flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          reqCreate();
        }}
      >
        <div className="w-4/6 h-auto flex flex-col gap-8">
          {/* Dropdown para escolher modo */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-lg text-SubGray font-medium">Modo de Envio</label>
            <select
              value={uploadMode}
              onChange={(e) => setUploadMode(e.target.value as "file" | "url")}
              className="w-full p-3 rounded-lg border border-gray-300 text-MainText bg-white focus:outline-none focus:ring-2 focus:ring-BlueWhale"
            >
              <option value="file">Upload arquivo</option>
              <option value="url">URL do servidor externo</option>
            </select>
          </div>

          {/* Input condicional: arquivo ou URL */}
          {uploadMode === "file" ? (
            <div className="w-full flex flex-col gap-2">
              <label className="text-lg text-SubGray font-medium" htmlFor="agentCodeFile">
                Upload Agent Code File
              </label>
              <input
                id="agentCodeFile"
                type="file"
                accept=".txt,.py,.js"
                onChange={handleFileChange}
                className="w-full p-3 rounded-lg border border-gray-300 text-MainText bg-white focus:outline-none focus:ring-2 focus:ring-BlueWhale"
              />
              {form.fileName && (
                <span className="text-sm text-SubGray mt-1">Arquivo carregado: {form.fileName}</span>
              )}
            </div>
          ) : (
            <div className="w-full flex flex-col gap-2">
              <label className="text-lg text-SubGray font-medium" htmlFor="agentUrl">
                URL do Servidor Externo
              </label>
              <input
                id="agentUrl"
                type="text"
                placeholder="https://seu-servidor.com/agent"
                value={form.url}
                onChange={handleChange("url")}
                className="w-full p-3 rounded-lg border border-gray-300 text-MainText bg-white focus:outline-none focus:ring-2 focus:ring-BlueWhale"
              />
            </div>
          )}

          <DefaultInput
            Value={form.agentName}
            onChange={handleChange("agentName")}
            type="text"
            placeholder="Insert a name for your agent"
          />
          <DefaultInput
            Value={form.price}
            onChange={handleChange("price")}
            type="number"
            placeholder="Insert the price"
          />
          <DefaultInput
            Value={form.version}
            onChange={handleChange("version")}
            type="text"
            placeholder="Version (e.g. 1.0.0)"
          />
          <DefaultInput
            Value={form.description}
            onChange={handleChange("description")}
            type="text"
            placeholder="Add a longer description"
          />

          <div className="w-full h-auto flex flex-col gap-2">
            <label className="text-lg text-SubGray font-medium">Category</label>
            <select
              value={form.category}
              onChange={handleChange("category")}
              className="w-full p-3 rounded-lg border border-gray-300 text-MainText bg-white focus:outline-none focus:ring-2 focus:ring-BlueWhale"
            >
              <option value="General">General</option>
              <option value="AI">AI</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Gaming">Gaming</option>
              <option value="Productivity">Productivity</option>
              <option value="Security">Security</option>
              <option value="Creative">Creative</option>
            </select>
          </div>
        </div>

        <div className="w-1/3 h-auto mt-8">
          <DefaultBtn value="Next" />
        </div>
      </form>
    </section>
  );
}
