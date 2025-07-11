import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import Avatar from "../assets/avatar.png";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSuccess = (response: CredentialResponse) => {
    if (response.credential) {
      Cookies.set("access_token", response.credential);
      navigate("/");
    } else {
      console.warn("Nenhum token encontrado na resposta.");
    }
  };

  const handleError = () => {
    console.error("Erro ao fazer login com o Google.");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-abstract">
      <div className="text-center mb-6">
        <h1 className="text-xl sm:text-3xl font-light text-gray-200">
          Seja bem-vindo ao
          <span className="font-semibold text-white"> GEN A</span>
          <span className="text-[#2afbc2] font-semibold">i</span>
        </h1>

        <div className="w-260 sm:w-320 h-80 mt-8 bg-white/20 shadow-lg rounded-lg flex flex-col items-center justify-center mb-8">
          <img
            src={Avatar}
            alt="Visitante"
            className="w-36 h-36 rounded-full border-4 border-white my-4"
          />
          <h2 className="text-xl sm:text-3xl mt-4 text-white">
            Olá, <span className="text-[#3ff1b1] font-semibold">visitante</span>!
          </h2>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
            theme="filled_black"
            shape="rectangular"
            width="420"
          />
        </div>
      </div>
    </div>
  );
}


