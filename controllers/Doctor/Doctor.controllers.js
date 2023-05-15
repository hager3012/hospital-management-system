import { Doctor } from "../../models/Doctors/Doctors.models.js";
import { bookingTime } from "../../models/Doctors/bookingTime.models.js";
import { prescription } from "../../models/Doctors/prescription.models.js";
import { appointment } from "../../models/Patient/appointment.models.js";
import { Disease } from "../../models/Patient/disease.models.js";
import { medicalHistory } from "../../models/Patient/medicalHistory.models.js";
import { Timing } from "../../models/Timing/Timing.models.js";
import { userModel } from "../../models/user.model.js";
import { AppError } from "../../util/AppError.js";
import { catchAsncError } from "../../util/catchAsncError.js";
import { Patient } from './../../models/Patient/Patient.models.js';
import { bookRoom } from './../../models/rooms/bookRoom.models.js';
import { LabReport } from './../../models/CenterLab&radio/lab/LabReport.models.js';
import { X_RayReport } from './../../models/CenterLab&radio/X-ray/X_RayReport.models.js';

export const confirmTiming =catchAsncError(async(req,res,next)=>{
    let DoctorId=req.query.userID;
    let{confirm}=req.body;
    let DoctorFind=await Doctor.findOne({userId:DoctorId})
    if(DoctorFind.confirmTiming==="-1"){ 
        await Doctor.updateOne({userId:DoctorId},{confirmTiming:confirm})
        res.json({message:'success',status:200});
    }else{
        next(new AppError('confirmed',422))
    }
})
export const ViewTiming =catchAsncError(async(req,res,next)=>{
    let userID=req.query.userID;
    let DoctorFind=await Doctor.findOne({userId:userID},{confirmTiming:1}).populate({path:'Times'   }).then((response=>{
        if(response.confirmTiming=="true"||response.confirmTiming=="-1"){
            res.json({message:'success',Time:response,status:200});
        }
        else{
            next(new AppError('Timing cancel',422))
        }
    })).catch(err=>{
        next(new AppError('Doctor Not Found',422))
    })
})

export const addLimitRange =catchAsncError(async(req,res,next)=>{
    let DoctorId=req.query.userID;
    let {limitRange} = req.body;
    let DoctorFind=await Doctor.findOne({userId:DoctorId}).populate({path:'Times'})
        if(DoctorFind){
            let book = await bookingTime.findOne({doctor:DoctorFind._id})
            if(book){
                await bookingTime.findOneAndUpdate({doctor:DoctorFind._id},{limitRange})
                res.json({message:'success',status:200});
            }else{
                await bookingTime.insertMany({doctor:DoctorFind._id,Times:DoctorFind.Times._id,limitRange})
                res.json({message:'success',status:200});
            }
               

        }else{
         next(new AppError('Doctor Not Found',422))

        }

})
export const ViewAppointment=catchAsncError( async(req,res,next)=> {
    let userID=req.query.userID;
    let Time=[];
    let DoctorFind=await Doctor.findOne({userId:userID})
    if(!DoctorFind){
      return next(new AppError('Doctor is Not Found',422))
    }
    let time=await appointment.find({Doctor:DoctorFind._id},{__v:0,createdAt:0,updatedAt:0,Doctor:0}).then(async(data)=>{
        for(let i=0;i<data.length;i++){
            let patient=await Patient.findById(data[i].Patient,{__v:0,createdAt:0,updatedAt:0, _id:0}).populate('user','name DOB -_id');
            Time.push({Appointment:data[i],Patient:patient.user});
        }
        
    })
    res.json({message:'success',Data:Time,status:200})
    }) 
