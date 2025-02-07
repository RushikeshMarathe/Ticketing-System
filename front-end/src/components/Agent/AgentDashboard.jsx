import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom'; // Added Navigate import
import { AiOutlineHome, AiOutlinePlusCircle, AiOutlineUser, AiOutlineBell } from 'react-icons/ai';
import CreateClient from './CreateClient'; // Component for creating new clients
import Profile from './Profile'; // Component for user profile
import Tickets from './Tickets'; // Component for managing tickets
import MyClient from './MyClient';
import { useDispatch, useSelector } from 'react-redux';
import { getlogout,setRole } from '../../slices/authSlice';
import TicketDetails from '../Agent/TicketDetails';

const AgentDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("User in agentdashhboard : ",user);
  

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() =>{
    console.log(user);
    
  },[dispatch]);

  const handleLogOut = () =>{
    dispatch(getlogout());
    dispatch(setRole(null));
    navigate('/login')

  }

  return (
    <div className="min-h-screen w-full flex bg-sky-100 justify-between p-0 m-0 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-cyan-700 text-white flex flex-col shadow-lg">
        <div className="p-6 text-center font-bold text-2xl border-b border-cyan-500">
          Agent Dashboard
        </div>
        <nav className="flex-grow p-6 space-y-4">
          
          <Link
            to="/agent-dashboard/profile" // Updated path for Profile
            className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-cyan-600 transition transform hover:scale-105"
          >
            <AiOutlineHome className="text-xl" />
            <span>Profile</span>
          </Link>


          {/* <Link
            to="/agent-dashboard/create-client"
            className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-cyan-600 transition transform hover:scale-105"
          >
            <AiOutlinePlusCircle className="text-xl" />
            <span>Create Client</span>
          </Link> */}


          {/* <Link
            to="/agent-dashboard/myclient"
            className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-cyan-600 transition transform hover:scale-105"
          >
            <AiOutlineUser className="text-xl" />
            <span>Client List</span>
          </Link> */}


          <Link
            to="/agent-dashboard/mytickets"
            className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-cyan-600 transition transform hover:scale-105"
          >
            <AiOutlineUser className="text-xl" />
            <span>My Tickets</span>
          </Link>

          
          <Link
            to="/agent-dashboard/mytickets"
            className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-cyan-600 transition transform hover:scale-105"
          >
            <AiOutlineUser className="text-xl" />
            <span>Setting</span>
          </Link>

        </nav>
        <div className="p-4 border-t border-cyan-500">
          <button className="w-full py-2 px-4 bg-red-600 hover:bg-red-500 rounded-lg transition transform hover:scale-105"
          onClick={handleLogOut}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow bg-white shadow-lg">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center border-b border-slate-200">
          <h1 className="text-2xl font-semibold text-slate-800">Welcome, Agent!</h1>
          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <Link to="/agent-dashboard/notifications" className="relative">
              <AiOutlineBell className="text-2xl text-slate-800" />
              {/* Notification Badge */}
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                3 {/* Example notification count */}
              </span>
            </Link>

            {/* Profile Picture with Dropdown */}
            <div className="relative">
              {/* <img
                // src="https://via.placeholder.com/40" // Placeholder for profile picture
                // alt="Profile"
                // className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              /> */}
              <div className=' bg-cyan-600 rounded-full p-4 text-2xl font-extrabold' onClick={toggleDropdown}>{user.name}</div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link
                    to="/agent-dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    Profile
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 bg-sky-50 min-h-[calc(100vh-80px)]">
          <Routes>
            {/* Updated paths for routes */}
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/create-client" element={<CreateClient />} />
            <Route path="/myclient" element={<MyClient />} />
            <Route path="/mytickets" element={<Tickets />} />
            <Route path="/ticket/:id" element={<TicketDetails/>} />
            <Route path="*" element={<Navigate to="/agent-dashboard/profile" />} /> {/* Redirects to Profile */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AgentDashboard;
