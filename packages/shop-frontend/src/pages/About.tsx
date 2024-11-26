import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { Helmet } from "react-helmet";
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const About: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [aboutContent, setAboutContent] = useState<string>(''); // State for About content

  useEffect(() => {
    // Fetch About content from backend
    const fetchAboutContent = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/about`);
        setAboutContent(response.data?.content || ''); // Set the fetched content
      } catch (error) {
        console.error('Error fetching About content:', error);
      }
    };

    fetchAboutContent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert formData to a Record<string, unknown>
      const templateParams: Record<string, unknown> = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };
      await emailjs.send("service_htqof7f", "template_nz306gg", templateParams, "9HLnTFbBktjmjeULK");
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>About Us | AI Shop</title>
        <meta name="description" content="Learn more about our 40+ years of experience in providing premium coffee, tea, and groceries." />
        <meta name="keywords" content="AI Shop, coffee, tea, groceries, about us, contact" />
      </Helmet>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600">Bringing you over 40 years of experience in premium coffee, tea, and fine groceries.</p>
      </div>

      {/* Form and content here */}
      {/* Dynamic About Content */}
      <div className="mb-12">
        {aboutContent ? (
          <div
            className="prose max-w-none" // Tailwind Prose styling for rich content
            dangerouslySetInnerHTML={{ __html: aboutContent }}
          ></div>
        ) : (
          <p className="text-gray-600">Loading about content...</p>
        )}
      </div>

      {/* Contact Form */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Contact Us</h2>
        <p className="text-center text-gray-600 mb-8">Have a question or need help? Send us a message, and we’ll get back to you soon.</p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:border-yellow-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:border-yellow-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:border-yellow-500"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
          {status && <p className="mt-4 text-center text-gray-600">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default About;
