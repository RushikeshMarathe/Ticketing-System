const express = require("express");
const route = require("./routes/route");
const cors = require("cors");

const app = express();
require("dotenv").config();

// Apply CORS middleware before routes
app.use(cors({
    origin: '*' // Allow all origins, but you can restrict it by specifying a particular origin like 'http://localhost:5173'
}));

app.use(express.json());

// Define routes after CORS is enabled
app.use('/api/v1', route);

const dbConnect = require("./config/database");
dbConnect.dbConnect();

const PORT =process.env.PORT || 4000;

app.listen( PORT, () => {
    console.log(`Server is running on Port ${process.env.PORT || 4000}`);
    console.log("Server Started Successfully");
});
