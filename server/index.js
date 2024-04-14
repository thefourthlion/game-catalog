const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3017;
const User = require("./models/Users");
const connectDB = require("./config/mongoose");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config({ path: "./.env" });
const errorHandler = require("./middleware/error");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
connectDB();

passport.use(new LocalStrategy(User.authenticate()));

app.use(
  session({
    secret: process.env.ENCRYPT_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  session({
    secret: process.env.ENCRYPT_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.get("/", (req, res) => {
  res.json({ app: "running" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("✅ Listening on port " + PORT);
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use("/api/Games", require("./routes/Games"));
app.use("/api/PCGames", require("./routes/PCGames"));
app.use('/api/SwitchGames', require('./routes/SwitchGames'));