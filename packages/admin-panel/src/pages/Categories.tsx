import React, { useState, useEffect } from "react";
import { Category } from '../models/Category';
import axios from "axios";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]); // List of categories
  const [newCategory, setNewCategory] = useState<Category>({ _id: "", name: "" }); // Single category
  const [showModal, setShowModal] = useState(false);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data: Category[] = await response.json();
        setCategories(data); // Update state with fetched categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      if (newCategory._id) {
        // Update category
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/categories/${newCategory._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCategory),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update category");
        }
        const updatedCategory = await response.json();
  
        // Update state with the updated category
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === updatedCategory._id ? updatedCategory : category
          )
        );
        alert("Category updated successfully!");
      } else {
        // Create category
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/categories`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCategory),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to create category");
        }
        const createdCategory = await response.json();
  
        // Add the new category to state
        setCategories((prevCategories) => [...prevCategories, createdCategory]);
        alert("Category created successfully!");
      }
  
      // Reset form and close modal
      setNewCategory({ _id: "", name: "" });
      closeModal();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("An error occurred while saving the category.");
    }
  };
  
  const handleDelete = async (categoryId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return; // Exit if the user cancels
  
    try {
      // Send DELETE request using Axios
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/categories/${categoryId}`);
  
      // Remove the deleted category from the state
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryId)
      );
  
      alert("Category deleted successfully!");
    } catch (error: any) {
      // Log the error for debugging
      console.error("Error deleting category:", error);
  
      // Handle specific backend error messages
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); // Show the specific backend error message
      } else {
        alert("An error occurred while deleting the category."); // Generic fallback message
      }
    }
  };

  const handleUpdate = (category: Category) => {
    setNewCategory(category);
    setShowModal(true);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-700">Categories</h1>
        <button
          onClick={openModal}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
        >
          <i className="fas fa-plus mr-2"></i> New
        </button>
      </div>

      {/* Category Table */}
      <table className="w-full table-auto border-collapse bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="border-b">
              <td className="px-4 py-2">{category.name}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleUpdate(category)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  title="Update"
                  >
                  <i className="fas fa-pen"></i>
                </button>
                <button
                  onClick={() => handleDelete(category._id!)}
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

      {/* Modal for Adding or Updating Category */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {newCategory._id ? "Update Category" : "Add New Category"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Category Name</label>
                <input
                  type="text"
                  name="name"
                  value={newCategory.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  placeholder="Enter category name"
                />
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
                  {newCategory._id ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
