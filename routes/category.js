const express=require('express')
const { verifyTokenAndAmin } = require('./verifyToken')
const router=express.Router()
const Category=require('../models/Category')

// !route to create a category
router.post("/",verifyTokenAndAmin,async(req,res)=>{
    const newCategory= new Category({
        category_name:req.body.category_name
    });
    try {
        savedCategory=await newCategory.save()
        res.status(200).json(savedCategory)
        
    } catch (error) {
        res.status(500).json(error)
    }
});

// !route to update the category
router.put("/:id",verifyTokenAndAmin,async(req,res)=>{
   try {
        const cat=Category.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{new:true});
    res.status(200).json(cat)
   } catch (error) {
       res.status(500).json(error)
   }
});

// !route to get a single category
router.get("/:id",async(req,res)=>{
    try {
        const cat= await Category.findById(req.params.id)
        res.status(200).json(cat)
    } catch (error) {
        res.status(500).json(error)
    }
});

// !route to get all categories

router.get("/",async(req,res)=>{
    try {
        const cats= await Category.find();
        res.status(200).json(cats);
        
    } catch (error) {
        res.status(500).json(error);
    }
});

// !route to delete a category
router.delete("/:id",verifyTokenAndAmin,async(req,res)=>{
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json("Category deleted successfully")
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports=router