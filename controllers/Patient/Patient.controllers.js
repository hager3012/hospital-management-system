import { Doctor } from "../../models/Doctors/Doctors.models.js";
import { bookingTime } from "../../models/Doctors/bookingTime.models.js";
import { prescription } from "../../models/Doctors/prescription.models.js";
import { Patient } from "../../models/Patient/Patient.models.js";
import { appointment } from "../../models/Patient/appointment.models.js";
import { Disease } from "../../models/Patient/disease.models.js";
import { medicalHistory } from "../../models/Patient/medicalHistory.models.js";
import { Medicine } from "../../models/Pharmancy/medicine.models.js";
import { Room } from "../../models/rooms/room.model.js";
import { userModel } from "../../models/user.model.js";
import { AppError } from "../../util/AppError.js";
import { catchAsncError } from "../../util/catchAsncError.js";
import { bookRoom } from './../../models/rooms/bookRoom.models.js';

export const searchDoctor=catchAsncError( async(req,res,next)=> {
     await  Doctor.find({confirmTiming:"true"},{__v:0,createdAt:0,updatedAt:0,Salary:0}).populate('userId','name email Gender').populate({path:'Times'  }).then((response=>{
      res.json({message:'success',Doctors:response,status:200});
  }))

    })
  ////////////////////////////////////////////////////////////////////////
  export const ViewDoctors=catchAsncError( async(req,res,next)=> {
  let currentPage = req.query.currentPage || 1;
  let perPage = 10;
  let totalDoctors=0;
  let Doctors=  await await Doctor.find({confirmTiming:"true"}).countDocuments()
  .then(count => {
    totalDoctors = count;
    return Doctor.find({confirmTiming:"true"},{__v:0,createdAt:0,updatedAt:0,Salary:0}).populate('userId','name email Gender _id').populate({ path: 'Times', select: 'Days Time ' })
    .skip((currentPage - 1) * perPage)  
    .limit(perPage)
    .then((response)=>{
              res.json({message:'success',Doctors:response,totalDoctors: totalDoctors,status:200});
      });
  });
      })
//////////////////////////////////////////////////////////////////////////////////////
export const BookDoctor=catchAsncError( async(req,res,next)=> {
    let {doctorID,userID}=req.query;
    let {date}=req.body;
    let DateAPI=date.day+" "+date.selDate
  let findDoctor=await Doctor.findById(doctorID);
  if(!findDoctor){
    return next(new AppError('Doctor is Not Found',422))
  }
  let num=await appointment.find({Doctor:doctorID,Date:DateAPI}).count();
    let limit=await bookingTime.findOne({doctor:doctorID});
    if(num===limit.limitRange){
      next(new AppError('Limit Range Completed Please Book another Time',422))
    }
    else{
      let patient =await Patient.findOne({user:userID});
      await appointment.insertMany({Patient:patient._id,Doctor:doctorID,Date:DateAPI});
      res.json({message:'success',status:200});
    }
}) 
///////////////////////////////////////////////////////
export const cancelBookDoctor=catchAsncError(async(req,res,next)=>{
  let {doctorID,userID}=req.query;
  let findDoctor=await Doctor.findById(doctorID);
  if(!findDoctor){
    return next(new AppError('Doctor is Not Found',422))
  }
  let patient =await Patient.findOne({user:userID});
  await appointment.findOneAndDelete(({Patient:patient._id,Doctor:doctorID})).then((data)=>{
    if(data){
      res.json({message:'success',status:200})
    }
    else{
      res.json({message:'appointment is canceled',status:200})
    }

  })
})
export const ViewAppointment=catchAsncError( async(req,res,next)=> {
  let userID=req.query.userID;
  let doctor=[];
  let patient =await Patient.findOne({user:userID});
  if(!patient){
    return next(new AppError('Patient is Not Found',422))
  }
  let time=await appointment.find({Patient:patient._id},{__v:0,createdAt:0,updatedAt:0,Patient:0}).then(async(data)=>{
    for(let i=0;i<data.length;i++){
      let result=await Doctor.findById(data[i].Doctor,{Experience:0,Language:0,Times:0,Salary:0,__v:0,createdAt:0,updatedAt:0}).populate('userId','name Specialization -_id');
      if(result){
        doctor.push({user:result,Time:data[i]});
      }

    }

  })
  res.json({message:'success',Doctor:doctor,status:200})
  }) 
  ////////////////////////////////////////////////////////
  export const addMedicalHistory=catchAsncError( async(req,res,next)=> {
    let userID=req.query.userID;
    let {Conditions,symptoms,medication,allergies,tobacco,illegalDrugs,consumeAlcohol}=req.body;
    let patient =await Patient.findOne({user:userID});
    if(!patient){
      return next(new AppError('Patient Not Add Medical History',422))
    }
    let History=await medicalHistory.findOne({Patient:patient._id});
    if (History) {
      return next(new AppError('Patient Add Medical History You Can Update it',422))
    }
    await medicalHistory.insertMany({Conditions,symptoms,medication,allergies,tobacco,illegalDrugs,consumeAlcohol,Patient:patient._id})
    res.json({message:'success',status:200})
    })
    /////////////////////////////////////////////////////////////////////////
