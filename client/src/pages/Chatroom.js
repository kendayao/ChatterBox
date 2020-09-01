import React, { useEffect, useState } from "react"
import io from 'socket.io-client'
import {useSelector} from 'react-redux';
import "./Chatroom.css"
import Alert from "../Alert"
import {Link, useLocation} from "react-router-dom"

let socket;

function Chatroom(){
    const location = useLocation();
    const chatName=useSelector(state=>state.screenName)
    const [users, setUsers]=useState([])
    const [message, setMessage]=useState({})
    const [chat, setChat]=useState([])
    const [socketid, setSocketid]=useState("")
    const [chatRoomName, setChatRoomName]=useState("")
    const [userName, setUserName]=useState("")
    const [alertState, setAlertState]=useState(null)
    const [disconnectedUser, setDisconnectedUser]=useState("")

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
            setAlertState(true)
            setTimeout(()=>{
              setAlertState(null);
            }, 5000);
          })
          
          socket.on("disconnected", id =>{
              setDisconnectedUser(function(users){
                  users.forEach(user=>{
                      if(user.id===id){
                          return user.username
                      }
                  })
              })
              setUsers(users=>{
                  return users.filter(user=>user.id !==id);
              })
          })

          return () => socket.close();
    }, [])

 
    console.log(users)
    console.log(disconnectedUser)
    const handleInputChange=event=>{
        const username=chatName
        const value=event.target.value
        setMessage({...message, name:username, message:value})
    }

    const handleSubmit=event=>{
        event.preventDefault();
        setChat(chat=>[...chat,message])
        socket.emit('message', {msg:message, to:socketid })
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
                <button type="button" name={user.id} value={user.username} className="btn btn-primary btn-chat" data-toggle="modal" data-target="#exampleModal" onClick={handleChat}><i class="far fa-user-circle visitor-avatar"></i>{user.username}</button>
            </div>)
        })
    }


    
    
    const renderChat=()=>{
        return chat.map(function(message, index){
            if(message.name!==chatRoomName){
                return <div key={index} id="message-container-left"><i class="fas fa-user-circle chat-avatar"></i><span class="chatname-left">You</span><span className="message-span-left">{message.message}</span></div>
            }else{
                return <div key={index} id="message-container-right"><span class="chatname-right">{message.name}</span><span className="message-span-right">{message.message}</span><i class="far fa-user-circle chat-avatar"></i></div>
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
                <div className="column-left-header"> 
                    <h2><i className="fas fa-comment-alt"></i> Chatterbox</h2>
                </div>
          
            <h5>Users ready to chat</h5>
            {alertState ? <Alert username={userName} alert={alertState} />: null}
            <div>{renderUsers()}</div>
            </div>

            <div className="col-md-9 column-right">
            <Link to="/" id="logout-link" className={location.pathname === "/" ? "nav-link active" : "nav-link"} >
                    Logout
                </Link>
                <i class="fas fa-user-circle fa-8x"></i>
                <h1>Welcome, {chatName}!</h1>
                <p>Click on a user to open a Chatterbox</p>
            </div>
        </div>
        







        <div className="modal" tabIndex="-1" role="dialog" id="exampleModal">
            <div className="modal-dialog modal-lg">
                <div className="modal-content chat-modal modal-dialog-scrollable">
                    <div className="modal-header">
                        <h5 className="modal-title"><i class="far fa-user-circle visitor-avatar"></i>{chatRoomName}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {renderChat()}
                    </div>
                    <div className="modal-footer">
                        <form id="send-container">
                            <input name="message" type="text" id="message-input" placeholder="type message..." onChange={handleInputChange}/>
                            <button type="submit" id="chat-send-button" onClick={handleSubmit}><i class="fas fa-paper-plane"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    

        </div>


        )
}


export default Chatroom