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
        type:Number,
        required:true
    },
    // category:{
    //     type:Array,
    //     required:true
    // }
},
{timeStamps:true}
)

module.exports=mongoose.model('Book',BookSchema)