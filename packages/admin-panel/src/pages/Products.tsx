import React, { useState, useEffect } from "react";
import { Product } from '../models/Product';
import axios from 'axios';
const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    _id: "",
    name: "",
    price: 0,
    imageUrl: "",
    category: "",
    description: "",
  });
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/products`
        );
        const categoryResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/categories`
        );

        const productsData = await productResponse.json();
        let categoriesData = await categoryResponse.json();
        categoriesData = [{ name: "All" }, ...categoriesData];

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setNewProduct({
      _id: "",
      name: "",
      price: 0,
      imageUrl: "",
      category: "",
      description: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "thanhnham"); // Replace with Cloudinary upload preset
    formData.append("cloud_name", "thanhnham");
    setImageUploading(true);

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/thanhnham/image/upload", formData); // Replace with Cloudinary URL
      setNewProduct((prev) => ({ ...prev, imageUrl: response.data.secure_url }));
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (newProduct._id) {
        // Update product
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/products/${newProduct._id}`, newProduct);
        alert("Product updated successfully!");
        // Update the product in the state
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === response.data._id ? response.data : product
          )
        );
      } else {
        // Create product
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products`, newProduct);
        setProducts((prev) => [...prev, response.data]);
        alert("Product created successfully!");
      }
      closeModal();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("An error occurred while saving the product.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`); // Replace with your backend endpoint
      setProducts((prev) => prev.filter((product) => product._id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdate = (product: any) => {
    // Logic for updating a product (open modal prefilled with product data)
    setNewProduct(product);
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
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding or Updating Product */}
      {/* {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {newProduct._id ? "Update Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  placeholder="Enter product name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  placeholder="Enter product price"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Upload Image</label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:border-yellow-500"
                />
                {imageUploading && <p className="text-gray-500">Uploading image...</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={newProduct.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  placeholder="Enter product category"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  placeholder="Enter product description"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  {newProduct._id ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}

      {/* Modal for Adding or Updating Product */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {newProduct._id ? "Update Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  placeholder="Enter product name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  placeholder="Enter product price"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Current Image</label>
                {newProduct.imageUrl && (
                  <div className="w-20 h-20 bg-gray-100 border rounded-md mb-2">
                    <img
                      src={newProduct.imageUrl}
                      alt="Current Product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <label className="block text-gray-700">Upload New Image</label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:border-yellow-500"
                />
                {imageUploading && <p className="text-gray-500">Uploading image...</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={newProduct.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  placeholder="Enter product category"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  placeholder="Enter product description"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  {newProduct._id ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Products;
