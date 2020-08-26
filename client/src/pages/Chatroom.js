import React from "react"
import {useSelector} from 'react-redux';

function Chatroom(){

    const statetest=useSelector(
        state=>state.screenName)
     console.log(statetest)

    return <h1>Chatroom: Welcome {statetest}</h1>
}


export default Chatroom