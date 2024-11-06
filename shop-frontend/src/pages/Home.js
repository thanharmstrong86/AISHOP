// src/pages/Home.js
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

function Home({
  products,
  filteredProducts,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  categories
}) {
  // Modal state and event handlers
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    imageUrl: '',
    category: '',
    description: ''
  });
  const [imageUploading, setImageUploading] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageUpload = async (event) => {
    // Image upload logic here...
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send POST request to the backend to create a new product
    // Reset form after submission and close modal
    closeModal();
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Home | AI Shop</title>
        <meta name="description" content="Explore our exclusive collection of coffee, tea, food, and beauty products." />
        <meta name="keywords" content="AI Shop, coffee, tea, food, beauty products, shop online" />
      </Helmet>
      {/* Category and Search Section */}
      <div className="container mx-auto mt-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex space-x-4 text-gray-600">
          {categories.map((category) => (
            <span
              key={category._id} // Assuming `_id` is the unique identifier
              onClick={() => setSelectedCategory(category.name)}
              className={`cursor-pointer ${selectedCategory === category.name ? 'text-yellow-500' : 'text-gray-500'} hover:text-yellow-500 transition`}
            >
              {category.name}
            </span>
          ))}
        </div>
        {/* New Button */}
        <div className="flex space-x-4 text-gray-600">
          <span 
            className="cursor-pointer text-gray-500 hover:text-yellow-500 transition flex items-center"
            onClick={openModal}
          >
            <i className="fas fa-plus mr-2"></i> {/* Plus icon */}
            New
          </span>
        </div>
        <div className="flex space-x-4 text-gray-600">
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:border-yellow-500"
          />
        </div>
      </div>

      {/* Product Grid */}
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="group relative bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="w-full h-64 bg-gray-100 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-center object-cover transition-transform transform group-hover:scale-105"
                />
              </div>
              <div className="pt-4">
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal for Adding New Product */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:border-yellow-500"
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
                  className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:border-yellow-500"
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
                  className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:border-yellow-500"
                  placeholder="Enter product category"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:border-yellow-500"
                  placeholder="Enter product description"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
                  disabled={imageUploading}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
