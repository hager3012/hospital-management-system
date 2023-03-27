import {Doctor} from '../models/Doctors.models.js'
import { userModel } from '../models/user.model.js';
import { catchAsncError } from "../util/catchAsncError.js";
import { AppError } from './../util/AppError.js';
import { hash as _hash, compare } from 'bcrypt';
import { sendMail as _sendMail } from '../emails/HMS.email.js';
export const addDoctor=catchAsncError(async(req,res,next)=>{
  const {name,email,password,Mobile,Gender,DOB,Address,Specialization,Experience,Language,role}=req.body;
  _hash(password, Number(process.env.ROUND), async function(err, hash){
    await userModel.insertMany({name , email ,password:hash , Mobile,Gender,DOB,Address,role});
    const {_id}=await userModel.findOne({email})
    await Doctor.insertMany({Specialization,Experience,Language,userId:_id})
    _sendMail(email,role,password); 
    return next(new AppError("Done",200)); 
  }) 
  next(new AppError('Email is alreay Found',422))
})
////////////////////////////////////////
// export const findAll=catchAsncError( async(req,res,next)=> {
//   let ressultBooks=  await productBook.find().populate('createdBy','name -_id');
//         res.json({ressultBooks});
//     })
//     ///////////////////////////////////////////////
// export const findUserAddBooks =catchAsncError(async(req,res,next)=>{
//     let ressultBooks=  await productBook.find({createdBy:req.userid}).populate('createdBy','name -_id');
//         res.json({ressultBooks});
// })
// ///////////////////////////////////////
// export const  findOne=catchAsncError( async(req,res,next)=>{
//   let {id}=req.body;
//   let Book=await productBook.findById(id,{_id:0});
//   res.json({Book});
// })
// //////////////////////////////////////
// export const UpdateBook= catchAsncError(async(req,res,next)=>{
//   let {Tiltle,PathImage,Description,_id}=req.body;
//   // this new for find after update without new return before update
//   let updateBook= await productBook.findByIdAndUpdate({_id},{Tiltle ,PathImage,Description,createdBy:req.userid},{new:true});
//   if(updateBook){
//     res.json({message:'Done',updateBook});
//   }
//   else{
//     res.json({message:'this Book Not Found'});
//   } 
//   })
// /////////////////////////////////////////////// 
// export const DeleteBook= catchAsncError(async(req,res,next)=>{
//   let {_id}=req.body;
//   let deleteBook=await productBook.deleteOne({_id})
//   if(deleteBook){
//     res.json({message:'Done'}) ;
//   }
//   else{
//     res.json({message:'this Book Not Found'});
//   }
// })