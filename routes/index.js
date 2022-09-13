const express=require('express');
const router=express.Router();

// using home controller here 
const homeController=require('../controllers/home_controller ')


router.get('/',homeController.home);

console.log('router is set');

module.exports=router;