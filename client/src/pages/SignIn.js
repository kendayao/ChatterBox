import React from "react"

function SignIn(){
    return(
        <div>
            <h1><i class="fas fa-comment-alt"></i>Chatterbox</h1>

            <form>
                <label for="name">ScreenName</label>
                <input name="name" class="name" id="name" type="text" placeholder="Enter ScreenName"></input>
                <br/>
                <input type="submit" value="Start Chatting"></input>
            </form>
        </div>
    )
}

export default SignIn