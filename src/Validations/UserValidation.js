import * as yup from 'yup';

export const userSchema = yup.object().shape({
    username: yup.string().min(4).max(15).required(),
    password: yup.string().min(4).max(15).required(),
    businessName: yup.string().required()
})