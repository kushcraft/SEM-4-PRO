import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../css/auth.css";

function Login() {

    const [enrollmentInput, setEnrollmentInput] = useState("");
    const [password, setPassword]               = useState("");
    const [showPw, setShowPw]                   = useState(false);
    const [loading, setLoading]                 = useState(false);

    // Full email is always enrollment + fixed domain
    const email = enrollmentInput ? `${enrollmentInput}@mail.ljku.edu.in` : "";

    async function sendloginrequest() {
        if (enrollmentInput.length !== 14 || isNaN(enrollmentInput)) {
            alert("Enter your 14-digit enrollment number.");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/login/",
                {
                    email: email,
                    password: password
                }
            );
            if (res.data.success) {
                alert("Login Successful");
            } else {
                alert("Invalid Email or Password");
            }
        } catch (err) {
            console.log(err);
            alert("Login Failed");
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="auth-bg">
        <div className="auth-card">

        <div className="auth-tabs">
        <button className="auth-tab active">Log in</button>
        <Link to="/signup" className="auth-tab">Sign up</Link>
        </div>

        <div className="auth-field">
        <label className="auth-label">Your Email</label>
        <div className="auth-email-wrap">
            <input
                type="text"
                className="auth-input auth-input--enrollment"
                placeholder="Enrollment number"
                value={enrollmentInput}
                maxLength={14}
                onChange={(e) => setEnrollmentInput(e.target.value.replace(/\D/g, ""))}
            />
            <span className="auth-email-suffix">@mail.ljku.edu.in</span>
        </div>
        </div>

        <div className="auth-field">
        <label className="auth-label">Password</label>
        <div className="auth-input-wrap">
        <input
            type={showPw ? "text" : "password"}
            className="auth-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-eye" type="button" onClick={() => setShowPw((p) => !p)} tabIndex={-1}>
            {showPw ? <EyeOff /> : <Eye />}
        </button>
        </div>
        <div className="auth-forgot-row">
        <Link to="/forgot-password" className="auth-forgot">Forgot password?</Link>
        </div>
        </div>

        <button className="auth-btn" onClick={sendloginrequest} disabled={loading}>
            {loading ? "Logging in…" : "Continue"}
        </button>

        <p className="auth-bottom">
        Don't have an account?{" "}
        <Link to="/signup" className="auth-link">Sign up</Link>
        </p>

        </div>
        </div>
    );
}

function Eye() {
    return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function EyeOff() {
    return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    );
}

export default Login;
