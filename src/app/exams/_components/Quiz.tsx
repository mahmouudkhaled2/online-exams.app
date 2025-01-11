'use client'

import { RootState } from '@/lib/Redux/store/store';
import QuizIconSVG from '../../../components/common/QuizIconSVG'
import QuizModal from './QuizModal';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux';
import { setOpenModal } from '@/lib/Redux/slices/QuizSlice';

export default function Quiz({exam} : {exam : Exam}) { 

  const { openModal } = useAppSelector( (state: RootState) => state.quiz );
  const dispatch = useAppDispatch();

  return (
    <li >
        <div className="bg-[#F9F9F9] py-4 px-6 flex justify-between items-center shadow-lg rounded-[10px]">
            <div className="flex justify-between items-center gap-5">
            <QuizIconSVG/>
            <div>
                <h3 className="font-medium">{exam?.title}</h3>
                <p className="text-[13px] text-[#535353]">{exam?.numberOfQuestions} Questions</p>
            </div>
            </div>

            <div>
            <p className="text-[13px]">{exam?.duration} Minues</p>

            <button 
            type="button" 
            disabled={!exam?.active}
            onClick={() => dispatch(setOpenModal(true))}
            className={`${exam?.active ? '' : 'bg-opacity-60'} bg-main py-1 px-6 text-white text-[12px] rounded-[10px] cursor-pointer`}>
                Start 
            </button>
            { openModal && <QuizModal examId={exam?._id}/>}
            
            </div>  
        </div>
    </li>
  )
}
