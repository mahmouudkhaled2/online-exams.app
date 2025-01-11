import { useAppDispatch, useAppSelector } from "../../../lib/hooks/redux";
import { RootState } from "../../../lib/Redux/store/store";
import InputField from "../../../components/ui/InputField";
import CustomButton from "@/components/ui/CustomButton";
import { setOpenModal } from "@/lib/Redux/slices/QuizSlice";



export default function QuizResults() {

    const { IncorrectAnswers } = useAppSelector( (state: RootState) => state.quiz );
    const dispatch = useAppDispatch();

  return (
    <>
    <div className="h-[80vh] overflow-auto grid grid-cols-1 md:grid-cols-2 gap-5 p-5 font-Inter">
      {IncorrectAnswers?.map((question, index) => (
        <div key={index} className="p-5 rounded-lg shadow-[0_0_8px_#2A292940]">
          <h3 className="pb-5 text-lg font-medium">{question?.question}</h3>
          <ul className="flex flex-col gap-4">
            {question.answers.map((answer, index) => (
              <li
                key={index}
                className={`${answer.key === question.answer ? 'bg-[#F8D2D2] border-[#CC1010]' : ''} ${
                  question.correct === answer.key ? 'bg-[#CAF9CC] border-[#11CE19]' : 'bg-[#EDEFF3]'
                } flex gap-4 items-center px-3 border rounded-lg text-[15px]`}
              >
                <InputField
                  id={question._id}
                  type={"radio"}
                  name={question._id}
                  checked={answer.key === question.answer}
                  customStyles={` ${answer.key === question.answer && 'incorrect'} `}
                />
                <label htmlFor={question._id} className={`text-md w-full py-3 truncate`}>
                  {answer.answer}
                </label>
                <h1>{question.correct}</h1>
                <h1>{question.answer}</h1>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  
    <CustomButton
      title={"Close"}
      handleClick={() => dispatch(setOpenModal(false))}
      additionalStyles="bg-main w-full text-white rounded-lg text-[15px]"
    />
  </>
  
  )
}
