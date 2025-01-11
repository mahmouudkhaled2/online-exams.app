'use client'

import Link from "next/link";
import InputField from "../../../components/ui/InputField";
import IdentityProviders from "../components/identity-providers";
import Welcome from "../components/welcome-part";
import SignNavList from "../components/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import { LoginSchema } from "../../../lib/Schemas/auth.schema";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/ui/SubmitButton";
import LoadingSpinner from "@/components/common/loading-spinner";

export default function LoginPage() {

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const handleSubmit = async ({email, password}: LoginValues) => {

    setIsLoading(true);

    const loginData = {
      email,
      password,
      callbackUrl: '/',
      redirect: false,
    }

    const login = await signIn('credentials', loginData);
    
    if (login?.ok) {
      router.replace(login?.url || '/');
      setIsLoading(false);
      return;
      
    } else {
      setError(login?.error || "Incorrect Email or Password");
      setIsLoading(false);
    }

  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    }, 

    validationSchema: LoginSchema,

    onSubmit: handleSubmit
  });


  return (
    <section className="h-screen">
    <div className=" grid grid-cols-1 md:grid-cols-12 mx-auto overflow-hidden">

      <Welcome />

      <div className="col-span-7 h-[700px]">
        
        <SignNavList />

        <div className="mx-auto md:mt-10 sm:max-w-md xl:p-0 dark:bg-gray-800 ">
          <div className="p-6 space-y-4 md:space-y-5 sm:p-6">

            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in
            </h1>

            <form className="space-y-4 md:space-y-7" onSubmit={formik.handleSubmit} >

              <div className="email-input">
                <InputField 
                type={"email"} 
                id={"email"} 
                handleChange={formik.handleChange} 
                handleBlur={formik.handleBlur}  
                placeholder="Enter Email"  
                customStyles={`${ formik.errors.email && formik.touched.email || error ? 'border-red-500' : ''}`} />

                {formik.errors.email && formik.touched.email && <div className="px-2 text-sm text-red-600   dark:text-red-400 mt-2" role="alert"> {formik.errors.email} </div>
                }
              </div>

              <div className="password-input relative">
                <InputField 
                type={ hidePassword ? "password" : "text" } 
                id={"password"} 
                handleChange={formik.handleChange} 
                handleBlur={formik.handleBlur} 
                placeholder="••••••••"
                customStyles={`${formik.errors.password && formik.touched.password || error ? 'border-red-500' : ''}`} />


                <span className="absolute top-3 right-3 text-gray-500 cursor-pointer">
                  {
                  hidePassword ? 
                  <i className="fa-regular fa-eye" onClick={() => setHidePassword(false)}></i> :
                  <i className="fa-regular fa-eye-slash" onClick={() => setHidePassword(true)}></i>
                  }
                </span>
 
                {formik.errors.password && formik.touched.password && <div className="px-2 text-sm text-red-600   dark:text-red-400 mt-2" role="alert"> {formik.errors.password} </div>
                }
              </div>

              <div className="text-sm text-end">
                <Link href="/auth/forget-password" className="text-blue-800">Recover Password ?</Link>
              </div>

              {error && <div className="text-center text-sm text-red-600  transition-all">{error}</div>  
              }

              {isLoading ? 
                <button type="submit" className="w-full flex justify-center items-center text-white bg-blue-700 outline-none font-medium rounded-2xl text-[15px] px-5 py-3 text-center">
                  <LoadingSpinner/>
                </button>
              : 
                <SubmitButton title={"Create an Account"}/>
              }

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
