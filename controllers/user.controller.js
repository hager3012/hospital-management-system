import dotenv from 'dotenv';
dotenv.config();
import { hash as _hash, compare } from 'bcrypt';
import { generateSingin as _generateSingin } from '../util/generateSingin.js';
import { userModel } from '../models/user.model.js';
import { sendMail as _sendMail } from '../emails/user.email.js';
import { catchAsncError } from "../util/catchAsncError.js";
import  jwt  from 'jsonwebtoken';
export const SingnUp= catchAsncError(async(req,res,next)=>{
    let {name,email,password,role,Mobile,Gender,DOB,Address}=req.body;
    let Email=await userModel.findOne({email:email});
    if(!Email){ 
        _hash(password, Number(process.env.ROUND), async function(err, hash) {
            // Store hash in your password DB.
            await userModel.insertMany({name,email,password:hash,role,Mobile,Gender,DOB,Address});
            _sendMail(email);
            res.json({message:'success',status:200});
        });
    }

    else{
        res.json({Error:'Email Already in Use',status:422})
    }

})
export const SingnIn= catchAsncError(async(req,res,next)=>{
    const {email,password}=req.body;
    let user=await userModel.findOne({email:email});
    if(!user||!await compare(password, user.password))
        return res.json({Erorr:'incorrect in email or password',status:401});
    if(!user.confirmEmail)    
        return res.json({Erorr:'this user not confirm',status:401});
    let token=_generateSingin({name:user.name,role:user.role,id:user._id})
    req.Token=token
    res.json({message:'success',status:200});
})
export const verifiy =catchAsncError(async(req,res,next)=>{
    let {token}=req.params;
    jwt.verify(token, process.env.JWT_KEY,  async function(err, decoded) {
        if(err){
            res.json({Error:'Token is invalid'+err,status:401});
        }
        else{
        await userModel.findOneAndUpdate({email:decoded.options},{confirmEmail:true});
        res.json({message:'success',status:200});
        // res.connection.destroy();
        }
    });
    
})