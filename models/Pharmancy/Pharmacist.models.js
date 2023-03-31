import mongoose from "mongoose";
const Schema =mongoose.Schema;
const PharmacistSchema=new Schema({
  userId:{
    type:mongoose.Types.ObjectId,
    ref:'user',
    required:true
  },
  PharmacyId:{
    type:mongoose.Types.ObjectId,
    ref:'Pharmacy',
    required:true
  }
},{
  timestamps:true
})
export const pharmacist=mongoose.model('pharmacist',PharmacistSchema);
