interface TextareaFormProps {
    value: string | null;
    setValue: (value: string | null) => void;
    submitting: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  }
  
  export function TextareaForm ({ value, setValue, submitting, handleSubmit }: TextareaFormProps) { 
  return (
    <div className='flex flex-col w-full items-center justify-center mt-5 px-4'>
      <textarea
        placeholder='Cole o conteúdo do documento aqui...'
        rows={6}
        className='block w-full sm:w-[460px] md:w-[580px] rounded-md border border-[#2afbc2] 
        bg-slate-900 p-2 text-sm shadow-lg font-medium text-white focus:border-[#3ff1b1] 
        focus:outline-none focus:ring-0'
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      {value?.length! > 0 && (
        submitting ? (
          <p className='text-md text-[#2afbc2] mt-5'>Por favor, aguarde ....</p>
        ) : (
          <button
            className='mt-5 bg-[#1cf4a4] px-4 sm:px-5 py-2 text-sm sm:text-md text-[#0c443c] 
            font-medium rounded-md hover:bg-[#17d496] transition-all'
            onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
          >
            Enviar
          </button>
        )
      )}
    </div>
  );
}