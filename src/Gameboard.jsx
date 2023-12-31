import "./gameboard.css";
import { useState, useEffect} from 'react';
import Boxes from "./boxes";

export default function Gameboard() {
    const [fills, setfills]=useState([]);
    const [clickno, setclickno] = useState(true);
    const [letter, setletter] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState(null);
    const [winnerbox, setWinnerbox] = useState([]);
    const [recdnames, setrecdnames] = useState({name1:"", name2:""});
    const [winordraw, setwinordraw] = useState(false);

    useEffect(() => {
        getnames();
    }, []);

    useEffect(() => {
        iswin(recdnames);
    }, [letter]);

    useEffect(() => {
        checkwindraw();
    });

    const select = (i) => {
        if (winner || letter[i]!==null) {
            return;
        }
        setclickno(!clickno);
        setletter(genletter(i));
    }
    
    function genletter(i) {
        const newfills = [...fills];
        newfills.push(i);
        setfills(newfills);
        const newletter = [...letter];
        if (clickno) {
            newletter[i] = 'X';
        } else {
            newletter[i] = 'O';
        }
        return newletter;
    }
    function resetfxn() {
        setletter(Array(9).fill(null));
        fills.length=0; 
        setwinordraw(false);
        setWinner(null);
        setclickno(true);
        setWinnerbox([]);
    }

    function undofxn(){
        if(winner){
            setWinner(null);
        }
        setclickno(!clickno);
        const newletter = [...letter];
        newletter[fills[fills.length-1]]=null;
        setletter(newletter);
        fills.pop();
    }

    function iswin(recdnames) {
        if(winner!==null){
            return;
        }
        const winpos = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8],
          [0, 3, 6], [1, 4, 7], [2, 5, 8],
          [0, 4, 8], [6, 4, 2]
        ];
        for (let i = 0; i < winpos.length; i++) {
          const temp = winpos[i];
          if (letter[temp[0]]==='X' && letter[temp[0]] === letter[temp[1]] && letter[temp[0]] === letter[temp[2]]) {
            setWinner(recdnames.name1);
            setWinnerbox(temp)
            return true;
        }
        else if (letter[temp[0]]==='O' && letter[temp[0]] === letter[temp[1]] && letter[temp[0]] === letter[temp[2]]) {
            setWinner(recdnames.name2);
            setWinnerbox(temp)
            return true;
          }
        }
        return false;
      }


    function checkwindraw(){
        console.log(winner)
        if(winner!==null || fills.length===9){
            setwinordraw(true);
        }
    }

    function getnames(){
        const recdnames=JSON.parse(localStorage.getItem("names"));
        if(recdnames){
            setrecdnames(recdnames);
        }
    }

    return (
        <div className="allcont">
            <h1>Fight!</h1>
            <div className="cont">
                {letter.map((l, id) => (
                    <div key={id}>
                        <Boxes key={l} boxno={id} inp={() => select(id)} letter={l} winbox={winnerbox}/>
                    </div>
                ))}
            </div>
            {winordraw ? (winner ? <h2 key={winner} className="mainh2 sup">{winner} wins!</h2> : <h2 key="draw" className="mainh2 sup">DRAW</h2>):<h2 key="blank" className="mainh2"></h2>}
            <button onClick={resetfxn}>Reset</button>
            <button onClick={undofxn} disabled={fills.length===0 || winordraw}>Undo</button>
        </div>
    );
}
