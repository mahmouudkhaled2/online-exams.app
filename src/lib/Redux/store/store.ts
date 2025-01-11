// 's'
import { configureStore } from '@reduxjs/toolkit';
import QuizReducer from '../slices/QuizSlice'
import QuestionsReducer from './../slices/QuestionsSlice';



export const store = configureStore({
  reducer: {
    quiz: QuizReducer,
    questions: QuestionsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
