import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const accessTokenRegex = /access_token=([^&]+)/;
    const isMatch = window.location.href.match(accessTokenRegex);

    if (isMatch) {
      const accessToken = isMatch[1];
      Cookies.set("access_token", accessToken);
      setIsLoggedin(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  const handleSuccess = (response: CredentialResponse) => {
    if (response.credential) {
      Cookies.set("access_token", response.credential);
      setIsLoggedin(true);
    }
  };

  const handleError = () => {
    console.error("Erro ao fazer login com o Google.");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-abstract">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-light text-gray-200">
          Seja bem-vindo ao
          <span className="font-semibold text-white"> GEN A</span>
          <span className="text-[#2afbc2] font-semibold">i</span>
        </h1>
        <div className="w-320 h-80 mt-8 bg-white/20 shadow-lg rounded-lg flex flex-col items-center justify-center mb-8">
          <img
            src="https://r2.erweima.ai/imgcompressed/compressed_300167030ea6a6ab25faa7a64e128960.webp"
            alt="Visitante"
            className="w-36 h-36 rounded-full border-4 border-white my-4"
          />
          <h2 className="text-3xl mt-4 text-white">
            Olá, <span className="text-[#3ff1b1] font-semibold">visitante</span>!
          </h2>
        </div>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
          theme="filled_black"
          shape="rectangular"
          size="large"
        />
      </div>
    </div>
  );
}



