import { createSlice } from '@reduxjs/toolkit';

const testSlice = createSlice({
    name: 'test',
    initialState: {
        typeTest: null, // Initialize as null to indicate no test type selected
    },
    reducers: {
        changeType: (state, action) => {
            const validTypes = ['frontend', 'backend'];
            if (validTypes.includes(action.payload)) {
                state.typeTest = action.payload; // Update typeTest only if valid
            } else {
                console.warn(`Invalid test type: ${action.payload}`);
            }
        },
        clearType: (state) => {
            state.typeTest = null; // Reset to null
        },
    },
});

export const { changeType, clearType } = testSlice.actions;
export default testSlice.reducer;