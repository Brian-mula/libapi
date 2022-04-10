const Book=require('../models/Book')
const express=require('express')
const { verifyTokenAndAmin } = require('./verifyToken')
const router=express.Router()

// !create product
router.post('/',verifyTokenAndAmin,async(req,res)=>{
 const newBook= new Book(req.body);

 try {
     const savedBook=await newBook.save()
     res.status(200).json(savedBook)
 } catch (error) {
     res.status(500).json(error)
 }
})
// !update book
router.put('/:id',verifyTokenAndAmin,async(req,res)=>{
    try {
        const updatedBook=await Book.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedBook)
    } catch (error) {
        res.status(500).json(error)
    }
})

// !get a book
router.get('/:id',async(req,res)=>{
    try {
        const book=await Book.findById(req.params.id)
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json(error)
    }
});

// !get all books in the store
router.get('/',async(req,res)=>{
    const query=req.query.new
    try {
        const products= query? await Book.find().sort({id:-1}).limit(5): await Book.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
})

// !delete book
router.delete('/:id',verifyTokenAndAmin,async(req,res)=>{
    try {
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json("the book has been deleted successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports=router