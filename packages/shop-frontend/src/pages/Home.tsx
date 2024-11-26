import React from "react";
import { Helmet } from "react-helmet";
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { useCart } from '../context/CartContext';
interface HomeProps {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: Category[];
}

const Home: React.FC<HomeProps> = ({
  products,
  filteredProducts,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  categories,
}) => {
  const { addToCart } = useCart();
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
              key={category._id}
              onClick={() => setSelectedCategory(category.name)}
              className={`cursor-pointer ${selectedCategory === category.name ? "text-yellow-500" : "text-gray-500"} hover:text-yellow-500 transition`}
            >
              {category.name}
            </span>
          ))}
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
                  src={product.imageUrl || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="w-full h-full object-center object-cover transition-transform transform group-hover:scale-105"
                />
              </div>
              <div className="pt-4">
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">${product.price.toFixed(2)}</p>
                <button
                  onClick={() =>
                    addToCart({
                      productId: product._id,
                      name: product.name,
                      price: product.price,
                    })
                  }
                  className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
