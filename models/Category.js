const mongoose=require('mongoose')

const CategorySchema=mongoose.Schema({
    category_name:{
        type:String,
        required:true,
        unique:true
    }
},
{timeStamps:true}
)

module.exports=mongoose.model('Category',CategorySchema)