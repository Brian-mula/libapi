const mongoose=require('mongoose')

const BookSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publisher:{
        type:String,
        required:true
    },
    cover_img:{
        type:String
    },
    book_no:{
        type:String,
        required:true
    },
    availability:{
        type:Boolean,
        default:true
    },
    book_amount:{
        type:String,
        required:true
    },
    category_id:{
        type:String,
        required:true
    }
},
{timeStamps:true}
)

module.exports=mongoose.model('Book',BookSchema)