import React, { useEffect, useState } from "react"
import io from 'socket.io-client'
import {useSelector} from 'react-redux';
import "./Chatroom.css"

let socket;

function Chatroom(){

    
    const chatName=useSelector(state=>state.screenName)
    const [users, setUsers]=useState([])
    const [message, setMessage]=useState({})
    const [chat, setChat]=useState([])
    const [socketid, setSocketid]=useState("")
    const [chatRoomName, setChatRoomName]=useState("")
    const [userName, setUserName]=useState("")
    const [avatar, setAvatar]=useState("")
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
            setUserName(message.name)
            setChat(chat=>[...chat, message])
            // setAlertState(true)
            // setTimeout(()=>{
            //   setAlertState(null);
            // }, 5000);
          })
          
          socket.on("disconnected", id =>{
              setUsers(users=>{
                  return users.filter(user=>user.id !==id);
              })
          })

          return () => socket.close();
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
        setChat([]);
        setSocketid(event.target.name)
        setChatRoomName(event.target.value)
        setAvatar("fas fa-user-circle")
       document.querySelector(".chat-room-welcome").innerHTML=""
    }

  


    const renderUsers=()=>{
        return users.map(function(user){
            return (<div key={user.id}>
                <button type="button" name={user.id} value={user.username} className="btn btn-primary btn-chat" data-toggle="modal" data-target="#exampleModal" onClick={handleChat}>{user.username}</button>
            </div>)
        })
    }


    const renderChat=()=>{
        return chat.map(function(message, index){
            if(message.name!==chatRoomName){
                return <div key={index} id="message-container-right">{message.name}: <span>{message.message}</span></div>
            }else{
                return <div key={index} id="message-container-left">{message.name}: <span>{message.message}</span></div>
            }

            
            
        })
    }

    const handleClose=()=>{
        setChat([])
        
      }
      





    return (
        <div>
        
        


        
        <div className="row ">
            <div className="col-md-3 column-left">
            <h1> {chatName} </h1>
        
            <h2>Users Logged In</h2>
            <div>{renderUsers()}</div>
            </div>


            <div className="col-md-9 column-right">

                <div class="chat-header">
                <i class={avatar}></i><h5 className="chat-room-name">{chatRoomName}</h5>
                <h5 className="chat-room-welcome">{chatName}</h5>
                
                </div>
                <div class="chat-section">
                {renderChat()}
                </div>

                <div class="chat-footer">
                
                    <input name="message" type="text" id="message-input" placeholder="type message.." onChange={handleInputChange}/>
                    <button type="submit" id="chat-send-button" onClick={handleSubmit}><i class="fas fa-paper-plane"></i></button>  
                
                </div>
            </div>
        </div>
        







        <div className="modal" tabIndex="-1" role="dialog" id="">
            <div className="modal-dialog">
                <div className="modal-content chat-modal">
                    <div className="modal-header">
                        <h5 className="modal-title">Chatroom with {chatRoomName}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    
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