import mongoose from "mongoose";
const Schema =mongoose.Schema;
const ScheduleSchema=new Schema({
  Day:{
    type:String,
    required:true
  },
  Time:{
    type:String,
    required:true
  },
  DoctorId:{
    type:mongoose.Types.ObjectId,
    ref:'Doctor',
    required:true
  }
},{
  timestamps:true
})
export const productBook=mongoose.model('Schedule',ScheduleSchema);
