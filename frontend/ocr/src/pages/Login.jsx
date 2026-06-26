import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../css/auth.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function sendloginrequest() {

        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/login/",
                {
                    email: email,
                    password: password
                }
            );
            if(res.data.success){
                alert("Login Successful");
            }

            else{
                alert("Invalid Email or Password");
            }

        }

        catch(err){
            console.log(err);
            alert("Login Failed");
        }

    }

   return (

    <div className="login-container">
    <div className="login-card">

    <h1 className="login-title">Login</h1>

    <input className="login-input" type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

    <input className="login-input" type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

    <button className="login-button" onClick={sendloginrequest}>Login</button>

    <p className="login-link"> New here?{" "}

    <Link to="/signup" className="login-link-anchor">Signup</Link>

    </p>

    </div>

    </div>
)
}
export default Login;