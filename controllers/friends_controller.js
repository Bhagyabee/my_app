const Users = require("../models/users");
const Friendships = require("../models/friendship");



module.exports.addFriend = async function(request , response){


    let existingFriendship = await Friendships.findOne({
        from_user : req.user,
        to_user : req.query.id,
    });

    let toUser = await Users.findById(request.user);
    let fromUser = await Users.findById(request.query.id);

    let deleted = false;

    if(existingFriendship){
        toUser.friendships.pull(existingFriendship._id);
        fromUser.friendships.pull(existingFriendship._id);
        toUser.save();
        fromUser.save();
        existingFriendship.remove();
        deleted = true;
        removeFriend = true;
    }else{
        let friendship = await Friendships.create({
            to_user : request.query.id,
            from_user : request.user._id
        });

        toUser.friendships.push(friendship);
        fromUser.friendships.push(friendship);
        toUser.save();
        fromUser.save();
    }

    if(req.xhr){
        return res.status(200).json({
            deleted : deleted , 
            message : "Request Successful",
        });
    }


    console.log(populated_user);
     return res.redirect("back" , {
     });
}