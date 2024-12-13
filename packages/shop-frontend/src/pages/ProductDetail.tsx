import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1); // Quantity state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(
      {
        productId: product._id,
        name: product.name,
        price: product.price,
      },
      quantity // Pass the selected quantity
    );
    navigate("/"); // Redirect to homepage
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <button onClick={() => navigate("/")} className="text-blue-500 mb-4">
        ← Back to Homepage
      </button>
      <div className="flex">
        <img
          src={product.imageUrl || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-1/2 h-auto"
        />
        <div className="ml-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-700 my-4">${product.price}</p>
          <div dangerouslySetInnerHTML={{ __html: product.detail }}></div>

          {/* Quantity Selector */}
          <div className="flex items-center mt-4">
            <button
              onClick={decreaseQuantity}
              className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              -
            </button>
            <span className="mx-4 text-lg">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
