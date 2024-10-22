import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);  // State for showing the modal
  const [newProduct, setNewProduct] = useState({ name: '', price: ''});
  useEffect(() => {
    // Fetch products from the backend
    fetch('http://localhost:5001/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const openModal = () => setShowModal(true);    // Function to show modal
  const closeModal = () => setShowModal(false);   // Function to hide modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send POST request to the backend to create a new product
    const response = await fetch('http://localhost:5001/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      const createdProduct = await response.json();
      setProducts([...products, createdProduct]); // Add the new product to the existing list
      closeModal(); // Close the modal after submission
    } else {
      console.error('Error creating product');
    }
  };

  return (
    
    <div className="min-h-screen bg-white">
      <header className="py-6 shadow-md">
        <h1 className="text-center text-4xl font-bold tracking-wide text-gray-800">
          Our Exclusive Products
        </h1>
      </header>

      {/* Breadcrumb section */}
      <div className="container mx-auto mt-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex space-x-4 text-gray-600">
          <span className="cursor-pointer text-yellow-500">All</span>
        </div>
        {/* New "Breadcrumb-style" button */}
        <div className="flex space-x-4 text-gray-600">
          <span 
            className="cursor-pointer text-gray-500 hover:text-yellow-500 transition"
            onClick={openModal}
          >
            New
          </span>
        </div>
      </div>

      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Grid Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="group relative bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="w-full h-64 bg-gray-100 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-center object-cover transition-transform transform group-hover:scale-105"
                />
              </div>
              <div className="pt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal for adding new product */}
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
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-6">
        <p className="text-center text-sm">
          © 2024 My Shop. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
