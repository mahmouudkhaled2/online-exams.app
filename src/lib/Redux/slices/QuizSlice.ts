import { setAnswersAfterCheck } from "@/lib/utils/check-answers.utils";
import { createSlice } from "@reduxjs/toolkit";


interface QuizState {
  correctAnswers: Question[], 
  IncorrectAnswers: Question[],
  isLoading: boolean, 
  isDone: boolean,
  openModal: boolean,
}

const initialState: QuizState = {
  correctAnswers: [],
  IncorrectAnswers: [],
  isLoading: false, 
  isDone: false, 
  openModal: false,
};


const quizSlice = createSlice({
  name: "quiz",
  initialState,

  reducers: {

    setCorrectAnswer: (state, action) => {
      setAnswersAfterCheck(state.correctAnswers , action.payload);
    },


    setInCorrectAnswer: (state, action) => {
      setAnswersAfterCheck(state.IncorrectAnswers , action.payload);
    },

    removeLastAnswer : (state, action) => {

      
      const findQuestionIndexAtCorrect = state.correctAnswers.findIndex((question) => question._id === action.payload);

      console.log("The QS ID: ", findQuestionIndexAtCorrect);

      if (findQuestionIndexAtCorrect !== -1) {
        state.correctAnswers.pop()
      } 
      else {
        state.IncorrectAnswers.pop()
      }
    }, 

    setIsDone: (state, action) => {
      state.isDone = action.payload;
    },

    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    }

  },
});

export const { setCorrectAnswer, setInCorrectAnswer, removeLastAnswer, setIsDone, setOpenModal } = quizSlice.actions;
export default quizSlice.reducer;
