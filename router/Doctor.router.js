import { Router } from 'express';
import { auth as _auth } from '../Middleware/user.auth.js';
import { authorDoctor } from '../Middleware/author.js';
import { confirmTiming } from '../controllers/Doctor/Doctor.controllers.js';
const DoctorRouter =Router();
DoctorRouter.post('/confirmTiming/:DoctorId',_auth,authorDoctor,confirmTiming)
// DoctorRouter.get('/findAll/:currentPage',_auth,authorDoctor,findAll)
// DoctorRouter.put('/UpdateMedicine/:id',_auth,validation(AddMedicineValidate),authorDoctor,UpdateMedicine)
// DoctorRouter.get('/findOne/:id',_auth,authorDoctor,findOne);
// DoctorRouter.delete('/deleteMedicine/:currentPage/:id',_auth,authorDoctor,DeleteMedicine);
export default DoctorRouter;   