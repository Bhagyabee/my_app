 const express        =   require('express');
 const env= require('./config/environment');
 const cookieParser   =   require('cookie-parser');
 const bodyParser     =   require('body-parser');
 const app            =   express();
 const port           =   8000;
 const expresslayouts =   require('express-ejs-layouts');
const db              =   require('./config/mongoose');
 
const session         =   require('express-session');
const passport        =   require('passport');
const passportLocal   =   require('./config/passport-local-strategy');
const passportjwt     =   require('./config/passport-jwt-strategy');
const passportgoogle  =   require('./config/passport-google-oauth2-strategy');
const path = require('path')
const { default: mongoose } = require('mongoose');
const MongoStore      =   require('connect-mongo')(session);
const sassMiddleware  =   require('node-sass-middleware');
const flash           =   require('connect-flash');
const customMware     =   require('./config/middleware');
const fs = require('fs')
// const chatServer = require('http').createServer(app);
// const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
// // const cors = require('cors');



// const io = require("socket.io")(chatServer, {
//      cors: {
//        origin:"http://localhost:8000",
//        methods: ["GET", "POST","OPTIONS"],
//  transports: ['websockets','polling'],
//        withCredentials: true
//      },
//      allowEIO3: true
//    });
// chatServer.listen(5000);
// console.log('chat server is listening on port 5000');

// const http = require('http');
// const server = http.createServer(app);
// const {Server}= require('socket.io');
// const io = new Server(server);

app.use(sassMiddleware({
    src:path.join(__dirname,env.asset_path,'scss'),
    dest: path.join(__dirname,env.asset_path,'css'),
    debug: true,
    outputStyle:'extended', 
    prefix: '/css' 
}))



app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(env.asset_path));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));


//make the upload path available to the browser
app.use('/uploads',express.static(__dirname+ '/uploads'));
app.use(expresslayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//set up view engine
app.set('view engine','ejs');
app.set('views','./views');



//mongo store is used to store session cookie
app.use(session({
    name:'social',
    secret: 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie: {
        maxAge: (1000 * 60 *100)
    },
    store: new MongoStore(
        {
        mongooseConnection:mongoose.connection,
        autoRemove:'disabled'
        },
        function (err){
            console.log( err || 'connect-mongodb');
        }
       
    )
    
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// app.use(function(req,res,next){
//     res.locals.user = req.user;
//     next();
// })

app.use('/',require('./routes')); 

 // telling the server to listen on port
 app.listen(port,(err)=>{
    if(err){
        console.log('error');
    }
    console.log('server is running on port',port);
 })