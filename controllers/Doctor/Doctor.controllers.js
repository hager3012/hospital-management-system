import { Doctor } from "../../models/Doctors/Doctors.models.js";
import { bookingTime } from "../../models/Doctors/bookingTime.models.js";
import { Timing } from "../../models/Timing/Timing.models.js";
import { AppError } from "../../util/AppError.js";
import { catchAsncError } from "../../util/catchAsncError.js";

export const confirmTiming =catchAsncError(async(req,res,next)=>{
    let {DoctorId}=req.params;
    let{confirm}=req.body;
    let DoctorFind=await Doctor.findById(DoctorId).populate('Times')
    if(DoctorFind.Times.confirmTiming==="-1"){
        await Timing.updateOne({_id:DoctorFind.Times._id},{confirmTiming:confirm})
        res.json({message:'success',status:200});
    }else{
        next(new AppError('confirmed',422))
    }
})
export const ViewTiming =catchAsncError(async(req,res,next)=>{
    let {DoctorId}=req.params;
    let DoctorFind=await Doctor.findById(DoctorId).populate({path:'Times',confirmTiming:{$cond: { if:{$in:"-1"} }   }}).then((response=>{
        if(response.Times.confirmTiming=="true"||response.Times.confirmTiming=="-1"){
            res.json({message:'success',Time:response.Times,status:200});
        }
        else{
            next(new AppError('Timing cancel',422))
        }
    })).catch(err=>{
        next(new AppError('Doctor Not Found',422))
    })
})

export const addLimitRange =catchAsncError(async(req,res,next)=>{
    let {DoctorId}=req.params;
    let {limitRange} = req.body;
    let DoctorFind=await Doctor.findById(DoctorId).populate({path:'Times'})
        if(DoctorFind){
            let book = await bookingTime.findOne({doctor:DoctorId})
            if(book){
                await bookingTime.findOneAndUpdate({doctor:DoctorId},{limitRange})
                res.json({message:'success',status:200});
            }else{
                await bookingTime.insertMany({doctor:DoctorId,numberOfPatients:0,Times:DoctorFind.Times._id,limitRange})
                res.json({message:'success',status:200});
            }
               

        }else{
         next(new AppError('Doctor Not Found',422))

        }

})
