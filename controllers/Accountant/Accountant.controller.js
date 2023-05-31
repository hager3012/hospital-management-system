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
    const {currentPage} = req.query || 1;
    const perPage = 10;
    let totalItems;
    let Patient=  await Order.find({checkOut:false}).countDocuments()
    .then(count => {
      totalItems = count;
      return Order.find({checkOut:false}).populate('user','name email Gender')
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    });
    res.json({message:'success',Patients:Patient,status:200,totalItems: totalItems})
});
/////////////////////////////////////////////////////////////////////////
export const viewPatientPay=catchAsncError(async(req,res,next)=>{
    const {currentPage} = req.query || 1;
    const perPage = 10;
    let totalItems;
    let Patient=  await Order.find({checkOut:true}).countDocuments()
    .then(count => {
      totalItems = count;
      return Order.find({checkOut:true}).populate('user','name email Gender')
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    });
    res.json({message:'success',Patients:Patient,status:200,totalItems: totalItems})
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
