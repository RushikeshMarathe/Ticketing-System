const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");
require("dotenv").config();


const Agent = require("../models/Agent");
const Client = require("../models/Client");


exports.createClient = async (req, res) =>{
    try{

        const {firstName, lastName, email, password, confirmPassword} = req.body;

        //check validatio
        if(!firstName || !lastName || !email || !password || !confirmPassword)
        {
            return res.status(404).json({
                success:false,
                message:"Fill all the data",
            });
        }

        console.log("Request validatio");


        //check if user already exist
        const user = await Client.findOne({email}) ;
        if (user) {
            return res.status(401).json({
                status: false,
                message: "Client already registered",
            });

        }

        console.log("validation complete");

        //match password

        if(password !== confirmPassword){
            return res.status(406).json({
                status: false,
                message: "password and confirmPassword do not match",
            });
        }


        //hashed password
        hashedPassword = await bcrypt.hash(password,10);



        //create client
        const newClient = new Client({
            firstName,
            lastName,
            email,
            password:hashedPassword,
        });


        //save client
        const savedClient = await newClient.save();
        console.log("saved complete");



        res.status(201).json({
            status: true,
            message: "Your Registration Successful!..",
        });



    }catch(error){

        console.error("Error while creating user : ",error);
        res.status(500).json({
            status: false,
            message: "Error while Client creation",
        });
    }
};