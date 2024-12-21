import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

interface ProductModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (product: any) => void;
  initialProduct: any;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  initialProduct,
}) => {
  const [product, setProduct] = useState(initialProduct);
  const [categories, setCategories] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setProduct(initialProduct);
  }, [initialProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleDetailChange = (value: string) => {
    setProduct({ ...product, detail: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid image type. Only jpg, jpeg, and png are allowed.");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image size must be less than 3MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "thanhnham");
    setImageUploading(true);

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/thanhnham/image/upload", formData);
      setProduct((prev: any) => ({ ...prev, imageUrl: response.data.secure_url }));
      toast.info("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product.name.trim() || !product.price || !product.category.trim()) {
      toast.error("Please fill all mandatory fields.");
      return;
    }
    onSubmit(product);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center overflow-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[95vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            {product._id ? "Update Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
              placeholder="Enter product price"
            />
          </div>
          <div>
            <label className="block text-gray-700">Upload Image</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
            />
            {imageUploading && <p className="text-gray-500 mt-2">Uploading image...</p>}
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
            >
              <option value="">Select a category</option>
              {categories.map((category: any) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
              placeholder="Enter product description"
              rows={3}
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Product Details</label>
            <ReactQuill
              theme="snow"
              value={product.detail || ""}
              onChange={handleDetailChange}
              className="h-48 mb-10" // Height adjustment
            />
          </div>
          {/* Buttons outside the detail box */}
          <div className="flex justify-end space-x-4 mt-15">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            >
              {product._id ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
