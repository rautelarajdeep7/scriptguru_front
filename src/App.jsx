import { useState } from 'react'
import Sidebar from './Components/Sidebar'
import './App.css'
import TaskPanel from './Components/TaskPanel'

function App() {
  const [board_view, setBoardView] = useState('1')

  return (
    <>

    <div className='seperation'>

      <Sidebar setBoardView={setBoardView} />
      <TaskPanel boardID={board_view}/>


    </div>


    </>
  )
}

export default App
