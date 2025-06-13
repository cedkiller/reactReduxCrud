import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import supabase from '../../config/config';
import Swal from 'sweetalert2';

//interface here

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
}

const homeSlice = createSlice({
    name:'home',
    initialState,
    reducers:{
        setTask: (state, action: PayloadAction<string>) => {
            state.task = action.payload;
        },

        setRecord: (state, action: PayloadAction<Record[]>) => {
            state.record = action.payload;
        }
    }
});

export const getRecordSlice = async (dispatch: any) => {
    const {data, error} = await supabase.from('record').select('*');

    if (error) {
        Swal.fire({
            title:'Error Getting Record',
            text:'There has been error in getting record',
            icon:'error'
        });
    }

    else {
        dispatch(setRecord(data));
    }
}

export const submitSlice = async (task: string, dispatch: any) => {
    const {data, error} = await supabase.from('record').insert({task: task});

    if (error) {
        Swal.fire({
            title:'Error Adding Task',
            text:'There has been error in adding task',
            icon:'error'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(setTask(""));
                window.location.reload();
            }
        })
    }

    else {
        Swal.fire({
            title:'Task Added',
            text:'The task has been added successfully',
            icon:'success'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(setTask(""));
                window.location.reload();
            }
        })
    }
}

export const delSlice = async (id: number, dispatch: any) => {
    const {data, error} = await supabase.from('record').delete().eq('id',id);

    if (error) {
        Swal.fire({
            title:'Error Deleting Task',
            text:'There has been error in deleting task',
            icon:'error'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(setTask(""));
                window.location.reload();
            }
        })
    }

    else {
        Swal.fire({
            title:'Task Deleted',
            text:'The task has been deleted successfully',
            icon:'success'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(setTask(""));
                window.location.reload();
            }
        })
    }
}

export const checkTaskSlice = async (id: number, dispatch: any) => {
    const {data, error} = await supabase.from('record').select('*').eq('id',id);

    if (error) {
        Swal.fire({
            title:'Error Getting Task',
            text:'Ther has been error in getting task',
            icon:'error'
        });
    }

    else {
        dispatch(setTask(data[0].task));
    }
}

export const updateTaskSlice = async (id: number, task: string, dispatch: any) => {
    const {data, error} = await supabase.from('record').update({task: task}).eq('id',id);

    if (error) {
        Swal.fire({
            title:'Error Updating Task',
            text:'There has been error in updating task',
            icon:'error'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(setTask(""));
                window.location.reload();
            }
        })
    }

    else {
        Swal.fire({
            title:'Task Updated',
            text:'The task has been updated successfully',
            icon:'success' 
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(setTask(""));
                window.location.href='/';
            }
        })
    }
}

export const {setTask, setRecord} = homeSlice.actions;

export default homeSlice.reducer;