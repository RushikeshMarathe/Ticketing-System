const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
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
        enum:['male','female','other'],
    },
    dateOfBirth:{
        type:Date,
    },
    city:{
        type:String,
        trim:true,
    },
    ticketsCreated:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tickets',
    },
    issueAgent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Agent',
    }
})

const Client = mongoose.model('Client',clientSchema);
module.exports = Client;