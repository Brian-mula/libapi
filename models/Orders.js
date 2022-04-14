const mongoose=require('mongoose')
const OrdersSchema=mongoose.Schema({
    userId:{
        type:String,
        required:true,

    },
    books:[
        {
            bookId:{
                type:String
            }
        }
    ]
});
module.exports=mongoose.model('Orders',OrdersSchema)