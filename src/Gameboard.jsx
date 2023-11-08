import "./gameboard.css";
import { useState, useEffect} from 'react';
import Boxes from "./boxes";
import Inputs from "./inputs"

export default function Gameboard() {
    const [fills, setfills]=useState([]);
    const [clickno, setclickno] = useState(true);
    const [letter, setletter] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState(null);
    const [recdnames, setrecdnames] = useState({name1:"X", name2:"O"});
    const [winordraw, setwinordraw] = useState(false);

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
          const [a, b, c] = winpos[i];
          if (letter[a]==='X' && letter[a] === letter[b] && letter[a] === letter[c]) {
            setWinner(recdnames.name1);
            return true;
          }
          else if (letter[a]==='O' && letter[a] === letter[b] && letter[a] === letter[c]) {
            setWinner(recdnames.name2);
            return true;
          }
        }
        return false;
      }

      const showwinner=(recdnames)=>{
            setrecdnames(recdnames);
          }

    function checkwindraw(){
        console.log(winner)
        if(winner!==null || fills.length===9){
            setwinordraw(true);
        }
    }

    return (
        <div className="allcont">
            <h1>Play now!</h1>
            <Inputs showwinner={showwinner}/>
            <div className="cont">
                {letter.map((l, id) => (
                    <div key={id}>
                        <Boxes inp={() => select(id)} letter={l} />
                    </div>
                ))}
            </div>
            {winordraw && (winner? <h2>Winner is {winner}</h2> : <h2>DRAW</h2>)}
            <button onClick={resetfxn}>Reset</button>
            <button onClick={undofxn} disabled={fills.length===0 || winner}>Undo</button>
        </div>
    );
}
