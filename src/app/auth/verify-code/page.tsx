'use client'

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import Welcome from "../components/welcome-part";
import SignNavList from "../components/navigation";
import InputField from "../../../components/ui/InputField";

import IdentityProviders from "../components/identity-providers";
import SubmitButton from "@/components/ui/SubmitButton";

export default function VerifyCodePage() {

  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const handleSubmit = (values: {resetCode: string}) => {

      console.log(values);
      axios.post('https://exam.elevateegy.com/api/v1/auth/verifyResetCode', values)
      .then(res => {
        if (res.data.status === 'Success') router.push('/auth/reset-password');         
      })
      .catch(err => {
        setIsError(true);
        setErrorMsg(err.response?.data?.message)
      })
      
      
  }

  const formik = useFormik({

    initialValues: {
      resetCode: '',
    }, 

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
              Verify code
            </h1>

            <form className="space-y-4 md:space-y-7" onSubmit={formik.handleSubmit} >

              {isError && 
              <div className="p-3 text-center text-sm text-red-600 bg-red-100 rounded-md transition-all">
                {errorMsg}
              </div>}


              <div className="email-input">
                <InputField 
                type={"text"} 
                id={"resetCode"} 
                handleChange={formik.handleChange} 
                handleBlur={formik.handleBlur}  
                placeholder="Enter Code"  
                customStyles={`${ formik.errors.resetCode && formik.touched.resetCode || isError ? 'border-red-500' : ''}`}
               />

                {formik.errors.resetCode && formik.touched.resetCode && 
                <div className="px-2 text-sm text-red-600 dark:text-red-400 mt-2" role="alert"> {formik.errors.resetCode} </div>
                }
              </div>

              <div className="text-sm text-end">
                {`Didn't receive a code?`} 
                <button  className="text-blue-800">Resend</button>
              </div>

              <SubmitButton title={"Verify"} />

            </form>
          </div>
        </div>

        <p className="max-w-md mx-auto text-[15px] text-[#6c737f] text-center relative">
        <span className="continue-with px-1 relative">Or Continue with</span>
        </p>

        <IdentityProviders/>
      </div>
    </div>
  </section>
    )
  }
  
  