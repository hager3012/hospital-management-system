import { hash as _hash } from 'bcrypt';
import { catchAsncError } from '../../util/catchAsncError.js';
import { AppError } from '../../util/AppError.js';
import { Pharmacy } from '../../models/Pharmancy/Pharmacy.models.js';
import { Medicine } from './../../models/Pharmancy/medicine.models.js';
export const addMedicine=catchAsncError(async(req,res,next)=>{
    const {Medicine_name,Medicine_quantity,Medicine_type,Medicine_price,exp_date}=req.body;
    let Medicines=await Medicine.findOne({Medicine_name:Medicine_name});
    if(!Medicines){
        let {id}=await Pharmacy.findOne({name:'HMS Pharmacy'});
        await Medicine.insertMany({Medicine_name,Medicine_quantity,Medicine_type,Medicine_price,exp_date,Pharmacy:id});
        res.json({message:'success',status:200})
    }
    else{
        next(new AppError('Medicine is alreay Found You Can Update',422))
    }
})
////////////////////////////////////////
export const findAll=catchAsncError( async(req,res,next)=> {
  const {currentPage} = req.query || 1;
  const perPage = 10;
  let totalItems;
  let Medicines=  await Medicine.find().countDocuments()
  .then(count => {
    totalItems = count;
    return Medicine.find({},{__v:0,Medicine_quantity:0,exp_date:0,createdAt:0,updatedAt:0}).populate('Pharmacy','-_id')
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
  });
  res.json({message:'success',Medicines:Medicines,status:200,totalItems: totalItems})
    })
// ///////////////////////////////////////
export const  findOne=catchAsncError( async(req,res,next)=>{
  let id=req.query.MedicineID;
  let Medicines=await Medicine.findById(id,{__v:0}).populate('Pharmacy','-_id')
  res.json({message:'success',Medicines:Medicines,status:200});
})
// //////////////////////////////////////
export const UpdateMedicine= catchAsncError(async(req,res,next)=>{
  const id=req.query.MedicineID; 
  const {Medicine_name,Medicine_quantity,Medicine_type,Medicine_price,exp_date}=req.body;
  // this new for find after update without new return before update
  const findMedicine=await Medicine.findById(id);
  if(findMedicine){
    let {_id}=await Pharmacy.findOne({name:'HMS Pharmacy'});
    let Medicines= await Medicine.findByIdAndUpdate(id,{Medicine_name,Medicine_quantity,Medicine_type,Medicine_price,exp_date,Pharmacy:_id} ,{new:true})
    res.json({message:'success',Medicinea:Medicines,status:200});
  }
  else{
    next(new AppError('Medicine is Not Found',422))
  }
  })
// /////////////////////////////////////////////// 
export const DeleteMedicine= catchAsncError(async(req,res,next)=>{
  let currentPage=req.query.currentPage;
    let id=req.query.MedicineID;
  const MedicineOne=await Medicine.findById(id);
  if(MedicineOne){
    let deleteMedicine=await Medicine.deleteOne({_id:id},{new:true});
    const perPage = 10;
  let totalItems;
  let Medicines=  await Medicine.find().countDocuments()
  .then(count => {
    totalItems = count;
    return Medicine.find({},{__v:0,Medicine_quantity:0,exp_date:0,createdAt:0,updatedAt:0}).populate('Pharmacy','-_id')
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
  });
    if(deleteMedicine){
      res.json({message:'success',Medicines:Medicines,status:200,totalItems: totalItems}) ;
    }
    
  }
  
  else{
    next(new AppError('Medicine is Not Found',422))
  }
})