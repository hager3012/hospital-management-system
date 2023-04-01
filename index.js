process.on('uncaughtException',(err)=>{
    console.log('error not in express'+err);
})
import express, { json } from 'express';
import helmet from 'helmet';
import { DBConnect } from './database/dbConnection.js';
import   userRouter  from './router/user.router.js';
import AdminRouter from './router/Admin.router.js';
import { AppError } from './util/AppError.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import PharmacyRouter from './router/Pharmacy.router.js';
dotenv.config();
const app=express();
app.use(helmet());
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    
    next();
    }); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(json());
app.use(express.static('uploads'));
app.use('/user',userRouter);
app.use('/Admin',AdminRouter);
app.use(PharmacyRouter)
app.all('*',(req,res,next)=>{
    res.json({Error:"invalid url - can’t access this endPoind"+req.originalUrl,status:404})
}) 
DBConnect(); 
app.listen(process.env.PORT);
process.on('unhandledRejection',(err)=>{
    console.log('error not in express'+err);
})