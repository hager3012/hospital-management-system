import { Router } from 'express';
import { auth as _auth } from '../Middleware/user.auth.js';
import {  authorPharmacy } from './../Middleware/author.js';
import { validation } from './../Middleware/validation.js';
import { AddMedicineValidate } from '../validation/pharmacy.validation.js';
import { addMedicine } from '../controllers/Pharmacy/Medicine.controller.js';
const PharmacyRouter =Router();
PharmacyRouter.post('/AddMedicine',_auth,validation(AddMedicineValidate),authorPharmacy,addMedicine)
export default PharmacyRouter;   