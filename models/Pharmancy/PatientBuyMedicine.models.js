import mongoose from "mongoose";
const Schema =mongoose.Schema;
const PatientBuyMedicineSchema=new Schema({
  user:{
    type:mongoose.Types.ObjectId,
    ref:'user',
    required:true
  },
  Medication:{
    type:[],
  },
  checkOut:{
    type:Boolean,
    default:true,
    required:true,
  }
},{
  timestamps:true
})
export const PatientBuyMedicine=mongoose.model('PatientBuyMedicine',PatientBuyMedicineSchema);