import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/auth.css";

function Signup() {
    const [full_name, setFullName]           = useState("");
    const [enrollment_number, setEnrollment] = useState("");
    const [branch, setBranch]                = useState("");
    const [email, setEmail]                  = useState("");
    const [mobile_number, setMobile]         = useState("");
    const [password, setPassword]            = useState("");
    const [loading, setLoading]              = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (enrollment_number.length === 14) {
            setEmail(`${enrollment_number}@mail.ljku.edu.in`);
        } else {
            setEmail("");
        }
    }, [enrollment_number]);

    async function sendsignuprequest() {

        if (enrollment_number.length !== 14 || isNaN(enrollment_number)) {
            alert("Enrollment number must be exactly 14 digits.");
            return;
        }

        if (mobile_number.length !== 10 || isNaN(mobile_number)) {
            alert("Mobile number must be exactly 10 digits.");
            return;
        }

        if (branch === "") {
            alert("Please select a branch");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/signup/",
                {
                    full_name: full_name,
                    enrollment_number: enrollment_number,
                    branch: branch,
                    email: email,
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
            alert("Signup Failed");
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="auth-bg">
        <div className="auth-card auth-card--wide">

        <div className="auth-tabs">
        <Link to="/" className="auth-tab">Log in</Link>
        <button className="auth-tab active">Sign up</button>
        </div>

        <div className="auth-field">
        <label className="auth-label">Full Name</label>
        <input type="text" className="auth-input" placeholder="Full Name" value={full_name} onChange={(e) => setFullName(e.target.value)} />
        </div>

        <div className="auth-field">
        <label className="auth-label">Enrollment Number</label>
        <input type="text" className="auth-input" placeholder="14-Digit Enrollment Number" value={enrollment_number} maxLength={14} onChange={(e) => setEnrollment(e.target.value)} />
        </div>

        {/* Read-only preview of their generated email */}
        {/* using readOnly not disabled bcz disabled does grey out field */}
        <div className="auth-field">
        <label className="auth-label">Institute Email
            {email && <span className="auth-label-tag">Auto-filled</span>}
        </label>
        <input type="email" className="auth-input auth-input--readonly" placeholder="Generated Email (Autofilled)" value={email} readOnly />
        </div>

        <div className="auth-field">
        <label className="auth-label">Branch</label>
        <select className="auth-input auth-select" value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option value="">Select Branch</option>
            <option value="CSE">Computer Science Engineering</option>
            <option value="IT">Information Technology</option>
            <option value="CE">Civil Engineering</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="EC">Electronics &amp; Communication</option>
            <option value="EE">Electrical Engineering</option>
            <option value="AIML">Artificial Intelligence &amp; ML</option>
        </select>
        </div>

        <div className="auth-field">
        <label className="auth-label">Mobile Number</label>
        <input type="text" className="auth-input" placeholder="10-Digit Mobile Number" maxLength={10} value={mobile_number} onChange={(e) => setMobile(e.target.value)} />
        </div>

        <div className="auth-field">
        <label className="auth-label">Password</label>
        <input type="password" className="auth-input" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="auth-btn" onClick={sendsignuprequest} disabled={loading}>
            {loading ? "Creating account…" : "Sign up"}
        </button>

        <p className="auth-bottom">
        Already have an account?{" "}
        <Link to="/" className="auth-link">Log in</Link>
        </p>

        </div>
        </div>
    );
}

export default Signup;
