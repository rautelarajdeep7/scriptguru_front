import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Taskview from './Taskview'
import baseURL from '../config.js'


const TaskPanel = ({ boardID }) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [taskData, setTaskData] = useState([]);

  const gettasks = useEffect(() => {
    axios.get(`${baseURL}/boards/${boardID}/tasks`)
      .then((response) => {
        setTaskData(response.data.tasks)
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  },[boardID])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    axios.post(`${baseURL}/boards/${boardID}/tasks`, data)
      .then((response) => {
        setTaskData([...taskData, response.data.task]);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("There was an error creating the task!", error);
      });
  }


  return (
    <div className='taskpanel'>

      <div>
        <button className='create-task' onClick={() => { setIsModalOpen(true) }}>
          Create task
        </button>
      </div>

      <div>

        <Taskview value={0} boardID={boardID} taskData={taskData} />

      </div>

      {isModalOpen && (

        <div className='modal'>
          <span style={{ backgroundColor: "red", color: "white", padding: "2px", cursor: "pointer", marginBottom: "5px", display: "inline-block" }} className='close' onClick={() => { setIsModalOpen(false) }}> X </span> 
          
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title : </label> <br />
            <input type="text" id="title" name="title" required /> <br /><br />

            <label htmlFor="description">Description : </label><br />
            <textarea id="description" name="description" rows="10" cols="40"></textarea> <br /><br />

            <label htmlFor="status">Status : </label><br />
            <select name="status" id="status">
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select> <br /><br />

            <label htmlFor="priority">Priority : </label><br />
            <select name="priority" id="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <label htmlFor="assignedTo">Assigned To : </label> <br />
            <input type="text" id="assignedTo" name="assignedTo" /> <br /><br />

            <label htmlFor="dueDate">Due Date : </label> <br />
            <input type="date" id="dueDate" name="dueDate" /> <br /><br />

            <input type="Submit" value="Create" />
          </form>
        </div>
      )}

    </div>
  )
}

export default TaskPanel
