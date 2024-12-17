import { useNavigate } from 'react-router-dom';
import Huggingface from '../../assets/huggingface.svg';
import Image from '../../assets/logo.png';
import Cookies from 'js-cookie';
import { MdOutlineLogout } from "react-icons/md";

export function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('access_token');
    navigate('/login');
  };

  return (
    <div className='flex flex-row justify-between items-center w-full h-28 px-5 2xl:px-20'>
      <img src={Image} alt='Logo' className='cursor-pointer h-12 sm:h-20' />
      <div className='flex items-center'>
        <a href='https://huggingface.co' target='_blank' rel='noreferrer' className="ml-auto">
          <img src={Huggingface} className='w-8 h-8 sm:w-10 sm:h-10 rounded-lg cursor-pointer' />
        </a>
        <MdOutlineLogout
          onClick={handleLogout}
          className="ml-4 text-white text-3xl cursor-pointer"
           />
      </div>
    </div>
  );
}
