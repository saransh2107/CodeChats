//Entry point to all the routes
const express=require('express');

//importing the Router module
const router=express.Router();


//importing the homecontroller(views) inside the route
const homeController=require('../controllers/home_controller');

//Creating a route for home
router.get('/',homeController.home);

// //Creating a route for profile:testing
// router.get('/profile',homeController.profile);

router.use('/users',require('./users'))

//for any further routes access from here
//router.use('/routerName,require('/routerfile'))
router.use('/posts',require('./posts'))

router.use('/comments',require('./comments'))

//exporting the Router module so that it is available to index.js
module.exports=router;

