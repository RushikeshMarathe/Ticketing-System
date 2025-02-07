const Ticket = require("../models/Tickets");
const Category = require("../models/Category");
const Client = require("../models/Client");
const Agent = require("../models/Agent"); // Ensure Agent is imported

exports.createTicket = async (req, res) => {
  try {
    const clientId = req.user.id; // Extract client ID from middleware
    const { subject, description, priority, category } = req.body;

    // 1. Validate required fields
    if (!subject || !description || !priority || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: subject, description, priority, and category.",
      });
    }

    // 2. Validate priority
    const validPriorities = ["low", "medium", "high", "critical"];
    if (!validPriorities.includes(priority.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority. Accepted values: low, medium, high, critical.",
      });
    }

    // 3. Validate category
    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return res.status(400).json({
        success: false,
        message: "Invalid category. Please select a valid category.",
      });
    }

    // 4. Validate client
    const clientDoc = await Client.findById(clientId);
    if (!clientDoc) {
      return res.status(400).json({
        success: false,
        message: "Invalid client. Please ensure the client exists.",
      });
    }

    // 5. Assign ticket to the least-busy agent
    const agents = await Agent.find();
    if (agents.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No agents available for assignment.",
      });
    }

    const agentWorkloads = await Promise.all(
      agents.map(async (agent) => {
        // Count the number of tickets assigned to the agent that are still open or ready
        const workload = await Ticket.countDocuments({
          assignedAgent: agent._id,
          status: { $in: ["ready", "open"] }, // Only consider open or ready tickets
        });
        return { agent, workload };
      })
    );

    // Find the agent with the least workload (fewer tickets in progress)
    const leastBusyAgent = agentWorkloads.sort((a, b) => a.workload - b.workload)[0].agent;

    // 6. Generate a new ticket ID
    const lastTicket = await Ticket.findOne().sort({ ticketId: -1 });
    const ticketId = lastTicket?.ticketId ? parseInt(lastTicket.ticketId) + 1 : 1;

    // 7. Create a new ticket
    const newTicket = new Ticket({
      ticketId,
      subject: subject.trim(),
      client: clientId,
      description: description.trim(),
      priority: priority.toLowerCase(),
      category: categoryDoc._id,
      assignedAgent: leastBusyAgent._id, // Assign to the least busy agent
    });

    const savedTicket = await newTicket.save();

    // 8. Update the category's ticket list
    await Category.findByIdAndUpdate(
      categoryDoc._id,
      { $push: { tickets: savedTicket._id } },
      { new: true }
    );

    // 9. Update the agent's ticket list (assign the ticket to the agent)
    const updatedAgent = await Agent.findByIdAndUpdate(leastBusyAgent._id, 
      { $push: { issueTickets: savedTicket._id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Ticket created successfully!",
      data: savedTicket,
    });
  } catch (error) {
    console.error("Error creating ticket:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the ticket.",
    });
  }
};
