import { userModel } from "../models/user.model.js";
import  jwt  from 'jsonwebtoken';
export const authorAdmin=async(req,res,next)=>{
    let token=req.header('token');
    jwt.verify(token, process.env.JWT_KEY, async function(err, decoded) {
        if(err){
            res.json({err,status:400})
        }
        else{
            let id=decoded.id;
            const {role}=await userModel.findById(id)
            if(role=="admin"){
                next();
            }else{
                res.json({Error:'Not authorized',status:403})
            }
            
        }
    });
};
export const authorPharmacy=async(req,res,next)=>{
    let token=req.header('token');
    jwt.verify(token, process.env.JWT_KEY, async function(err, decoded) {
        if(err){
            res.json({err,status:400})
        }
        else{
            let id=decoded.id;
            const {role}=await userModel.findById(id)
            if(role=="pharmacist"){
                next();
            }else{
                res.json({Error:'Not authorized',status:403})
            }
            
        }
    });
};