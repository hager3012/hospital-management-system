import { userModel } from "../models/user.model.js";
import  jwt  from 'jsonwebtoken';
export const author=async(req,res,next)=>{
    let token=req.header('token');
    jwt.verify(token, process.env.JWT_KEY, async function(err, decoded) {
        if(err){
            next(new AppError(err,400))
        }
        else{
            let id=decoded.id;
            const {role}=await userModel.findById(id)
            if(role=="admin"){
                next();
            }else{
                next(new AppError('Not authorized',403))
            }
            
        }
    });
};