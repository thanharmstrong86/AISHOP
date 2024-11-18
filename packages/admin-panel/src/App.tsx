import React from "react";
import { HashRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import Categories from "./pages/Categories";
import Products from "./pages/Products";

const App: React.FC = () => (
  <HashRouter>
    <div className="app-wrapper flex">
      <Sidebar />
      <div className="main-content flex-1">
        <Navbar />
        <div className="content p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
      </div>
    </div>
  </HashRouter>
);

export default App;
