import "./gameboard.css";
import { useState, useEffect, useRef } from 'react';
import Boxes from "./boxes";


export default function Gameboard() {
    const [fills, setfills] = useState([]);
    const [letter, setletter] = useState(Array(9).fill(null));
    const [lettercomp, setlettercomp] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState(null);
    const [winordraw, setwinordraw] = useState(false);
    const [turn, setturn] = useState(false);
    const [alternates, setalternates] = useState(true)
    const firstUpdate = useRef(true);

    useEffect(() => {
        iswin();
    }, [letter,lettercomp]);

    useEffect(() => {
        checkwindraw();
    });

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        compplays()
    }, [letter])

    useEffect(() => {
        setalternates(true);
        const timeout = setTimeout(() => {
          setalternates(false);
        }, 500);
        return () => clearTimeout(timeout);
      }, [letter]);

    function decideturn() {
        setturn(!turn)  
        
        const newfills = [...fills];
        let j;
        do {
            j = Math.floor(Math.random() * 9)
            console.log(j);
            if (newfills.length === 9) {
                break;
            }
        } while (newfills.includes(j))
        let k = 0;
        newfills.push(j);
        setfills(newfills);
        const newlettercomp = [...letter];
        newlettercomp[j] = 'X';
        setlettercomp(newlettercomp)
    }

    const select = (i) => {
        if (winner || lettercomp[i] !== null) {
            return;
        }
        setletter(genletter(i));
        setalternates(false)
    }

    function genletter(i) {
        const newfills = [...fills];
        newfills.push(i);
        let j;
        setfills(newfills);
        const newletter = [...lettercomp];
        if (turn) {
            newletter[i] = 'O';
        } else {
            newletter[i] = 'X';
        }
        return newletter;
    }

    function compplays() {
        if (iswin() || letter.every((val, i, arr) => val === arr[0]) || fills.length===9) {
            const newlettercomp = [...letter];
            setlettercomp(newlettercomp)
            return;
        }
        const newfills = [...fills];
        let j;
        do {
            j = Math.floor(Math.random() * 9)
            console.log(j);
            if (newfills.length === 9) {
                break;
            }
        } while (newfills.includes(j))
        newfills.push(j);
        setfills(newfills);
        const newlettercomp = [...letter];
        if (turn) {
            newlettercomp[j] = 'X';
        } else {
            newlettercomp[j] = 'O';
        }
        setlettercomp(newlettercomp)
    }

    function resetfxn() {
        setalternates(false)
        setlettercomp(Array(9).fill(null));
        fills.length = 0;
        setletter(Array(9).fill(null));
        setwinordraw(false);
        setWinner(null);
        setclickno(true);
    }

    function undofxn() {
        const newlettercomp = [...lettercomp];
        newlettercomp[fills[fills.length - 2]] = null;
        newlettercomp[fills[fills.length - 1]] = null;
        setlettercomp(newlettercomp);
        fills.pop();
        fills.pop();
    }

    function iswin() {
        if (winner !== null) {
            return;
        }
        const winpos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [6, 4, 2]
        ];
        for (let i = 0; i < winpos.length; i++) {
            const [a, b, c] = winpos[i];
            if (letter[a] === 'X' && letter[a] === letter[b] && letter[a] === letter[c]) {
                setWinner('X');
                setalternates(true)
                return true;
            }
            else if (lettercomp[a] === 'X' && lettercomp[a] === lettercomp[b] && lettercomp[a] === lettercomp[c]) {
                setWinner('X');
                setalternates(true) 
                return true;
            }
            else if (lettercomp[a] === 'O' && lettercomp[a] === lettercomp[b] && lettercomp[a] === lettercomp[c]) {
                setWinner('O');
                return true;
            }
            else if (letter[a] === 'O' && letter[a] === letter[b] && letter[a] === letter[c]) {
                setWinner('O');
                return true;
            }
        }
        return false;
    }


    function checkwindraw() {
        console.log(winner)
        if (winner !== null || fills.length === 9) {
            setwinordraw(true);
            return true
        }
        return false
    }


    return (
        <div className="allcont">
            <h1>Fight!</h1>
            <label htmlFor="first">Computer play first</label>
            <input type="radio" value={turn} name="first" onChange={decideturn}></input>
            <div className="cont">
                {alternates ?
                    letter.map((l, id) => (
                        <div key={id}>
                            <Boxes key={l} inp={() => select(id)} letter={l} />
                        </div>
                    ))
                    :
                    lettercomp.map((l, id) => (
                        <div key={id}>
                            <Boxes key={l} inp={() => select(id)} letter={l} />
                        </div>
                    ))
                }
            </div>
            {winordraw && (winner ? <h2>{winner} wins!</h2> : <h2>DRAW</h2>)}
            <button onClick={resetfxn}>Reset</button>
            <button onClick={undofxn} disabled={fills.length === 0 || winordraw}>Undo</button>
        </div>
    );
}
