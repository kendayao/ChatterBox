import React, { useEffect, useState } from "react"
import io from 'socket.io-client'
import {useSelector} from 'react-redux';





let socket;

function Chatroom(){

    
    const chatName=useSelector(state=>state.screenName)
    const [users, setUsers]=useState([])
    const [message, setMessage]=useState({})
    const [chat, setChat]=useState([])
    const [socketid, setSocketid]=useState("")
    const [chatRoomName, setChatRoomName]=useState("")
    const [userName, setUserName]=useState("")
    useEffect(()=>{
        socket = io.connect() 
        socket.on('connect', ()=>{
            socket.emit('new-user', chatName)
        })

        socket.on("user-connected", user => {
            setUsers(users => [...users, user])
          })
       
      
          socket.on("users", users => {
            setUsers(users);
          });
          
          socket.on('render-message', (message) => {
            console.log(message)
            setUserName(message.name)
            setChat(chat=>[...chat, message])
            // setAlertState(true)
            // setTimeout(()=>{
            //   setAlertState(null);
            // }, 5000);
          })
       

    }, [])

 


    const handleInputChange=event=>{
        const username=chatName
        const value=event.target.value
        setMessage({...message, name:username, message:value})
    }

    const handleSubmit=event=>{
        event.preventDefault();
        setChat(chat=>[...chat,message])
        socket.emit('message', {msg:message, to:socketid})
        document.getElementById('message-input').value="";
    }
    
    const handleChat=event=>{
        event.preventDefault();
        setSocketid(event.target.name)
        setChatRoomName(event.target.value)

    }




    const renderUsers=()=>{
        return users.map(function(user){
            return (<div key={user.id}>
                <button type="button" name={user.id} value={user.username} className="btn btn-primary btn-chat" data-toggle="modal" data-target="#exampleModal" onClick={handleChat}>{user.username}</button>
            </div>)
        })
    }





    return (
        <div>
        
        



        <div class="row">
            <div class="col-md-4">
            <h1>Chatroom: Welcome {chatName} </h1>
        
            <h2>Users Logged In</h2>
            <div>{renderUsers()}</div>
            </div>
            <div class="col-md-8">
                <h3>Chatbox</h3>
            </div>
    
        </div>







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
                            <input name="message" type="text" id="message-input" placeholder="type message.." onChange={handleInputChange}/>
                            <button type="submit" id="chat-send-button" onClick={handleSubmit}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    

        </div>


        )
}


export default Chatroom