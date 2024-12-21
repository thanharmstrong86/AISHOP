import React, { useState, useEffect } from "react";
import { Product } from '../models/Product';
import axios from 'axios';
import ProductModal from "../component/ProductModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState({
    _id: "",
    name: "",
    price: 0,
    imageUrl: "",
    category: "",
    description: "",
    detail: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/products`
        );
        const categoryResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/categories`
        );

        const productsData = productResponse.data;
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setCurrentProduct({
      _id: "",
      name: "",
      price: 0,
      imageUrl: "",
      category: "",
      description: "",
      detail: "",
    });
  };

  const handleSave = async (product: any) => {
    try {
      if (product._id) {
        // Update product
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/products/${product._id}`, product);
        toast.info("Product updated successfully!");
        // Update the product in the state
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === response.data._id ? response.data : product
          )
        );
      } else {
        // Create product
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products`, product);
        setProducts((prev) => [...prev, response.data]);
        toast.info("Product created successfully!");
      }
    } finally {
      setShowModal(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return; // Exit if the user cancels

    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`); // Replace with your backend endpoint
      setProducts((prev) => prev.filter((product) => product._id !== id));
      toast.info("Product deleted successfully!");
    } catch (error: any) {
      // Log the error for debugging
      console.error('Error deleting product:', error);
  
      // Check if the error has a response and a message
      if (error.response && error.response.data && error.response.data.error) {
        // Show the backend-provided error message
        toast.error(error.response.data.error);
      } else {
        // Default generic error message
        toast.error("An error occurred while deleting the product.");
      }
    }
  };

  const handleUpdate = (product: any) => {
    // Logic for updating a product (open modal prefilled with product data)
    setCurrentProduct(product);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-700">Products</h1>
        <button
          onClick={openModal}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
        >
          <i className="fas fa-plus mr-2"></i> New
        </button>
      </div>

      {/* Product Table */}
      <table className="w-full table-auto border-collapse bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id || index} className="border-b">
              <td className="px-4 py-2">
                <div className="w-16 h-16 bg-gray-100 overflow-hidden">
                  <img
                    src={product.imageUrl || "https://via.placeholder.com/150"}
                    alt={product.name || "Product image"}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
              </td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">${product.price}</td>
              <td className="px-4 py-2">{product.category}</td>
              <td className="px-4 py-2">{product.description}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleUpdate(product)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  title="Update"
                >
                  <i className="fas fa-pen"></i>
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  title="Delete"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding or Updating Product */}
      <ProductModal
        isVisible={showModal}
        onClose={closeModal}
        onSubmit={handleSave}
        initialProduct={currentProduct}
      />

    </div>
  );
};

export default Products;
