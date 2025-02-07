import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Tickets = () => {
  const { token, BASE_URL, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]); // For storing tickets data
  const [error, setError] = useState(null); // For handling errors

  useEffect(() => {
    const getAgentTickets = async () => {
      try {
        dispatch(setLoading(true)); // Show loading indicator

        const response = await axios.get(`${BASE_URL}getTickets/agent`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });

        console.log("Response from API:", response);

        if (response.data.success) {
          setData(response.data.data); // Store tickets data
        } else {
          setError("No tickets found or error fetching tickets");
        }
      } catch (error) {
        setError("An error occurred while fetching tickets.");
        console.error("Error fetching tickets:", error.response ? error.response.data : error.message);
      } finally {
        dispatch(setLoading(false)); // Hide loading indicator
      }
    }

    getAgentTickets(); // Call the function on component mount
  }, [token, BASE_URL, dispatch]);

  if (loading) return <div className="text-center py-4">Loading...</div>; // Show loading message if still loading

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Assigned Tickets</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Show error if there is one */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length > 0 ? (
          data.map(ticket => (
            <div key={ticket._id} className="ticket-card bg-white p-4 rounded-lg shadow-lg border">
              <h3 className="text-xl font-semibold">Ticket #{ticket.ticketId}</h3>
              <p className="text-gray-600">Status: <span className={`text-${ticket.status === 'open' ? 'green' : 'red'}-500`}>{ticket.status}</span></p>
              <p className="text-gray-600">Subject: {ticket.subject}</p>
              {/* Display other ticket details as needed */}
              <div className="mt-4">
                <button
                  onClick={() => navigate(`/agent-dashboard/ticket/${ticket._id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">View Details</button>
              </div>
            </div>
          ))
        ) : (
          <p>No tickets assigned.</p>
        )}
      </div>
    </div>
  );
}

export default Tickets;
