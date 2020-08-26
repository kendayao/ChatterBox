import React, { useEffect, useState } from "react"
import io from 'socket.io-client'
import {useSelector} from 'react-redux';





let socket;

function Chatroom(){

    
    const chatName=useSelector(state=>state.screenName)
    const [users, setUsers]=useState([])

    useEffect(()=>{
        socket = io.connect() 
        socket.on('connect', ()=>{
            socket.emit('new-user', chatName)
        })

        // socket.on("user-connected", user => {
        //     setUsers(users => [...users, user])
        //   })
       
      
          socket.on("users", users => {
            setUsers(users);
          });
      
       

    }, [])

    console.log(users)

    const renderUsers=()=>{
        return users.map(function(user){
            return (<div key={user.id}>
                <button type="button" name={user.id} value={user.username} className="btn btn-primary btn-chat" data-toggle="modal" data-target="#exampleModal">{user.username}</button>
            </div>)
        })
    }

    return (
        <div>
        <h1>Chatroom: Welcome {chatName} </h1>
        
        <h2>Users Logged In</h2>
        <div>{renderUsers()}</div>
        </div>
        )
}


export default Chatroom