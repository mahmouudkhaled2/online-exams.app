'use client'

import { useParams } from "next/navigation";
import Sidebar from "../../../components/custom/sidebar";
import Quiz from "../_components/Quiz";
import Navbar from "@/components/custom/navbar";
import {  useEffect, useState } from "react";
import { LOCAL_API } from "@/lib/constants/common";
import LoadingSpinner from "@/components/common/loading-spinner";

export default function Page () {
  // States 
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Variables
  const {id} = useParams();

  // if id not exist or null throw an error
  if (!id) {
    console.error("Id is missing in Params");
    
    throw new Error('Faild to fetch data');
  }
  
  const baseUrl = LOCAL_API + `/api/exams?id=${id[0]}`;
  

  // Function for fetching the exams.
  const getExamsOnSubjec = async () => {
    

    
    try {
      
      setIsLoading(true);
      const res = await fetch(baseUrl);

        // if response has failed , throw this error 
        if (!res.ok) {
            console.error("Error fetching exams:", res.status, await res.text());
            setIsLoading(false);  
            throw new Error(`Error: ${res.status}`);
        }

        // otherwise set the data of exams.
        const data = await res.json();
        setExams(data?.exams);
        if (data?.exams?.length === 0) {
          setIsLoading(false);

        }

    } catch (err) {
        console.error("Error in getExamsOnSubjec:", err);
        setIsLoading(false);
        return null;
    }

    setIsLoading(false);
  };
  
useEffect(  () => {
  getExamsOnSubjec();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []) 
  
  return (
    <>
       <section className="h-screen flex justify-between">
        <Sidebar />

        <div className="w-[85%] px-10 py-6">
          <Navbar/>
          <div className="p-8 font-Inter"> 
            <h2 className="text-2xl font-medium mb-8">Quizes</h2>

            {!isLoading && exams?.length !== 0 ? <ul>
                {exams?.map((exam: Exam) => {
                  return <Quiz key={exam._id} exam={exam} />
                  })}
            </ul>
            :
            
            <div className="flex justify-center items-center h-[100px]"> <LoadingSpinner w={8} h={8}/></div>
          }
            
          {!isLoading && exams?.length === 0 && 
            <div className="bg-[#F9F9F9] py-4 px-6 text-center shadow-lg rounded-[10px]">
              <p className="font-medium">There are no exams in this subject yet ! </p>
            </div> }
            
          </div>
        </div>
    </section>
    </>
  )
}

