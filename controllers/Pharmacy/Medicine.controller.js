import { hash as _hash } from 'bcrypt';
import { catchAsncError } from '../../util/catchAsncError.js';
import { AppError } from '../../util/AppError.js';
import { Pharmacy } from '../../models/Pharmancy/Pharmacy.models.js';
import { Medicine } from './../../models/Pharmancy/medicine.models.js';
export const addMedicine=catchAsncError(async(req,res,next)=>{
    const {Medicine_name,Medicine_quantity,Medicine_type,Medicine_price,exp_date,namePharmacy}=req.body;
    let Medicines=await Medicine.findOne({Medicine_name:Medicine_name});
    if(!Medicines){
        let {id}=await Pharmacy.findOne({name:namePharmacy});
        await Medicine.insertMany({Medicine_name,Medicine_quantity,Medicine_type,Medicine_price,exp_date,Pharmacy:id});
        next(new AppError("success",200)); 
    }
    else{
        next(new AppError('Medicine is alreay Found',422))
    }
})
////////////////////////////////////////
export const findAll=catchAsncError( async(req,res,next)=> {
  let pharmacists=  await pharmacist.find({},{__v:0}).populate('userId','name email -_id').populate('PharmacyId','-_id');
  res.json({pharmacists:pharmacists,status:200})
    })
// ///////////////////////////////////////
export const  findOne=catchAsncError( async(req,res,next)=>{
  let {id}=req.params;
  let pharmacists=await pharmacist.findById(id,{__v:0}).populate('userId','-_id -confirmEmail -role -password -__v').populate('PharmacyId','-_id')
  res.json({pharmacist:pharmacists,status:200});
})
// //////////////////////////////////////
export const UpdatePharmacist= catchAsncError(async(req,res,next)=>{
  const {id}=req.params;
  const {name,Mobile,Gender,DOB,Address,role}=req.body;
  // this new for find after update without new return before update
  const findpharmacist=await pharmacist.findById(id);
  if(findpharmacist){
    await userModel.findByIdAndUpdate(findpharmacist.userId,{name,Mobile,Gender,DOB,Address,role},{new:true})
    let pharmacists= await pharmacist.findByIdAndUpdate(id,{userId:findpharmacist.userId} ,{new:true}).populate('userId','-_id -confirmEmail -role -password -__v')


    res.json({message:'Done',pharmacist:pharmacists,status:200});
  }
  else{
    next(new AppError('Pharmacist is Not Found',422))
  }
  })
// /////////////////////////////////////////////// 
export const DeletePharmacist= catchAsncError(async(req,res,next)=>{
  const {id}=req.params;
  const pharmacists=await pharmacist.findById(id);
  if(pharmacists){
    let deletepharmacists=await pharmacist.findByIdAndDelete({_id:id},{new:true}).populate('userId',' -confirmEmail -role -password -__v');
    let deleteUser=await userModel.deleteOne({_id:deletepharmacists.userId},{new:true})
    if(deletepharmacists&&deleteUser){
      res.json({message:deletepharmacists,status:200}) ;
    }
    
  }
  
  else{
    next(new AppError('Pharmacist is Not Found',422))
  }
})