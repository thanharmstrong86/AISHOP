import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Helmet } from "react-helmet";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const About: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

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
    </div>
  );
};

export default About;
