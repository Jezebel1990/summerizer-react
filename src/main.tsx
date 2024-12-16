import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import LoginPage from './pages/LoginPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

const onLoginSuccess = (userData: any) => {
  console.log('Login bem-sucedido:', userData);

  const token = userData?.token;
  if (token) {
  } else {
    console.error('Nenhum token retornado no login bem-sucedido.');
  }
};

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}> 
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage
                onLoginSuccess={onLoginSuccess}
                onLoginFailure={() => console.error('Falha ao fazer login')}
              />
            }
          />
          <Route path="/app" element={<App />} />
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
