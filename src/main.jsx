import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

AOS.init();
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ToastContainer />
    <App />
  </BrowserRouter>
)
