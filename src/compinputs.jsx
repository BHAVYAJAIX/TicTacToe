import React from 'react'
import { Link } from 'react-router-dom'
import "./options.css"
const Compinputs = () => {
  return (
    <>
    <h2 className='auxh2'>Choose your difficulty level:</h2>
    <div className='container2'>
      <div>
    <Link to='/compgameboard' className='button second'>Easy</Link>
      </div>
    <br/>
    <br/>
    <div>
    <Link to='/smartcompgameboard' className='button second'>Unbeatable</Link>
    </div>
    </div>
    </>
  )
}

export default Compinputs