import React from 'react';
import {BsTrashFill} from 'react-icons/bs';

const Task = ({task,onDelete, onToggle}) => {
  return (
    <div className= {`task ${task.remainder ? "remainder" : ""}`} onDoubleClick = {() => onToggle (task.id)}>
        <h3>{task.text} <BsTrashFill style={{color:"red", cursor:"pointer"}} 
        onClick = {()=> onDelete (task.id)} /></h3>
        <p>{task.day}</p>
    </div>
  )
}

export default Task


//`task ${task.remainder ? "remainder" : ""}`