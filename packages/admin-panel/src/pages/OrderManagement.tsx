import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Order } from '../models/Order'; // Import the Order model

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]); // Use Order[] as the state type

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/orders/${orderId}`,
        { status: newStatus }
      );
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? response.data : order))
      );
      alert('Order status updated!');
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Management</h1>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-700 uppercase tracking-wider">
                Total Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {order.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                  ${order.totalPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-600'
                        : order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-600'
                        : order.status === 'Cancelled'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleStatusChange(order._id, 'Shipped')}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-600 transition"
                    >
                      Ship
                    </button>
                    <button
                      onClick={() => handleStatusChange(order._id, 'Delivered')}
                      className="bg-green-500 text-white px-3 py-1 rounded-md text-xs hover:bg-green-600 transition"
                    >
                      Deliver
                    </button>
                    <button
                      onClick={() => handleStatusChange(order._id, 'Cancelled')}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
