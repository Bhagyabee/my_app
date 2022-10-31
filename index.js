 const express        =   require('express');
 const cookieParser   =   require('cookie-parser');
 const bodyParser     =   require('body-parser');
 const app            =   express();
 const port           =   8000;
 const expresslayouts =require('express-ejs-layouts');
const db              =   require('./config/mongoose');
 
const session         =   require('express-session');
const passport        =   require('passport');
const passportLocal   =   require('./config/passport-local-strategy');
const { default: mongoose } = require('mongoose');
const MongoStore      =   require('connect-mongo')(session);
const sassMiddleware  =   require('node-sass-middleware');
const flash           =   require('connect-flash');
const customMware     =   require('./config/middleware');
app.use(sassMiddleware({
    src:'./assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle:'extended',
    prefix: '/css' 
}))

//set up view engine
app.set('view engine','ejs');
app.set('views','./views');


app.use(express.urlencoded());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(expresslayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


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
        mongooseConnection: mongoose.connection,
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
app.use(express.static('assets'));
app.use('/',require('./routes')); 

 // telling the server to listen on port
 app.listen(port,(err)=>{
    if(err){
        console.log('error');
    }
    console.log('server is running on port',port);
 })