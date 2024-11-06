// src/pages/About.js
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Helmet } from 'react-helmet';

function About() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with your EmailJS credentials
      await emailjs.send('service_htqof7f', 'template_nz306gg', formData, '9HLnTFbBktjmjeULK');
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Helmet for SEO */}
      <Helmet>
        <title>About Us | AI Shop</title>
        <meta name="description" content="Learn more about our 40+ years of experience in providing premium coffee, tea, and groceries." />
        <meta name="keywords" content="AI Shop, coffee, tea, groceries, about us, contact" />
      </Helmet>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600">
          Bringing you over 40 years of experience in premium coffee, tea, and fine groceries.
        </p>
      </div>

      {/* About Information */}
      <div className="flex flex-col md:flex-row items-center md:space-x-12 space-y-8 md:space-y-0">
        <div className="md:w-1/2">
          <img
            src="https://via.placeholder.com/600x400"
            alt="Our Shop"
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Quán Liên Phong has been a cornerstone of quality, offering a curated selection of coffee, tea, and grocery items for over four decades. Our shop is a place where tradition meets quality, and customers can find products sourced with care and expertise.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Located in the heart of TPHCM, we have built a legacy of trust and excellence, serving our local community with passion and dedication.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700">Address</h3>
          <p className="text-gray-600">158 Nguyễn Tiểu La, Phường 5, Quận 10, TPHCM</p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700">Contact Person</h3>
          <p className="text-gray-600">Cô Liên</p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700">Email</h3>
          <p className="text-gray-600">nhamchithanh@gmail.com</p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700">Phone</h3>
          <p className="text-gray-600">38 562762</p>
        </div>
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
}

export default About;
