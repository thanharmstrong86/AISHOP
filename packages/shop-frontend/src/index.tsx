import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { CartProvider } from './context/CartContext';
// Type-safe root element
const rootElement = document.getElementById("root") as HTMLElement;

// Create root and render
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <CartProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </CartProvider>
  </React.StrictMode>
);

// Report web vitals
reportWebVitals();
