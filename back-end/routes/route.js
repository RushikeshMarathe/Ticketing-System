const express = require("express");
const router = express.Router();
const {
  createClient,
  createAgent,
  login,
  getTokenData,
} = require("../controller/Auth");
const { createTicket } = require("../controller/createTicket");
const { getClientsTickets,getAgentTickets,getTicketById} = require("../controller/getTickets")
const {addComment,getCommentsByTicket} = require("../controller/commentController");
const {updateTicketStatus} = require("../controller/getTickets");
const {editUserDetails} = require("../controller/editUserDetails");
const {getUserDetails} = require("../controller/editUserDetails");


// Importing middleware
const { isAuth } = require("../middleware/Authentication");
const { isClient, isAgent } = require("../middleware/Authorization");

// Public routes
router.post("/createClient", createClient);
router.post("/createAgent", createAgent);
router.post("/login", login);

// Protected routes post
router.post("/getTokenData", isAuth, getTokenData); // Optional: Add isAuth
router.post("/createTicket", isAuth, isClient, createTicket); // Ensure isAuth comes before isClient

// Protected routes get
router.get("/getTickets/client",isAuth,isClient,getClientsTickets);
router.get("/getTickets/agent",isAuth,isAgent,getAgentTickets);
router.get("/agentTickets/:id", isAuth,isAgent, getTicketById);
router.get("/clientTickets/:id", isAuth,isClient, getTicketById);


// Route to add a comment to a ticket for agent
router.post("/addcommentAgent", isAuth,isAgent, addComment);

// Route to get comments for a ticket for agent
router.get("/agentComments/:ticketId", isAuth,isAgent, getCommentsByTicket);

// Route to add a comment to a ticket for client
router.post("/addcommentClient", isAuth,isClient, addComment);

// Route to get comments for a ticket for client
router.get("/clientComments/:ticketId", isAuth,isClient, getCommentsByTicket);

// Add this route to your Express app
router.put("/agentTicketStats/:id/status", isAuth,isAgent, updateTicketStatus);
router.put("/clientTicketStats/:id/status", isAuth,isClient, updateTicketStatus);

//edit agent profile data
router.put("/agentUpdateProfile",isAuth,isAgent,editUserDetails);
router.put("/clientUpdateProfile",isAuth,isClient,editUserDetails);

//get UserDetails
router.get("/getAgentDetails",isAuth,isAgent,getUserDetails);
router.get("/getClientDetails",isAuth,isClient,getUserDetails);


module.exports = router;