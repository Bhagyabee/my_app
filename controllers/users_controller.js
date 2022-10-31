 const User=require('../models/users');


module.exports.profile=function(req,res){
   User.findById(req.params.id , function(err,user){
      return res.render('user_profile',{
         title: 'User Profile',
         profile_user: user
   
   })
 
   })
}
//render sign-up page

module.exports.sign_up=function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
   }
 

 return res.render('user_signup', {
   title: "signup"
 });
};


// render sign in page
module.exports.sign_in=function(req,res){

   if(req.isAuthenticated()){
     return  res.redirect('/users/profile');
   }
    return res.render('user_signin',{
      title: "signin"
    });
};

 module.exports.create= function(req,res){
   
   if(req.body.password != req.body.confirm_password){
      return res.redirect('back');
   }

  User.findOne({email : req.body.email}, function(err,user){
     if(err){
         console.log('error in creating user while signing up');return; 0
      }
       if(!user){
         User.create(req.body, function(err,user){
             if(err){
                console.log('error in creating user while signing up');return
             }

             return res.redirect('/users/sign-in');
          })
       }
       else{
          return res.redirect('back');
      }
   });

}
module.exports.createSession=function(req,res){
 
    req.flash('success','Logged in successfully');
  return res.redirect('/');
}
 

module.exports.destroySession = function (req,res){
   req.logout(req.user, (err)=>{
      if(err){ return next(err); 
    }
   });
   req.flash('success','You have successfully logged out');
   return res.redirect('back');
}