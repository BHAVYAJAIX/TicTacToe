import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Gameboard from './Gameboard'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Inputs from './inputs'

function App() {
  return <Router>
    <Link to="/">Home</Link>
    <Link to="/gameboard">Gameboard</Link>
    <Routes>
      <Route path='/' element={<Inputs/>}/>
      <Route path='/gameboard' element={<Gameboard/>}/>
    </Routes>
    </Router>
}

export default App
