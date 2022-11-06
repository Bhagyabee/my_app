const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/users_controller');
const User = require('../models/users');



router.get('/profile',passport.checkAuthentication,userController.profile); 
router.post('/updates/:id',passport.checkAuthentication,userController.update)
router.get('/sign-up',userController.sign_up);
router.get('/sign-in',userController.sign_in);
router.post('/create', userController.create.bind(userController)); 
 

//use passport as middleware to authenticate
router.post('/create-session',  passport.authenticate(
    'local' ,
    {failureRedirect : '/users/sign-in'},

), userController.createSession );

router.get('/sign-out',userController.destroySession);  



module.exports=router;