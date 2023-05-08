import mongoose from "mongoose";
const Schema =mongoose.Schema;
const OrderSchema=new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    },
    products:[{
        name:{type:String,required:true},
        price:{type:Number,default:1,required:true}
    }],
    finalPrice:{
        type:Number,
        required:true
    },
    paymentType:{
        type:String,
        default:'cash',
        enum:['cash','card']
    }
},{
    timestamps:true
})
export const Order=mongoose.model('Order',OrderSchema);
