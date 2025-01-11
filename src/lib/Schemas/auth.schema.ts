
import * as Yup from 'yup'

  export const signUpSchema = Yup.object().shape({  

    "username": Yup.string()
      .min(4, 'should be character only with minlength: 4 and maxlength: 25')
      .max(25, 'maximum: 30 characters.')
      .required('Username is required.'),

    "firstName": Yup.string()
      .matches(/^[A-Za-z]+$/, 'First name should contain letters only.')
      .min(4, 'should be character only with minlength: 4 and maxlength: 25')
      .max(25, 'maximum: 30 characters.')
      .required('First name is required.'),

    "lastName": Yup.string()
      .matches(/^[A-Za-z]+$/, 'Last name should contain letters only.')
      .min(3, 'minimum: 3 characters')
      .max(25, 'maximum: 25 characters.')
      .required('Last name is required.'),

    "email": Yup.string()
      .email('Invalid Email')
      .required('Email is required.'),

    "password": Yup.string()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must be at least 6 characters long, include at least one uppercase letter and one number.')
      .required('Password is required.') ,

    "rePassword": Yup.string()
      .oneOf([Yup.ref('password')], "Passwords don't match. Please ensure both passwords are identical")
      .required('Password confirmation is required'),

    "phone":Yup.string()
    .matches(/^01[0125][0-9]{8}$/, "Phone number must be Like @example: 01012345678")
      .required('Phone number is required')
  })

  
  export const LoginSchema = Yup.object().shape({

    "email": Yup.string().required('Email is required.'),

    "password": Yup.string().required('Password is required.') ,

  })


  export const EmailSchema = Yup.object().shape({

    "email": Yup.string().required('Email is required.'),

  })

  
  export const resetPasswordSchema = Yup.object().shape({

    "newPassword": Yup.string()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must be at least 6 characters long, include at least one uppercase letter and one number.')
      .required('Password is required.') ,

    "rePassword": Yup.string()
      .oneOf([Yup.ref('newPassword')], "Passwords don't match. Please ensure both passwords are identical")
      .required('Password confirmation is required'),
  })