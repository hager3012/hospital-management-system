
import mongoose from "mongoose";
const Schema =mongoose.Schema;
const MedicineSchema=new Schema({
    Medicine_name:{
    type:String,
    required:true
    },
    Medicine_quantity:{
        type:Number,
        required:true
    },
    Medicine_type:{
        type:String,
        required:true
    },
    Medicine_price:{
        type:Number,
        required:true,
    },
    exp_date:{
        type:String,
        required:true
    },
  Pharmacy:{
    type:mongoose.Types.ObjectId,
    ref:'Pharmacy',
    required:true
  }
},{
  timestamps:true
})
export const Medicine=mongoose.model('Medicine',MedicineSchema);