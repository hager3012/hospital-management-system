import { Router } from 'express';
import {  addDoctor, DeleteDoctor, findAll, findOne ,UpdateDoctor} from '../controllers/Admin/DoctorFunctions.controller.js';
import { auth as _auth } from '../Middleware/user.auth.js';
import { validation } from './../Middleware/validation.js';
import { Accountant, AddDoctorValidate, AddEmployeeValidate, AddLaboratoriestValidate, AddPharmacyValidate, AddRadiologistValidate, UpdatePharmacyValidate } from './../validation/Admin.validation.js';
import { authorAdmin } from './../Middleware/author.js';
import { addPharmacist, DeletePharmacist, findAllPharmacist, findOnePharmacist, UpdatePharmacist } from '../controllers/Admin/PharmacistFunctional.controller.js';
import { addLaboratoriest, DeleteLaboratoriest, findAllLaboratoriest, findOneLaboratoriest, UpdateLaboratoriest } from '../controllers/Admin/LaboratoriestFunctional.controller.js';
import { addRadiologist, DeleteRadiologist, findAllRadiologist, findOneRadiologist, UpdateRadiologist } from '../controllers/Admin/radiologistFunctional.controller.js';
import { addEmployee, DeleteEmployee, findAllEmployee, findOneEmployee, UpdateEmployee } from '../controllers/Admin/EmployeeFunctional.controll.js';
import { addAccountant, DeleteAccountant, findAllAccountant, findOneAccountant, UpdateAccountant } from '../controllers/Admin/AccountantFunctional.controller.js';
const AdminRouter =Router();
AdminRouter.post('/AddDoctor',_auth,validation(AddDoctorValidate),authorAdmin,addDoctor);
AdminRouter.get('/findAll/:currentPage',_auth,authorAdmin,findAll);
AdminRouter.get('/findOneDoctor/:id',_auth,authorAdmin,findOne);
AdminRouter.put('/updateDoctor/:id',_auth,validation(AddDoctorValidate),authorAdmin,UpdateDoctor);
AdminRouter.delete('/DeleteDoctor/:id/:currentPage',_auth,authorAdmin,DeleteDoctor);
//////////////////////////////////////////
AdminRouter.post('/AddPharmacist',_auth,validation(AddPharmacyValidate),authorAdmin,addPharmacist);
AdminRouter.get('/findAllPharmacist/:currentPage',_auth,authorAdmin,findAllPharmacist);
AdminRouter.get('/findOnePharmacist/:id',_auth,authorAdmin,findOnePharmacist);
AdminRouter.put('/updatePharmacist/:id',_auth,validation(UpdatePharmacyValidate),authorAdmin,UpdatePharmacist);
AdminRouter.delete('/DeletePharmacist/:id/:currentPage',_auth,authorAdmin,DeletePharmacist);
/////////////////////////////////////////////////////////
AdminRouter.post('/AddLaboratoriest',_auth,validation(AddLaboratoriestValidate),authorAdmin,addLaboratoriest);
AdminRouter.get('/findAllLaboratoriest/:currentPage',_auth,authorAdmin,findAllLaboratoriest);
AdminRouter.get('/findOneLaboratoriest/:id',_auth,authorAdmin,findOneLaboratoriest);
AdminRouter.put('/updateLaboratoriest/:id',_auth,validation(UpdatePharmacyValidate),authorAdmin,UpdateLaboratoriest);
AdminRouter.delete('/DeleteLaboratoriest/:id/:currentPage',_auth,authorAdmin,DeleteLaboratoriest);
///////////////////////////////////////////////
AdminRouter.post('/addRadiologist',_auth,validation(AddRadiologistValidate),authorAdmin,addRadiologist);
AdminRouter.get('/findAllRadiologist/:currentPage',_auth,authorAdmin,findAllRadiologist);
AdminRouter.get('/findOneRadiologist/:id',_auth,authorAdmin,findOneRadiologist);
AdminRouter.put('/UpdateRadiologist/:id',_auth,validation(UpdatePharmacyValidate),authorAdmin,UpdateRadiologist);
AdminRouter.delete('/DeleteRadiologist/:id/:currentPage',_auth,authorAdmin,DeleteRadiologist);
//////////////////////////////////////////////////////////
AdminRouter.post('/addEmployee',_auth,validation(AddEmployeeValidate),authorAdmin,addEmployee);
AdminRouter.get('/findAllEmployee/:currentPage',_auth,authorAdmin,findAllEmployee);
AdminRouter.get('/findOneEmployee/:id',_auth,authorAdmin,findOneEmployee);
AdminRouter.put('/UpdateEmployee/:id',_auth,validation(AddEmployeeValidate),authorAdmin,UpdateEmployee);
AdminRouter.delete('/DeleteEmployee/:id/:currentPage',_auth,authorAdmin,DeleteEmployee);
/////////////////////////////////////////////////////////////
AdminRouter.post('/addAccountant',_auth,validation(Accountant),authorAdmin,addAccountant);
AdminRouter.get('/findAllAccountant/:currentPage',_auth,authorAdmin,findAllAccountant);
AdminRouter.get('/findOneAccountant/:id',_auth,authorAdmin,findOneAccountant);
AdminRouter.put('/UpdateAccountant/:id',_auth,validation(Accountant),authorAdmin,UpdateAccountant);
AdminRouter.delete('/DeleteAccountant/:id/:currentPage',_auth,authorAdmin,DeleteAccountant);
export default AdminRouter;
