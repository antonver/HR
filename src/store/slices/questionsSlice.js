import { createSlice } from '@reduxjs/toolkit';

const questionSlice = createSlice({
    name: 'questions',
    initialState: [],
    reducers: {
        addQuestion: (state, action) => {
            state.push(action.payload);
        },
        clearQuestions: (state) => {
            return [];
        },
    },
});

export const { addQuestion, clearQuestions } = questionSlice.actions;
export default questionSlice.reducer;