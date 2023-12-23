import React from 'react';
import "./gameboard.css";
export default function Boxes({ boxno, inp, letter, winbox }) {
  console.log(winbox)
  return (
    <div className={`box1 ${letter === 'X' ? 'box1teal' : 'box1purp'} ${boxno===winbox[0]||boxno===winbox[1]||boxno===winbox[2]? 'winbox':''}`} onClick={inp}>
      <div className={'slideup'}>
        {letter}
      </div>
    </div>
  );
}
