import React from 'react';
import "./gameboard.css";
export default function Boxes({ inp, letter }) {
  return (
    <div className="box1" onClick={inp}>
      {letter}
    </div>
  );
}
