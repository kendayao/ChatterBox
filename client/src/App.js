import React, { Component } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import SignIn from "./pages/SignIn"
import Chatroom from "./pages/Chatroom"
import "./App.css";




function App() {
  return (
    <Router>
      <div>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route exact path="/chatroom">
          <Chatroom />
        </Route>
      </div>
    </Router>
  )
}


export default App;
