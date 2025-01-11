'use client'

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { EmailSchema } from "../../../lib/Schemas/auth.schema";
import Welcome from "../components/welcome-part";
import SignNavList from "../components/navigation";
import InputField from "../../../components/ui/InputField";
import IdentityProviders from "../components/identity-providers";
import SubmitButton from "@/components/ui/SubmitButton";

export default function ForgetPasswordPage() {

  const router = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);


  const handleSubmit = (values: {email: string}) => {

      console.log(values);

     axios.post('https://exam.elevateegy.com/api/v1/auth/forgotPassword', values)
      .then(res => {

        if (res?.data?.message === 'success') {
          console.log("Hello From Then Forget Password");
          localStorage.setItem('user', values.email);
          router.push('/verify-code');
        } 
            
      })
      .catch(err => {
        if(err.response?.data?.message) {
          setIsError(true);
          setErrorMsg(err.response?.data?.message)
        }

      })      
      
  }

  const formik = useFormik({

    initialValues: {
      email: '',
    }, 

    validationSchema: EmailSchema,

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
                Forget your password?
              </h1>

              <form className="space-y-4 md:space-y-7" onSubmit={formik.handleSubmit} >

                {isError && 
                <div className="p-3 text-center text-sm text-red-600 bg-red-100 rounded-md transition-all">
                  {errorMsg}
                </div>}


                <div className="email-input">
                  <InputField 
                  type={"email"} 
                  id={"email"} 
                  handleChange={formik.handleChange} 
                  handleBlur={formik.handleBlur}  
                  placeholder="Enter Email"  
                  customStyles={`${ formik.errors.email && formik.touched.email || isError ? 'border-red-500' : 'focus:border-blue-600'}`}
                />

                  {formik.errors.email && formik.touched.email && 
                  <div className="px-2 text-sm text-red-600 dark:text-red-400 mt-2" role="alert"> {formik.errors.email} </div>
                  }
                </div>

                <SubmitButton title={"Sign in"} />

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
  