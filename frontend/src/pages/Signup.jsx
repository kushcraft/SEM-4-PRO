import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = async () => {

        try {

            const res = await axios.post(
                "http://127.0.0.1:8000/signup/",
                {
                    email: email,
                    password: password
                }
            );

            alert(res.data.message);

            setEmail("");
            setPassword("");

        }

        catch(err){

            console.log(err);

            alert("Signup Failed");

        }

    }

    return (
        <>
            <h1>Signup</h1>

            <input type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

            <br /><br />

            <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

            <br /><br />

            <button onClick={signup}> Signup </button>

            <p>
                Already have an account?
            <Link to="/"> Login</Link>
            </p>

        </>
    )
}

export default Signup;