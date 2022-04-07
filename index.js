// !import the required module packages
const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const app=express()
const userRoutes=require('./routes/users')
const authRoutes=require('./routes/auth')



dotenv.config()

// !connect to the database
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connection to database was successfull')
}).catch((e)=>{
    console.console.log(e)
})

// ! set up the middlewares
app.use(express.json())
app.use('/library/users',userRoutes)
app.use('/library/auth',authRoutes)

// !set up the server
app.listen(4300,()=>{
    console.log('Backend server running')
})