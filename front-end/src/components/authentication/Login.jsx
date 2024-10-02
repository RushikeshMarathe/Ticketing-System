import React, { useState } from 'react';

const Login = () => {
  const [role, setRole] = useState('client'); // Toggle between 'client' and 'agent'
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate form submission process
    setTimeout(() => {
      setLoading(false);
      alert(`${role === 'client' ? 'Client' : 'Support Agent'} logged in successfully`);
    }, 2000);
  };

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 lg:p-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          {role === 'client' ? 'Client Login' : 'Support Agent Login'}
        </h1>

        {/* Toggle buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <button
            className={`w-full sm:w-auto h-12 px-4 rounded-lg font-semibold text-white transition-all ${
              role === 'client' ? 'bg-cyan-700' : 'bg-slate-400 hover:bg-slate-500'
            }`}
            onClick={() => setRole('client')}
          >
            Client Login
          </button>
          <button
            className={`w-full sm:w-auto h-12 px-4 rounded-lg font-semibold text-white transition-all ${
              role === 'agent' ? 'bg-cyan-700' : 'bg-slate-400 hover:bg-slate-500'
            }`}
            onClick={() => setRole('agent')}
          >
            Support Agent Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-slate-800 font-semibold mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-cyan-700"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-slate-800 font-semibold mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-cyan-700"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 font-semibold">{error}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full h-12 bg-cyan-700 text-white rounded-lg shadow-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2 transition-transform transform hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-2">Logging in...</span>
                </div>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
