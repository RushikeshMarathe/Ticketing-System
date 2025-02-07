const Ticket = require("../models/Tickets");
const Comment = require("../models/Comment")

// Add a new comment to a ticket
const addComment = async (req, res) => {
  try {
    console.log("inside addComment");
    const { ticketId, message } = req.body;
    const userId = req.user.id; // Extract user ID from authentication middleware
    let senderModel = req.user.role;
    console.log("senderModel : ", senderModel);

    if (!["client", "support"].includes(senderModel)) {
      return res.status(400).json({ success: false, message: "Invalid sender model" });
    }

    console.log("inside addComment after if");

    // Check if the ticket exists
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    // Capitalize the first letter for proper display (Client or Agent)
    if (senderModel === 'client') {
      senderModel = 'Client'; // Change 'client' to 'Client'
    } else if (senderModel === 'support') {
      senderModel = 'Agent'; // Change 'support' to 'Agent'
    }

    console.log("Sender model after capitalization:", senderModel);

    // Create a new comment
    const newComment = new Comment({
      ticket: ticketId,
      sender: userId,
      senderModel, // This determines whether sender is Client or Agent
      message,
    });

    await newComment.save();

    console.log("Comment added successfully");

    res.status(201).json({ success: true, data: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// Get all comments for a ticket
const getCommentsByTicket = async (req, res) => {
  try {
    console.log("Inside fetch comment");
    const { ticketId } = req.params;

    // Fetch all comments for the given ticket
    const comments = await Comment.find({ ticket: ticketId })
      .populate("ticket")
      .populate({ path: "sender", select: "-password" }); // Remove password from sender

    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



module.exports = { addComment, getCommentsByTicket };
