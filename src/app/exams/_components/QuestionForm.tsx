"use client";

import InputField from "../../../components/ui/InputField";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks/redux";
import { RootState } from "../../../lib/Redux/store/store";
import { nextQuestion, prevQuestion } from "../../../lib/Redux/slices/QuestionsSlice";
import { removeLastAnswer, setCorrectAnswer, setInCorrectAnswer, setIsDone } from "../../../lib/Redux/slices/QuizSlice";
import { useState } from "react";
import CustomButton from "@/components/ui/CustomButton";


export default function QuestionForm() {

  const { allQuestions, activeQuestion } = useAppSelector( (state: RootState) => state.questions );
  const [ isAnswered, setIsAnswered] = useState<boolean>(false);
  const [ checkedAnswer, setCheckedAnswer] = useState<string>('');


  const dispatch = useAppDispatch();

  const storeAnswer = ( answers: Question ) => {

    if (checkedAnswer === answers?.correct) {
      
      const correctAnswer = {
        ...answers,
        answer: checkedAnswer,
      };

      dispatch(setCorrectAnswer(correctAnswer));

    } else {

      const IncorrectAnswer = {
        ...answers,
        answer: checkedAnswer,
      };

      dispatch(setInCorrectAnswer(IncorrectAnswer));
    }
      setCheckedAnswer('')
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, answerKey: string) => {

    if (e.target.checked) {
      setCheckedAnswer(answerKey)
    }

    setIsAnswered(true)

  }


  const handleNextButton = (newAnswer : Question) => {

    storeAnswer(newAnswer)


    if (activeQuestion < allQuestions.length - 1) {
      dispatch(nextQuestion());
    } else {
      dispatch(setIsDone(true));
      
    }
    setIsAnswered(false);
  }

  const handlBackButton = (questionId : string) => {
    dispatch(prevQuestion());
    dispatch(removeLastAnswer(questionId))
}

  return (
    <>
      <div className="mb-7">
        <div className="flex justify-between items-center mb-5">
          <span className="text-sm">
            Question {activeQuestion + 1} of {allQuestions.length}
          </span>
          <span className="text-md">14:59</span>
        </div>

        <div className="hidden sm:flex gap-3">
          {allQuestions?.map((question: Question) => (
            <div key={question._id}>
              <div
                className={`block w-2.5 h-2.5 rounded-full ${
                  allQuestions.indexOf(question) === activeQuestion
                    ? "bg-main"
                    : "bg-[#D9D9D9]"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {allQuestions.map((question, index) => {
        if (index === activeQuestion)
          return (
            <div key={index}>
              <h3 className="text-xl mb-3">{question?.question}</h3>

              <ul className="flex flex-col gap-4">
                {question?.answers.map((answer, index) => {
                  return (
                    <li
                      key={index}
                      className={`${checkedAnswer === answer?.key ? 'bg-[#CCD7EB]' : 'bg-[#EDEFF3]'} flex gap-4 items-center px-3  border rounded-lg`}
                    >
                      <InputField
                        id={answer?.key}
                        type={"radio"}
                        name={"answer"}
                        value={answer?.key}
                        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, answer?.key)}
                      />
                      <label
                        htmlFor={answer?.key}
                        className={`text-md w-full py-3`}
                      >
                        {answer?.answer}
                      </label>
                    </li>
                  );
                })}
              </ul>

              <div className="btns flex gap-5 mt-7">
                <CustomButton
                  handleClick={
                    () => handlBackButton( allQuestions[index - 1]?._id )}

                  disabled={activeQuestion === 0}
                  additionalStyles={`${
                    activeQuestion === 0 ? "opacity-60 cursor-not-allowed" : ""
                  } border border-main text-main hover:text-[#314fe3]`}
                  title={"Back"}
                />

                <CustomButton
                  handleClick={
                    () => handleNextButton({
                    question: question?.question,
                    _id: question?._id,
                    answers: question?.answers,
                    correct: question?.correct,
                  })}

                  disabled={ !isAnswered }
                  additionalStyles={`${isAnswered ? 'hover:bg-[#314fe3]' : 'bg-opacity-50 cursor-not-allowed'} bg-main  text-white`}
                  title={activeQuestion === allQuestions.length - 1 && allQuestions.length !== 0 ? "Submit" : "Next"}
                />
              </div>
            </div>
          );
      })}


    </>
  );
}
