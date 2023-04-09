import { Router } from 'express';
import { auth as _auth } from '../Middleware/user.auth.js';
import {  authorPharmacy } from './../Middleware/author.js';
import { validation } from './../Middleware/validation.js';
import { AddMedicineValidate } from '../validation/pharmacy.validation.js';
import { DeleteMedicine, UpdateMedicine, addMedicine, findAll, findOne } from '../controllers/Pharmacy/Medicine.controller.js';
const PharmacyRouter =Router();
PharmacyRouter.post('/AddMedicine',_auth,validation(AddMedicineValidate),authorPharmacy,addMedicine)
PharmacyRouter.get('/findAll/:currentPage',_auth,authorPharmacy,findAll)
PharmacyRouter.put('/UpdateMedicine/:id',_auth,validation(AddMedicineValidate),authorPharmacy,UpdateMedicine)
PharmacyRouter.get('/findOne/:id',_auth,authorPharmacy,findOne);
PharmacyRouter.delete('/deleteMedicine/:currentPage/:id',_auth,authorPharmacy,DeleteMedicine);
export default PharmacyRouter;   