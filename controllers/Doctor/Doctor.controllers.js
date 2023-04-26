import { Doctor } from "../../models/Doctors/Doctors.models.js";
import { bookingTime } from "../../models/Doctors/bookingTime.models.js";
import { appointment } from "../../models/Patient/appointment.models.js";
import { Timing } from "../../models/Timing/Timing.models.js";
import { userModel } from "../../models/user.model.js";
import { AppError } from "../../util/AppError.js";
import { catchAsncError } from "../../util/catchAsncError.js";
import { Patient } from './../../models/Patient/Patient.models.js';

export const confirmTiming =catchAsncError(async(req,res,next)=>{
    let DoctorId=req.query.userID;
    let{confirm}=req.body;
    let DoctorFind=await Doctor.findOne({userId:DoctorId})
    if(DoctorFind.confirmTiming==="-1"){ 
        await Doctor.updateOne({userId:DoctorId},{confirmTiming:confirm})
        res.json({message:'success',status:200});
    }else{
        next(new AppError('confirmed',422))
    }
})
export const ViewTiming =catchAsncError(async(req,res,next)=>{
    let userID=req.query.userID;
    let DoctorFind=await Doctor.findOne({userId:userID},{confirmTiming:1}).populate({path:'Times'   }).then((response=>{
        if(response.confirmTiming=="true"||response.confirmTiming=="-1"){
            res.json({message:'success',Time:response,status:200});
        }
        else{
            next(new AppError('Timing cancel',422))
        }
    })).catch(err=>{
        next(new AppError('Doctor Not Found',422))
    })
})

export const addLimitRange =catchAsncError(async(req,res,next)=>{
    let DoctorId=req.query.userID;
    let {limitRange} = req.body;
    let DoctorFind=await Doctor.findOne({userId:DoctorId}).populate({path:'Times'})
        if(DoctorFind){
            let book = await bookingTime.findOne({doctor:DoctorFind._id})
            if(book){
                await bookingTime.findOneAndUpdate({doctor:DoctorFind._id},{limitRange})
                res.json({message:'success',status:200});
            }else{
                await bookingTime.insertMany({doctor:DoctorFind._id,Times:DoctorFind.Times._id,limitRange})
                res.json({message:'success',status:200});
            }
               

        }else{
         next(new AppError('Doctor Not Found',422))

        }

})
export const ViewAppointment=catchAsncError( async(req,res,next)=> {
    let userID=req.query.userID;
    let Time=[];
    let DoctorFind=await Doctor.findOne({userId:userID})
    if(!DoctorFind){
      return next(new AppError('Doctor is Not Found',422))
    }
    let time=await appointment.find({Doctor:DoctorFind._id},{__v:0,createdAt:0,updatedAt:0,Doctor:0}).then(async(data)=>{
        for(let i=0;i<data.length;i++){
            let patient=await Patient.findById(data[i].Patient,{__v:0,createdAt:0,updatedAt:0, _id:0}).populate('user','name DOB -_id');
            Time.push({Appointment:data[i],Patient:patient.user});
        }
        
    })
    res.json({message:'success',Data:Time,status:200})
    }) 