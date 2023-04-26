import { Doctor } from "../../models/Doctors/Doctors.models.js";
import { bookingTime } from "../../models/Doctors/bookingTime.models.js";
import { Patient } from "../../models/Patient/Patient.models.js";
import { appointment } from "../../models/Patient/appointment.models.js";
import { Timing } from "../../models/Timing/Timing.models.js";
import { AppError } from "../../util/AppError.js";
import { catchAsncError } from "../../util/catchAsncError.js";

export const ViewDoctors=catchAsncError( async(req,res,next)=> {
  let doctorWithTimeTrue=[];
     await  Doctor.find({},{__v:0,createdAt:0,updatedAt:0,Salary:0}).populate('userId','name email Gender').populate({path:'Times'  }).then((response=>{
      for (let index = 0; index < response.length; index++) {
        if(response[index].Times.confirmTiming==="true"){
          doctorWithTimeTrue.push(response[index]);
        }
      }
  }))
  res.json({message:'success',Doctors:doctorWithTimeTrue,status:200});
      })
export const BookDoctor=catchAsncError( async(req,res,next)=> {
    let {doctorID,userID}=req.query;
    let {date}=req.body;
  let findDoctor=await Doctor.findById(doctorID);
  if(!findDoctor){
    return next(new AppError('Doctor is Not Found',422))
  }
  let num=await appointment.find({Doctor:doctorID,Date:date}).count();
    let limit=await bookingTime.findOne({doctor:doctorID});
    if(num===limit.limitRange){
      next(new AppError('Limit Range Completed Please Book another Time',422))
    }
    else{
      let patient =await Patient.findOne({user:userID});
      await appointment.insertMany({Patient:patient._id,Doctor:doctorID,Date:date});
      res.json({message:'success',status:200});
    }
}) 
export const ViewAppointment=catchAsncError( async(req,res,next)=> {
  let userID=req.query.userID;
  let patient =await Patient.findOne({user:userID});
  if(!patient){
    return next(new AppError('Patient is Not Found',422))
  }
  let time=await appointment.findOne({Patient:patient._id},{__v:0,createdAt:0,updatedAt:0,Patient:0})
  let doctor=await Doctor.findById(time.Doctor,{Experience:0,Language:0,Times:0,Salary:0,__v:0,createdAt:0,updatedAt:0}).populate('userId','name Specialization -_id')
  res.json({message:'success',Doctor:doctor,Time:time,status:200})
  }) 
  export const addMedicalHistory=catchAsncError( async(req,res,next)=> {
    let userID=req.query.userID;
    let {Conditions,symptoms,medication,allergies,tobacco,illegalDrugs,consumeAlcohol}=req.body;
    let patient =await Patient.findOne({user:userID});
    if(!patient){
      return next(new AppError('Patient is Not Found',422))
    }
    console.log(Conditions,symptoms,medication,allergies,tobacco,illegalDrugs,consumeAlcohol);
    }) 
export const timeDetails =catchAsncError(async(req,res,next)=>{
  let doctorID=req.query.doctorID;
  let bookingtime=await bookingTime.findOne({doctor:doctorID})
  await Timing.findById(bookingtime.Times).then(data=>{
    if(data.confirmTiming=="true"){
      res.json({message:'success',data,status:200})
    }else{
      return next(new AppError('No Time',422))
    }
  });
})