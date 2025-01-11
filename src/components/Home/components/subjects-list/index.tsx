"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Subject from "../subject";
import { LOCAL_API } from "@/lib/constants/common";
import LoadingSpinner from "@/components/common/loading-spinner";



export default function SubjectsList() {
  // Session Data To Ensure That User Authenticated. 
  const { data: session } = useSession();

  // States
  const [allSubjects, setAllSubjects] = useState<Subject[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Pages Limit
  const postsPerPage = 3; 

  // Subjects Data Fetching
  const getAllSubjects = async (page: number) => {

    const fetchingUrl = LOCAL_API + `/api/subjects?page=${page}&limit=${postsPerPage}`
    
    try {
      setIsLoading(true)
      const res = await fetch(fetchingUrl);

      const data = await res.json();

      if (res.ok) {
        setAllSubjects(data?.subjects);
        setTotalPages (data?.metadata.numberOfPages || 1);
        setIsLoading(false);
      }

    } catch (err) {
      console.error("Error: ", err)
      setIsLoading(false);
      throw new Error(`${err}`)
    }

  };

  // Pagination Buttons Handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  
  useEffect(() => {
    if (session) {
      getAllSubjects(currentPage);
    }
  }, [session, currentPage]);

  return (
    <>
      <section className="mb-10 bg-white py-8 px-4 rounded-xl">
        <h2 className="text-2xl font-semibold text-main mb-8 underline">Quizes</h2>:

        {isLoading ? <div className="flex justify-center items-center h-[200px]"> <LoadingSpinner w={8} h={8}/></div> : 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {allSubjects?.map((subject, index) => (
              <Link href={`/exams/${subject?._id}`} key={index}>
                <Subject subject={subject} />
              </Link>
            ))}
          </div>
        }
        <div className="flex justify-center items-center gap-6 mt-5">
          {/* Previous Button */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-6 py-1.5 rounded-lg text-white ${
              currentPage === 1 ? "bg-gray-400" : "bg-main hover:bg-main-dark"
            }`}
          >
            Previous
          </button>

          {/* Number of Page*/}
          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          {/* Previous Button */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-6 py-1.5 rounded-lg text-white ${
              currentPage === totalPages
                ? "bg-gray-400"
                : "bg-main hover:bg-main-dark"
            }`}
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
}