import { Link } from 'react-router-dom'
import React from 'react'
import "./options.css" 
import img1 from './images/laptop.png'
import img2 from './images/handshake.png'

const Initialoptions = () => {
  return (
    <>
      <h1 className='auxh1'>Play X O!</h1>
    <div className="container">
    <div>
    <img src={img2}/>
    <Link to='/inputs' className='button first'>Play with a friend</Link>
    </div>
    <div>
    <img src={img1}/>
    <Link to='/compinputs' className='button first'>Play with Computer</Link>
    </div>
    </div>
    </>
  )
}

export default Initialoptions