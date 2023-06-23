// Importing our packages
const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const server = express();
const morgan = require("morgan");
const passport = require("passport");
require("dotenv").config();
const path = require("path");
const db = require("./models/index");
const user_router = require("./routes/route.user");
const authRoutes = require("./routes/route.auth");
// const contact_router = require("./routes/route.contactUs.js");
const cookieparser = require("cookie-parser");
const session = require("express-session");

//Connecting to database
const port = process.env.PORT;

// connect to db
db.sequelize.authenticate().then(() => {
      console.log("Connected to the database!");
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });

// sync
db.sequelize.sync()

//middleware
server.use(morgan("dev"));
server.use(cors());
server.use(cookieparser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.use(express.static(path.join(__dirname, "views")));

server.use(
  session({
    secret: process.env.KEYS,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);

server.use(passport.initialize());
server.use(passport.session());
const passportSetup = require("./config/auth.js");

// health check
server.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});
server.use("/api", user_router);
// server.use("/api/v1", contact_router);
server.use("/auth", authRoutes);

//Listening to server
server.listen(port, () => {
  console.log(`Server up and running on port http://localhost:${port}`);
});
