import React from "react"
import {useSelector} from 'react-redux';

function Chatroom(){

    const statetest=useSelector(
        state=>state.screenName)
     console.log(statetest)

    return (
        <div>
        <h1>Chatroom: Welcome {statetest}</h1>
        
        <h2>Users Logged In</h2>
        </div>
        )
}


export default Chatroom