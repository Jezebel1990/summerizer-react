import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Header } from './components/Header/Header';
import { TextareaForm } from './components/TextareaForm/TextareaForm';
import { History } from './components/History/History';
import { fetchSummary } from './services/apiService';
import { Footer } from './components/Footer/Footer';
import PdfButton from './components/PdfButton/PdfButton';

function App() {
  const [state, setState] = useState<{
    value: string | null;
    data: string[] | null;
    submitting: boolean;
    isCopy: string | false; 
  }>({
    value: null,
    data: null,
    submitting: false,
    isCopy: false, 
  });

  // Função para carregar dados do localStorage
  const fetchLocalStorage = () => {
    const result = localStorage.getItem('resumo');
    if (result) {
      const parsedData = JSON.parse(result).reverse();
      setState((prev) => ({ ...prev, data: parsedData }));
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.value) return;

    setState((prev) => ({ ...prev, submitting: true }));

    try {
      const summary = await fetchSummary(state.value);
      const updatedData = state.data ? [summary, ...state.data] : [summary];
      localStorage.setItem('resumo', JSON.stringify(updatedData));
      setState((prev) => ({
        ...prev,
        data: updatedData,
        value: '', 
      }));
    } catch (error) {
      console.error('Erro ao gerar resumo:', error);
    } finally {
      setState((prev) => ({ ...prev, submitting: false }));
    }
  };

  // Função para lidar com upload de PDF
  const handlePdfUpload = (text: string) => {
    setState((prev) => ({ ...prev, value: text }));
  };

  // Copiar texto para área de transferência
  const copyTextToClipboard = async (text: string) => {
    if ('clipboard' in navigator) {
      try {
        await navigator.clipboard.writeText(text);
        setState((prev) => ({ ...prev, isCopy: 'true' })); // Atribuir "true" como string
        setTimeout(() => {
          setState((prev) => ({ ...prev, isCopy: false })); // Reverter para false após 1,5s
        }, 1500);
      } catch (err) {
        console.error('Erro ao copiar para área de transferência:', err);
      }
    }
  };

  // Função para lidar com cópia de texto
  const handleCopy = (txt: string) => {
    copyTextToClipboard(txt);
  };

  // Função para excluir um resumo
  const handleDelete = (txt: string) => {
    const filtered = state.data?.filter((d) => d !== txt) || [];
    localStorage.setItem('resumo', JSON.stringify(filtered));
    setState((prev) => ({ ...prev, data: filtered }));
  };

  // Carrega dados do localStorage ao montar o componente
  useEffect(() => {
    fetchLocalStorage();
  }, []);

  return (
    <div className="w-full bg-site min-h-screen flex flex-col">
      <Navbar />
      <Header />
      <div className="flex-grow">
        <PdfButton onUpload={handlePdfUpload} />
        <TextareaForm
          value={state.value || ''}
          setValue={(value) => setState((prev) => ({ ...prev, value }))} 
          submitting={state.submitting}
          handleSubmit={handleSubmit}
        />
        <History
          data={state.data}
          isCopy={state.isCopy}
          handleCopy={handleCopy}
          handleDelete={handleDelete}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;

