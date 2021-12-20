const User = require("../models/userModel");


module.exports = {
    addUser: function(user) {
        const newUser = new User(user);
        newUser.save((err, user) => {
            if (err) {
                throw new Error(err);
            } 
        });
    },

    getUser: function(id) {
        return new Promise((resolve, reject) => {
            User.findById(id, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    },

    getUsers: function() {
        return new Promise((resolve, reject) => {
            User.find({}, (err, users) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            });
        });
    },

    updateUser: function(id, user) {
        return new Promise((resolve, reject) => {
            User.findByIdAndUpdate(id, user, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    },

    setUserToken: function(id, token) {
        return new Promise((resolve, reject) => {
            User.findByIdAndUpdate(id, { token }, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    },
    getUserToken: function(id) {
        return new Promise((resolve, reject) => {
            User.findById(id, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user.token);
                }
            });
        });
    },
};

