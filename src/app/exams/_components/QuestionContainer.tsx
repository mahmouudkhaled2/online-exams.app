'use client'

import AnswersCalculator from './AnswersCalculator';
import QuestionForm from './QuestionForm';
import { useAppSelector } from '@/lib/hooks/redux';
import { RootState } from "../../../lib/Redux/store/store";

export default function QuestionContainer() {

  const { isDone } = useAppSelector( (state: RootState) => state.quiz );

  return (
    <>
      { isDone ? <AnswersCalculator/> :  <QuestionForm/> }
    </>
  )
}
