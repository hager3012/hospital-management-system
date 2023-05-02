import { Patient } from "../../models/Patient/Patient.models.js";
import { Room } from "../../models/rooms/room.model.js"
import { AppError } from "../../util/AppError.js";
import { catchAsncError } from "../../util/catchAsncError.js"

export const addRoom=catchAsncError(async(req,res,next)=>{
    let {RoomType}=req.body;
    await Room.insertMany({RoomType}).then(()=>{
        res.json({message:'success',status:200})
    }).catch((err)=>{
        next(AppError('Failed',422));
    })
})
export const viewPatients=catchAsncError(async(req,res,next)=>{
    await Patient.find({},{__v:0,createdAt:0,updatedAt:0}).populate('user','name Mobile Gender').then((data)=>{
        res.json({message:'success',data,status:200})
    })
})