export function Footer() {
    const year = new Date().getFullYear()

    return (
      <footer className='flex flex-col items-center justify-center mt-4 p-4'>
        <p className='font-sans text-white text-sm sm:text-base text-center leading-relaxed'>
            <span className='font-bold'>GEN A</span>
            <span className='text-[#2afbc2] font-bold'>i </span>
             ⓒ {year}. Todos os direitos reservados.
        </p>
      </footer>
    )
  }