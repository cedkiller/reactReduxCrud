import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Swal from 'sweetalert2';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from '../store/store';
import { setTask, setRecord } from '../store/counter/homeSlice';
import '../assets/css/Style.css';
import supabase from '../config/config';

function Home () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const task = useSelector((state: RootState) => state.home.task);
    const record = useSelector((state: RootState) => state.home.record);

    useEffect(() => {
        getRecord();
    },[]) 

    const getRecord = async () => {
        const {data, error} = await supabase.from('record').select('*');

        if (error) {
            Swal.fire({
                title:'Error Getting Record',
                text:'There has been error in getting record',
                icon:'error'
            })
        }

        else {
            dispatch(setRecord(data));
        }
    }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        const {data, error} = await supabase.from('record').insert({task:task});

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

    const edit = async (id: number) => {
        navigate(`/Edit/${id}`);
    }

    const del = async (id: number) => {
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

    return(
        <>
        <br />

        <div style={{display:'flex', justifyContent:'center'}}>
            <div className='div'>
                <form onSubmit={submit}>
                    <div style={{display:'flex'}}>
                        <input type="text" placeholder='Enter a task' value={task} onChange={(e) => dispatch(setTask(e.target.value))} className='form-control'/>
                        <button className='btn btn-primary' style={{marginLeft:15}}>Enter</button>
                    </div>
                </form>
            </div>
        </div>
        <br />

        <div style={{display:'flex', justifyContent:'center'}}>
            <table className='table'>
                <tr>
                    <th style={{textAlign:'center', fontSize:20, height:50, backgroundColor:'black', color:'white'}}>Task</th>
                    <th style={{textAlign:'center', fontSize:20, height:50, backgroundColor:'black', color:'white'}}>Action</th>
                </tr>

                {record.map((rec) => (
                <tr key={rec.id}>
                    <td style={{textAlign:'center', fontSize:17, height:30}}>{rec.task}</td>
                    <td style={{textAlign:'center', fontSize:17, height:30}}><button className='btn btn-warning' onClick={() => edit(rec.id)}>Edit</button> <button className='btn btn-danger' onClick={() => del(rec.id)}>Delete</button></td>
                </tr>
                ))}

            </table>
        </div>
        </>
    );
}

export default Home;