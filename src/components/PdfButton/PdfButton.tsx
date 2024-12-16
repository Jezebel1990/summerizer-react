import React, { useState } from 'react';
import axios from 'axios';

interface PdfButtonProps {
  onUpload: (extractedText: string) => void;
}

const PdfButton: React.FC<PdfButtonProps> = ({ onUpload }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null); 

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Enviar o PDF para o backend
      const response = await axios.post('https://summerizer-react.onrender.com/api/process-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Verificar se o campo 'summary' existe na resposta
      if (response.data && response.data.summary) {
        const extractedText = response.data.summary;
        onUpload(extractedText);
      } else {
        setError('Resumo não encontrado na resposta do servidor.');
        console.error('Resumo não encontrado na resposta do servidor.'); 
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setError('Erro de rede. Verifique a conexão com o servidor.');
        console.error('Erro de rede. Verifique a conexão com o servidor.', error);
      } else {
        setError('Erro desconhecido ao processar o PDF.');
        console.error('Erro desconhecido ao processar o PDF:', error); 
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center pt-10">
      <label
        htmlFor="pdf-upload"
        className="inline-flex px-8 rounded text-white bg-gradient-to-tr from-orange-400 to-orange-500 py-3 items-center hover:bg-orange-600 transition-all duration-300 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-lg font-medium">Upload PDF</span>
      </label>
      <input
        id="pdf-upload"
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        className="hidden"
      />
      {/* Exibir o estado de carregamento */}
      {loading && <p className="text-lg text-gray-500">Carregando...</p>}
      {/* Exibir erro, se houver */}
      {error && <p className="text-red-500 text-lg">{error}</p>}
    </div>
  );
};

export default PdfButton;
