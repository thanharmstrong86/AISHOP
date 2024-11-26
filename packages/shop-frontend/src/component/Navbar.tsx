import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { cart } = useCart();

  return (
    <nav className="flex space-x-6 items-center">
      {/* Cart History Link */}
      <Link
        to="/cart-history"
        className="text-gray-600 hover:text-yellow-500 transition text-lg"
      >
        Cart History
      </Link>

      {/* Cart Link */}
      <Link
        to="/cart"
        className="flex items-center text-gray-600 hover:text-yellow-500 transition text-lg"
      >
        <i className="fas fa-shopping-cart mr-2"></i>
        <span>Cart ({cart.reduce((count, item) => count + item.quantity, 0)})</span>
      </Link>
    </nav>
  );
};

export default Navbar;
