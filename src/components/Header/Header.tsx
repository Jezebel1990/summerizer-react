export function Header () { 
return (
    <div className='flex flex-col items-center justify-center mt-4 p-4'>
      <h1 className='text-2xl sm:text-3xl lg:text-4xl text-white text-center leading-snug sm:leading-10 font-semibold'>
        Gerador de Resumos com
        <br />
        <span className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2afbc2]'>Hugging Face</span>
      </h1>
      <p className='mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl text-gray-400 sm:text-gray-500 text-center max-w-lg sm:max-w-xl'>
        Carregue documentos para obter resumos rápidos usando Hugging Face
      </p>
    </div>
  );
}