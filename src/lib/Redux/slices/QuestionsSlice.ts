import { LOCAL_API } from "@/lib/constants/common";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

interface QuestionState {
    allQuestions: Question[] | [],
    activeQuestion: number,
}

const initialState: QuestionState = {
    allQuestions: [],
    activeQuestion: 0,
}

export const getAllQuestions = createAsyncThunk('quiz/getAllQuestions', async function (payload : {examId: string}) {
    return fetch(LOCAL_API + `/api/questions?exam=${payload.examId}`)   
    .then(res => res.json())
    .then(data => data)
    .catch(error => error);
})

const questionsSlice = createSlice({

    initialState,
    
    name: 'questions',

    reducers: {
        nextQuestion: (state) => {
            state.activeQuestion += 1
        },

        prevQuestion: (state) => {
            state.activeQuestion -= 1
        },

    },

    extraReducers: function (builder) {

        builder.addCase(getAllQuestions.fulfilled, function (state, action) {
            if (action.payload.message === "success") 
            state.allQuestions = action.payload.questions
        });

        // builder.addCase(getAllQuestions.rejected, function (state, action) {
        //     // console.log("Payload From Rejected ==> ", action.payload)
        // });

        // builder.addCase(getAllQuestions.pending,  (state, action) =>  {
        //     // console.log("Payload From Pending ==> ", action)
        // });
    }
})

export const {nextQuestion, prevQuestion} = questionsSlice.actions

export default questionsSlice.reducer