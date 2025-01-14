'use client'

import Link from "next/link";
import InputField from "../../../../components/ui/InputField";
import IdentityProviders from "../../components/identity-providers";
import Welcome from "../../components/welcome-part";
import SignNavList from "../../components/loggin-nav-links";
import { useState } from "react";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../../../../lib/Schemas/auth.schema";
import SubmitButton from "@/components/ui/SubmitButton";
import LoadingSpinner from "@/components/common/loading-spinner";
import { resetPasswordAction } from "../_actions/reset-password.action";


export default function ResetPasswordForm() {

  // States
  const [error, setError] = useState<string | null>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideRePassword, setHideRePassword] = useState<boolean>(true);


  // Reset Password Handler Function
  const handleSubmit = async (fields: resetPasswordValues) => {

    setIsLoading(true);

    const resetData = {
      email: localStorage.getItem('user') ? localStorage.getItem('user') : '',
      newPassword: fields.newPassword,
    }

    const payload = await resetPasswordAction(resetData);

    try {

      if (payload.message === 'success' && payload.token) {
        window.location.href = '/auth/login';
      } 
      
      else { 
          const msg = payload.message || 'Faild to fetch data';
          setError(msg);
      }

    }
    
    catch (err) {
      if (err) {
        console.error("Error Message: ", error);
        throw new Error('Something went wrong, Try again')
      }
    }

    finally {
      setIsLoading(false);
    }
    

  }

  const formik = useFormik({

    initialValues: {
      newPassword: '',
      rePassword: '',
    }, 

    validationSchema: resetPasswordSchema,

    onSubmit: handleSubmit
  });


  return (
    <section className="">
    <div className=" grid grid-cols-1 md:grid-cols-12 mx-auto overflow-hidden">

      <Welcome />

      <div className="col-span-7 h-[700px]">
        
        <SignNavList />

        <div className="mx-auto md:mt-10 sm:max-w-md xl:p-0 dark:bg-gray-800 ">
          <div className="p-6 space-y-4 md:space-y-5 sm:p-6">

            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Set a password
            </h1>

            <form className="space-y-4 md:space-y-7" onSubmit={formik.handleSubmit} >
              {/* New Password Field */}
              <div className="new-password-input relative">
                <InputField 
                type={hidePassword ? "password" : "text"} 
                id={"newPassword"} 
                handleChange={formik.handleChange} 
                handleBlur={formik.handleBlur} 
                placeholder="Create Password"
                customStyles={`${formik.errors.newPassword && formik.touched.newPassword || error ? 'border-red-500' : ''}`} />


                <span className="absolute top-3 right-3 text-gray-500 cursor-pointer">
                  {
                  hidePassword ? 
                  <i className="fa-regular fa-eye" onClick={() => setHidePassword(false)}></i> :
                  <i className="fa-regular fa-eye-slash" onClick={() => setHidePassword(true)}></i>
                  }
                </span>
 
                {formik.errors.newPassword && formik.touched.newPassword && <div className="px-2 text-sm text-red-600   dark:text-red-400 mt-2" role="alert"> {formik.errors.newPassword} </div>
                }
              </div>

              {/* Re-Password Field */}
              <div className="Repassword-input relative">
                <InputField 
                type={hideRePassword ? "password" : "text"}  
                id={"rePassword"} 
                handleChange={formik.handleChange} 
                handleBlur={formik.handleBlur} 
                placeholder="Re-enter Password"
                customStyles={`${formik.errors.rePassword && formik.touched.rePassword || error ? 'border-red-500' : ''}`} />

                <span className="absolute top-3 right-3 text-gray-500 cursor-pointer">
                  {
                  hideRePassword ? 
                  <i className="fa-regular fa-eye" onClick={() => setHideRePassword(false)}></i> :
                  <i className="fa-regular fa-eye-slash" onClick={() => setHideRePassword(true)}></i>
                  }
                </span>
 
                {formik.errors.rePassword && formik.touched.rePassword && <div className="px-2 text-sm text-red-600   dark:text-red-400 mt-2" role="alert"> {formik.errors.rePassword} </div>
                }
              </div>

              <div className="text-sm text-end">
                <Link href="/forget-password" className="text-blue-800">Recover Password ?</Link>
              </div>

              {/* Error Feedback Message */}
              {error && <div className="text-center text-sm text-red-600  transition-all">{error}</div>  
              }

              {/* Submit Button */}
              {isLoading ? 
                <button type="submit" className="w-full flex justify-center items-center text-white bg-blue-700 outline-none font-medium rounded-2xl text-[15px] px-5 py-3 text-center">
                  <LoadingSpinner/>
                </button>
              : 
                <SubmitButton title={"Reset"}/>
              }

            </form>
          </div>
        </div>

      <p className="max-w-md mx-auto text-[15px] text-[#6c737f] text-center relative">
        <span className="continue-with px-1 relative">Or Continue with</span>
      </p>
        {/* Sign In With Identity Providers */}
        <IdentityProviders/>

      </div>
    </div>
    </section>
  )
}
