import React from 'react';
import {useState} from 'react';
// import { DatePicker } from '@julienvanbeveren/react-datetime-picker'

const AddTask = ({onAdd}) => {

    const [text,setText] = useState("")
    const [day,setDay] = useState("")
    const [remainder,setRemainder] = useState(false)

    const onSubmit = (e)=> {
        e.preventDefault()

       if (!text){
        alert("Please add task");
        return;
       }

       onAdd ({text,day,remainder})

       setText(" ")
       setDay(" ")
       setRemainder(false)
    }

    return(
    <form className='add-form' onSubmit={onSubmit} >
        
        <div className='form-control'>
        <label>
            Task:
            <input type="text" placeholder="Add Task"  value={text} onChange={(e)=> setText(e.target.value)}/></label></div>
        
        <div className='form-control'>
        <label>
            Date & time:
            < input type="text" placeholder="Add Date & time" value={day} onChange={(e)=>setDay(e.target.value)} />
        </label>
        </div>


        <div className='form-control form-control-check '>
        <label>Set Remainder: </label>
            <input type="checkbox" checked={remainder} value={remainder} onChange={(e)=> setRemainder(e.currentTarget.checked)}  />
        </div>
        
        <input type="submit" value="Save Task" className='btn btn-block' />
        
    </form>
)}

export default AddTask

// 