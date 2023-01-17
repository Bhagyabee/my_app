const mongoose=require('mongoose');
const env = require('./environment')
mongoose.connect('mongodb://localhost/new_app_development',{ useNewUrlParser: true });

//acquire connection to check if success or error 
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running then print the message
db.once('open',function(){
    console.log('successfully connected to db');
}); 

module.exports = db;