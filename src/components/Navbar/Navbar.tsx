import Huggingface from '../../assets/huggingface.svg';
import Image from '../../assets/logo.png';

export function Navbar  () { 
  return  (
    <div className='flex flex-row justify-between items-center w-full h-28 px-5 2xl:px-40'>
      <img src={Image} alt='Logo' className='cursor-pointer h-14 sm:h-20' />
      <a href='https://huggingface.co' target='_blank' rel='noreferrer' className="ml-auto">
        <img src={Huggingface} className='w-8 h-8 sm:w-10 sm:h-10 rounded-lg cursor-pointer' />
      </a>
    </div>
  );
}