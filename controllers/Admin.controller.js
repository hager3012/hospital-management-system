import {Doctor} from '../models/Doctors.models.js'
import { userModel } from '../models/user.model.js';
import { catchAsncError } from "../util/catchAsncError.js";
import { AppError } from './../util/AppError.js';
import { hash as _hash, compare } from 'bcrypt';
import { sendMail as _sendMail } from '../emails/HMS.email.js';
export const addDoctor=catchAsncError(async(req,res,next)=>{
  const {name,email,password,Mobile,Gender,DOB,Address,Specialization,Experience,Language,role}=req.body;
  let Email=await userModel.findOne({email:email});
  if(!Email){
    _hash(password, Number(process.env.ROUND), async function(err, hash){
      await userModel.insertMany({name , email ,password:hash , Mobile,Gender,DOB,Address,role});
      const {_id}=await userModel.findOne({email})
      await Doctor.insertMany({Specialization,Experience,Language,userId:_id})
      _sendMail(email,role,password); 
      next(new AppError("Done",200)); 
    }) 
  }
  else{
    next(new AppError('Email is alreay Found',422))
  }
  
})
////////////////////////////////////////
export const findAll=catchAsncError( async(req,res,next)=> {
  let Doctors=  await Doctor.find({},{Language:0,__v:0,createdAt:0,updatedAt:0}).populate('userId','name -_id');
  res.json({Doctors:Doctors,status:200})
    })
// ///////////////////////////////////////
export const  findOne=catchAsncError( async(req,res,next)=>{
  let {id}=req.params;
  let Doctors=await Doctor.findById(id,{__v:0}).populate('userId','-_id -confirmEmail -role -password -__v')
  res.json({Doctor:Doctors,status:200});
})
// //////////////////////////////////////
export const UpdateDoctor= catchAsncError(async(req,res,next)=>{
  const {id}=req.params;
  const {Specialization,Experience,Language,name,Mobile,Gender,DOB,Address}=req.body;
  // this new for find after update without new return before update
  const findDoctor=await Doctor.findById(id);
  if(findDoctor){
    await userModel.findByIdAndUpdate(findDoctor.userId,{name,Mobile,Gender,DOB,Address},{new:true})
    let doctor= await Doctor.findByIdAndUpdate(id,{Specialization,Experience,Language,userId:findDoctor.userId},{new:true}).populate('userId','-_id -confirmEmail -role -password -__v')


    res.json({message:'Done',Doctor:doctor,status:200});
  }
  else{
    next(new AppError('Doctor is Not Found',422))
  }
  })
// /////////////////////////////////////////////// 
export const DeleteDoctor= catchAsncError(async(req,res,next)=>{
  const {id}=req.params;
  const doctor=await Doctor.findById(id);
  if(doctor){
    let deleteDoctor=await Doctor.findByIdAndDelete({_id:id},{new:true}).populate('userId','-_id -confirmEmail -role -password -__v')
    let deleteUser=await userModel.findByIdAndDelete({_id:deleteDoctor.userId},{new:true})
    if(deleteDoctor&&deleteUser){
      res.json({message:deleteDoctor,status:200}) ;
    }
  }
  
  else{
    next(new AppError('Doctor is Not Found',422))
  }
})