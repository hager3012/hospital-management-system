import { Router } from 'express';
import {  addDoctor } from '../controllers/Admin.controller.js';
import { auth as _auth } from '../Middleware/user.auth.js';
import { validation } from './../Middleware/validation.js';
import { AddDoctorValidate } from './../validation/Admin.validation.js';
import { author } from './../Middleware/Admin.author.js';
// import { signUpValidate } from './../validation/userSchema.validation.js';
const AdminRouter =Router();
// ProductRouter.get('/findUserAddBooks',_auth,findUserAddBooks);
AdminRouter.post('/AddDoctor',_auth,validation(AddDoctorValidate),author,addDoctor);
// ProductRouter.get('/findAll',_auth,findAll);
// ProductRouter.get('/findOneBook',_auth,findOne);
// ProductRouter.put('/updateBook',validation(addProductValidate),_auth,UpdateBook);
// ProductRouter.delete('/Delete',_auth,DeleteBook);
export default AdminRouter;