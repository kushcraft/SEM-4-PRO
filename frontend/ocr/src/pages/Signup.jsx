import { Link,useNavigate } from "react-router-dom";
import { useState, useEffect,} from "react";
import axios from "axios";
import "../css/auth.css";

function Signup() {
    const [full_name, setFullName] = useState("");
    const [enrollment_number, setEnrollment] = useState("");
    const [branch, setBranch] = useState("");
    const [email, setEmail] = useState("");
    const [mobile_number, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    
    useEffect(() => {
       if(enrollment_number.length===14){
            setEmail(`${enrollment_number}@mail.ljku.edu.in`);
        }
        else{
             setEmail("");
            }},[enrollment_number]);

    async function sendsignuprequest() {
        
        if (enrollment_number.length !== 14 || isNaN(enrollment_number)) {
            alert("Enrollment number must be exactly 14 digits.");
            return;
        }

     
        if (mobile_number.length !== 10 || isNaN(mobile_number)) {
            alert("Mobile number must be exactly 10 digits.");
            return;
        }
        
        
        if(branch===""){
        alert("Please select a branch");
        return;
        }

        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/signup/",
                {
                    full_name: full_name,
                    enrollment_number: enrollment_number,
                    branch: branch,
                    email: email, // Sending the autofilled email address
                    mobile_number: mobile_number,
                    password: password
                }
            );

            alert(res.data.message);

            setFullName("");
            setEnrollment("");
            setBranch("");
            setEmail("");
            setMobile("");
            setPassword("");
            navigate("/");

        } catch (err) {
            console.error(err);
            alert( "Signup Failed");
        }
    }

    return (
    <div className="signup-container">
    <div className="signup-card">

     <h1 className="signup-title">Signup</h1>
    
    <input type="text" className="signup-input" placeholder="Full Name" value={full_name} onChange={(e) => setFullName(e.target.value)}/>

    <input type="text" className="signup-input" placeholder="14-Digit Enrollment Number" value={enrollment_number} maxLength={14} onChange={(e) => setEnrollment(e.target.value)}/>
       

    {/* Read-only preview of their generated email */}
    {/* using readOnly not disabled bcz disabled does grey out field*/}
    <input type="email" className="signup-input" placeholder="Generated Email (Autofilled)" value={email} readOnly/>
        
    <select value={branch} onChange={(e)=>setBranch(e.target.value)} className="signup-select">

    <option value="">Select Branch</option>

    <option value="CSE">Computer Science Engineering</option>

    <option value="IT">Information Technology</option>

    <option value="CE">Civil Engineering</option>

    <option value="ME">Mechanical Engineering</option>

    <option value="EC">Electronics & Communication</option>

    <option value="EE"> Electrical Engineering</option>

    <option value="AIML">Artificial Intelligence & ML</option>

    </select>

    <input type="text" className="signup-input" placeholder="10-Digit Mobile Number" maxLength={10}value={mobile_number} onChange={(e) => setMobile(e.target.value)}/>
            
    <input type="password" className="signup-input" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            
    <button className="signup-button" onClick={sendsignuprequest}> Signup </button>

    <p className="signup-link"> Already have an account? {" "}{/* spacing */}

    <Link to="/" className="signup-link-anchor">Login</Link>

    </p>
            
    </div>
    </div>
    );
}
export default Signup;