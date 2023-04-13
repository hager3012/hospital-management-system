import { Doctor } from "../../models/Doctors/Doctors.models.js";
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
    
    // console.log((confirm));
    // jwt.verify(token, process.env.JWT_KEY,  async function(err, decoded) {
    //     if(err){
    //         next(new AppError('Token is invalid',401)) 
    //     }
    //     else{
    //     await userModel.findOneAndUpdate({email:decoded.options},{confirmEmail:true});
    //     res.json({message:'success',status:200});
    //     // res.connection.destroy();
    //     }
    // });
    
})