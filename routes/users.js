const express=require('express')
const Users = require('../models/Users')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAmin } = require('./verifyToken')
const router=express.Router()
// !user routes

//!user update route
router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    if(req.body.password){
        req.body.password=CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }
    try {
        const updatedUser=await Users.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})


// !user delete route
router.delete('/:id',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        await Users.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

// !get user
router.get('/find/:id',verifyTokenAndAmin,async(req,res)=>{
try {
   const user= await Users.findById(req.params.id)

   const {password,...others}=user._doc
   res.status(200).json(others)
} catch (error) {
    res.status(500).json(error)
}
})

// !find all users
router.get('/',verifyTokenAndAmin,(req,res)=>{
    const query=req.query.new
    try {
        const users= query?Users.find().sort({id:-1}).limit(5): Users.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

// !getting user stats
router.get('/stats',verifyTokenAndAmin,async(req,res)=>{
    const date=new Date()
    const lastYear=new Date(date.setFullYear(date.getFullYear()- 1))

    try {
        const data=await Users.aggregate([
            {$match:{createdAt:{$gte:lastYear}}},
            {
                $project:{
                    month:{$month:"$createdAt"}
                }
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:1}
                }
            }
        ]);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})


// !change password route

module.exports=router