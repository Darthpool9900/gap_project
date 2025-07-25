import { useEffect, useState } from "react";
import GeneralCards from "../../components/cards/UserAiCards";
import DefaultInput from "../../components/inputs/DefaultInput";
import AddBtn from "../../components/butttons/AddButn";
import { useNavigate } from "react-router-dom";
import { getUserAgents } from "../../services/chain/service";

export default function AgentsPage() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigateCreate = () => navigate("/create_agent");

 useEffect(() => {
  const fetchAgents = async () => {
    const userDataStr = localStorage.getItem("userData");

    if (!userDataStr) {
      console.warn("Usuário não logado: userData ausente no localStorage.");
      return;
    }

    try {
      const userData = JSON.parse(userDataStr);
      let userId = userData.data;

      if (Array.isArray(userId)) {
        userId = userId[0];
      }

      if (!userId || typeof userId !== "string") {
        console.warn("userData.data inválido ou vazio:", userData.data);
        return;
      }

      const response = await getUserAgents(userId);

      if (response?.status === "success" && Array.isArray(response.data)) {
        setAgents(response.data);
      } else if (Array.isArray(response)) {
        setAgents(response);
      } else {
        console.warn("Resposta inesperada ao buscar agentes:", response);
      }
    } catch (err) {
      console.error("Erro ao buscar agentes:", err);
    }
  };

  fetchAgents();
}, []);


  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full h-full flex justify-center flex-col items-center">
      {agents.length > 0 ? (
        <>
          <div className="w-3/6">
            <DefaultInput
              Value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search for your AI"
            />
          </div>
         <div className="w-5/6 h-[45%] mt-8 overflow-y-auto grid grid-cols-4 gap-8">
  {filteredAgents.map((agent, index) => (
    <GeneralCards
      key={agent.id ?? index}
      name={agent.name}
      desc={agent.description}
      price={agent.price}
      url={agent.code}
    />
  ))}
</div>

        </>
      ) : (
        <h1 className="text-4xl text-SubGray font-bold text-center">
          You don’t have agents yet, want to create one?
        </h1>
      )}
      <AddBtn onPress={navigateCreate} />
    </section>
  );
}
