import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: { value: '' }, // Changed to object with value property
    reducers: {
        setLogin: (state, action) => {
            state.value = action.payload;
        },
        clearLogin: (state) => {
            state.value = ''; // Reset to empty string
        },
    },
});

export const { setLogin, clearLogin } = loginSlice.actions;
export default loginSlice.reducer;