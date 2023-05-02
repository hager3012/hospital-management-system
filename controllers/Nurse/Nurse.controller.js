import { Patient } from "../../models/Patient/Patient.models.js";
import { bookRoom } from "../../models/rooms/bookRoom.models.js";
import { catchAsncError } from "../../util/catchAsncError.js";

export const viewPatients=catchAsncError(async(req,res,next)=>{
    await bookRoom.find().then((data)=>{
        console.log(data);
    })
})