 const express=require('express');
 const app=express();
 const port=8000;





app.use('/',require('./routes'));


 // telling the server to listen on port
 app.listen(port,(err)=>{
    if(err){
        console.log('error');
    }
    console.log('server is running on port',port);
 })