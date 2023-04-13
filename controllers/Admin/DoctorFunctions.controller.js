import { hash as _hash } from 'bcrypt';
import { sendMail as _sendMail } from '../../emails/HMS.email.js';
import { Doctor } from '../../models/Doctors/Doctors.models.js';
import { userModel } from '../../models/user.model.js';
import { catchAsncError } from '../../util/catchAsncError.js';
import { AppError } from '../../util/AppError.js';
import { Timing } from './../../models/Timing/Timing.models.js';
import { Payment } from './../../models/Payment/Payment.models.js';
export const addDoctor=catchAsncError(async(req,res,next)=>{
  const {name,email,password,Mobile,Gender,DOB,Address,Specialization,Experience,Language,Days,Time,salary,role}=req.body;
  let Email=await userModel.findOne({email:email});
  if(!Email){
    let idTime,idSalary,idUser;
    _hash(password, Number(process.env.ROUND), async function(err, hash){
      await userModel.insertMany({name , email ,password:hash , Mobile,Gender,DOB,Address,role}).then((data)=>{
        idUser=data[0]._id;
      });
      await Timing.insertMany({Days,Time}).then((data)=>{
        idTime=data[0]._id;
      })
      await Payment.insertMany({Salary:salary}).then((data)=>{
        idSalary=data[0]._id;
      });
      await Doctor.insertMany({Specialization,Experience,Language,userId:idUser,Salary:idSalary,Times:idTime})
      _sendMail(email,role,password); 
      res.json({message:'success',status:200})
    }) 
  }
  else{
    next(new AppError('Email Already in Use',422))
  }
  
})
////////////////////////////////////////
export const findAll=catchAsncError( async(req,res,next)=> {
  const {currentPage} = req.params || 1;
  const perPage = 10;
  let totalDoctors;
  let Doctors=  await Doctor.find().countDocuments()
  .then(count => {
    totalDoctors = count;
    return Doctor.find({},{__v:0,createdAt:0,updatedAt:0,Salary:0}).populate('userId','name email _id').populate({path:'Times',match: { confirmTiming:{$in:"false",$in:"-1"}   }})
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
  });
  res.json({message:'success',Doctors:Doctors,status:200,totalDoctors: totalDoctors})
    })
// ///////////////////////////////////////
export const  findOne=catchAsncError( async(req,res,next)=>{
  let {id}=req.params;
  let Doctors=await Doctor.findById(id,{__v:0}).populate('userId',' -confirmEmail -role -password -__v').populate('Times','-user -__v -createdAt -updatedAt -_id').populate(
    'Salary','-user -__v -createdAt -updatedAt -_id'
  )
  if(Doctors!=null){
    res.json({message:'success',Doctor:Doctors,status:200});
  }else{
    next(new AppError('Doctor Not Found',422))
  }


})
// //////////////////////////////////////
export const UpdateDoctor= catchAsncError(async(req,res,next)=>{
  const {id}=req.params;
  const {name,email,password,Mobile,Gender,DOB,Address,Specialization,Experience,Language,Days,Time,salary,role}=req.body;
  // this new for find after update without new return before update
  const findDoctor=await Doctor.findById(id);
  if(findDoctor){
    await Timing.updateMany({_id:findDoctor.Times},{Days,Time})
  await Payment.updateOne({_id:findDoctor.Salary},{Salary:salary})
    await userModel.findByIdAndUpdate(findDoctor.userId,{name,email,password,Mobile,Gender,DOB,Address,role},{new:true})
    let Doctors= await Doctor.findByIdAndUpdate(id,{Specialization,Experience,Language},{new:true}).populate('userId','-_id -confirmEmail -role -password -__v').populate('Times','-user -__v -createdAt -updatedAt -_id').populate(
      'Salary','-user -__v -createdAt -updatedAt -_id'
    )
  
    res.json({message:'success',Doctor:Doctors,status:200});
  }
  else{
    next(new AppError('Doctor is Not Found',422))
  }
  })
// /////////////////////////////////////////////// 
export const DeleteDoctor= catchAsncError(async(req,res,next)=>{
  const {currentPage,id}=req.params;
  let DoctorOne=await Doctor.findById(id).populate('userId',' -confirmEmail -role -password -__v');
  if(DoctorOne){
    await Doctor.deleteOne({_id:id},{new:true}).populate('userId');
    const perPage = 10;
  let totalDoctors;
  let deleteDoctors=  await Doctor.find().countDocuments()
  .then(count => {
    totalDoctors = count;
    return Doctor.find({},{__v:0,createdAt:0,updatedAt:0 ,Salary:0}).populate('userId','name email -_id').populate('Times','-user -__v -createdAt -updatedAt -_id')
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
  });
  let deleteUser=await userModel.deleteOne({_id:DoctorOne.userId},{new:true});
  let deleteTiming=await Timing.deleteOne({_id:DoctorOne.Times},{new:true});
  let deleteSalary=await Payment.deleteOne({_id:DoctorOne.Salary},{new:true});
  
  if(deleteDoctors&&deleteUser&&deleteTiming&&deleteSalary){
      res.json({message:'success',Doctor:deleteDoctors,status:200,TotalDoctors: totalDoctors}) ;
    }
    
  }else{
    next(new AppError('Doctor is Not Found',422))
  }
})