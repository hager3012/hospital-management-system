import { Router } from 'express';
import { SingnUp, SingnIn ,verifiy} from '../controllers/user.controller.js';
import { signUpValidate, signInValidate } from '../validation/userSchema.validation.js';
import { validation } from '../Middleware/validation.js';
const userRouter=Router();
userRouter.post('/SingnUp',validation(signUpValidate),SingnUp);
userRouter.post('/signIn',validation(signInValidate),SingnIn);
userRouter.get('/verify/:token',verifiy);
export default userRouter;