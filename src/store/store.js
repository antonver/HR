// store.js
import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './slices/questionsSlice';
import answerReducer from './slices/answersSlice';
import loginReducer from './slices/loginSlice';
import testTypeSlice from './slices/testSlice';
const store = configureStore({
    reducer: {
        questions: questionReducer,
        answers: answerReducer,
        login: loginReducer,
        test: testTypeSlice,
    },
});

export default store;