import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GeneralCards from "../../components/cards/UserAiCards"; // ou o caminho correto do GeneralCards
import { getAllAgents } from "../../services/chain/service";

export default function HomePage() {
  const [agents, setAgents] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await getAllAgents();
        let allAgents: any[] = [];

        if (response?.data && Array.isArray(response.data)) {
          allAgents = response.data;
        } else if (Array.isArray(response)) {
          allAgents = response;
        } else {
          console.warn("Resposta inesperada ao buscar agentes:", response);
        }

        // Embaralha e pega 5
        const shuffled = allAgents.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);

        setAgents(selected);
      } catch (error) {
        console.error("Erro ao buscar agentes:", error);
      }
    };

    fetchAgents();
  }, []);

  return (
    <section className="w-full h-full flex justify-center flex-col">
      <div className="w-1/2 h-auto p-16">
        <h1 className="text-7xl font-bold">
          What
          <br />
          you will
          <br />
          choose today?
        </h1>
      </div>
      <div className="w-full h-4/6 flex justify-center items-center">
        {agents.length === 0 ? (
          <h2 className="text-SubGray text-4xl h-3/6 flex justify-center items-center mb-32">
            Houston....we got a problem
          </h2>
        ) : (
        <div className="grid grid-cols-4 gap-4 w-5/6">
  {agents.map((agent) => (
    <GeneralCards
      key={agent.id}
      name={agent.name}
      desc={agent.description}
      price={agent.price}
      url={agent.code}
    />
  ))}
</div>

        )}
      </div>
    </section>
  );
}
