const express=require('express');
const router=express.Router();

// using  controllers here 
const homeController=require('../controllers/home_controller ')


router.get('/',homeController.home);
router.use('/users',require('./users'));


router.use('/comments',require('./comments'));
router.use('/api',require('./api'));

module.exports=router;