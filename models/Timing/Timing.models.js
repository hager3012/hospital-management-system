import mongoose from "mongoose";
const Schema =mongoose.Schema;
const TimingSchema=new Schema({
        Days:[],
        Time:[],
        confirmTiming:{
          type:String,
          default:-1
      }
},
{
    timestamps:true
  })
export const Timing=mongoose.model('Timing',TimingSchema);