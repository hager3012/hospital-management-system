import { Router } from 'express';
import { auth as _auth } from '../Middleware/user.auth.js';
import {  authorPharmacy } from './../Middleware/author.js';
import { validation } from './../Middleware/validation.js';
import { AddMedicineValidate } from '../validation/pharmacy.validation.js';
import { DeleteMedicine, UpdateMedicine, addMedicine, findAll, findOne, searchMedicine } from '../controllers/Pharmacy/Medicine.controller.js';
const PharmacyRouter =Router();
PharmacyRouter.post('/AddMedicine',_auth,validation(AddMedicineValidate),authorPharmacy,addMedicine)
PharmacyRouter.get('/findAll',_auth,authorPharmacy,findAll)
PharmacyRouter.put('/UpdateMedicine',_auth,validation(AddMedicineValidate),authorPharmacy,UpdateMedicine)
PharmacyRouter.get('/findOne',_auth,authorPharmacy,findOne);
PharmacyRouter.delete('/deleteMedicine',_auth,authorPharmacy,DeleteMedicine);
PharmacyRouter.get('/searchMedicine',_auth,authorPharmacy,searchMedicine)
export default PharmacyRouter;   