const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true, // Removes unnecessary spaces
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client", // Reference to the Client model
      required: true,
    },

    description:{
      type:String,
      required:true,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium", // Default priority
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to the Category model
      required: true,
    },
    status: {
      type: String,
      enum: [ "open","in progress", "closed", "reopen"],
      default: "open", // Default status when a ticket is created
    },
   
    dueDate: {
      type: Date, // Corrected the field name to camelCase
    },
  
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent", // Reference to the Agent model
    },
  
    resolutionSummary: {
      type: String,
      trim: true,
    },
    // comments: [
    //   {
    //     commentText: {
    //       type: String,
    //       trim: true,
    //     },
    //     commentedBy: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "User", // Reference to either Agent or Client
    //     },
    //     commentedAt: {
    //       type: Date,
    //       default: Date.now,
    //     },
    //   },
    // ],
  },
  { timestamps: true } // Automatically creates and manages createdAt and updatedAt
);

// Create and export the model
const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
