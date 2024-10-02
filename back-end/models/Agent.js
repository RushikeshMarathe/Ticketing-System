const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    phoneNo:{
        type:String,
        trim:true
    },
    gender:{
        type:String,
        enum:[male,female,other],
    },
    dateOfBirth:{
        type:Date,
    },
    city:{
        type:String,
        trim:true,
    },
    role:{
        type:String,
        enum:['senior','junior'],
    },
    agentId:{
        type:Number,
        required:true,
    },
    shift:{
        type:String,
        enum:['day','night'],
    },
    about:{
        type:String,
    },
    employeeId:{
        type:String,
        required:true,
    },
    issueTickets:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tickets',
    },
    issueClients:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Clients',
    }
});

const Agent = mongoose.model("Agent",agentSchema);
module.exports= Agent;