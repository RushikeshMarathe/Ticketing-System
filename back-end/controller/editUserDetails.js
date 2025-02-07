const Agent = require("../models/Agent");
const Client = require("../models/Client");

exports.editUserDetails = async (req, res) => {

    console.log("inside editUserDetails controller");

  try {
    const {
      firstName,
      lastName,
      email,
      phoneNo,
      about,
      city,
      gender,
      dateOfBirth,
    } = req.body;

    // Assuming user is stored in req.user after authentication
    const userId = req.user.id;
    const role = req.user.role; // 'agent' or 'client'

    // Check if the role is either 'agent' or 'client' and find the correct model
    let user;
    if (role === "support") {
      user = await Agent.findById(userId);
    } else if (role === "client") {
      user = await Client.findById(userId);
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }


    // If user does not exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    // Update the user's details
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phoneNo = phoneNo || user.phoneNo;
    user.about = about || user.about;
    user.city = city || user.city;
    user.gender = gender || user.gender;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;

    // Save the updated user
    await user.save();

    console.log("inside editUserDetails controller after user saved");


    // Return the updated user
    res.status(200).json({
      success:true,
      message: "User details updated successfully",
      data: user,
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user details" });
  }
};



exports.getUserDetails = async (req, res) => {
    console.log("Inside get user details");

    try {
        const role = req.user.role;
        const id = req.user.id;


        // Check if id or role is missing
        if (!id || !role) {
            return res.status(400).json({
                success: false,
                message: "ID and role are required",
            });
        }

        // Fetch user details
        let userDetails;
        if (role === 'client') {
            userDetails = await Client.findById(id); // assuming you are querying 'Client' for both roles
        } else {
            // Add logic for other roles if needed
            userDetails = await Agent.findById(id);
        }

        // Check if user details were found
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Send user details if found
        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            data: userDetails,
        });
        
    } catch (error) {
        console.error("Error while fetching user details:", error);
        return res.status(500).json({
            success: false,
            message: "Error while fetching user details",
        });
    }
};
