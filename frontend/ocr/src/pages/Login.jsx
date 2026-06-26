import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

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
        <>
            <h1>Login</h1>

            <input type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

            <br /><br />

            <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

            <br /><br />

            <button onClick={login}>Login</button>

            <p>
                New here?
                <Link to="/signup"> Signup</Link>
            </p>

        </>
    )
}
export default Login;