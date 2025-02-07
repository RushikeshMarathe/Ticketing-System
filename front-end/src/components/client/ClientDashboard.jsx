import React, { useState } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlinePlusCircle, AiOutlineUser, AiOutlineBell } from "react-icons/ai";
import MyTickets from "./MyTickets";
import CreateTicket from "./CreateTicket";
import TicketDetails from "../client/TicketDetails";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken,setRole } from "../../slices/authSlice";

const ClientDashboard = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);


    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(setUser(null));
        dispatch(setToken(null));
        dispatch(setRole(null));
        navigate("/login");
    };

    // console.log("user",user);
    const notificationCount = 3; // Replace with dynamic logic

    return (
        <div className="min-h-screen w-full flex bg-sky-100">
            {/* Sidebar */}
            <aside className="w-64 bg-cyan-700 text-white flex flex-col shadow-lg">
                <div className="p-6 text-center font-bold text-2xl border-b border-cyan-500">
                    Client Dashboard
                </div>
                <nav className="flex-grow p-6 space-y-4">

                <NavLink
                        to="/client-dashboard/profile"
                        className={({ isActive }) =>
                            `flex items-center space-x-3 py-2 px-4 rounded-lg ${
                                isActive ? "bg-cyan-600" : "hover:bg-cyan-600"
                            } transition transform hover:scale-105`
                        }
                    >
                        <AiOutlineUser className="text-xl" />
                        <span>Profile</span>
                    </NavLink>


                    <NavLink
                        to="/client-dashboard/my-ticket"
                        className={({ isActive }) =>
                            `flex items-center space-x-3 py-2 px-4 rounded-lg ${
                                isActive ? "bg-cyan-600" : "hover:bg-cyan-600"
                            } transition transform hover:scale-105`
                        }
                    >
                        <AiOutlineHome className="text-xl" />
                        <span>My Tickets</span>
                    </NavLink>


                    <NavLink
                        to="/client-dashboard/create-ticket"
                        className={({ isActive }) =>
                            `flex items-center space-x-3 py-2 px-4 rounded-lg ${
                                isActive ? "bg-cyan-600" : "hover:bg-cyan-600"
                            } transition transform hover:scale-105`
                        }
                    >
                        <AiOutlinePlusCircle className="text-xl" />
                        <span>Create Ticket</span>
                    </NavLink>
                
                </nav>
                <div className="p-4 border-t border-cyan-500">
                    <button
                        onClick={handleLogout}
                        className="w-full py-2 px-4 bg-red-600 hover:bg-red-500 rounded-lg transition transform hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow bg-white shadow-lg">
                {/* Header */}
                <header className="bg-white shadow-md p-4 flex justify-between items-center border-b border-slate-200">
                    <h1 className="text-2xl font-semibold text-slate-800">Welcome, Client!</h1>
                    <div className="flex items-center space-x-4">
                        {/* Notification Icon */}
                        <button className="relative">
                            <AiOutlineBell className="text-2xl text-slate-800" />
                            {notificationCount > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                                    {notificationCount}
                                </span>
                            )}
                        </button>

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
                                    <NavLink
                                        to="/client-dashboard/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={closeDropdown}
                                    >
                                        Profile
                                    </NavLink>
                                    <button
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => {
                                            closeDropdown();
                                            handleLogout();
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
                <main className="p-6 bg-sky-50 min-h-[calc(100vh-80px)]">
                    <Routes>
                        <Route index element={<Profile />} />
                        <Route path="profile" element={<Profile user={user} />} />
                        <Route path="my-ticket" element={<MyTickets />} />
                        <Route path="create-ticket" element={<CreateTicket user={user}/>} />
                        <Route path="/ticket/:id" element={<TicketDetails/>} />
                        </Routes>
                </main>
            </div>
        </div>
    );
};

export default ClientDashboard;
