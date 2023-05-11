import { Router } from 'express';
import { auth as _auth } from '../Middleware/user.auth.js';
import {  authorPatient } from '../Middleware/author.js';
import { BookDoctor, BookRoom, ViewAppointment, ViewDoctors, addMedicalHistory, cancelBookDoctor, cancelRoom, checkMedicalHistory, checkMedicine, searchDoctor, timeDetails, updateMedicalHistory, viewMedicalHistory, viewPrescription, viewRoom } from '../controllers/Patient/Patient.controllers.js';
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
PatientRouter.get('/checkMedicine',_auth,authorPatient,checkMedicine);
PatientRouter.delete('/cancelBookDoctor',_auth,authorPatient,cancelBookDoctor);
PatientRouter.get('/checkMedicalHistory',_auth,authorPatient,checkMedicalHistory);
PatientRouter.get('/viewRoom',_auth,authorPatient,viewRoom);
PatientRouter.get('/BookRoom',_auth,authorPatient,BookRoom);
PatientRouter.delete('/cancelRoom',_auth,authorPatient,cancelRoom);
export default PatientRouter;   