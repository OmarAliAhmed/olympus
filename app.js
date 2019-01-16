// Requires 
const express = require("express"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      passportJwt = require("passport-jwt"),
      path = require("path"),
      config = require("./config/config"),
      bodyParser = require("body-parser"),
      cors = require("cors")

const app = express(),
      port = process.env.PORT || 3000
//Connection to the database
mongoose.connect(config.url + config.database , ()=> {
    console.log("Connected to the database :" + config.database)
})

//Express Middleware 
app.use("/uploads", express.static('uploads'))


 //Passport Middleware
app.use(passport.initialize());
app.use(passport.session())
require('./config/passport')(passport)
 //body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



//Routes
const usersRouter = require("./routes/users")
app.use("/api/users", usersRouter )

const postsRouter = require("./routes/posts")
app.use("/api/posts", postsRouter)







// Starting the servers
app.listen(port, ()=> {
    console.log("Server running on port: " + port)
})