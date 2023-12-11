import React from 'react';
import "./gameboard.css";
import{useState, useEffect} from 'react'
export default function Boxes({ inp, letter }) {
  return (
    <div className={`box1 ${letter === 'X' ? 'box1teal' : 'box1purp'}`} onClick={inp}>
      <div className={'slideup'}>
        {letter}
      </div>
    </div>
  );
}
