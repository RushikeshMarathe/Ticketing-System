const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Agent = require("../models/Agent");
const Client = require("../models/Client");
const { response } = require("express");


exports.createClient = async (req, res) => {
    try {

        const { firstName, lastName, email, password, confirmPassword, role } = req.body;
        console.log("CreateClient controller starts");

        //check validation
        if (!firstName || !lastName || !email || !password || !confirmPassword || !role) {
            return res.status(404).json({
                success: false,
                message: "Fill all the data",
            });
        }

        console.log("inside createclient controller");
        // "Request validation";
        //check if user already exist in both the models Agent and Client

        const user = role === "support" ? await Agent.findOne({ email }) : await Client.findOne({ email });





        console.log("validation complete");

        //match password

        if (password !== confirmPassword) {
            return res.status(406).json({
                status: false,
                message: "password and confirmPassword do not match",
            });
        }


        //hashed password
        hashedPassword = await bcrypt.hash(password, 10);



        //check for which signup is

        const newUser = role === "support" ?
            //create agent

            new Agent({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role,
            })
            :
            //create client
            new Client({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role,
            });


       

            const savedUser = role === "support" ?
            //saved agent
            await newUser.save()
            :
            //create client
            await newUser.save();


        res.status(201).json({
            status: true,
            message: "Your Registration Successful!..",
        });



    } catch (error) {

        console.error("Error while creating Client : ", error);
        return res.status(500).json({
            status: false,
            message: "Error while Client creation",
        });
    }
};


exports.createAgent = async (req, res) => {
    try {

        const { firstName, lastName, email, password, confirmPassword, role } = req.body;
        console.log("CreateAgent controller starts");

        //check validation
        if (!firstName || !lastName || !email || !password || !confirmPassword || !role) {
            return res.status(404).json({
                success: false,
                message: "Fill all the data",
            });
        }

        console.log("inside createagent controller");
        // "Request validation";
        //check if user already exist in both the models Agent and Client

        const user = role === "support" ? await Agent.findOne({ email }) : await Client.findOne({ email });
        console.log("validation complete");

        //match passwordd
        if (password !== confirmPassword) {
            return res.status(406).json({
                status: false,
                message: "password and confirmPassword do not match",
            });
        }


        //hashed password
        hashedPassword = await bcrypt.hash(password, 10);



        //check for which signup is

        const newUser = role === "support" ?
            //create agent

            new Agent({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role,
            })
            :
            //create client
            new Client({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role,
            });


       

            const savedUser = role === "support" ?
            //saved agent
            await newUser.save()
            :
            //create client
            await newUser.save();


        res.status(201).json({
            status: true,
            message: "Your Registration Successful!..",
        });



    } catch (error) {

        console.error("Error while creating Client : ", error);
        return res.status(500).json({
            status: false,
            message: "Error while Client creation",
        });
    }
};



exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                status: false,
                message: "Data is not sent correctly",
            });
        }

        //checking user
        const user = await Agent.findOne({ email }) || await Client.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User doesn't exist",
            });
        }


        //compared password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Password doesn't match",
            });
        }

        console.log("role : ", user);


        // Generate JWT TokenExpiredError
        const payload = {
            name: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            id: user._id,
        }


        try {

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '24h'
            });


            // Set token in cookie
            const options = {
                expiresIn: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("token", token, options);


            // Send success response
            return res.status(200).json({
                success: true,
                user: {
                    email: user.email,
                    role: user.role,
                    // Add any other necessary user details here
                },
                token,
                message: "Logged in successfully",
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Token not created successfully",
            });
        }


    } catch (error) {
        console.error("Error while logging in:", error);
        return res.status(500).json({
            success: false,
            message: "Error while logging in",
        });
    }
}


exports.getTokenData = (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");


    if (!token) {
        return res.status(404).json({
            success: false,
            message: "token not found,try again with token",
        });
    }


    try {
        const decoded_Data = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded_Data);
        return res.status(200).json({
            success: true,
            data: decoded_Data,
            message: "Token decoded successfully",
        });


    } catch (error) {
        console.log("Error while decoding token");
        return res.status(403).json({
            success: false,
            message: "Token not decoded",
        })
    }
}