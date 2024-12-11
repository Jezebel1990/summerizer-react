import Image from './assets/logo.png';

function App() {

  return (
    <div className="w-full bg-site h-full min-h-[100vh] py-4 px-4 md:px-20">
      <div className="w-full mt-10">
      <div className='flex flex-row justify-between items-center w-full h-10 px-5 2xl:px-40'>
        <img
         src={Image}
         alt='Logo'
         className='cursor-pointer h-20'
        />
      </div>
      <div className='flex flex-col items-center justify-center
        mt-4 p-4'>
<h1 className='text-3xl text-white text-center leading-10 font-semibold'>
  Gerador de Resumos com
  <br />
  <span className='text-5xl font-bold text-[#2afbc2]'>OpenAI GPT</span>
</h1>
 <p className='mt-5 text-lg text-gray-500 sm:text-xl text-center max-w-2xl'>Carregue documentos para obter resumos rápidos usando OpenAI GPT</p>
      </div>
      </div>
    </div>
  )
   
}

export default App
