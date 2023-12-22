import "./gameboard.css";
import { useState, useEffect, useRef } from 'react';
import Boxes from "./boxes";


export default function Gameboard() {
    const [fills, setfills] = useState([]);
    const [letter, setletter] = useState(Array(9).fill(null));
    const [lettercomp, setlettercomp] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState(null);
    const [winordraw, setwinordraw] = useState(false);
    const [alternates, setalternates] = useState(true)
    const [turn, setturn] = useState(false);
    const [Winnerbox, setWinnerbox]=useState([]);
    const firstUpdate = useRef(true);

    useEffect(() => {
        iswin();
    }, [letter, lettercomp]);

    useEffect(() => {
        checkwindraw();
    });

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        genlettercomp()
    }, [letter])

    useEffect(() => {
        setalternates(true);
        const timeout = setTimeout(() => {
          setalternates(false);
        }, 500);
        return () => clearTimeout(timeout);
      }, [letter]);

    function decideturn() {
        setturn(true)
    }

    function player(arr) {
        let filteredArray = arr.filter(element => element !== null);
        if (filteredArray.length % 2 === 0) {
            return false;
        }
        else {
            return true;
        }
    }

    function actions(arr) {
        const poss = [];
        if (player(arr) == false) {
            let i = 0;
            for (i = 0; i < arr.length; i++) {
                if (arr[i] === null) {
                    const newarr = [...arr];
                    newarr[i] = 'O';
                    poss.push(newarr);
                }
            }
        }
        else if (player(arr) == true) {
            let i = 0;
            for (i = 0; i < arr.length; i++) {
                if (arr[i] === null) {
                    const newarr = [...arr];
                    newarr[i] = 'X';
                    poss.push(newarr);
                }
            }
        }
        return poss;
    }

    function terminal(arr) {
        let filteredArray = arr.filter(element => element !== null);
        if (filteredArray.length === 9) {
            return true;
        }
        const winpos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [6, 4, 2]
        ];
        for (let i = 0; i < winpos.length; i++) {
            const [a, b, c] = winpos[i];
            if (arr[a] !== null && arr[a] === arr[b] && arr[a] === arr[c]) {
                return true;
            }
        }
        return false;
    }

    function value(arr) {
        let filteredArray = arr.filter(element => element !== null);

        const winpos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [6, 4, 2]
        ];
        for (let i = 0; i < winpos.length; i++) {
            const [a, b, c] = winpos[i];
            if (arr[a] === 'X' && arr[a] === arr[b] && arr[a] === arr[c]) {
                return 1;
            }
        }
        for (let i = 0; i < winpos.length; i++) {
            const [a, b, c] = winpos[i];
            if (arr[a] === 'O' && arr[a] === arr[b] && arr[a] === arr[c]) {
                return -1;
            }
        }
        if (filteredArray.length === 9) {
            return 0;
        }

    }

    function min(a, b) {
        if (a >= b) {
            return b
        }
        else {
            return a
        }
    }
    function max(a, b) {
        if (a <= b) {
            return b
        }
        else {
            return a
        }
    }

    function minimax(arr) {
        if (terminal(arr)) {
            return value(arr)
        }
        if (player(arr) === true) {
            let val = -1000;
            const temp = actions(arr);
            for (let t of temp) {
                val=max(val, minimax(t))
            }
            return val;
        }
        if (player(arr) === false) {
            let val = 1000;
            const temp = actions(arr);
            for (let t of temp) {
                val=min(val, minimax(t))
            }
            return val;
        }
    }

    function maxindarr(arr, mainarr){
        let max=arr[0];
        let maxind=0;
        for(let i=0;i<arr.length;i++){
            if(max<arr[i]){
            max=arr[i];
            maxind=i;
            }
        }
        for(let i=0;i<mainarr.length;i++){
            if(arr[i]===max){
                var out;
                out=mainarr[i]
                for(let l=0; l<9;l++){
                    if(lettercomp[l]!==out[l]){
                        if(l===0||l===2||l===4||l===6||l===8){
                            return i;
                        }
                    }   
                }
            }
        }
        return maxind;
    }

    const select = (i) => {
        if (winner || lettercomp[i] !== null) {
            return;
        }
        setletter(genletter(i));
        setalternates(false)
    }

    function genlettercomp() {
        if (iswin() || letter.every((val, i, arr) => val === arr[0]) || fills.length===9) {
            const newlettercomp = [...letter];
            setlettercomp(newlettercomp)
            return;
        }
        const te = actions(letter)
        const vals = [];
        
        for(let x of te) {
            let i = minimax(x)
            vals.push(i)
        }
        let maxIndex = maxindarr(vals, te)
        var out;
        out = te[maxIndex]
        console.log(out);
        let storind;
        for(let l=0; l<9;l++){
            if(letter[l]!==out[l]){
                storind=l;
            }   
        }
        console.log(storind)
        const newfills=[...fills]
        newfills.push(storind);
        setfills(newfills);
        setlettercomp(out);
    }

    function genletter(i) {
        const newletter = [...lettercomp];
        newletter[i] = 'O';
        const newfills=[...fills]
        newfills.push(i);
        setfills(newfills);
        return newletter
    }

    function resetfxn() {
        setWinnerbox([]);
        setletter(Array(9).fill(null));
        setlettercomp(Array(9).fill(null));
        fills.length = 0;
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
            const temp = winpos[i];
          if (letter[temp[0]]==='X' && letter[temp[0]] === letter[temp[1]] && letter[temp[0]] === letter[temp[2]]) {
            setWinner('X');
            setWinnerbox(temp)
            return true;
        }
            else if (lettercomp[temp[0]]==='X' && lettercomp[temp[0]] === lettercomp[temp[1]] && lettercomp[temp[0]] === lettercomp[temp[2]]) {
                setWinner('X');
                setalternates(true);
                setWinnerbox(temp)
                return true;
            }
            else if (letter[temp[0]]==='O' && letter[temp[0]] === letter[temp[1]] && letter[temp[0]] === letter[temp[2]]) {
                setWinner('O');
                setWinnerbox(temp)
                return true;
            }
            else if (lettercomp[temp[0]]==='O' && lettercomp[temp[0]] === lettercomp[temp[1]] && lettercomp[temp[0]] === lettercomp[temp[2]]) {
                setWinner('O');
                setWinnerbox(temp)
                return true;
            }
        }
        return false;
    }

    function checkwindraw() {
        console.log(winner)
        if (winner !== null || fills.length === 9) {
            setwinordraw(true);
        }
    }
    
    return (
        <div className="allcont">
            <h1>Fight!</h1>
            <div className="cont">
            {alternates ?
                    letter.map((l, id) => (
                        <div key={id}>
                            <Boxes key={l} boxno={id} inp={() => select(id)} letter={l} winbox={Winnerbox}/>
                        </div>
                    ))
                    :
                    lettercomp.map((l, id) => (
                        <div key={id}>
                            <Boxes key={l} boxno={id} inp={() => select(id)} letter={l} winbox={Winnerbox}/>
                        </div>
                    ))
                }
            </div>
            {winordraw ? (winner ? <h2 key={winner} className="mainh2 sup">{winner} wins!</h2> : <h2 key="draw" className="mainh2 sup">DRAW</h2>):<h2 key="blank" className="mainh2"></h2>}
            <button onClick={resetfxn}>Reset</button>
            <button onClick={undofxn} disabled={fills.length === 0 || winordraw}>Undo</button>
        </div>
    );
}