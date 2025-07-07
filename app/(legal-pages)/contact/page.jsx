import React from 'react';

const ContactUsPage = () => {
  return (
    <div className="bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 min-h-screen w-full pb-12 pt-5">
      <div className="max-w-xl mx-auto text-center space-y-6 mt-12">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-lg text-gray-700">
          Have questions, feedback, or suggestions? Fill out the form below and we'll get back to you as soon as possible.
        </p>
        <form className="space-y-4 max-w-md mx-auto">
          <input type="text" placeholder="Your Name" className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none" />
          <input type="email" placeholder="Your Email" className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none" />
          <textarea placeholder="Your Message" rows={5} className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none" />
          <button type="submit" className="bg-indigo-500 text-white px-6 py-2 rounded font-semibold shadow hover:bg-indigo-600 transition">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;