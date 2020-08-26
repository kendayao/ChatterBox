import React, {useState} from "react"
import { Link, useLocation } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {getName} from '../actions/index'


function SignIn(){
    const dispatch=useDispatch();

    const location = useLocation();
    const [screenName, setScreenName]=useState("")

    function handleInputChange(event){
        const value=event.target.value
        setScreenName(value)
    }

    return(
        <div>
            <h1><i className="fas fa-comment-alt"></i>Chatterbox</h1>
            <form>
                <label htmlFor="name">ScreenName</label>
                <input name="name" className="name" id="name" type="text" placeholder="Enter ScreenName" onChange={handleInputChange}></input>
                <br/>
            </form>
            <button onClick={()=>dispatch(getName(screenName))}>
                <Link to="/chatroom" className={location.pathname === "/chatroom" ? "nav-link active" : "nav-link"}>
                    Start Chatting
                </Link>
            </button>
        </div>
    )
}


export default SignIn