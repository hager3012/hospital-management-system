import mongoose from "mongoose";
const Schema =mongoose.Schema;
const prescriptionSchema=new Schema({
    doctor:{
        type:mongoose.Types.ObjectId,
        ref:'Doctor',
        required:true
      },
      Patient:{
        type:mongoose.Types.ObjectId,
        ref:'Patient',
        required:true
        },
      Advice:{
        type:String,
        required:true
      },
      Medication:{
        type:[],
        required:true
      },
      Lab:{
        type:[],
        required:true
      },
      X_ray:{
        type:[],
        required:true
      }
    },
      {
        timestamps:true
      })
      export const prescription=mongoose.model('prescription',prescriptionSchema);