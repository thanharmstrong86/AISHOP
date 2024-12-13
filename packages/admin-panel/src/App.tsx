import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import OrderManagement from "./pages/OrderManagement";
import AboutManagement from "./pages/AboutManagement";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => (
  <HashRouter>
    <div className="app-wrapper flex relative">
      <Sidebar />
      <div className="main-content flex-1 sm:ml-64">
        <Navbar />
        <div className="content p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/about-management" element={<AboutManagement />} />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  </HashRouter>
);

export default App;
