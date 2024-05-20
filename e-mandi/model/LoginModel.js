const  mongoose=require('mongoose')
const loginmodelschema=mongoose.Schema({
    email:String,
    password:String,
})
const loginmodel=mongoose.model("login",loginmodelschema)
module.exports=loginmodel;