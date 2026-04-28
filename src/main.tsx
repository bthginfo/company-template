import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import App from './App';
import { SmoothScroll } from './components/SmoothScroll';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SmoothScroll />
      <App />
      <Toaster position="top-right" richColors closeButton expand={false} />
    </BrowserRouter>
  </React.StrictMode>
);
