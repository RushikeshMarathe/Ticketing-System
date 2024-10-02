import React, { useState } from 'react';

const SignUp = () => {
  const [role, setRole] = useState('client'); // State to toggle between client and support agent
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    department: '', // New field for Support Agent
    team: '', // New field for team assignment
    isTeamLeader: false // Field for Team Leader status
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');

    // Simulate form submission process
    setTimeout(() => {
      setLoading(false);
      alert(`${role.charAt(0).toUpperCase() + role.slice(1)} account created successfully`);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-sky-100 to-cyan-100 p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-lg w-full p-10 transform transition-transform hover:scale-105">
        <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">
          {role === 'client' ? 'Client Sign Up' : 'Support Agent Sign Up'}
        </h1>

        {/* Role Toggle */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`py-2 px-6 font-semibold rounded-full transition-all ${role === 'client' ? 'bg-cyan-700 text-white' : 'bg-slate-200 text-slate-800 hover:bg-cyan-100'}`}
            onClick={() => setRole('client')}
          >
            Client Sign Up
          </button>
          <button
            className={`py-2 px-6 font-semibold rounded-full transition-all ${role === 'support' ? 'bg-cyan-700 text-white' : 'bg-slate-200 text-slate-800 hover:bg-cyan-100'}`}
            onClick={() => setRole('support')}
          >
            Support Agent Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 bg-sky-50 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600 transition"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 bg-sky-50 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600 transition"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 bg-sky-50 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600 transition"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2" htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-4 bg-sky-50 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600 transition"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Additional Fields for Support Agent */}
          {role === 'support' && (
            <>
              {/* Company Name */}
              <div>
                <label className="block text-slate-700 font-semibold mb-2" htmlFor="companyName">Company Name</label>
                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full p-4 bg-sky-50 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600 transition"
                  placeholder="Enter your company name"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-slate-700 font-semibold mb-2" htmlFor="department">Department</label>
                <input
                  id="department"
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full p-4 bg-sky-50 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600 transition"
                  placeholder="Enter your department"
                  required
                />
              </div>

              {/* Team Assignment */}
              {/* <div>
                <label className="block text-slate-700 font-semibold mb-2" htmlFor="team">Assign Team</label>
                <input
                  id="team"
                  type="text"
                  name="team"
                  value={formData.team}
                  onChange={handleChange}
                  className="w-full p-4 bg-sky-50 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600 transition"
                  placeholder="Enter your team name"
                  required
                />
              </div> */}

              {/* Team Leader Checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  id="isTeamLeader"
                  type="checkbox"
                  name="isTeamLeader"
                  checked={formData.isTeamLeader}
                  onChange={handleChange}
                  className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                />
                <label htmlFor="isTeamLeader" className="text-slate-700 font-semibold">Are you the Team Leader?</label>
              </div>
            </>
          )}

          {/* Error Message */}
          {error && <p className="text-red-600 font-semibold">{error}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full h-12 bg-cyan-700 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-600 focus:ring-offset-2 transition-all transform hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-2">Creating Account...</span>
                </div>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
