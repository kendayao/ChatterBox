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
        

        <div className="modal" tabIndex="-1" role="dialog" id="exampleModal">
            <div className="modal-dialog">
                <div className="modal-content chat-modal">
                    <div className="modal-header">
                        <h5 className="modal-title">Chatroom</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    Body
                    </div>
                    <div className="modal-footer">
                        <form id="send-container">
                            <input name="message" type="text" id="message-input" placeholder="type message.."/>
                            <button type="submit" id="chat-send-button">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    

        </div>


        )
}


export default Chatroom