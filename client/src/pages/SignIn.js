import React, {useState} from "react"
import { Link, useLocation } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {getName} from '../actions/index'
import "./SignIn.css"

function SignIn(){
    const dispatch=useDispatch();

    const location = useLocation();
    const [screenName, setScreenName]=useState("")

    function handleInputChange(event){
        const value=event.target.value
        setScreenName(value)
    }

    return(
        <div className="signin-section">
            <h1 className="logo"><i className="fas fa-comment-alt"></i>Chatterbox</h1>
            <form className="name-input">
                <input name="name" className="name" id="name" type="text" placeholder="Enter screen name" onChange={handleInputChange}></input>
                <br/>
            
            <button onClick={()=>dispatch(getName(screenName))} className="start-chatting-btn">
                <Link to="/chatroom" className={location.pathname === "/chatroom" ? "nav-link active" : "nav-link"}>
                    Start Chatting
                </Link>
            </button>
            </form>
        </div>
    )
}


export default SignIn