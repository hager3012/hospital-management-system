import { AppError } from './../util/AppError.js';
export const validation=(Schema)=>{
    return (req,res,next)=>{
        let {error}=Schema.validate(req.body,{abortEarly:false});
        // console.log(error);
        if(!error){
            next();
        }
        else{
            res.json({error,status:500})
        }
    }
}