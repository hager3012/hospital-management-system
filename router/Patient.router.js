import { Router } from 'express';
import { auth as _auth } from '../Middleware/user.auth.js';
import {  authorPatient } from '../Middleware/author.js';
import { BookDoctor, ViewDoctors } from '../controllers/Patient/Patient.controllers.js';
const PatientRouter =Router();
PatientRouter.get('/ViewDoctors',_auth,authorPatient,ViewDoctors)
PatientRouter.put('/BookDoctor',_auth,authorPatient,BookDoctor)

// PatientRouter.get('/findAll/:currentPage',_auth,authorPatient,findAll)
// PatientRouter.put('/UpdateMedicine/:id',_auth,validation(AddMedicineValidate),authorPatient,UpdateMedicine)
// PatientRouter.get('/findOne/:id',_auth,authorPatient,findOne);
// PatientRouter.delete('/deleteMedicine/:currentPage/:id',_auth,authorPatient,DeleteMedicine);
export default PatientRouter;   