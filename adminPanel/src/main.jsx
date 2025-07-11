<<<<<<< HEAD
// src/main.jsx or src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
=======
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'; // or './global.css'

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
>>>>>>> a7cee864a0040b35f73a5d6d8a7b9e8c80880776
  </React.StrictMode>
);
