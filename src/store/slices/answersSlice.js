import { createSlice } from '@reduxjs/toolkit';

const answersSlice = createSlice({
    name: 'answers',
    initialState: [],
    reducers: {
        addAnswer: (state, action) => {
            const { test_num, question_num, answer } = action.payload;
            const existingAnswerIndex = state.findIndex(
                (ans) => ans.test_num === test_num && ans.question_num === question_num
            );
            if (existingAnswerIndex !== -1) {
                // Update existing answer
                state[existingAnswerIndex].answer = answer;
            } else {
                // Add new answer
                state.push(action.payload);
            }
        },
        clearAnswers: (state) => {
            return []; // Reset to empty array
        },
    },
});

export const { addAnswer, clearAnswers } = answersSlice.actions;
export default answersSlice.reducer;