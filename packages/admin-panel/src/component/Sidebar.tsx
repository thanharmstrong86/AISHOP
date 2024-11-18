  import React from "react";
  import { Link } from "react-router-dom";

  const Sidebar: React.FC = () => (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <h2 className="text-2xl font-bold p-4">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="block py-2 px-4 hover:bg-gray-700">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/categories" className="block py-2 px-4 hover:bg-gray-700">
            Categories
          </Link>
        </li>
        <li>
          <Link to="/products" className="block py-2 px-4 hover:bg-gray-700">
            Products
          </Link>
        </li>
      </ul>
    </div>
  );

  export default Sidebar;