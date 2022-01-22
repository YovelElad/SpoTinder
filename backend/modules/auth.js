const User = require('../models/userModel');
const Role = require('../models/roleModel');
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");


module.exports = {
    verifyToken: (req, res, next) => {
        let token = req.headers["x-access-token"];
      
        if (!token) {
          return res.status(403).send({ message: "No token provided!" });
        }
      
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
          if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
          }
          req.userId = decoded.id;
          next();
        });
    },

    isPaid: (req, res, next) => {
      User.findById(req.userId, (err, user) => {
        if (err) {
          return res.status(500).json({ status: false, message: "Error on the server." });
        }
        if (!user) {
          return res.status(404).json({ status: false, message: "No user found." });
        } else {
          const userJson = user.toJSON();
          console.log(userJson.role);
          Role.findById(userJson.role, (err, role) => {
            if (err) {
              return res.status(500).json({ status: false, message: "Error on the server." });
            }
            if (!role) {
              return res.status(404).json({ status: false, message: "No role found.", role: userJson.role });
            } else {
              if (role.name === "paid") {
                next();
              } else {
                return res.status(401).json({ status: false, message: "Unauthorized." });
              }
            }
          });
        }
      }
      );
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
                        res.json({ status: true, data: {...user, role: user.role.name.toUpperCase()} });
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
        }).populate('role','-_id')
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
      
            var token = jwt.sign({ id: user._id }, process.env.SECRET, {
              expiresIn: 86400 // 24 hours
            });

            res.status(200).json({
              status: true,
              user: user ,
              accessToken: token,
              role: user.role.name.toUpperCase()
            });
          });
      },

      signup: (req, res) => {
        const newUser = new User({
          ...req.body.user,
          password: bcrypt.hashSync(req.body.user.password, 8)
        });

        console.log(newUser);

        User.findOne({ email: req.body.user.email }, (err, user) => {
            if (err) {
              res.json({ status: false, message: err });
            } else {
              if (user) {
                res.json({ status: false, message: "User already exists", user: user });
              } else {
                newUser.save((err, user) => {
                  if (err) {
                    res.json({ status: false, message: err });
                  } else {
                    Role.findOne(
                      { name: req.body.isPaid ? "paid" : "free" },
                      (err, role) => {
                        if (err) {
                          res.json({ status: false, message: err, line: "136" });
                        } else {
                          if (role) {
                            user.role = role;
                            user.save((err, user) => {
                              if (err) {
                                res.json({ status: false, message: err, line: "142" });
                              } else {
                                var token = jwt.sign({ id: user._id }, process.env.SECRET, {
                                  expiresIn: 86400 // 24 hours
                                });
                                res.json({ status: true, message: "User registered successfully!", user: user, accessToken: token, role: user.role.name.toUpperCase() });
                              }
                            });
                          } else {
                            res.json({ status: false, message: "Role not found" });
                          }
                        }
                      }
                    )
                  }
                });
              }
            }
          });
      
    }
}
