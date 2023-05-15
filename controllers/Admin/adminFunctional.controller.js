import { Patient } from "../../models/Patient/Patient.models.js";
import { Room } from "../../models/rooms/room.model.js"
import { AppError } from "../../util/AppError.js";
import { catchAsncError } from "../../util/catchAsncError.js"

export const addRoom=catchAsncError(async(req,res,next)=>{
    let {RoomType,price}=req.body;
    await Room.insertMany({RoomType,price}).then(()=>{
        res.json({message:'success',status:200})
    }).catch((err)=>{
        next(new AppError('Failed',422));
    })
})
export const viewPatients=catchAsncError(async(req,res,next)=>{
    await Patient.find({},{__v:0,createdAt:0,updatedAt:0}).populate('user','name Mobile Gender').then((data)=>{
        res.json({message:'success',data,status:200})
    })
})
//////////////////////////////////////////////////////////////////////////////
export const viewAllRooms=catchAsncError(async(req,res,next)=>{
    let currentPage=req.query.currentPage;
    await Room.find().then(async(data)=>{
        let perPage=10;
        let totalRooms;
    let rooms=  await Room.find().countDocuments()
    .then(count => {
      totalRooms = count;
      return Room.find({},{__v:0,createdAt:0,updatedAt:0 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    });
    res.json({message:'success',Rooms:rooms,status:200,totalRooms: totalRooms}) ;
    })
});
//////////////////////////////////////////////////////////////////
export const updateRoom=catchAsncError(async(req,res)=>{
    let idRoom=req.query.idRoom;
    let {status,RoomType,price}=req.body;
    await Room.findOne({_id:idRoom}).then(async(data)=>{
        if(!data){
            next(new AppError('Room Not Found',406));
        }
        await Room.updateOne({_id:idRoom},{status,RoomType,price}).then((result)=>{
            res.json({message:'success',status:200})
        })
    })
    
});
/////////////////////////////////////////////////////////////////////
export const deleteRoom=catchAsncError(async(req,res,next)=>{
    let idRoom=req.query.idRoom;
    let currentPage=req.query.currentPage;
    await Room.findOne({_id:idRoom}).then(async(data)=>{
        if(!data){
            next(new AppError('Room Not Found',406));
        }
        await Room.deleteOne({_id:idRoom})
        let perPage=10;
        let totalRooms;
    let deleteRooms=  await Room.find().countDocuments()
    .then(count => {
      totalRooms = count;
      return Room.find({},{__v:0,createdAt:0,updatedAt:0 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    });
    res.json({message:'success',Rooms:deleteRooms,status:200,totalRooms: totalRooms}) ;
    })
})