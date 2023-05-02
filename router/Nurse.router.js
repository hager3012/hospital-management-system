import { Router } from 'express';
import { auth as _auth } from '../Middleware/user.auth.js';
import { authorNurse } from '../Middleware/author.js';
import { viewPatients } from './../controllers/Nurse/Nurse.controller.js';
const NurseRouter =Router();
NurseRouter.get('/viewPatients',_auth,authorNurse,viewPatients)
export default NurseRouter;   