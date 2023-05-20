import { catchAsncError } from "../../util/catchAsncError.js";
import { Order } from './../../models/Patient/order.models.js';

export const viewOrderForPatient=catchAsncError(async(req,res,next)=>{
    let orderID=req.query.orderID;
    await Order.findById(orderID).populate('user','name email Gender -_id').then((data)=>{
        if(!data){
            return next(new AppError('incorrect in id order',406))
        }
        res.json({message:'success',data,status:200})
    })
})
/////////////////////////////////////////////////////////////////////////
export const viewPatientNotPay=catchAsncError(async(req,res,next)=>{
    await Order.find({checkOut:false}).populate('user','name email Gender').then((data)=>{
        res.json({message:'success',data,status:200})
    })
});
/////////////////////////////////////////////////////////////////////////
export const viewPatientPay=catchAsncError(async(req,res,next)=>{
    await Order.find({checkOut:true}).populate('user','name email Gender').then((data)=>{
        res.json({message:'success',data,status:200})
    })
});
/////////////////////////////////////////////////////////////////////////
export const payPatientBill=catchAsncError(async(req,res,next)=>{
    let orderID=req.query.orderID;
    await Order.findByIdAndUpdate(orderID,{checkOut:true}).then((data)=>{
        if(data){
            res.json({message:'success',status:200})
        }
    })
})
