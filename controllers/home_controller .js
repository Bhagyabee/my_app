const Post = require('../models/post');
const User = require('../models/users');
const passport = require("../config/passport-local-strategy");
const Friendships = require("../models/friendship");

module.exports.home =  async function(req, res)
{
    // console.log(req.cookies);
    // Post.find({}, function(err, posts)
    // {
    //     return res.render('home',
    //     {
    //         title: 'Codeial | Home',
    //         posts: posts
    //     });
    // });

    // populate the user of each post
    try
    { 
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate
        ({
            path: 'comments',
            populate:
            {
                path: 'user'
            }
        })
        .populate
        ({
            path: 'comments',
            populate:
            {
                path: 'likes'
            }
        })
        .populate('likes');

        let users = await User.find({});
        let user;
        if (req.user) {
          user = await User.findById(req.user._id)
            .populate({
              path: "friendships",
              populate: {
                path: "from_user",
              },
            })
            .populate({
              path: "friendships",
              populate: {
                path: "to_user",
              },
            });
        }
        return res.render("home", {
            title: "Codemone | Home",
            posts: posts,
            all_users: users,
            user: user,
          });
        } catch (error) {
          console.log("Error : ", error);
        }
      };