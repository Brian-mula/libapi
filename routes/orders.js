const express=require('express')
const { verifyTokenAndAuthorization, verifyToken, verifyTokenAndAmin } = require('./verifyToken')
const router=express.Router()
const Orders=require('../models/Orders')

// !create an order
router.post("/",verifyToken,async(req,res)=>{
    newOrder= new Orders(req.body)

    try {
      const savedOrder=await newOrder.save()
      res.status(200).json(savedOrder)

    } catch (error) {
        res.status(500).json(error)
    }
});

// !update the order
router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const order=await Orders.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
});

// !get a single order

router.get("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const order=Orders.findById(req.params.id)
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get("/",verifyTokenAndAmin,async(req,res)=>{
    const query=req.query.new
    try {
        const orders= query?await Orders.find().sort({_id: -1}).limit(5): await Orders.find()
        res.status(200).json(orders)
    } catch (error) {
        
    }
});

// delete order
router.delete('/:id',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        await Orders.findByIdAndDelete(req.params.id)
        res.status(200).json("Order deleted successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

