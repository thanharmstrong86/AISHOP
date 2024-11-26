import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill'; // Rich text editor
import 'react-quill/dist/quill.snow.css'; // Editor styling

const AboutManagement: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch the existing About content
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/about`);
        setContent(response.data?.content || '');
      } catch (error) {
        console.error('Error fetching About content:', error);
      }
    };

    fetchContent();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/about`, { content });
      alert('Content updated successfully!');
    } catch (error) {
      console.error('Error updating About content:', error);
      alert('Failed to update content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage About Page Content</h1>

      {/* Rich Text Editor */}
      <ReactQuill
        value={content}
        onChange={setContent}
        className="mb-6"
        theme="snow"
        placeholder="Write the content for the About page here..."
      />

      {/* Save Button */}
      <button
        onClick={handleSave}
        className={`px-6 py-2 text-white rounded-md transition ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Content'}
      </button>
    </div>
  );
};

export default AboutManagement;
