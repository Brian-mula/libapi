const express=require('express')
const router=express.Router()
// !user routes

//!user register route
router.get('/register',(req,res)=>{
    res.send('Entered user registration route route')
})



// !user login route
router.get('/login',(req,res)=>{
    res.send('You have entered a user login route')
})


// !change password route

module.exports=router