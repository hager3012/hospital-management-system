import { Router } from 'express';
import { auth as _auth } from '../Middleware/user.auth.js';
import {  authorPatient } from '../Middleware/author.js';
import { BookDoctor, ViewAppointment, ViewDoctors, addMedicalHistory, searchDoctor, timeDetails, updateMedicalHistory, viewMedicalHistory, viewPrescription } from '../controllers/Patient/Patient.controllers.js';
const PatientRouter =Router();
PatientRouter.get('/ViewDoctors',_auth,authorPatient,ViewDoctors)
PatientRouter.get('/searchDoctor',_auth,authorPatient,searchDoctor)
PatientRouter.post('/BookDoctor',_auth,authorPatient,BookDoctor)
PatientRouter.get('/ViewAppointment',_auth,authorPatient,ViewAppointment)
PatientRouter.post('/addMedicalHistory',_auth,authorPatient,addMedicalHistory)
PatientRouter.get('/timeDetails',_auth,authorPatient,timeDetails)
PatientRouter.get('/viewMedicalHistory',_auth,authorPatient,viewMedicalHistory);
PatientRouter.put('/updateMedicalHistory',_auth,authorPatient,updateMedicalHistory)
PatientRouter.get('/viewPrescription',_auth,authorPatient,viewPrescription);
export default PatientRouter;   