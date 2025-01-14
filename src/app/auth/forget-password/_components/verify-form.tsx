'use client'

import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import Welcome from "../../components/welcome-part";
import SignNavList from "../../components/loggin-nav-links";
import InputField from "@/components/ui/InputField";
import IdentityProviders from "../../components/identity-providers";
import SubmitButton from "@/components/ui/SubmitButton";
import ResetPasswordForm from "./reset-password";
import LoadingSpinner from "@/components/common/loading-spinner";
import ResendCodeButton from "./resend-code-button";


export default function VerifyCodeForm () {

  const [openResetPassword, setOpenResetPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  

  const handleSubmit = (values: {resetCode: string}) => {

      setIsLoading(true);

      axios.post('https://exam.elevateegy.com/api/v1/auth/verifyResetCode', values)

      .then(res => {    
        if (res.data.status === 'Success') setOpenResetPassword(true);  
        setIsLoading(false);  
        return;   
      })

      .catch(err => {
        setError(err.response?.data?.message);
        setIsLoading(false);
      })
      
      
  }

  const formik = useFormik({

    initialValues: {
      resetCode: '',
    }, 

    onSubmit: handleSubmit
  });

  if (openResetPassword) {
    return <ResetPasswordForm/>
  }

  return (
    <section className="">
  <div className=" grid grid-cols-1 md:grid-cols-12 mx-auto overflow-hidden">

    <Welcome />

    <div className="col-span-7 h-[700px]">
      
      <SignNavList />

      <div className="mx-auto md:mt-10 sm:max-w-md xl:p-0 dark:bg-gray-800 ">
        <div className="p-6 space-y-4 md:space-y-5 sm:p-6">

          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Verify code
          </h1>

          <form className="space-y-4 md:space-y-7" onSubmit={formik.handleSubmit} >

            {/* Reset Field */}
            <div className="reset-code-input">
              <InputField 
              type={"text"} 
              id={"resetCode"} 
              handleChange={formik.handleChange} 
              handleBlur={formik.handleBlur}  
              placeholder="Enter Code"  
              customStyles={`${ formik.errors.resetCode && formik.touched.resetCode || error ? 'border-red-500' : ''}`}
              />

              {formik.errors.resetCode && formik.touched.resetCode && 
              <div className="px-2 text-sm text-red-600 dark:text-red-400 mt-2" role="alert"> {formik.errors.resetCode} </div>
              }
            </div>

            {/* Resend Code Button */}
            <div className="flex justify-end items-center gap-1 text-sm text-end">
              <p>{`Didn't receive a code?`}</p>
              <ResendCodeButton/>
            </div>

            {/* Error Feedback Message */}
            {error && <div className="text-center text-sm text-red-600  transition-all">{error}</div>  
            }


            {/* Verify Button */}
            {isLoading ? 
              <button type="submit" className="w-full flex justify-center items-center text-white bg-blue-700 outline-none font-medium rounded-2xl text-[15px] px-5 py-3 text-center">
                <LoadingSpinner/>
              </button>
            : 
              <SubmitButton title={"Verify"}/>
            }
            

          </form>
        </div>
      </div>

      <p className="max-w-md mx-auto text-[15px] text-[#6c737f] text-center relative">
      <span className="continue-with px-1 relative">Or Continue with</span>
      </p>
      
      {/* Sign in With Identity Providers */}
      <IdentityProviders/>
    </div>
  </div>
</section>
  )
}
  
  