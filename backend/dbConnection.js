const mongoose = require('mongoose' );
require('dotenv').config();

const options = {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD
 };
 
 mongoose
  .connect(process.env.DB_URI, options)
  .then(() => console.log('connected' ))
  .catch(err => console.log(`connection error: ${err}`));