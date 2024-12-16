import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import LoginPage from './pages/LoginPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Funções de sucesso e falha no login
const onLoginSuccess = (userData: any) => {
  console.log('Login bem-sucedido:', userData);
};

const onLoginFailure = (error: any) => {
  console.log('Erro no login:', error);
};

// Acessando a variável de ambiente corretamente no Vite
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}> {/* Usando a variável de ambiente */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage onLoginSuccess={onLoginSuccess} onLoginFailure={onLoginFailure} />} />
          <Route path="/app" element={<App />} />
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
