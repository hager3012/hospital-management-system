import  joi from 'joi'
export const AddMedicineValidate=joi.object({
    Medicine_name:joi.string().required().min(3).max(50),
    Medicine_quantity:joi.number().required(),
    Medicine_type:joi.string().required(),
    Medicine_price:joi.number().required(),
    exp_date:joi.string().pattern(new RegExp('^[1-9][0-9]{3}-[1-9][0-9]-[0-9]{1,2}$')).required()
});