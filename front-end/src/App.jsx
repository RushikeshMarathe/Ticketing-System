import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SignUp from './components/authentication/SignUp';
import Home from './components/Home';
import Login from './components/authentication/Login';
import ClientDashboard from './components/client/ClientDashboard';
import AgentDashboard from './components/Agent/AgentDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setUser, setToken,setRole } from './slices/authSlice';
import axios from 'axios';

function App() {
    const { BASE_URL, token,role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    // const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getRole() {
            if (token) {
                try {
                    const response = await axios.post(
                        `${BASE_URL}getTokenData`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (response.data.success) {
                        dispatch(setUser(response.data.data));
                        console.log("response.data",response.data.data.role);
                        dispatch(setRole(response.data.data.role));
                        console.log("Role set to:", response.data.data.role); // Debug
                    } else {
                        handleInvalidToken();
                    }
                } catch (error) {
                    console.error('Failed to fetch token data:', error);
                    handleInvalidToken();
                } finally {
                    setLoading(false);
                }
            } else {
                dispatch(setRole(null));
                setLoading(false);
            }
        }

        function handleInvalidToken() {
            dispatch(setRole(null));
            dispatch(setUser(null));
            dispatch(setToken(null));
            localStorage.removeItem('token');
        }

        getRole();
    }, [token, BASE_URL, dispatch],role);



    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-sky-100 min-h-screen w-screen">
            <Routes>
                <Route path="/client-dashboard/*" element={<ClientDashboard  />} />
                <Route path="/agent-dashboard/*" element={<AgentDashboard />} />
                <Route path="/admin-dashboard/*" element={<AdminDashboard />} />

                <Route
                    path="/"
                    element={
                        token  ? (
                            role === "client" ? (
                                <Navigate to="/client-dashboard/*" />
                            ) : role === "support" ? (
                                <Navigate to="/agent-dashboard/*" />
                            ) : (
                                <Navigate to="/admin-dashboard/*" />
                            )
                        ) : (
                            <Home />
                        )
                    }
                />


                <Route
                    path="/signup"
                    element={
                        token ? (
                            role === "client" ? (
                                <Navigate to="/client-dashboard/*" />
                            ) : (
                                <Navigate to="/agent-dashboard/*" />
                            )
                        ) : (
                            <SignUp />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={
                        token ? (
                            role === "client" ? (
                                <Navigate to="/client-dashboard/*" />
                            ) : (
                                <Navigate to="/agent-dashboard/*" />
                            )
                        ) : (
                            <Login />
                        )
                    }
                />
                <Route path="*" element={<h2>404: Page Not Found!... </h2>} />
            </Routes>
        </div>
    );
}

export default App;
