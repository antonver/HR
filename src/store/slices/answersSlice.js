import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const answersSlice = createSlice({
    name: 'answers',
    initialState,
    reducers: {
        addAnswer: (state, action) => {
            const { test_id, question_id, answer, time_spent } = action.payload;
            const existingAnswer = state.find(
                (ans) => ans.test_id === test_id && ans.question_id === question_id
            );

            if (existingAnswer) {
                // Обновляем существующий ответ
                existingAnswer.answer = answer;
                existingAnswer.time_spent = time_spent;
            } else {
                // Добавляем новый ответ
                state.push({ test_id, question_id, answer, time_spent });
            }
        },
        clearAnswers: () => initialState, // Сбрасываем состояние
    },
});

export const { addAnswer, clearAnswers } = answersSlice.actions;
export default answersSlice.reducer;