import { useNavigate } from "react-router-dom";
import DefaultBtn from "../butttons/DefaultBtn";
import { Robot } from "phosphor-react";

interface UserAICardsProps {
  name: string;
  desc: string;
  price: number; // valor em ICP (ex: 1.23)
  url?: string;  // será usada como code na rota
}

export default function GeneralCards({ name, desc, url, price }: UserAICardsProps) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (url) {
      navigate(`/chat/${encodeURIComponent(url)}`);
    } else {
      alert("URL do agente não disponível.");
    }
  };

  const formatICP = (value: number) => {
    return `${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    })} ICP`;
  };

  return (
    <div
      className="w-full h-full flex justify-center items-center flex-col bg-Snow transition-colors hover:bg-gray-100 
      drop-shadow-2xl gap-2 p-4 rounded-2xl"
    >
      <div className="w-full h-auto flex flex-col justify-center items-start gap-1">
        <div className="size-14 rounded-full border-4 border-MainText drop-shadow-xl flex justify-center items-center">
            <Robot size={44} color="black"/>
        </div>
        <div className="w-full">
          <h2 className="text-xl text-SubGray">{name}</h2>
        </div>
        <div className="w-5/6 h-64">
          <p className="text-base text-MainText">{desc}</p>
        </div>
        <DefaultBtn
          value={formatICP(price)}
          onPress={handleRedirect}
        />
      </div>
    </div>
  );
}
