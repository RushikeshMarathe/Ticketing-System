const express = require("express");

const router = express.Router();

const {createClient} = require("../controller/Auth");


router.post("/createclient",createClient);


module.exports = router;

 