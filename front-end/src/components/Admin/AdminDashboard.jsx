import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { AiOutlineHome, AiOutlineUser, AiOutlineSetting, AiOutlineBell, AiOutlinePieChart } from 'react-icons/ai';

const AdminDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-lg">
        <div className="p-6 text-center font-bold text-2xl border-b border-gray-700">
          Admin Dashboard
        </div>
        <nav className="flex-grow p-6 space-y-4">
          <Link
            to="/admin-dashboard"
            className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-gray-700 transition transform hover:scale-105"
          >
            <AiOutlineHome className="text-xl" />
            <span>Home</span>
          </Link>
          <Link
            to="/admin-dashboard/users"
            className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-gray-700 transition transform hover:scale-105"
          >
            <AiOutlineUser className="text-xl" />
            <span>Manage Users</span>
          </Link>
          <Link
            to="/admin-dashboard/settings"
            className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-gray-700 transition transform hover:scale-105"
          >
            <AiOutlineSetting className="text-xl" />
            <span>Settings</span>
          </Link>
          <Link
            to="/admin-dashboard/reports"
            className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-gray-700 transition transform hover:scale-105"
          >
            <AiOutlinePieChart className="text-xl" />
            <span>Reports</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button className="w-full py-2 px-4 bg-red-600 hover:bg-red-500 rounded-lg transition transform hover:scale-105">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow bg-white shadow-lg">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>
          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <Link to="/admin-dashboard/notifications" className="relative">
              <AiOutlineBell className="text-2xl text-gray-800" />
              {/* Notification Badge */}
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </Link>

            {/* Profile Picture with Dropdown */}
            <div className="relative">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link
                    to="/admin-dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    Profile
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      closeDropdown();
                      // Add your logout logic here
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 bg-gray-50 min-h-[calc(100vh-80px)]">
          <Routes>
            <Route path="/" element={<h2>Admin Home</h2>} />
            <Route path="users" element={<h2>Manage Users</h2>} />
            <Route path="settings" element={<h2>Settings</h2>} />
            <Route path="reports" element={<h2>Reports</h2>} />
            <Route path="*" element={<h2>Page not found</h2>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
