import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [loading, setLoading] = useState(false); // Loading state example

  const handleButtonClick = () => {
    setLoading(true); // Example: simulate loading when a button is clicked
    setTimeout(() => setLoading(false), 2000); // Remove loading after 2 seconds
  };

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col justify-center items-center overflow-hidden ">
      {/* Main Container */}
      <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-[800px] w-full mx-4 animate-fade-in space-y-9">

        {/* Title Section */}
        <h1 className="text-4xl font-bold text-slate-800 text-center">
          Welcome to the Support System
        </h1>
        <p className="text-lg text-cyan-700 text-center max-w-[600px] mx-auto">
          Simplifying your support experience. Sign up or log in below to get started!
        </p>

        {/* Buttons Section */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Sign Up Button with Tooltip */}
          <Link to='/signup'>
          <button
            className="relative w-48 h-14 bg-cyan-700 text-white rounded-full shadow-lg hover:bg-cyan-600 transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
            aria-label="Sign Up for the Support System"
            onClick={handleButtonClick}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              'Sign Up'
            )}
            <span className="absolute bottom-full mb-2 hidden group-hover:block text-sm text-white bg-slate-800 p-1 rounded">
              Create a new account
            </span>
          </button>
          </Link>

          {/* Client Login Button */}
          <Link to='/login'>
          <button
            className="relative w-48 h-14 bg-white text-slate-800 border-2 border-cyan-700 rounded-full shadow-lg hover:bg-sky-200 hover:border-sky-200 transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
            aria-label="Login as Client"
            onClick={handleButtonClick}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-cyan-700 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              'Client Login'
            )}
          </button>
          </Link>

          {/* Support-Agent Login Button */}
          <Link to='/login'>
            <button
            className="relative w-48 h-14 bg-slate-800 text-white rounded-full shadow-lg hover:bg-slate-700 transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
            aria-label="Login as Support Agent"
            onClick={handleButtonClick}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              'Support-Agent Login'
            )}
          </button>

          </Link>

        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-slate-600">
        &copy; 2024 Support System | <a href="#" className="underline hover:text-cyan-700">Privacy Policy</a> | <a href="#" className="underline hover:text-cyan-700">Terms of Service</a>
      </footer>
    </div>
  );
};

export default Home;
