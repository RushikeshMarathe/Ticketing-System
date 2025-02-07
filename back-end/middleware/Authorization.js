

exports.isClient = (req, res, next) => {
    console.log("Inside isClient");

    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized, user information missing",
            });
        }

        if (req.user.role === "client") {
            console.log("Client role verified, proceeding to get tickets");
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: "Access Denied, Client only",
            });
        }
    } catch (error) {
        console.log("Error in isClient middleware", error.message);
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, try again",
        });
    }
};



exports.isAgent = (req, res, next) => {
    console.log("Inside isAgent");

    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized, user information missing",
            });
        }

        if (req.user.role === "support") {
            console.log("Agent role verified, proceeding to get tickets");
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: "Access Denied, Agent only",
            });
        }
    } catch (error) {
        console.log("Error in isAgent middleware", error.message);
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, try again",
        });
    }
};
