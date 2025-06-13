import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from '../store/store';
import {setTask, setRecord, getRecordSlice, submitSlice, delSlice} from '../store/slice/homeSlice';
import Swal from 'sweetalert2';
import supabase from '../config/config';
import '../assets/css/Style.css';

function Home () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const task = useSelector((state: RootState) => state.home.task);
    const record = useSelector((state: RootState) => state.home.record);

    useEffect(() => {
        getRecord();
    },[])

    const getRecord = async () => {
        getRecordSlice(dispatch);
    }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        submitSlice(task, dispatch);
    }

    const edit = async (id: number) => {
        navigate(`/Edit/${id}`);
    }

    const del = async (id: number) => {
        delSlice(id, dispatch);
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