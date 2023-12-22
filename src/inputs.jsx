import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import "./options.css"
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
            <h2 className="auxh2">Enter your names:</h2>
            <form onSubmit={handlesubmit}>
                <label htmlFor="name1">Who plays first? </label>
                <input type="text" placeholder="Enter name" value={names.name1} onChange={changenames} id="name1" className="auxinput"/>
                <br/>
                <br/>
                <label htmlFor="name2">Playing second? </label>
                <input type="text" placeholder="Enter name" value={names.name2} onChange={changenames} id="name2" className="auxinput"/>
                <br/>
                <Link to='/gameboard' className="button second">Submit</Link>
            </form>
        </div>
    );
}