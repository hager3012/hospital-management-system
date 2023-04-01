import { AppError } from './../util/AppError.js';
export const validation=(Schema)=>{
    return (req,res,next)=>{
        let {error}=Schema.validate(req.body,{abortEarly:false});        
        if(!error){
            next();
        }
        else{
            let Error=error.details[0].message
            res.json({Error:Error,status:500})
        }
    }
}