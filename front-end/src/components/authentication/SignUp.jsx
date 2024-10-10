import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const SignUp = () => {
  const [role, setRole] = useState('client'); // State to toggle between client and support agent
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize the form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    // Password mismatch check
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const payload = role === 'client'
        ? {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
          }
        : {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            companyName: data.companyName,
            department: data.department,
          };

      const endpoint = role === 'client'
        ? 'http://localhost:3000/api/v1/createclient'
        : 'http://localhost:3000/api/v1/createagent';

      const response = await axios.post(endpoint, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Response",response,"Response datt :",response.data);

      // Check for successful registration
      if (response.data.status) {
        // Show success toast with the message from the response
        toast.success(response.data.message || 'Registration successful!', {
          icon: '🎉',
        });
        reset(); // Reset the form after successful registration
      } else {
        // If the API doesn't return success, show the error message from the response
        setError(response.data.message || 'Failed to create account, please try again.');
      }
    } catch (err) {
      // Generic error message if something goes wrong with the request
      setError('Something went wrong, please try again.');
    }

    setLoading(false);
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name Input */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              {...register('firstName', { required: 'First name is required' })}
              className="w-full p-4 bg-sky-50 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600 transition"
              placeholder="Enter your first name"
            />
            {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}
          </div>

          {/* Last Name Input */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              {...register('lastName', { required: 'Last name is required' })}
              className="w-full p-4 bg-sky-50 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600 transition"
              placeholder="Enter your last name"
            />
            {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } })}
              className="w-full p-4 bg-sky-50 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600 transition"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
              className="w-full p-4 bg-sky-50 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600 transition"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', { required: 'Please confirm your password' })}
              className="w-full p-4 bg-sky-50 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600 transition"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
          </div>

          {/* Additional Fields for Support Agent */}
          {role === 'support' && (
            <>
              {/* Company Name */}
              <div>
                <label className="block text-slate-700 font-semibold mb-2" htmlFor="companyName">
                  Company Name
                </label>
                <input
                  id="companyName"
                  {...register('companyName', { required: 'Company name is required for agents' })}
                  className="w-full p-4 bg-sky-50 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600 transition"
                  placeholder="Enter your company name"
                />
                {errors.companyName && <p className="text-red-600">{errors.companyName.message}</p>}
              </div>

              {/* Department */}
              <div>
                <label className="block text-slate-700 font-semibold mb-2" htmlFor="department">
                  Department
                </label>
                <input
                  id="department"
                  {...register('department', { required: 'Department is required for agents' })}
                  className="w-full p-4 bg-sky-50 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600 transition"
                  placeholder="Enter your department"
                />
                {errors.department && <p className="text-red-600">{errors.department.message}</p>}
              </div>
            </>
          )}

          {/* Error Display */}
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-600 text-white py-4 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
