import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";

const MyTickets = () => {
  const [data, setData] = useState([]); // Default to an empty array
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(""); // For ticket search functionality
  const { token, BASE_URL, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchClientTickets = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(`${BASE_URL}getTickets/client`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Data from API:", response.data);

        if (response.data && Array.isArray(response.data.tickets)) {
          setData(response.data.tickets);
        } else {
          setError("No tickets found or invalid data format");
        }
      } catch (error) {
        setError("Error fetching Tickets: " + error.message);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchClientTickets();
  }, [token, BASE_URL, dispatch]);

  

  // Filter tickets based on the search input
  const filteredTickets = data.filter((ticket) =>
    ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
    ticket.status.toLowerCase().includes(search.toLowerCase()) ||
    ticket.ticketId.includes(search)
  );

  if (loading)
    return <div className="text-center p-4 text-lg md:text-xl">Loading...</div>;

  if (error)
    return (
      <div className="text-center text-red-500 p-4 text-lg md:text-xl">
        Error: {error}
      </div>
    );

  return (
    <div className="bg-white shadow-md p-4 md:p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
        My Tickets
      </h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by status, ID, or subject..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(filteredTickets) && filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold truncate">
                  Ticket #{ticket.ticketId}
                </h3>
                <span
                  className={`text-sm px-3 py-1 rounded-full capitalize ${ticket.status === "ready"
                      ? "bg-blue-100 text-blue-500"
                      : ticket.status === "open"
                        ? "bg-yellow-100 text-yellow-500"
                        : ticket.status === "closed"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                    }`}
                >
                  {ticket.status}
                </span>
              </div>
              <p className="text-gray-700 mt-2 truncate">
                Issue: {ticket.subject}
              </p>
              <button
                onClick={() => navigate(`/client-dashboard/ticket/${ticket._id}`)}
                className="mt-4 w-full text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                View Details
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-full">
            No tickets found.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
