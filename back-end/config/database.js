const mongoose = require("mongoose");

exports.dbConnect = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useUnifiedTopology:true,
        useNewUrlParser:true,
    })

.then(()=>{
    console.log("DATABASE CONNECTION SUCCESSFULLY");
})
.catch((error)=>{
    console.log("Error Faced in Database Connection!...");
    console.error(error);
    process.exit(1);
})
}

