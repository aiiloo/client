import * as yup from 'yup'

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Please confirm your password')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be at most 50 characters')
    .oneOf([yup.ref(refString)], 'Password does not match')
}

export const registerSchema = yup.object({
  name: yup.string().required('Please enter your name').max(100, 'Name must be at most 100 characters'),
  email: yup.string().email().required('Please enter your email'),
  password: yup
    .string()
    .required('Please enter your password')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be at most 50 characters')
    .matches(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .matches(/(?=.*\d)/, 'Password must contain at least one number')
    .matches(/(?=.*[\W_])/, 'Password must contain at least one special character'),
  confirm_password: handleConfirmPasswordYup('password')
})

export const loginSchema = yup.object({
  email: yup.string().email().required('Please enter your email'),
  password: yup
    .string()
    .required('Please enter your password')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be at most 50 characters')
    .matches(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .matches(/(?=.*\d)/, 'Password must contain at least one number')
    .matches(/(?=.*[\W_])/, 'Password must contain at least one special character')
})

export type RegisterType = yup.InferType<typeof registerSchema>

export type LoginType = yup.InferType<typeof loginSchema>
