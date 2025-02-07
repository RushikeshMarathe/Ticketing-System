const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket", // Reference to the Ticket model
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
