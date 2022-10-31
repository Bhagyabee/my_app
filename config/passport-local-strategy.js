const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User = require('../models/users');
 
//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback: true
  },
  function(req,email, password, done){
    //find a user and establish the identity
      User.findOne({
        email: email
        }, 
        function(err,user){
        if (err){ 
           req.flash('error',err);
            return done(err);
        }
     
        if(!user || user.password != password){
            req.flash('error', 'Invalid password or username');
            return done(null,  false);
        }
        
        return done(null,user);
    
    
      });
   }
));

//serializing the user to decide which key is to be stored in cookie
passport.serializeUser(function( user , done ){
    done(null,user.id);
});

//deserialize the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('error in finding user');
            return done(err);
         }
         return done(null,user);
     
    });
});


passport.checkAuthentication=function(req,res,next){
    // if the user is signed in
    if ( req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = (req,res,next)=>{

    if ( req.isAuthenticated()){
        // req.user contains the current user from the cookie n we are sendind this to the locals
        res.locals.user =  req.user;
    }
    next();
}
module.exports = passport;