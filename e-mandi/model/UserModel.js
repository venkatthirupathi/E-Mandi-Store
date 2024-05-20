const mongoose=require('mongoose');
const  ordermodel=require('./OrderModel')
const   cartmodel=require('./CartModel')
const usermodelschema=mongoose.Schema({email:String,
    password:String,
    username:String,
    mobileNumber:String,
    active:Boolean,
    role:String,
    cart:cartmodel,
    // orderList:List<ordermodel>
})
const usermodel=mongoose.model("User",usermodelschema)
module.exports=usermodel;