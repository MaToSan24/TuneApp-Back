var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var passport = require("passport");
var LocalStrategy = require("passport-local"); 
var passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
var User = require("./src/models/user");

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());

app.use(require("express-session")({
  secret: "Keko is a dog",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
  
passport.use(new LocalStrategy(async function (username, password, cb) {

  try {
      const userDB = await User.findOne({ username });

      if (!userDB) {
          return res.status(400).json({
              ok: false,
              err: {
                  message: "This username does not exist"
              }
          })
      }

      if (!bcrypt.compareSync(password, userDB.password)){
          console.log("Error")
          return res.status(400).json({
              ok: false,
              err: {
              message: "Wrong password"
              }
          });
      }

      return cb(null, userDB);

      // let token = jwt.sign({ user: userDB },
      //     process.env.AUTH_SEED,
      //     { expiresIn: process.env.TOKEN_TTL
      // });

      // res.json({
      //     ok: true,
      //     user: userDB,
      //     token
      // });

  } catch (err) {
    
    console.log("El error es: ")
    console.log(err)
    console.log("La respuesta es: ")
    console.log(res)

      return res.status(400).json({
          message: 'An error has occurred',
          err
      })
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user._id); 
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
});

frontendURL = process.env.FRONTEND_URL || "localhost:8080"

app.get("/", (req, res) => {
  res.redirect(frontendURL);
});

app.post('/api/v1/register', function (req, res) {
  let body = req.body;
  let { username, email, password, role } = body;
  let user = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      role
  });

  user.save((err, userDB) => {

      if (err) {
          return res.status(400).json({
              ok: false,
              err,
          });
      }

      res.json({
          ok: true,
          user: userDB
      });
  })
});

app.post('/api/v1/login', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}), 
)

app.get("/api/v1/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.use('/api/v1/users', require('./src/routes/users'));

module.exports = app;