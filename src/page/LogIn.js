import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from 'react';

function LogIn() {

    // to store the informations
    const [user, setUser] = useState({})

    function handelCallbackResponse(response) {
        console.log("response credential");
        console.log(response.credential);
        console.log("decoding the JWT");
        let userObject = jwt_decode(response.credential);
        console.log(userObject);
        // transfer the credential info to the useState
        setUser(userObject);
        
        // hide the sign in button
        document.getElementById("signInDiv").hidden = true;
    }
    
    function handelSingOut(event) {
        // if the user want to sign out we will setUser to an empty object
        setUser({});
        document.getElementById("signInDiv").hidden = false;

    }

      useEffect(()=>{
        /*global google*/
        google.accounts.id.initialize({
          client_id:"pute the client id here",
          callback:handelCallbackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {
              theme:"outline",
              size:"large",
            }
          )
        },[])
      

    return (
        // if no user show the sign in button 
        // if user show logout button 
        <div className="container">
            <div id="signInDiv"></div>

            {/* if we don't have a user don't show the sign out button */}
            {/* if the object isn't empty show the log out button */}
            {
                Object.keys(user).length!= 0 &&
                <button onClick={(e)=>handelSingOut(e)}>Sign Out</button>                
            }


            {/* if we have user display the info */}
            {user && 
                <div>
                    <img src={user.picture} alt="profile"/>
                    {/* <img src={user.picture} alt="profile"></img> */}
                    <h3>{user.name}</h3>
                </div>
            }
        </div>
  )
}

export default LogIn