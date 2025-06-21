import { useEffect, useState } from 'react'
import '../App.css'
import baseURL from '../config.js'
import axios from 'axios'
const Sidebar = ({ setBoardView }) => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/boards`).then((response) => {
      setBoard(response.data.boards);
      setBoardView(response.data.boards[0]._id); 
    }).catch((error) => {
      console.error("There was an error fetching the boards!", error);
    });
  }
    , []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    axios.post(`${baseURL}/boards`, data).then((response) => {
      setBoard([...board, response.data.board]);
      setBoardView(response.data.board[0]._id); 
      e.target.reset(); 
    }).catch((error) => {
      console.error("There was an error creating the board!", error);
    });
  }



  return (
    <>

      <div className='sidebar'>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" required />
          <button type="Submit">Create Board</button>
        </form>
        {
          board.map((item, index) => (
            <button key={index} className='board' onClick={() => { setBoardView(item._id) }}>
              {item.name} <br />
            </button>
          ))
        }

      </div>
    </>
  )
}

export default Sidebar
