const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
var bcrypt = require("bcrypt");


module.exports = {
    verifyToken: (req, res, next) => {
        let token = req.headers["x-access-token"];
      
        if (!token) {
          return res.status(403).send({ message: "No token provided!" });
        }
      
        jwt.verify(token, config.secret, (err, decoded) => {
          if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
          }
          req.userId = decoded.id;
          next();
        });
    },
    login: function(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.json({ status: false, message: 'Please pass email and password.' });
        }
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                res.json({ status: false, message: err });
            } else {
                if (user) {
                    if (user.password === req.body.password) {
                        res.json({ status: true, data: user });
                    } else {
                        res.json({ status: false, message: "Wrong password" });
                    }
                } else {
                    res.json({ status: false, message: "User not found" });
                }
            }
        });
    },
    signin: (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.json({ status: false, message: 'Please pass email and password.' });
        }
        User.findOne({
            email: req.body.email
        })
          .exec((err, user) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            if (!user) {
              return res.status(404).send({ message: "User Not found." });
            }
            var passwordIsValid = bcrypt.compareSync(
              req.body.password,
              user.password
            );
      
            if (!passwordIsValid) {
              return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
              });
            }
      
            var token = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: 86400 // 24 hours
            });
            res.status(200).json({
              status: true,
              user: user,
              accessToken: token
            });
          });
      },

      signup: (req, res) => {
        const newUser = new User({
          ...req.body,
          password: bcrypt.hashSync(req.body.password, 8)
        });

        console.log(newUser);

        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
              res.json({ status: false, message: err });
            } else {
              if (user) {
                res.json({ status: false, message: "User already exists" });
              } else {
                newUser.save((err, user) => {
                  if (err) {
                    res.json({ status: false, message: err });
                  } else {
                    res.json({ status: true, data: user });
                  }
                });
              }
            }
          });
      
    }
}
