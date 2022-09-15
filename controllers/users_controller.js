module.exports.profile=function(req,res){
    return res.end("<h1> Profile page of user</h1>");
}

//render sign-up page

module.exports.sign_up=function(req,res){
 return res.render('user_signup',{
    title: 'sign_up page'
 })
};


// render sign in page
module.exports.sign_in=function(req,res){
    return res.render('user_signin',{
       title: 'sign_in page'
    })
   };

module.exports.create=function(req,res){
   //to do later
}
module.exports.create_session=function(req,res){
   //to do later
}