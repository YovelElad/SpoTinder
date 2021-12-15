const db = require('./index.js');
console.log(db);
db.addUser({
    id: 'test',
    password: 'test',
    token: 'test'
});

db.addUser({
    id: 'test2',
    password: 'test2',
    token: 'test2'
});

// db.clearDB();