import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [shippingDetails, setShippingDetails] = useState({ address: '', phone: '' });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    try {
      if (!shippingDetails.address || !shippingDetails.phone) {
        alert("Please provide complete shipping details.");
        return;
      }

      if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      // Prepare order data
      const orderData = {
        phone: shippingDetails.phone,
        products: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        shippingDetails: {
          address: shippingDetails.address,
        },
        totalPrice: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      };

      setLoading(true);

      // Send order to the backend
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, orderData);

      alert("Order placed successfully!");

      // Clear the cart after successful order placement
      clearCart();

      // Optionally reset shipping details
      setShippingDetails({ address: '', phone: '' });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty.</p>
          <a href="/" className="text-blue-500 underline">Continue Shopping</a>
        </div>
      ) : (
        <div>
          {/* Cart Items */}
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.productId} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price} x {item.quantity}</p>
                  <p className="text-gray-600">
                    <strong>Subtotal:</strong> ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Total */}
          <div className="text-right text-xl font-bold mb-6">
            Total: $
            {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </div>

          {/* Shipping Details */}
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={shippingDetails.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none"
            />
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={shippingDetails.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className={`w-full py-3 text-white rounded-md transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-yellow-500 hover:bg-yellow-600'
            }`}
            disabled={loading}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>

          {/* Back to Home Link */}
          <div className="mt-6 text-center">
            <a href="/" className="text-blue-500 underline">← Continue Shopping</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
