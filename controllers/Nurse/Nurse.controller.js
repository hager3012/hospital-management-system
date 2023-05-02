import { Patient } from "../../models/Patient/Patient.models.js";
import { bookRoom } from "../../models/rooms/bookRoom.models.js";
import { userModel } from "../../models/user.model.js";
import { catchAsncError } from "../../util/catchAsncError.js";

export const viewPatients=catchAsncError(async(req,res,next)=>{
    let arrayOfPatient=[];
    await bookRoom.find({},{Room:0,__v:0,createdAt:0,updatedAt:0}).populate('Patient').then(async(response)=>{
        for(let i=0;i<response.length;i++){
            await userModel.findById(response[i].Patient.user).then((data)=>{
                let birthdate = new Date(data.DOB);
                let today=new Date();
                    let age = today.getFullYear() - birthdate.getFullYear() - 
                    (today.getMonth() < birthdate.getMonth() || 
                    (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
                arrayOfPatient.push({id:response[i].Patient._id,name:data.name,
                email:data.email,
            Gender:data.Gender,
        Age:age})
            })
        }

    })
    res.json({message:'success',Patient:arrayOfPatient,status:200}) ;
})