export const addPrescription=catchAsncError(async(req,res,next)=>{
    let {userID,patientID}=req.query;
    let {Advice,Medication,Lab,X_ray,datePatient}=req.body;
    let doctor=await Doctor.findOne({userId:userID});
    let patient=await Patient.findById({_id:patientID});
    if(!doctor&&!patient){
        return next(new AppError('Doctor or Patient is Not Found',203))
    }
    prescription.findOne({datePatient:datePatient,Patient:patientID}).then(async(data)=>{
        if(!data){
            await prescription.insertMany({doctor:userID,Patient:patientID,Advice,Medication,Lab,X_ray,datePatient}).then(()=>{
                res.json({message:'success',status:200})
            })
        }
        else{
            return next(new AppError('You added prescription in this date you can update',406))
        }
    })

})    
export const viewPrescription=catchAsncError(async(req,res,next)=>{
    let {userID,patientID}=req.query;
    await prescription.find({doctor:userID,Patient:patientID}).then((data)=>{
        if(!data){
            return next(new AppError('prescription is Not Found',406))
        }
        res.json({message:'success',data,status:200})
    });
})
export const updatePrescription=catchAsncError(async(req,res,next)=>{
    let {userID,patientID}=req.query;
    let {Advice,Medication,Lab,X_ray,datePatient}=req.body;
    await prescription.findOneAndUpdate({doctor:userID,Patient:patientID,datePatient},{Advice,Medication,Lab,X_ray},{new:true}).then((data)=>{
        if(!data){
            return next(new AppError('prescription is Not Found',406))
        }
        res.json({message:'success',data,status:200})
    });
})
export const addPatientDisease=catchAsncError(async(req,res,next)=>{
    let patientID=req.query.patientID;
    let {disease}=req.body;
    await Disease.findOne({Patient:patientID}).then(async(data)=>{
        if(!data){
            let arrayOfDisease=[];
            arrayOfDisease.push(disease);
            await Disease.insertMany({Patient:patientID,Disease:arrayOfDisease}).then(()=>{
                res.json({message:'success',status:200})
            })
        }
        else{
            await Disease.find({Patient:patientID,Disease:disease}).then(async(result)=>{
                if(result.length==0){
                    let arrayOfDisease=data.Disease;
                    arrayOfDisease.push(disease)
                    await Disease.updateOne({Patient:patientID},{Disease:arrayOfDisease}).then(()=>{
                        res.json({message:'success',status:200})
                    })
                }
                else{
                    return next(new AppError('The disease has been added',406))
                }
            })
            
        }
    })
    
})
export const deletePatientDisease=catchAsncError(async(req,res,next)=>{
    let patientID=req.query.patientID;
    let disease=req.query.disease;
    await Disease.findOne({Patient:patientID}).then(async(data)=>{
        let arrayOfDisease=data.Disease;
        let diseaseIndex =arrayOfDisease.indexOf(disease);
        if(diseaseIndex!=-1){
            arrayOfDisease.splice(diseaseIndex, 1);
            await Disease.updateOne({Patient:patientID},{Disease:arrayOfDisease}).then(()=>{
                res.json({message:'success',status:200})
            })
        }
        else{
            next(new AppError('this Disease is deleted',406))
        }

    })
})
////////////////////////////////////////////////////
export const viewMedicalHistory =catchAsncError(async(req,res,next)=>{
    let patientID=req.query.patientID;
    await medicalHistory.findOne({Patient:patientID},{_id:0,Patient:0,__v:0,createdAt:0,updatedAt:0}).then(async(data)=>{
        if(data){
            res.json({message:'success',data,status:200})
        }
        else{
            next(new AppError('Patient Not Add Medical History',422))
        }
    })
})
/////////////////////////////////////////////////////////////////////
export const viewPatientDetails =catchAsncError(async(req,res,next)=>{
    let {patientID,userID}=req.query;
    let patient={};
    let doctorID;
    await Patient.findById(patientID).populate('user','name email Mobile DOB Address Gender').then((data)=>{
        if(!data){
            return next(new AppError('make sure that this patient exists',406))
        }
        let birthdate = new Date(data.user.DOB);
                let today=new Date();
                    let age = today.getFullYear() - birthdate.getFullYear() - 
                    (today.getMonth() < birthdate.getMonth() || 
                    (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
        data.user.DOB=age;
        patient.userDetails=data.user
    });
    await Doctor.findOne({userId:userID}).populate('userId').then(async(data)=>{
        if(data){
            doctorID=data._id;
            await appointment.find({Patient:patientID,Doctor:data._id},{_id:0,Patient:0,Doctor:0,__v:0}).then((result)=>{
                if(result.length!=0){
                    patient.appointments=result;
                }
                
            })
        }
    });
    await bookRoom.findOne({Patient:patientID}).populate('Room','-__v -_id').then((data)=>{
        if(data){
            patient.Room=data.Room;
        }
    });
    await Disease.findOne({Patient:patientID},{Disease:1,_id:0}).then((data)=>{
        if(data.Disease.length!=0){
            patient.Disease=data.Disease
        }
    })
    await LabReport.find({Patient:patientID},{__v:0,_id:0,Patient:0}).populate('createdBy','Gender name email Mobile').then((data)=>{
        if(data.length!=0){
            patient.LabReport=data;
        }
    });
    await medicalHistory.findOne({Patient:patientID},{__v:0,_id:0,Patient:0}).then((data)=>{
        if(data){
            patient.medicalHistory=data;
        }
    });
    await prescription.find({doctor:userID,Patient:patientID},{Patient:0,doctor:0,_id:0}).then((data)=>{
        if(data.length!=0){
            patient.prescription=data;
        }
    })
    await X_RayReport.find({Patient:patientID},{__v:0,_id:0,Patient:0}).populate('createdBy','Gender name email Mobile').then((data)=>{
        if(data.length!=0){
            patient.X_RayReport=data;
        }
    });
    res.json({message:'success',data:patient,status:200});
})
/////////////////////////////////////////////////////////////
export const viewAllPatient=catchAsncError(async(req,res,next)=>{
    let currentPage=req.query.currentPage;
    await Patient.find({},{updatedAt:0,createdAt:0,__v:0}).populate('user','-_id -confirmEmail -__v -role -password').then(async(data)=>{
        let perPage=10;
        let totalPatients;
    let patients=  await Patient.find().countDocuments()
    .then(count => {
      totalPatients = count;
      return Patient.find({},{updatedAt:0,createdAt:0,__v:0}).populate('user','-_id -confirmEmail -__v -role -password')
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    });
    res.json({message:'success',Patients:patients,status:200,totalPatients: totalPatients}) ;
    })
})
/////////////////////////////////////////////////////////////////
export const searchPatient=catchAsncError(async (req,res,next)=>{
    let arrayOfPatient=[];
    await Disease.find().populate('Patient').then(async(data)=>{
        for(let i=0;i<data.length;i++){
            await Patient.findById(data[i].Patient,{updatedAt:0,createdAt:0,__v:0}).populate('user','-_id -confirmEmail -__v -role -password')
            .then((result)=>{
                arrayOfPatient.push({Patient:result,Disease:data[i].Disease});
            })
        }
        res.json({message:'success',Patients:arrayOfPatient,status:200}) ;
    })
})