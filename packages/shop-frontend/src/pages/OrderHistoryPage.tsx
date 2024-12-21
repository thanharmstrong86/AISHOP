import React, { useState } from 'react';
import axios from 'axios';
import { Order } from '../models/Order'; // Import the Order model

const OrderHistoryPage: React.FC = () => {
  const [phone, setPhone] = useState<string>(''); // Explicit type for phone
  const [orders, setOrders] = useState<Order[]>([]); // Use Order[] as the state type
  const [loading, setLoading] = useState<boolean>(false); // For loading state

  const handleSearch = async () => {
    if (!phone.trim()) {
      alert('Please enter a valid phone number.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders/phone/${phone}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Order History</h1>

      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Order List */}
      {orders.length === 0 && !loading ? (
        <p className="text-gray-600 text-center">No orders found. Enter your phone number to search.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-semibold text-gray-800">Order ID: {order._id}</p>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'Delivered'
                      ? 'bg-green-100 text-green-600'
                      : order.status === 'Shipped'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-gray-600 mb-1">
                <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
              </p>
              <p className="text-gray-600">
                <strong>Address:</strong> {order.shippingDetails.address}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
