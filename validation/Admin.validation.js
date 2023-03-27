import  joi from 'joi'
export const AddDoctorValidate=joi.object({
    name:joi.string().required().min(3).max(20),
    email:joi.string().email(),
    password:joi.string().pattern(new RegExp('^[A-Za-z0-9@$*#%-_]{3,10}$')).required(),
    repeat_password: joi.string().required().valid(joi.ref('password')),
    Mobile:joi.string().pattern(new RegExp('^01[0-2,5]{1}[0-9]{8}$')).required(),
    Gender:joi.boolean().required(),
    DOB:joi.string().pattern(new RegExp('^[0-9]{1,2}-[0-9]{1,2}-[1-9][0-9]{3}$')).required(),
    Address:joi.string().pattern(new RegExp('^[a-z A-Z 0-9]{5,100}$')).required(),
    Specialization:joi.string().required(),
    Experience:joi.string().required(),
    Language:joi.string().required(),
    role:joi.string()
});