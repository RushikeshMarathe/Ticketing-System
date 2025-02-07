const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderModel" // Dynamic reference to either Client or Agent
    },
    senderModel: {
      type: String,
      required: true,
      enum: ["Client", "Agent"], // Ensure it can only be Client or Support
    },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);


const Comment = mongoose.model("Comment",CommentSchema);
module.exports= Comment;