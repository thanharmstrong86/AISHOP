import React, { useEffect, useState } from 'react';
  import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import { Product } from './models/Product';
import Navbar from "./component/Navbar";
import CartPage from './pages/Cart'; 
import OrderHistoryPage from './pages/OrderHistoryPage';
import { ToastContainer } from 'react-toastify';
import ProductDetail from './pages/ProductDetail';
import { FOOTER_LINKS } from './constants/constants';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const [categoryResponse, productResponse] = await Promise.all([
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`),
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
        ]);
  
        // Handle categories data
        let categoriesData = await categoryResponse.json();
        categoriesData = [{ name: 'All' }, ...categoriesData]; // Add "All" to the beginning
        setCategories(categoriesData);
  
        // Handle products data
        const productsData = await productResponse.json();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchCategoriesAndProducts();
  }, []);  

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tight text-gray-800 hover:text-yellow-500 transition">
          <img src={`${process.env.PUBLIC_URL}/logo.jpg`} alt="Logo" className="h-10" />
          </Link>
          <Navbar />
        </div>
      </header>
      
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto mt-6 px-4 sm:px-6 lg:px-8 text-gray-600">
        <nav className="flex">
          <Link to="/" className="text-gray-500 hover:text-yellow-500">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/about" className="text-gray-500 hover:text-yellow-500">About Us</Link>
        </nav>
      </div>

      {/* Routing for Pages */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              filteredProducts={filteredProducts}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              categories={categories}
            />
          }
        />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<CartPage />} /> {/* Add the /cart route */}
        <Route path="/cart-history" element={<OrderHistoryPage />} />
      </Routes>

      <footer className="bg-gray-200 text-gray-700 py-6">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <p className="text-sm">© 2024 My Shop. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href={FOOTER_LINKS.FACEBOOK} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href={FOOTER_LINKS.GOOGLE_MAPS} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <i className="fas fa-map-marker-alt"></i> Google Maps
            </a>  
          </div>
        </div>
      </footer>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
