'use client'

import { useState } from "react";
import { useFormik } from "formik";
import { EmailSchema } from "../../../lib/Schemas/auth.schema";
import Welcome from "../components/welcome-part";
import SignNavList from "../components/loggin-nav-links";
import InputField from "../../../components/ui/InputField";
import IdentityProviders from "../components/identity-providers";
import SubmitButton from "@/components/ui/SubmitButton";
import VerifyCodeForm from "./_components/verify-form";
import LoadingSpinner from "@/components/common/loading-spinner";
import { Email, forgetPaswwordAction } from "./_actions/forget-password.action";

export default function ForgetPasswordPage() {

  // States
  const [openVerify, setOpenVerify] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  
  // Handler Function
  const handleForgetPassword = async (field: Email) => {
    setIsLoading(true);

    const payload = await forgetPaswwordAction(field);

    try {

      if (payload.message === 'success') {
        setOpenVerify(true);
        localStorage.setItem('user', field.email);
        return;
      } 
      
      else {
        setError(payload.message);
      }
    } 
    
    catch (err) {
      if (err) throw new Error('Something went wrong, Please try again.')
    } 

    finally {
      setIsLoading(false);
    }
      
  }

  const formik = useFormik({

    initialValues: {
      email: '',
    }, 

    validationSchema: EmailSchema,

    onSubmit: handleForgetPassword
  });


  if (openVerify) {
    return <VerifyCodeForm/>
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
              Forget your password?
            </h1>

            <form className="space-y-4 md:space-y-7" onSubmit={formik.handleSubmit} >
              {/* Email Field */}
              <div className="email-input">
                <InputField 
                type={"email"} 
                id={"email"} 
                handleChange={formik.handleChange} 
                handleBlur={formik.handleBlur}  
                placeholder="Enter Email"  
                customStyles={`${ formik.errors.email && formik.touched.email || error ? 'border-red-500' : 'focus:border-blue-600'}`}
              />
                {/* Error Feedback Message */}
                {formik.errors.email && formik.touched.email && 
                <div className="px-2 text-sm text-red-600 dark:text-red-400 mt-2" role="alert"> {formik.errors.email} </div>
                }
              </div>

              {error && <div className="text-center text-sm text-red-600  transition-all">{error}</div>  
              }

              {/* Submit Button */}
              {isLoading ? 
                <button type="submit" className="w-full flex justify-center items-center text-white bg-blue-700 outline-none font-medium rounded-2xl text-[15px] px-5 py-3 text-center">
                  <LoadingSpinner/>
                </button>
              : 
                <SubmitButton title={"Sign in"}/>
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
  