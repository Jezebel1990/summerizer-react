import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Header } from './components/Header/Header';
import { TextareaForm } from './components/TextareaForm/TextareaForm';
import { History } from './components/History/History';
import { fetchSummary } from './services/apiService';
import { Footer } from './components/Footer/Footer';

function App() {
  const [state, setState] = useState({
    value: null as string | null,
    data: null as string[] | null,
    submitting: false,
    isCopy: false as string | false,
  });

  const fetchLocalStorage = () => {
    const result = localStorage.getItem('resumo');
    if (result) {
      const parsedData = JSON.parse(result)?.reverse();
      setState((prev) => ({ ...prev, data: parsedData }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.value) return;
    setState((prev) => ({ ...prev, submitting: true }));

    try {
      const summary = await fetchSummary(state.value);
      const updatedData = state.data ? [...state.data, summary] : [summary];
      localStorage.setItem('resumo', JSON.stringify(updatedData));
      setState((prev) => ({ ...prev, data: updatedData }));
    } catch (error) {
      console.error('Erro ao gerar resumo:', error);
    } finally {
      setState((prev) => ({ ...prev, submitting: false }));
    }
  };

  const copyTextToClipboard = async (text: string) => {
    if ('clipboard' in navigator) {
      try {
        await navigator.clipboard.writeText(text);
        setState((prev) => ({ ...prev, isCopy: 'true' }));
        setTimeout(() => {
          setState((prev) => ({ ...prev, isCopy: false }));
        }, 1500);
      } catch (err) {
        console.error('Clipboard error:', err);
      }
    }
  };

  const handleCopy = (txt: string) => {
    copyTextToClipboard(txt);
  };

  const handleDelete = (txt: string) => {
    const filtered = state.data!.filter((d) => d !== txt);
    localStorage.setItem('resumo', JSON.stringify(filtered));
    setState((prev) => ({ ...prev, data: filtered }));
  };

  useEffect(() => {
    fetchLocalStorage();
  }, []);

  return (
    <div className='w-full bg-site  min-h-screen flex flex-col'>
      <Navbar />
      <Header />
      <div className="flex-grow">
      <TextareaForm
        value={state.value}
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
