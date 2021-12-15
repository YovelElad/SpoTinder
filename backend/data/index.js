const DB = require('./users.json');
const fs = require('fs');

module.exports = {
    addUser: function(user) {
        // check that users does not already exist
        if (DB.find(u => u.id === user.id)) {
            throw new Error('User already exists');
            //return; // maybe throw error
        }
        DB.push(user);
        console.log(DB);
        // write changes to file
        fs.writeFileSync('./backend/data/users.json', JSON.stringify(DB));
    },
    getUser: function(id) {
        return DB.find(user => user.id === id);
    },
    updateUser: function(id, user) {
        const index = DB.findIndex(user => user.id === id);
        DB[index] = user;
        // write changes to file
        fs.writeFileSync('./backend/data/users.json', JSON.stringify(DB));
    },
    setUserToken: function(id, token) {
        DB.find(user => user.id === id).token = token;
    },
    getUserToken: function(id) {
        return DB.find(user => user.id === id).token;
    },
    clearDB: function() {
        DB.length = 0;
        fs.writeFileSync('./backend/data/users.json', JSON.stringify(DB));
    }
};

