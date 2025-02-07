import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken,setLoading, setUser, setRole } from '../../slices/authSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { BASE_URL,loading } = useSelector((state) => state.auth);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setError(''); // Clear previous error messages
  
    try {
      // Ensure the environment variable is accessed correctly
      if (!BASE_URL) {
        throw new Error("BASE_URL is not defined in the environment variables.");
      }
  
      // Debug log for BASE_URL
      console.log("BASE_URL:", BASE_URL);
  
      // Make the API request
      const response = await axios.post(
        `${BASE_URL}login`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      const responseData = response.data;
  
      if (responseData.success) {
        console.log('Log In successful:', responseData.message);
  
        // Notify user about successful login
        toast.success("Logged in Successfully!..", {
          icon: '👏', // Built-in emoji icon
        });
  
        // Save the token to localStorage and Redux
        localStorage.setItem('token', responseData.token);
        dispatch(setToken(responseData.token));
        dispatch(setUser(responseData.user)); 
        // console.log("response :",responseData.user.role);
        dispatch(setRole(responseData.user.role));
        navigate('/');

        
      } else {
        console.error('Log In failed:', responseData.message);
        toast.error('Log In failed: ' + responseData.message);
      }
    } catch (error) {
      console.error('Error during Log In:', error.response ? error.response.data.message : error.message);
      toast.error('An error occurred during Log In: ' + (error.response ? error.response.data.message : error.message));
    } finally {
      // Always stop loading spinner
      dispatch(setLoading(false));
    }


    
  };
  

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 lg:p-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
        </h1>

      

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
