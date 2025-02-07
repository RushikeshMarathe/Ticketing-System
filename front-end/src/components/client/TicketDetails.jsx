import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const TicketDetails = () => {
  const { id } = useParams();
  const { token, BASE_URL, user } = useSelector((state) => state.auth);
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const commentsEndRef = useRef(null); // For auto-scroll
  const [isUpdating, setIsUpdating] = useState(false);


  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`${BASE_URL}clientTickets/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setTicket(response.data.data);
      } catch (err) {
        setError("Failed to fetch ticket details");
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}clientComments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComments(response.data.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchTicket();
    fetchComments();
  }, [id, BASE_URL, token, commentText]);

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      alert("Comment cannot be empty!");
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}addcommentClient`,
        { ticketId: id, message: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComments([...comments, response.data.data]);
      setCommentText(""); // Clear input
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("Failed to send comment. Please try again.");
    }
  };

  const handleClosed = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const response = await axios.put(
        `${BASE_URL}clientTicketStats/${id}/status`,
        { status: "closed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setTicket((prev) => ({ ...prev, status: "closed" }));
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReopen = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const response = await axios.put(
        `${BASE_URL}clientTicketStats/${id}/status`,
        { status: "reopen" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setTicket((prev) => ({ ...prev, status: "reopen" }));
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Get the sender's name or fallback to name
  const getSenderName = (sender) => {
    return sender.firstName ? sender.firstName : sender.name;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white shadow-md p-6 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 md:text-3xl">Ticket #{ticket?.ticketId}</h2>
      <p className="text-gray-600 text-sm md:text-lg">{ticket?.description}</p>
      <div className="mt-4 flex gap-4 justify-center items-center">
        <span
          className={`text-xs sm:text-sm px-3 py-1 rounded-full capitalize ${ticket?.status === "open"
            ? "bg-green-200 text-green-700"
            : ticket?.status === "in progress"
              ? "bg-yellow-200 text-yellow-700"
              : "bg-blue-200 text-blue-700"
            }`}
        >
          Status: {ticket?.status}
        </span>

        {ticket?.status === "resolved" || ticket?.status === "reopen" ? (
  user.role === "client" && (
    <button
      onClick={handleClosed}
      disabled={isUpdating}
      className={`px-6 py-2 rounded-xl text-white transition ${
        isUpdating ? "bg-gray-400 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-800 cursor-pointer"
      }`}
    >
      {isUpdating ? "Updating..." : "Closed Ticket"}
    </button>
  )
) : (
  ticket?.status === "closed" && user.role === "client" && (
    <button
      onClick={handleReopen}
      disabled={isUpdating}
      className={`px-6 py-2 rounded-xl text-white transition ${
        isUpdating ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 cursor-pointer"
      }`}
    >
      {isUpdating ? "Updating..." : "Re-Open"}
    </button>
  )
)}






      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Conversation</h3>
        <div className="border rounded-md p-4 mt-2 bg-gray-50 max-h-72 overflow-y-auto space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className={`p-3 rounded-md flex items-start gap-4 ${comment.sender._id === user.id
                    ? "flex-row-reverse bg-blue-100 text-right"
                    : "bg-gray-100 text-left"
                  }`}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gray-400 rounded-full text-white">
                  {/* Display the first character in circle */}
                  {comment.sender.firstName
                    ? comment.sender.firstName.charAt(0).toUpperCase()
                    : "N/A"}
                </div>


                <div className="flex-1">
                  <div className="flex items-center gap-2">

                    <span className="font-semibold text-md">
                      {/* If the current user is the sender, show "Me" */}
                      {comment.sender._id === user.id
                        ? "Me"
                        : getSenderName(comment.sender)}
                    </span>

                    <span className="text-sm text-gray-500">
                      {/* Show role */}
                      {comment.sender.role === "support" ? "(Agent)" : "(Client)"}
                    </span>

                  </div>


                  <p className="text-sm mt-2">{comment.message}</p>
                  <small className="text-gray-400 block mt-1 text-xs sm:text-sm">
                    {new Date(comment.timestamp).toLocaleString()}
                  </small>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm md:text-lg">
              No comments yet. Start the conversation!
            </p>
          )}
          <div ref={commentsEndRef} />
        </div>

        {/* Add a Comment */}
        <div className={ticket.status === "closed" ? "hidden" : "mt-4 flex flex-col sm:flex-row gap-4"}>
          <textarea
            className="w-full border p-2 rounded-md resize-none text-sm md:text-base"
            rows="2"
            placeholder="Type your message..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={ticket.status === "resolved"} // Disables the textarea if resolved
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={ticket.status === "resolved"} // Disables the button if resolved
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default TicketDetails;
