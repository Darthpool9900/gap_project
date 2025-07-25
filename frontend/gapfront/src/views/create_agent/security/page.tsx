import { FloppyDiskBack } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import DefaultBtn from "../../../components/butttons/DefaultBtn";
import { useRef } from "react";

export default function InjectPhase() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reqCreate = (path: string) => {
    navigate(path);
  };

  const SendFile = (file: File) => {
    console.log("Save hash to file:", file.name);
    // aqui você pode gerar o conteúdo .txt e salvar ou manipular conforme necessário
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      SendFile(file);
    }
  };

  return (
    <section className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-5/6 h-auto flex flex-col justify-center items-center gap-6">
        <h1 className="text-5xl text-MainText font-bold text-left w-4/6">
          More security
        </h1>
        <p className="text-2xl text-SubGray w-4/6 text-justify">
          This is a blockchain hub remember? So store your key in somewhere
          where can be in security is always good. Don’t worry you always can
          see your key here in individual agent if want but we recommend save
          in another place.
        </p>
      </div>

      <div className="w-full h-3/6 flex flex-col justify-center items-center gap-2">
        <FloppyDiskBack size={250} color="#2029D7" />
        <div className="w-1/4 flex flex-col gap-4">
          <label
            htmlFor="saveFile"
            className="cursor-pointer"
          >
            <DefaultBtn value="Send file" onPress={() => fileInputRef.current?.click()} />
          </label>

          <input
            id="saveFile"
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <DefaultBtn
            value="Skip"
            onPress={() => {
              reqCreate("/agents_user");
            }}
          />
        </div>
      </div>
    </section>
  );
}
