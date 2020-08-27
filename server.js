const express = require("express");
const path = require("path");



const app = express();
var socket=require('socket.io');
const PORT = process.env.PORT || 3001;
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs

var server=app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});


// chat setup
var io=socket(server)
const userslist={}

io.on('connection',function(socket){
    socket.on('new-user', function(name){
      const user={
        username: name,
        id:socket.id
      }
      userslist[socket.id]=user
      io.emit("user-connected", user)
      io.emit("users",Object.values(userslist));
    })

    socket.on('message', chatInfo => {
      console.log(chatInfo)
      io.to(chatInfo.to).emit('render-message', chatInfo.msg);
    });

    socket.on("disconnect", () => {
      delete userslist[socket.id];
      io.emit("disconnected",socket.id)
    });


  })
