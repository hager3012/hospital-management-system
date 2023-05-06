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
      },
      Medication:{
        type:[],
      },
      Lab:{
        type:[],
      },
      X_ray:{
        type:[],
      }
    },
      {
        timestamps:true
      })
      export const prescription=mongoose.model('prescription',prescriptionSchema);