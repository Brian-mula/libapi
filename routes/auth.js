const express=require('express')
const Users = require('../models/Users')
const router=express.Router()
const CryptoJS=require('crypto-js')
const jwt = require('jsonwebtoken')



// !route for user registration
router.post('/register',async(req,res)=>{
    const newUser=new Users({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })
    try {
       const savedUser= await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.json(error)
    }

})

router.post('/login',async(req,res)=>{
try {
    const user=await Users.findOne({email:req.body.email});
    !user && res.status(404).json('Incorrect email');

    const hashedPassword=CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const orginalPassword=hashedPassword.toString(CryptoJS.enc.Utf8);

    orginalPassword !==req.body.password && res.status(401).json('incorrect password')

    const accessToken=jwt.sign({
        id:user._id,
        isAdmin:user.isAdmin
    },process.env.JWT_SEC,
    
    {expiresIn: '1d'})

    const {password,...others}=user._doc

    res.status(200).json({...others,accessToken})

} catch (error) {
    res.status(500).json(error)
}
})


module.exports=router