const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/users_controller');
const User = require('../models/users');



router.get('/profile/:id',passport.checkAuthentication,userController.profile); 
router.get('/sign-up',userController.sign_up);
router.get('/sign-in',userController.sign_in);
router.post('/create', userController.create); 
 

//use passport as middleware to authenticate
router.post('/create-session',  passport.authenticate(
    'local' ,
    {failureRedirect : '/users/sign-in'},

), userController.createSession );

router.get('/sign-out',userController.destroySession);  



module.exports=router;