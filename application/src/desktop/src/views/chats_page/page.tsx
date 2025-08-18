import { useEffect, useState } from "react";
import GeneralCards from "../../components/cards/UserAiCards";
import DefaultInput from "../../components/inputs/DefaultInput";
import AddBtn from "../../components/butttons/AddButn";
import { useNavigate } from "react-router-dom";
import { getAllAgents } from "../../services/chain/service";

export default function ChatsPage() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigateCreate = () => navigate("/create_agent");

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await getAllAgents();

        if (Array.isArray(response)) {
          setAgents(response);
        } else if (response && typeof response === 'object' && 'status' in response && response.status === "success" && 'data' in response && Array.isArray((response as any).data)) {
          setAgents((response as any).data);
        } else {
          console.warn("Resposta inesperada em getAllAgents:", response);
        }
      } catch (err) {
        console.error("Erro ao buscar agentes:", err);
      }
    };

    fetchAgents();
  }, []);

  const filteredAgents = agents.filter(agent =>
    agent.name?.toLowerCase().includes(searchTerm.toLowerCase())
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
              placeholder="Search agents"
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
          Nenhum agente encontrado.
        </h1>
      )}
      <AddBtn onPress={navigateCreate} />
    </section>
  );
}
