import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './components/authentication/SignUp';
import Home from './components/Home';
import Login from './components/authentication/Login';
import ClientDashboard from './components/client/ClientDashboard';
import AgentDashboard from './components/Agent/AgentDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';

function App() {
  return (
      <div className="bg-sky-100 min-h-screen w-screen">
        {/* Main Routing Setup */}
        <Routes>
          {/* Home Route */}
          {/* Uncomment the following line if you want to include the Home route */}
          {/* <Route path="/" element={<Home />} /> */}

          {/* Client Dashboard Route */}
          <Route path='/client-dashboard/*' element={<ClientDashboard />} />

          {/* Agent Dashboard Route */}
          <Route path='/agent-dashboard/*' element={<AgentDashboard />} />

            {/* Admin Dashboard Route */}
            <Route path='/admin-dashboard/*' element={<AdminDashboard />} />
          
          {/* Sign Up Route */}
          {/* <Route path="/signup" element={<SignUp />} /> */}

          {/* Login Route */}
          {/* <Route path="/login" element={<Login />} />           */}
        </Routes>
      </div>
  );
}

export default App;
