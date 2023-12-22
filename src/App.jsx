import Gameboard from './Gameboard'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Inputs from './inputs'
import Initialoptions from './Initialoptions'
import Compinputs from './compinputs'
import Compgameboard from './compgameboard'
import Smartcompgameboard from './smartcompgameboard'

function App() {
  return <Router>
    <Routes>
      <Route path='/' element={<Initialoptions/>}/>
      <Route path='/inputs' element={<Inputs/>}/>
      <Route path='/inputs/gameboard' element={<Gameboard/>}/>
      <Route path='/compinputs' element={<Compinputs/>}/>
      <Route path='/compinputs/compgameboard' element={<Compgameboard/>}/>
      <Route path='/compiputs/smartcompgameboard' element={<Smartcompgameboard/>}/>
    </Routes>
    </Router>
}

export default App
