import { useNavigate } from "react-router-dom";
import DefaultBtn from "../../../components/butttons/DefaultBtn";
import { Plus } from "phosphor-react";
import { useState } from "react";

export default function AddImagePage() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);

  const reqCreate = (path: string) => {
    navigate(path);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="w-full h-full flex justify-center flex-col items-center">
      <div className="w-3/5 h-auto flex justify-center flex-col items-start p-8 gap-8">
        <div className="w-full h-auto flex justify-start">
          <h1 className="text-4xl text-MainText font-bold">
            Let’s start with a few infos
          </h1>
        </div>
        <span className="text-2xl text-SubGray w-4/5">
          Just for use your computer as server, we need just a few infors about
          the agent.
        </span>
      </div>

      <form className="w-4/6 h-auto flex justify-center items-center flex-col">
        <label
          htmlFor="fileInput"
          className="size-74 bg-Snow drop-shadow-2xl shadow-MainText rounded-full flex justify-center items-center overflow-hidden cursor-pointer"
        >
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="object-cover w-full h-full"
            />
          ) : (
            <Plus size={180} color="#333" />
          )}
        </label>

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="w-1/3 h-auto mt-8">
          <DefaultBtn
            onPress={() => {
              reqCreate("/create_agent/security");
            }}
            value="Next phase"
          />
        </div>
      </form>
    </section>
  );
}
