import dotenv from 'dotenv';
dotenv.config();
import { hash as _hash, compare } from 'bcrypt';
import { generateSingin as _generateSingin } from '../util/generateSingin.js';
import { userModel } from '../models/user.model.js';
import { sendMail as _sendMail } from '../emails/user.email.js';
import { catchAsncError } from "../util/catchAsncError.js";
import  jwt  from 'jsonwebtoken';
import { AppError } from './../util/AppError.js';
export const SingnUp= catchAsncError(async(req,res,next)=>{
    let {name,email,password,role,Mobile,Gender,DOB,Address}=req.body;
    let Email=await userModel.findOne({email:email});
    console.log(req.body);
    if(!Email){ 
        _hash(password, Number(process.env.ROUND), async function(err, hash) {
            // Store hash in your password DB.
            if(Gender){
                Gender='female'
            }else{
                Gender='mele'
            }
            await userModel.insertMany({name,email,password:hash,role,Mobile,Gender,DOB,Address});
            _sendMail(email);
            next(new AppError("Done",200)); 
        });
    }

    else{
        next(new AppError('Email is alreay Found',422))
    }

})
export const SingnIn= catchAsncError(async(req,res,next)=>{
    const {email,password}=req.body;
    let user=await userModel.findOne({email:email});
    if(!user||!await compare(password, user.password))
        return next(new AppError('incorrect in email or password',401))
    let token=_generateSingin({name:user.name,role:user.role,id:user._id})
    req.Token=token
    next(new AppError("Done",200));
})
export const verifiy =catchAsncError(async(req,res,next)=>{
    let {token}=req.params;
    jwt.verify(token, process.env.JWT_KEY,  async function(err, decoded) {
        if(err){
            next(new AppError('Token is invalid'+err,401));
        }
        else{
        await userModel.findOneAndUpdate({email:decoded.options},{confirmEmail:true})
        next(new AppError("Done",200))
        }
    });
    
})