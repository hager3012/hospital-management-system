import { Doctor } from "../../models/Doctors/Doctors.models.js";
import { bookingTime } from "../../models/Doctors/bookingTime.models.js";
import { AppError } from "../../util/AppError.js";
import { catchAsncError } from "../../util/catchAsncError.js";

export const ViewDoctors=catchAsncError( async(req,res,next)=> {
     let Doctors=await  Doctor.find({},{__v:0,createdAt:0,updatedAt:0,Salary:0}).populate('userId').populate('Times',' -__v -createdAt -updatedAt ')
    res.json({message:'success',Doctors:Doctors,status:200})
      }) 
export const BookDoctor=catchAsncError( async(req,res,next)=> {
    let {id}=req.params;
    console.log(id);
  const findDoctor=await Doctor.findById(id);
  if(findDoctor){
    await bookingTime.findOne({doctor:findDoctor._id,}).then(async (response)=>{
      if(response.numberOfPatients !== response.limitRange){
        await bookingTime.findOneAndUpdate({doctor:findDoctor._id,},{ $inc: { numberOfPatients: 1 } })
        res.json({message:'success',status:200});
      }else{
        next(new AppError('Limit Range Completed',422))
      }
    })
  
  }
  else{
    next(new AppError('Doctor is Not Found',422))
  }
}) 