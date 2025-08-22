import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactUsPage = () => {
  return (
    <div className="min-h-screen  text-gray-200 font-sans p-2">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Apne sawal, feedback ya sujhav ham tak pahunchaiye.
        </p>
      </header>

      {/* Main Content Sections */}
      <main className="container mx-auto">
        {/* Contact Information Section */}
        <section className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center justify-center mb-6">
            <Mail className="h-10 w-10 text-yellow-400 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Contact Information
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-center">
            <div className="p-6 bg-gray-800 rounded-lg">
              <Phone className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
              <p className="text-gray-300">+91 8707539855</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <Mail className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-300">theapnasquad@gmail.com</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <MapPin className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Office Address
              </h3>
              <p className="text-gray-300">Kushinagar, India</p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center justify-center mb-6">
            <Mail className="h-10 w-10 text-yellow-400 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Send Us a Message
            </h2>
          </div>
          <form className="max-w-xl mx-auto space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-400 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-400 mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-400 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ContactUsPage;
