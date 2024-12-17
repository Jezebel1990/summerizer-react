import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from "js-cookie"; // Importa para ler o token
import App from "./App";
import LoginPage from "./pages/LoginPage";
import "./index.css";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!googleClientId) {
  throw new Error("Google Client ID is not defined. Check your .env file.");
}

const token = Cookies.get("access_token");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <Routes>
          <Route path="/" element={token ? <App /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  </StrictMode>
);
