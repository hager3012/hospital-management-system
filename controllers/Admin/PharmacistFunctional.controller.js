import { hash as _hash } from 'bcrypt';
import { sendMail as _sendMail } from '../../emails/HMS.email.js';
import { userModel } from '../../models/user.model.js';
import { catchAsncError } from '../../util/catchAsncError.js';
import { AppError } from '../../util/AppError.js';
import { pharmacist } from '../../models/Pharmancy/Pharmacist.models.js';
import { Pharmacy } from '../../models/Pharmancy/Pharmacy.models.js';
export const addPharmacist=catchAsncError(async(req,res,next)=>{
  const {name,email,password,Mobile,Gender,DOB,Address,namePharmacy,role}=req.body;
  let Email=await userModel.findOne({email:email});
  if(!Email){
    _hash(password, Number(process.env.ROUND), async function(err, hash){
      await userModel.insertMany({name , email ,password:hash , Mobile,Gender,DOB,Address,role});
      let {_id}=await userModel.findOne({email});
      let {id}=await Pharmacy.findOne({name:namePharmacy});
      await pharmacist.insertMany({userId:_id,PharmacyId:id})
      _sendMail(email,role,password); 
      res.json({message:'success',status:200})
    }) 
  }
  else{
    next(new AppError('Email Already in Use',422))
  }
  
})
////////////////////////////////////////
export const findAllPharmacist=catchAsncError( async(req,res,next)=> {
  let pharmacists=  await pharmacist.find({},{__v:0}).populate('userId','name email -_id').populate('PharmacyId','-_id');
  res.json({message:'success',pharmacists:pharmacists,status:200})
    })
// ///////////////////////////////////////
export const  findOnePharmacist=catchAsncError( async(req,res,next)=>{
  let {id}=req.params;
  let pharmacists=await pharmacist.findById(id,{__v:0}).populate('userId','-_id -confirmEmail -role -password -__v').populate('PharmacyId','-_id')
  if(pharmacists!=null){
    res.json({message:'success',pharmacist:pharmacists,status:200});
  }else{
    next(new AppError('Pharmacist Not Found',422))
  }

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


    res.json({message:'success',pharmacist:pharmacists,status:200});
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
      res.json({message:'success',Pharmacist:deletepharmacists,status:200}) ;
    }
    
  }
  
  else{
    next(new AppError('Pharmacist is Not Found',422))
  }
})