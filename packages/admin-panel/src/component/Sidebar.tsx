import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="sm:hidden fixed top-1 left-1 bg-gray-800 text-white p-2 rounded-md z-50"
      >
        {isOpen ? (
          <i className="fas fa-xmark"></i>// Close icon
        ) : (
          <i className="fas fa-bars"></i> // Menu icon
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white flex flex-col z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:w-64`}
      >
        <h2 className="text-2xl font-bold p-4">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="block py-2 px-4 hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              className="block py-2 px-4 hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="block py-2 px-4 hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className="block py-2 px-4 hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/about-management"
              className="block py-2 px-4 hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              About Page
            </Link>
          </li>
        </ul>
      </div>

      {/* Background Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
