const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isAuth = (req, res, next) => {
    try {

        console.log("Inside isAuth");
        // Check for token in headers
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(404).json({
                status: false,
                message: "Token is Missing",
            });
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            // console.log("decode", decode);


        } catch (error) {
            return res.status(403).json({
                status: false,
                message: "Error in Deocoding",
            });
        }

        console.log("authentication done successfully");
        next();



    } catch (error) {
        return res.status(404).json({
            status: false,
            message: "Error while authentication in middleware",
        });
    }
}