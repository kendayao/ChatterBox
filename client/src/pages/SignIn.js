import React, {useState} from "react"
import { Link, useLocation } from "react-router-dom";


function SignIn(){
    const location = useLocation();

    const [screenName, setScreenName]=useState("")

    function handleInputChange(event){
        const value=event.target.value
        setScreenName(value)
    }

    console.log(screenName)
   
    return(
        <div>
            <h1><i class="fas fa-comment-alt"></i>Chatterbox</h1>

            <form>
                <label for="name">ScreenName</label>
                <input name="name" class="name" id="name" type="text" placeholder="Enter ScreenName" onChange={handleInputChange}></input>
                <br/>
            </form>
            <button>
                <Link to="/chatroom" className={location.pathname === "/chatroom" ? "nav-link active" : "nav-link"}>
                Start Chatting
                </Link>
            </button>
        </div>
    )
}

export default SignIn