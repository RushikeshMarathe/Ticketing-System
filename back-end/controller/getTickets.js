const Agent = require("../models/Agent");
const Ticket = require("../models/Tickets");

exports.getClientsTickets = async (req, res) => {
  console.log("Inside getClientsTickets");

  try {
    const user = req.user; // user should be set by the authentication middleware
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found in request",
      });
    }

    // Ensure the user has a valid 'id' for querying
    if (!user.id) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Fetch the tickets associated with the user
    const userTickets = await Ticket.find({ client: user.id });

    if (userTickets.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No tickets found for this user",
      });
    }

    // Respond with success and the fetched tickets
    return res.status(200).json({
      success: true,
      message: "Tickets fetched successfully.",
      tickets: userTickets,
    });
  } catch (error) {
    console.error("Error while fetching tickets: ", error.message); // Log detailed error for debugging
    return res.status(500).json({
      success: false,
      message: "Error while fetching tickets of user",
    });
  }
};



exports.getAgentTickets = async (req, res) => {
    const user = req.user; // Assuming this is set via authentication middleware

    // console.log("agent user:",user);
    try {
        // Fetch tickets assigned to the logged-in agent
        const agentTickets = await Ticket.find({ assignedAgent: user.id });

        // If no tickets are found for the agent
        if (agentTickets.length === 0) {
            return res.status(404).json({
                success: false, // success should be false if no tickets
                message: "No tickets assigned to this agent",
            });
        }

        // console.log("tickets of agent",agentTickets);

        // Return tickets if found
        return res.status(200).json({
            success: true,
            message: "Successfully fetched agent tickets",
            data: agentTickets,  // Include ticket data in the response
        });

    } catch (error) {
        console.error("Error fetching agent tickets:", error);  // Log error to the console
        return res.status(500).json({
            success: false,
            message: "Error while fetching agent tickets",  // General error message
        });
    }
};



exports.getTicketById = async (req, res) => {
  try{

    console.log("inside getTicketById");
    const id = req.params;
    // console.log("id : ",id.id);

     // Find the ticket by ID in the database
     const ticket = await Ticket.findById(id.id).populate("client").populate("assignedAgent");
    //  console.log("Ticket : ",ticket);

     if (!ticket) {
      return res.status(404).json(
        { success: false, 
          message: "Ticket not found"
        });

    }

    res.status(200).json({ success: true, data: ticket });

      console.log("getTicketById done");
  }catch(error){
    console.error("Error fetching ticket:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}




exports.updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log("status : ",status);

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    ticket.status = status;
    await ticket.save();

    res.json({ success: true, message: "Ticket status updated", data: ticket });
  } catch (error) {
    console.error("Error updating ticket status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};