export const timeDetails =catchAsncError(async(req,res,next)=>{
  let doctorID=req.query.doctorID;
  await Doctor.findById(doctorID).populate('Times').then((data)=>{
    if(data.confirmTiming=="true"){
      res.json({message:'success',Data:data.Times,status:200})
    }else{
      return next(new AppError('No Time',422))
    }
    console.log(data);
  })
})
////////////////////////////////////////////////////////////////////////////
export const viewMedicalHistory =catchAsncError(async(req,res,next)=>{
  let userID=req.query.userID;
  let patient =await Patient.findOne({user:userID});
    if(!patient){
      return next(new AppError('Patient Not Add Medical History',422))
    }
    await medicalHistory.findOne({Patient:patient._id},{_id:0,Patient:0,__v:0,createdAt:0,updatedAt:0}).then(async(data)=>{
      res.json({message:'success',data,status:200})
    })
})
////////////////////////////////////////////////////////////////////////////
export const updateMedicalHistory =catchAsncError(async(req,res,next)=>{
  let userID=req.query.userID; 
  let {Conditions,symptoms,medication,allergies,tobacco,illegalDrugs,consumeAlcohol}=req.body;
  let patient =await Patient.findOne({user:userID});
    if(!patient){
      return next(new AppError('Patient Not Add Medical History',422))
    }
    let data=await medicalHistory.findOneAndUpdate({Patient:patient._id},{Conditions,symptoms,medication,allergies,tobacco,illegalDrugs,consumeAlcohol},{new:true});
      res.json({message:'success',data,status:200})
})
///////////////////////////////////////////////////
export const viewPrescription=catchAsncError(async(req,res,next)=>{
  let userID=req.query.userID;
  let arrayOfPrescription=[];
  let patient=await Patient.findOne({user:userID});
  await prescription.find({Patient:patient._id}).then(async(data)=>{
      if(!data){
          return next(new AppError('prescriptions is Not Found',422))
      }
      for(let i=0;i<data.length;i++){
        await userModel.findOne({_id:data[i].doctor},{name:1,_id:0}).then((result)=>{
          arrayOfPrescription.push(result)
        })
      }
      res.json({message:'success',data,DoctorName:arrayOfPrescription,status:200})
  });
})
/////////////////////////////////////////////////
export const checkMedicine=catchAsncError(async(req,res,next)=>{
  let {medicine}=req.body;
  await Medicine.findOne({Medicine_name:medicine}).then(data=>{
    if(data){
      res.json({message:'Found',status:200})
    }else{
      res.json({message:'NotFound',status:200})
    }
  })
})
/////////////////////////////////////////////////////////
export const checkMedicalHistory=catchAsncError(async(req,res,next)=>{
  let {userID}=req.query;
  let patient=await Patient.findOne({user:userID});
  if(!patient){
    return next(new AppError('Patient Not Found',422))
  }
  await medicalHistory.findOne({Patient:patient._id}).then((data)=>{
    if(data){
      res.json({message:'true',status:200})
    }
    else{
      res.json({message:'false',status:200})
    }
  })
})
export const viewRoom=catchAsncError(async(req,res,next)=>{
  await Room.find({status:"false"}).then((data)=>{
    if(data.length){
      res.json({message:'success',data,status:200})
    }
    else{
      next(new AppError('No Available Room',422))
    }
  })
})
export const BookRoom=catchAsncError(async(req,res,next)=>{
  let {userID,roomID}=req.query;
  let patient=await Patient.findOne({user:userID});
  if(!patient){
    return next(new AppError('Patient Not Found',422))
  }
  await bookRoom.insertMany({Patient:patient._id,Room:roomID}).then(async()=>{
    await Room.updateOne({_id:roomID,status:"true"});
    res.json({message:'success',status:200})
  })
})
export const cancelRoom=catchAsncError(async(req,res,next)=>{
  let {userID,roomID}=req.query;
  let patient=await Patient.findOne({user:userID});
  if(!patient){
    return next(new AppError('Patient Not Found',422))
  }
  await bookRoom.deleteOne({Patient:patient._id,Room:roomID}).then(async()=>{
    await Room.updateOne({_id:roomID,status:"false"});
    res.json({message:'success',status:200})
  })
})
///////////////////////////////////////////////////////////////
export const viewBookRoom=catchAsncError(async(req,res,next)=>{
  let userID=req.query.userID;
  await Patient.findOne({user:userID}).then(async(data)=>{
    if(!data){
      return next(new AppError('Patient Not Found',422))
    }
    await bookRoom.findOne({Patient:data._id}).populate('Room').then((result)=>{
      res.json({message:'success',Room:result.Room,status:200})
    })
  })
  
})
//////////////////////////////////////////////////////////////
export const patientInformation=catchAsncError(async(req,res,next)=>{
  let userID=req.query.userID;
  await userModel.findById(userID,{name:1 , Gender:1 , _id:0 , Mobile:1, DOB:1}).then((data)=>{
    let birthdate = new Date(data.DOB);
      let today=new Date();
          let age = today.getFullYear() - birthdate.getFullYear() - 
          (today.getMonth() < birthdate.getMonth() || 
          (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
    data.DOB=age;
    res.json({message:'success',info:data,status:200})
  })
})
/////////////////////////////////////////////////////////////////
export const viewDisease=catchAsncError(async(req,res,next)=>{
  let userID=req.query.userID;
  await Patient.findOne({user:userID}).then(async(data)=>{
    if(!data){
      return next(new AppError('Patient Not Found',422))
    }
    await Disease.findOne({Patient:data._id}).then((result)=>{
      if(!result||!result.Disease.length){
        return next(new AppError('No Disease for this patient',406))
      }
      res.json({message:'success',Disease:result.Disease,status:200})
    })
  })
})