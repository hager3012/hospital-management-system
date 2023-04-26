import { Doctor } from "../../models/Doctors/Doctors.models.js";
import { bookingTime } from "../../models/Doctors/bookingTime.models.js";
import { Patient } from "../../models/Patient/Patient.models.js";
import { appointment } from "../../models/Patient/appointment.models.js";
import { medicalHistory } from "../../models/Patient/medicalHistory.models.js";
import { AppError } from "../../util/AppError.js";
import { catchAsncError } from "../../util/catchAsncError.js";

export const searchDoctor=catchAsncError( async(req,res,next)=> {
     await  Doctor.find({confirmTiming:"true"},{__v:0,createdAt:0,updatedAt:0,Salary:0}).populate('userId','name email Gender').populate({path:'Times'  }).then((response=>{
      res.json({message:'success',Doctors:response,status:200});
  }))

    })
  ////////////////////////////////////////////////////////////////////////
  export const ViewDoctors=catchAsncError( async(req,res,next)=> {
  let currentPage = req.query.currentPage || 1;
  let perPage = 10;
  let totalDoctors=0;
  let Doctors=  await await Doctor.find({confirmTiming:"true"}).countDocuments()
  .then(count => {
    totalDoctors = count;
    return Doctor.find({confirmTiming:"true"},{__v:0,createdAt:0,updatedAt:0,Salary:0}).populate('userId','name email Gender _id').populate({ path: 'Times', select: 'Days Time ' })
    .skip((currentPage - 1) * perPage)  
    .limit(perPage)
    .then((response)=>{
              res.json({message:'success',Doctors:response,totalDoctors: totalDoctors,status:200});
      });
  });
      })
//////////////////////////////////////////////////////////////////////////////////////
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
  ////////////////////////////////////////////////////////
  export const addMedicalHistory=catchAsncError( async(req,res,next)=> {
    let userID=req.query.userID;
    let {Conditions,symptoms,medication,allergies,tobacco,illegalDrugs,consumeAlcohol}=req.body;
    let patient =await Patient.findOne({user:userID});
    if(!patient){
      return next(new AppError('Patient Not Add Medical History',422))
    }
    let History=await medicalHistory.findOne({Patient:patient._id});
    if (History) {
      return next(new AppError('Patient Add Medical History You Can Update it',422))
    }
    await medicalHistory.insertMany({Conditions,symptoms,medication,allergies,tobacco,illegalDrugs,consumeAlcohol,Patient:patient._id})
    res.json({message:'success',status:200})
    })
    /////////////////////////////////////////////////////////////////////////
export const timeDetails =catchAsncError(async(req,res,next)=>{
  let doctorID=req.query.doctorID;
  await Doctor.findById(doctorID).populate('Times').then((data)=>{
    if(data.confirmTiming=="true"){
      res.json({message:'success',Data:data.Times,status:200})
    }else{
      return next(new AppError('No Time',422))
    }
    console.log(data);
  })
})
////////////////////////////////////////////////////////////////////////////
export const viewMedicalHistory =catchAsncError(async(req,res,next)=>{
  let userID=req.query.userID;
  let patient =await Patient.findOne({user:userID});
    if(!patient){
      return next(new AppError('Patient Not Add Medical History',422))
    }
    await medicalHistory.findOne({Patient:patient._id},{_id:0,Patient:0,__v:0,createdAt:0,updatedAt:0}).then(async(data)=>{
      res.json({message:'success',data,status:200})
    })
})
////////////////////////////////////////////////////////////////////////////
export const updateMedicalHistory =catchAsncError(async(req,res,next)=>{
  let userID=req.query.userID; 
  let {Conditions,symptoms,medication,allergies,tobacco,illegalDrugs,consumeAlcohol}=req.body;
  let patient =await Patient.findOne({user:userID});
    if(!patient){
      return next(new AppError('Patient Not Add Medical History',422))
    }
    let data=await medicalHistory.findOneAndUpdate({Patient:patient._id},{Conditions,symptoms,medication,allergies,tobacco,illegalDrugs,consumeAlcohol},{new:true});
      res.json({message:'success',data,status:200})
})