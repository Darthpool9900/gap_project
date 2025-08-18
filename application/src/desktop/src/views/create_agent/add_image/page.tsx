import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../../../components/ui";

export default function AddImagePage() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para processar a imagem
    console.log("Imagem selecionada:", selectedImage);
    navigate("/create_agent/security");
  };

  const handleBack = () => {
    navigate("/create_agent/new_agent");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Adicionar Imagem</h1>
          <p className="text-xl text-gray-600">Selecione uma imagem para o seu agente (opcional)</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        {selectedImage ? selectedImage.name : "Clique para selecionar uma imagem"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedImage ? "Imagem selecionada" : "PNG, JPG até 10MB"}
                      </p>
                    </div>
                  </div>
                </label>
              </div>
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
              >
                Próximo
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
