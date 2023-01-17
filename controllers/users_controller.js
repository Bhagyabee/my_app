const User = require("../models/users");
const fs= require('fs');
const path = require('path');
const Friendships = require('../models/friendship')

module.exports.profile = function(req,res){
  User.findById(req.params.id, function(err,user){
    
    return res.render('user_profile',{
      title:'User Profile' ,
      profile_user:user
    });
  });
}





// profile made as Profile
module.exports.Profile = async function (request, response) {
  try {
   
    let user = await User.findOne({ _id: request.query.id });

    let friendship1,friendship2

    friendship1 = await Friendships.findOne({
      from_user: request.user,
      to_user: request.params.id, 
    });

    friendship2 = await Friendships.findOne({
      from_user: request.params.id,
      to_user: request.user,
    });

    
    let populated_user = await User.findById(request.user).populate('friendships');
    return response.render("user_profile", {
      title: "Codemon | Profile",
      profile_user: user,
      populated_user
    });
  } catch (error) {
    console.log("Error", error);
    return;
  }
};

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("error in multer", err);
        }

        user.name = req.body.name;
        user.email = req.body.email;
 
        if (req.file) {

           if(user.avatar){
            fs.unlink(path.join(__dirname,'..',user.avatar))
           } 

           
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save(); 
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorized");
    return res.status((401).send("Unauthorized"));
  }
};

//render sign-up page
module.exports.sign_up = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_signup", {
    title: "signup",
  });
};

// render sign in page
module.exports.sign_in = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_signin", {
    title: "signin",
  });
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in creating user while signing up");
      return;
      0;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in successfully");
  return res.redirect('/');
};

module.exports.destroySession = function (req, res) {
  req.logout(req.user, (err) => {
    if (err) {
      return next(err);
    }
  });
  req.flash("success", "You have successfully logged out");
  return res.redirect("/users/sign-in");
};
