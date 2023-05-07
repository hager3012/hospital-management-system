import  joi from 'joi'
export const AddMedicineValidate=joi.object({
    Medicine_name:joi.string().required().min(3).max(50),
    Medicine_quantity:joi.number().required(),
    Medicine_type:joi.string().required(),
    Medicine_price:joi.number().required(),
    exp_date:joi.date().required()
});