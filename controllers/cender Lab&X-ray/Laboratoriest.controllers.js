import { LabReport } from "../../models/CenterLab&radio/lab/LabReport.models.js";
import { prescription } from "../../models/Doctors/prescription.models.js";
import { Patient } from "../../models/Patient/Patient.models.js";
import { userModel } from "../../models/user.model.js";
import { AppError } from "../../util/AppError.js";
import { catchAsncError } from "../../util/catchAsncError.js";
import fs from 'fs';
export const addLapReport=catchAsncError(async(req,res,next)=>{
    let patientID=req.query.patientID;
    let {type, price}=req.body;
    if(!req.file){
        return next(new AppError('send report only'),406);
    }
    await Patient.findById(patientID).then(async(data)=>{
        if(!data){
            return next(new AppError('Patient Not Found',406))
        }
        else{
            await LabReport.insertMany({type , path:req.file.filename ,price ,Patient:patientID, createdBy:req.userid}).then(()=>{
                res.json({message:'Done'});
            }).catch((err)=>{
                return next(new AppError(err,406))
            })
            
        }
    })
})
//////////////////////////////////////////////////////////////////////
export const viewLabReport=catchAsncError(async(req,res,next)=>{
    let currentPage = req.query.currentPage || 1;
  const perPage = 10;
  let totalLapReport;
  let report=  await LabReport.find().countDocuments()
  .then(count => {
    totalLapReport = count;
    return LabReport.find({},{__v:0,createdAt:0,updatedAt:0,path:0,createdBy:0,Patient:0})
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
  });
  res.json({message:'success',Reports:report,status:200,totalLapReport: totalLapReport})
})
///////////////////////////////////////////////////////////////////
export const viewReportDetails=catchAsncError(async(req,res,next)=>{
    let {reportID}=req.query;
    await LabReport.findById(reportID,{__v:0,createdAt:0,updatedAt:0}).populate('createdBy','name -_id').populate('Patient').then(async(data)=>{
        let patientID=data.Patient.user
        await userModel.findById(patientID,{name:1,email:1,Mobile:1,Gender:1,DOB:1}).then((result)=>{
            console.log(result);
            data.Patient=result;
        })
        res.json({message:'success',Reports:data,status:200})
    })
})
///////////////////////////////////////////////////////////////////
export const deleteReport=catchAsncError(async(req,res,next)=>{
    let reportID=req.query.reportID;
    let currentPage=req.query.currentPage;
    let reportOne=await LabReport.findById(reportID)
    if(reportOne){
        fs.unlink('uploads/' + reportOne.path, (err) => {
            if (err) {
                throw err;
            }
        });
      await LabReport.deleteOne({_id:reportID},{new:true})
      const perPage = 10;
    let totalLapReport;
    let report=  await LabReport.find().countDocuments()
  .then(count => {
    totalLapReport = count;
    return LabReport.find({},{__v:0,createdAt:0,updatedAt:0,path:0,createdBy:0,Patient:0})
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
  });
    if(report){
        res.json({message:'success',Reports:report,status:200}) ;
      }
      
    }else{
      next(new AppError('Report is Not Found',422))
    }
})
///////////////////////////////////////////////////////////////////////
export const viewPatient=catchAsncError(async(req,res,next)=>{
    let arrayOfPatientHaveReport=[];
    await prescription.find().then(async(data)=>{
        for(let i=0;i<data.length;i++){
            if(data[i].Lab.length){
                await Patient.findById(data[i].Patient).populate('user','-_id name email Gender Mobile DOB').then((result)=>{
                    let birthdate = new Date(result.user.DOB);
                    let today=new Date();
                        let age = today.getFullYear() - birthdate.getFullYear() - 
                        (today.getMonth() < birthdate.getMonth() || 
                        (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
                        result.user.DOB=age;
                    arrayOfPatientHaveReport.push(result)
                })
            }
        }
    })
    res.json({message:'success',Patient:arrayOfPatientHaveReport,status:200}) ;
})