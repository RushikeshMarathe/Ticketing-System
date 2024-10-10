const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    ticketId:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['open','in-process','hold','escalated','closed','solved']
    },
    priority:{
        type:String,
        enum:['low','medium','critical'],
    },
    duedate:{
        type:Date,
    },
    assignedAgent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Agent',
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
    },
    comments: [
        {
          commentText: String,
          commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Agent or Client
          commentedAt: { type: Date, default: Date.now },
        },
      ],
      attachments: [
        {
          fileUrl: {
            type: String,
          },
          fileName: {
            type: String,
          },
        },
      ],
    resolutionSummary:{
        type:String,
    },
    createdAt:{
        type:Date.now,
        required:true,
    },
    updatedAt:{
        type:Date.now,
        required:true,
    }
})

const Ticket = mongoose.model('Ticket',ticketSchema);
module.exports = Ticket;