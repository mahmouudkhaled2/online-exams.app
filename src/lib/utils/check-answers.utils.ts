
export const setAnswersAfterCheck = (answers: Question[], payload: Question) => {

    const existingAnswer = answers.findIndex((answer) => answer._id === payload._id);
  
        if (existingAnswer !== -1) {
  
          answers[existingAnswer] = payload
          
        } else {
  
         answers.push(payload)
  
        }
  } 
  
  