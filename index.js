require("dotenv").config();
//Frame work
const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");

  //micro-services Routes
   const Books  = require("./API/Book");
   const Authors = require("./API/Author");
    const Publications = require("./API/Publication");

   // initization
 const booky = express();
//configuration
booky.use(express.json());

//Establish database connection
mongoose.connect(process.env.MONGO_URL,
 {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}
).then(() => console.log("connection established!!")); 
 // describe our API.

 //initializing microservices(preffix)
 booky.use("/book",Books);
 booky.use("/author",Authors);
 booky.use("/publication",Publications);

booky.listen(3000, () => console.log("Hey server is running!!") );