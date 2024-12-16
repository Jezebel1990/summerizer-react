import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Cookies from "js-cookie";

interface LoginProps {
  onLoginSuccess: (userData: any) => void;
}

const LoginPage: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const handleLoginSuccess = (response: any) => {
    const userData = {
      token: response.credential, 
    };


    Cookies.set("auth_token", userData.token, { expires: 7 });
    onLoginSuccess(userData);
  };

  function handleLoginFailure(): void {
    console.error('Erro no login');
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-abstract">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-light text-gray-200">Seja bem-vindo ao<span className='font-semibold text-white'> GEN A</span ><span className='text-[#2afbc2] font-semibold'>i</span></h1>
        <div className="w-320 h-80  mt-8 bg-white/20 shadow-lg rounded-lg flex flex-col items-center justify-center mb-8">
        <img
            src="https://r2.erweima.ai/imgcompressed/compressed_300167030ea6a6ab25faa7a64e128960.webp"
            alt="Visitante"
            className="w-36 h-36 rounded-full border-4 border-white my-4"
          />
          <h2 className="text-3xl mt-4 text-white">Olá, <span className='text-[#3ff1b1] font-semibold'>visitante</span>!</h2>
          </div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
        useOneTap
        theme="filled_black"
        width="420" 
        shape="rectangular"
        size="large" 
      />
    
    </div>
    </div>
  );
};

export default LoginPage;
