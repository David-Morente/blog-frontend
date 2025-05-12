import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Navbar } from './components/Navbar.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <div>
      <Navbar />
      <App />
    </div>
  </BrowserRouter>
)
