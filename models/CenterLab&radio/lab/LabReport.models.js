import { required } from "joi";
import mongoose from "mongoose";
const Schema =mongoose.Schema;
const LabReportSchema=new Schema({
    type:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    },
    User:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    Patient:{
        type:mongoose.Types.ObjectId,
        ref:'Patient',
        required:true
    }
    },{
    timestamps:true
})
export const LabReport=mongoose.model('LabReport',LabReportSchema);