import React from 'react'
import '../App.css'
import axios from 'axios'
import baseURL from '../config.js'


const Taskview = ({ value, boardID, taskData }) => {

    const deletetask = (key) => {
        axios.delete(`${baseURL}/tasks/${key}/`).then((response) => {
            console.log("Task deleted successfully", response.data);
        }).catch((error) => {
            console.error("There was an error deleting the task!", error);
        });
    }


    return (
        <div className='taskview'>
            <div>
                <div>To Do</div>
                {
                    taskData.map((task, index) => {
                        if (task.status === 'todo') {
                            return (
                                <div key={index} className='task-item'>
                                    <h3>{task.title}</h3>
                                    <p>{task.description}</p>
                                    <div>
                                        <button>Edit</button>
                                        <button onClick={() => { deletetask(task._id) }}>Delete</button>
                                    </div>
                                </div>
                            )
                        }
                        return null;
                    })

                }
            </div>

            <div>
                <div>In Progress</div>
                {
                    taskData.map((task, index) => {
                        if (task.status === 'in-progress') {
                            return (
                                <div key={index} className='task-item'>
                                    <h3>{task.title}</h3>
                                    <p>{task.description}</p>
                                    <div>
                                        <button>Edit</button>
                                        <button onClick={() => { deletetask(task._id) }}>Delete</button>
                                    </div>
                                </div>
                            )
                        }
                        return null;
                    })

                }
            </div>

            <div>
                <div>Done</div>
                {
                    taskData.map((task, index) => {
                        if (task.status === 'done') {
                            return (
                                <div key={index} className='task-item'>
                                    <h3>{task.title}</h3>
                                    <p>{task.description}</p>
                                    <div>
                                        <button>Edit</button>
                                        <button onClick={() => { deletetask(task._id) }}>Delete</button>
                                    </div>
                                </div>
                            )
                        }
                        return null;
                    })

                }
            </div>

        </div>
    )
}

export default Taskview
