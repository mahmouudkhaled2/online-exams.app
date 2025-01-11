'use client'

import { useState } from 'react'
import QuizInstructions from './QuizInstructions'
import QuestionContainer from './QuestionContainer';
import { useAppDispatch, useAppSelector} from '../../../lib/hooks/redux';
import { getAllQuestions } from '../../../lib/Redux/slices/QuestionsSlice';
import { RootState } from '@/lib/Redux/store/store';

export default function QuizModal({examId}: {examId: string}) {

    const [showInstructions, setShowInstructions] = useState(true);
    const { openModal } = useAppSelector( (state: RootState) => state.quiz );
    const dispatch = useAppDispatch()

    const handleStart = () => {
        setShowInstructions(false)
        dispatch(getAllQuestions({examId}))
    }
    
    return ( 
    <>
    {openModal && 
        <div>
        <div className="flex w-full overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0  bg-black bg-opacity-70 ">
            <div className="relative p-4  h-full md:h-auto md:max-h-full ">

            <div className=" relative bg-white w-full h-full md:h-auto md:w-[600px] lg:w-[686px] xl:w-[787px] rounded-lg shadow dark:bg-gray-700">

                {/* Modal body */}
                <div className="p-4 md:p-5">
                    {showInstructions 
                    ? 
                    <QuizInstructions handleStart={handleStart}/> 
                    : 
                    <QuestionContainer/>}
                </div>

            </div>
            </div>
        </div>
        </div>
    }
    </>
  )
}
