import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {AiFillDelete} from 'react-icons/ai'
import {TbEdit} from 'react-icons/tb'
import {GrStatusGood} from 'react-icons/gr'
import {GrStatusUnknown} from 'react-icons/gr'


import './TodoList.css'
const TodoListComponent = () => {
  const [text,setText] = useState('')
  const [taskList,setTaskList] = useState([])
  const [button,setButton] = useState('Add')
  const [listId,setListId] = useState('')
  const [taskStatus,setTaskStatus] = useState(false)
  useEffect(() => {
    getAllTask(setTaskList);
  },[])
  const addTodoList = () => {
    if(button === 'Add' && text !== ''){
    
      fetch(`http://localhost:3500/api/v1/list`,{
        method:`POST`,
        crossDomain:true,
        headers: {
          'content-type' : 'application/json',
          'Access-Control-Allow-Origin':'*'
        },

        body : JSON.stringify({
          text:text
        })
      })
      .then((response)=>response.json())
      .then((data)=>{
        console.log(data);

      })
      getAllTask(setTaskList)
    }
    if(button === 'Update' && text !== ''){
      const id =listId;
      console.log(taskStatus);
      fetch(`http://localhost:3500/api/v1/list/${id}`,{
        method:`PATCH`,
        crossDomain:true,
        headers: {
          'content-type' : 'application/json',
          'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({
          text:text,
          id:id,
          status:taskStatus
        })
      })
      .then((response)=>response.json())
      .then((data)=>{
        console.log(data)
        getAllTask(setTaskList)
      })
      
      setButton('Add')
      setText('')
    }

  }

  const getAllTask = (setTaskList)=>{
    axios.get(`http://localhost:3500/api/v1/list`)
    .then(({data})=>{
      console.log(data)
      setTaskList(data)
      console.log(data);
    })
  }

  function updateTodo(id,text) {
    
    setListId(id)
    setButton('Update')
    setText(text)
    console.log(text);
   
    
  }

  function deleteAList (id){
    fetch(`http://localhost:3500/api/v1/list/${id}`,{
      method:`DELETE`,
      crossDomain:true,
      headers: {
        'content-type' : 'application/json',
        'Access-Control-Allow-Origin':'*'
      }
      
    })
    .then((response)=>response.json())
    .then((data)=>{
      console.log(data)
      getAllTask(setTaskList)
    })
  }
  const checkBoxHandler = (e) => {
    if(taskStatus === false){
      setTaskStatus(true)
    }
    if(taskStatus === true){
      setTaskStatus(false)
    }
    
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodoList();
    }
  };

return (
  <div className='container'>
    <div className='container-box'>
      <div className='header'>
        <input
          onKeyPress={handleKeyPress}
          className='input'
          type='text'
          placeholder='Add task..'
          
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
     
      
        <button className='button' onClick={addTodoList}>{button}</button>
        </div>
    </div>
    <div>
      {taskList.map((task) => (
        <ul className='display-body-list' key={task._id}>
          <div className='list-container'>
            <li className='list-item'>
              <div className='text-container'>
                <input type='checkbox' onChange={checkBoxHandler} />
                {task.text}
              </div>
              <div className='button-container'>
                <div>
                  <button
                    onClick={() => updateTodo(task._id,task.text)}
                    className='upd-btn btn'
                  >
                    <TbEdit />
                  </button>
                </div>
                <button
                  className='dlt-btn btn'
                  onClick={() => deleteAList(task._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
              <div className='status-bar'>
                {task.status ? <GrStatusGood /> : <GrStatusUnknown />}
              </div>
            </li>
          </div>
        </ul>
      ))}
    </div>
    
  </div>
);
};

export default TodoListComponent;