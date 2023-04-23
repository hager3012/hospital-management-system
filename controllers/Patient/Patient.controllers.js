import { Doctor } from "../../models/Doctors/Doctors.models.js";
import { bookingTime } from "../../models/Doctors/bookingTime.models.js";
import { Patient } from "../../models/Patient/Patient.models.js";
import { appointment } from "../../models/Patient/appointment.models.js";
import { AppError } from "../../util/AppError.js";
import { catchAsncError } from "../../util/catchAsncError.js";

export const ViewDoctors=catchAsncError( async(req,res,next)=> {
     let Doctors=await  Doctor.find({},{__v:0,createdAt:0,updatedAt:0,Salary:0}).populate('userId').populate('Times',' -__v -createdAt -updatedAt ')
    res.json({message:'success',Doctors:Doctors,status:200})
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