// const User=require('../models/users');


module.exports.profile=function(req,res){
    return res.end("<h1> Profile page of user</h1>");
}

//render sign-up page

module.exports.sign_up=function(req,res){
 return res.render('user_signup', {
   title: "signup"
 });
};


// render sign in page
module.exports.sign_in=function(req,res){
    return res.render('user_signin',{
      title: "signin"
    });
};

 module.exports.create=function(req,res){
   
   if(req.body.password != req.body.confirm_password){
      return res.redirect('/');
   }
  User.findOne({ email : req.body.email,function(err,user){
     if(err){
         console.log('error in creating user while signing up');return;
      }
       if(!user){
         User.create(req.body,(err,user)=>{
             if(err){
                console.log('error in creating user while signing up');return;
             }
             return res.redirect('/users/sign-in');
          })
       }
       else{
          return res.redirect('/');
       }
    }})

}
module.exports.create_session=function(req,res){
   //to do later
}