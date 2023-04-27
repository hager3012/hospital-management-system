import { Router } from 'express';
import { auth as _auth } from '../Middleware/user.auth.js';
import { authorDoctor } from '../Middleware/author.js';
import { ViewAppointment, ViewTiming, addLimitRange, addPrescription, confirmTiming, updatePrescription, viewPrescription } from '../controllers/Doctor/Doctor.controllers.js';
const DoctorRouter =Router();
DoctorRouter.post('/confirmTiming',_auth,authorDoctor,confirmTiming)
DoctorRouter.get('/ViewTiming',_auth,authorDoctor,ViewTiming)
DoctorRouter.post('/addLimitRange',_auth,authorDoctor,addLimitRange)
DoctorRouter.get('/ViewAppointment',_auth,authorDoctor,ViewAppointment)
DoctorRouter.post('/addPrescription',_auth,authorDoctor,addPrescription)
DoctorRouter.get('/viewPrescription',_auth,authorDoctor,viewPrescription)
DoctorRouter.put('/updatePrescription',_auth,authorDoctor,updatePrescription);
// DoctorRouter.put('/UpdateMedicine/:id',_auth,validation(AddMedicineValidate),authorDoctor,UpdateMedicine)
// DoctorRouter.get('/findOne/:id',_auth,authorDoctor,findOne);
// DoctorRouter.delete('/deleteMedicine/:currentPage/:id',_auth,authorDoctor,DeleteMedicine);
export default DoctorRouter;   