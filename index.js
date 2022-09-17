 const express=require('express');
 const cookieParser=require('cookie-parser');
 
 const app=express();
 const port=8000;

 //setting up database
 const db=require('./config/mongoose');
 
app.use(express.urlencoded());
app.use(cookieParser());





app.use('/',require('./routes'));

//set up view engine
app.set('view engine','ejs');
app.set('views','./views');

 // telling the server to listen on port
 app.listen(port,(err)=>{
    if(err){
        console.log('error');
    }
    console.log('server is running on port',port);
 })