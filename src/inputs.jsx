import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
export default function Inputs() {
    const[names, setnames]=useState({name1:"", name2:""});

    const changenames=(e)=>{
        const changedField=e.target.id;
        const changedto=e.target.value;
        setnames((curnames)=>{
            curnames[changedField]=changedto;
            return({...curnames});
        })
    }

        const handlesubmit=(e)=>{
            e.preventDefault();
            // setnames({name1:"", name2:""});
        }

        useEffect(()=>{
            localStorage.setItem("names", JSON.stringify(names));
        },[names])
    return (
        <div>
            <form onSubmit={handlesubmit}>
                <label htmlFor="name1">Whose playing as X? </label>
                <input type="text" placeholder="Player 1" value={names.name1} onChange={changenames} id="name1"/>
                <br/>
                <br/>
                <label htmlFor="name2">Whose playing as O? </label>
                <input type="text" placeholder="Player 2" value={names.name2} onChange={changenames} id="name2"/>
                <br/>
                <Link to='/gameboard'>Submit</Link>
            </form>
        </div>
    );
}