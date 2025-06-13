import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Record {
    id: number;
    task: string;
}

interface homeState {
    task: string;
    record: Record[];
}

const initialState: homeState = {
    task: "",
    record: [],
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setTask: (state, action: PayloadAction<string>) => {
            state.task = action.payload;
        },

        setRecord: (state, action: PayloadAction<Record[]>) => {
            state.record = action.payload;
        }
    },
});

export const { setTask, setRecord } = homeSlice.actions;

export default homeSlice.reducer;
