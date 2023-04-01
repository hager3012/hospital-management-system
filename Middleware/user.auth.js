import dotenv from 'dotenv';
dotenv.config();
import  jwt  from 'jsonwebtoken';
import { AppError } from './../util/AppError.js';
export const auth=async(req,res,next)=>{
    let token=req.header('token');
    jwt.verify(token, process.env.JWT_KEY, async function(err, decoded) {
        if(err){
            res.json({err,status:400})
        }
        else{
            req.userid=decoded.id;
            next();
        }
    });
};
export  function verifiyUser(req,res,next){
    let token=req.params;
    jwt.verify(token, process.env.JWT_KEY,  function(err, decoded) {
        if(err){
            res.json({err,status:400})
        }
        else{
            req.email=decoded.options;
            next();
        }
    });
}
