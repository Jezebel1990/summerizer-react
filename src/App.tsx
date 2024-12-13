import { useState, useEffect } from 'react';
import Image from './assets/logo.png';
import Delete from './assets/delete.png';
import Huggingface from './assets/huggingface.svg';

function App() {
const [value, setValue] = useState<string | null>(null);
const [ data, setData] = useState<string[] | null>(null);
const [submitting, setSubmitting] = useState<boolean>(false);
const [isCopy, setIsCopy] = useState<string | false>(false);


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!value) return;
  setSubmitting(true);


  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
    },
    body: JSON.stringify({
      inputs: value,
  }),
};


fetch(
    'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    requestOptions
  )
  .then((response) => response.json())
      .then((dt) => {
        console.log("Data:", dt);

        if (Array.isArray(dt) && dt[0]?.summary_text) {
          const text = dt[0].summary_text; // Acessa o resumo
          console.log("Data received:", text);
          setSubmitting(false);

          const updatedData = data ? [...data, text] : [text];
          localStorage.setItem("resumo", JSON.stringify(updatedData));
          console.log("Dados atualizados após API:", updatedData);
          fetchLocalStorage();
        } else {
          console.error("Erro: Nenhum resumo encontrado na resposta da API.");
          setSubmitting(false);
        }
      })
      .catch((error) => {
        setSubmitting(false);
        console.error("Error:", error);
      });
  };

  
const fetchLocalStorage = () => {
  const result = localStorage.getItem("resumo");
  if (result) {
  const parsedData = JSON.parse(result)?.reverse();
  console.log("Dados carregados do localStorage:", parsedData);
  setData(parsedData);
}
};

const copyTextToClipboard = async (text: string) => {
  if ('clipboard' in navigator) {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopy("true"); 

      setTimeout(() => {
        setIsCopy(false);
      }, 1500);
    } catch (err) {
      console.log('Clipboard error:', err);
    }
  }
};

const handleCopy = (txt: string) => {
  copyTextToClipboard(txt);
};

const handleDelete = (txt: string) => {
  const filtered = data!.filter((d) => d !== txt);
  setData(filtered);

  localStorage.setItem('resumo', JSON.stringify(filtered));
};

useEffect(() => {
  fetchLocalStorage();
}, []);

  return (
    <div className="w-full bg-site h-full min-h-[100vh] py-4 px-4 md:px-20">
      <div className="w-full mt-10">
      <div className='flex flex-row justify-between items-center w-full h-10 px-5 2xl:px-40'>
        <img
         src={Image}
         alt='Logo'
         className='cursor-pointer h-20'
        />

         <a
            href='https://huggingface.co'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src={Huggingface}
              className='w-10 h-10 rounded-lg cursor-pointer'
            />
          </a>


      </div>
      <div className='flex flex-col items-center justify-center
        mt-4 p-4'>
<h1 className='text-3xl text-white text-center leading-10 font-semibold'>
  Gerador de Resumos com
  <br />
  <span className='text-5xl font-bold text-[#2afbc2]'>Hugging Face</span>
</h1>
 <p className='mt-5 text-lg text-gray-500 sm:text-xl text-center max-w-2xl'>Carregue documentos para obter resumos rápidos usando Hugging Face</p>
      </div>

      <div className='flex flex-col w-full items-center justify-center mt-5'>
     <textarea placeholder='Cole o conteúdo do documento aqui...'
      rows={6}
      className='block w-full md:w-[650px] rounded-md border border-[#2afbc2]
      bg-slate-900 p-2 text-sm shadow-lg font-medium text-white focus:border-[#3ff1b1]
       focus:outline-none focus:ring-0'
       onChange={(e) => setValue(e.target.value)}
     ></textarea>

{value?.length! > 0 &&
      (submitting ? (
              <p className='text-md text-[#2afbc2] mt-5'>Por favor, aguarde ....</p>
            ) : (
     <button className='mt-5 bg-[#1cf4a4] px-5 py-2 text-[#0c443c] text-md font-cursor-pointer rounded-md'
      onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
     >
      Enviar
     </button>
       ))}
      </div>
      </div>


      <div
        className='w-full mt-10 flex flex-col gap-5 shadow-md
      items-center justify-center'
      >
        {data && data.length > 0 && (
          <>
            <p className='text-white font-semibold text-lg'>Histórico de Resumos</p>
            {data.map((d, index) => (
              
              <div
                key={index}
                className='max-w-2xl bg-slate-900 p-3 rounded-md'
              >
                <p className='text-gray-400 text-lg'>{d}</p>
                <div className='flex gap-5 items-center justify-end mt-2'>
                  <p
                    className='text-gray-200 font-semibold cursor-pointer'
                    onClick={() => handleCopy(d)}
                  >
                    {isCopy === "true" ? "Copiado" : "Copiar"}
                  </p>
                  <span
                    className='cursor-pointer'
                    onClick={() => handleDelete(d)}
                  >
                    <img src={Delete} className='w-6 h-6' />
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
        </div>
    </div>
  );
   
}

export default App;
