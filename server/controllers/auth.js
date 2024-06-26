const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//--------------------------------------------Register------------------------------------

exports.registerUser = async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    });

    // create web token
    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_ENCRYPT_KEY,
      {
        expiresIn: "3m",
      }
    );

    User.register(user, req.body.password, (err, user) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        passport.authenticate("local")(req, res, () => {
          res.json({
            accessToken: accessToken,
            username: user.username,
            gameList:gameList,
          });
          console.log("user registered");
        });
      }
    });
  } catch (err) {
    next(err);
  }
};

//--------------------------------------------Login---------------------------------------

exports.loginUser = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
    });

    // create web token
    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_ENCRYPT_KEY,
      {
        expiresIn: "3m",
      }
    );

    // Refresh token
    const refreshToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_ENCRYPT_KEY,
      {
        expiresIn: "20m",
      }
    );

    req.login(user, (err) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        passport.authenticate("local")(req, res, () => {
          res.json({
            accessToken: accessToken,
            refreshToken: refreshToken,
            username: user.username,
            gameList:gameList,
          });
          console.log("user logged in");
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// ------------------------------------------- change user info -------------------------
exports.updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.params.id,
      {
        phoneNumber: req.body.phoneNumber,
        gameList:req.body.gameList,
      },
      (err, result) => {
        if (err) {
          res.json({ app: err });
        }
        res.send(result);
      }
    );
  } catch (err) {
    console.log(err);
  }
};
//--------------------------------------------Delete--------------------------------------

// working but not giving response?
exports.deleteUser = async (req, res) => {
  try {
    if ((await User.findById(req.params.id)) === null) {
      res.send("User Not Found");
    } else {
      await User.findByIdAndRemove(req.params.id).exec();
      res.send("Deleted User");
    }
  } catch (err) {
    console.log(err);
  }
};

//--------------------------------------------Log Users *testing*-------------------------

exports.logUsers = async (req, res) => {
  console.log("Log user called");
  User.find({}, (err, result) => {
    if (err) {
      res.send({ app: err });
    } else {
      res.send(result);
    }
  });
};