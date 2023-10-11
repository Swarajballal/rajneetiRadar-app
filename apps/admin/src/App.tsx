
import './App.css'
import { Signup } from "ui";
import { PrismaClient } from 'database';

function App() {
  

  return (
    <>
      <div 
      className='bg-gray-100 min-h-screen flex items-center justify-center'
      >
       <Signup  />
      </div>
    </>
  )
}

export default App
