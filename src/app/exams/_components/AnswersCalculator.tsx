
import { useAppSelector } from '../../../lib/hooks/redux';
import { RootState } from '../../../lib/Redux/store/store';
import { useState } from 'react';
import QuizResults from './QuizResults';
import CustomButton from '@/components/ui/CustomButton';



export default function AnswersCalculator() {

 const [showResults, setShowResults] = useState<boolean>(false);
 const { correctAnswers, IncorrectAnswers } = useAppSelector( (state: RootState) => state.quiz );
 const { allQuestions } = useAppSelector( (state: RootState) => state.questions );

 const answersPercentage = Math.floor((correctAnswers.length / allQuestions.length) * 100);
 
 const handleShowResults = () => {
    setShowResults(true)
 }

 if (showResults) { 
    return <QuizResults/>

 } else {

  return (
    <div>
      <h3 className="mb-7 text-lg font-medium ">Your Score</h3>
      <div className='flex justify-center items-center gap-20'>
        <div className="relative w-32 h-32 rounded-full bg-white flex items-center justify-center overflow-hidden">
          <div className="absolute w-full h-full clip-circle"  style={{background: `conic-gradient(#02369c 0% ${answersPercentage - 1}%, transparent ${answersPercentage - 1}% ${answersPercentage}%, #cc1010 ${answersPercentage}% 99%, transparent 99% 100%)`}}>
          </div>
        
          <div className="absolute w-[120px] h-[120px] bg-white rounded-full flex items-center justify-center">
            <span className="text-lg font-bold">{answersPercentage}%</span>
          </div>
        </div>

        <div>

          <p className='flex justify-between items-center gap-3 mb-3'>
            <span>Correct</span>
            <span className='w-7 h-7 flex justify-center items-center rounded-full border border-[#02369c] text-[#02369c]'>{correctAnswers.length}</span>
          </p>

          <p className='flex justify-between items-center gap-3'>
            <span>Incorrect </span>
            <span className='w-7 h-7 flex justify-center items-center rounded-full border border-[#cc1010] text-[#cc1010]'>{IncorrectAnswers.length}</span>
          </p>

        </div>
      </div>
      
      <div className="mt-7">
      
        <CustomButton 
        handleClick={handleShowResults}
        additionalStyles={`w-full bg-main hover:bg-[#314fe3] text-white`} 
        title={"Show Results"}
        />
      
      </div>
    </div>
    )
 }

  
}
