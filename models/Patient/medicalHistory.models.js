import mongoose from "mongoose";
const Schema =mongoose.Schema;
const medicalHistorySchema=new Schema({
    Conditions:{
        type:[],
        required:true
    },
    symptoms:{
        type:[],
        required:true
    },
    medication:{
        required:true
    },
    allergies:{
        required:true
    },
    tobacco:{
        required:true
    },
    illegalDrugs:{
        required:true
    },
    consumeAlcohol:{
        required:true
    },
    Patient:{
        type:mongoose.Types.ObjectId,
        ref:'Patient',
        required:true
        }
},{
    timestamps:true
})
export const medicalHistory=mongoose.model('medicalHistory',medicalHistorySchema);