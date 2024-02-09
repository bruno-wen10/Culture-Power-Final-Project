import * as yup from 'yup'
export const productsCreateValidatorYup = yup.object({
    name:yup.string().required('Name is required'),
    value:yup.number().required('Value is required'),
    Amount:yup.number().required('Amount is required'),
    description:yup.string().required('Description is required'),
    productPicture:yup.string() //.required('Image is required')
})