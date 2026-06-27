import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import "../css/auth.css";

// Step constants
const STEP_EMAIL  = "email";
const STEP_OTP    = "otp";
const STEP_RESET  = "reset";

function ForgotPassword() {

    const [step, setStep]                       = useState(STEP_EMAIL);

    // Step 1 — enrollment
    const [enrollmentInput, setEnrollmentInput] = useState("");

    // Step 2 — OTP (5 digits)
    const [otp, setOtp]                         = useState(["", "", "", "", ""]);
    const otpRefs                               = [useRef(), useRef(), useRef(), useRef(), useRef()];

    // Step 3 — new password
    const [password, setPassword]               = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPw, setShowPw]                   = useState(false);
    const [showCpw, setShowCpw]                 = useState(false);

    const [loading, setLoading]                 = useState(false);
    const navigate                              = useNavigate();

    const email = enrollmentInput ? `${enrollmentInput}@mail.ljku.edu.in` : "";

    /* ─── STEP 1: Send OTP ─── */
    async function sendOtp() {
        if (enrollmentInput.length !== 14 || isNaN(enrollmentInput)) {
            alert("Enter your 14-digit enrollment number.");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post("http://127.0.0.1:8000/forgot-password/", {
                email: email
            });
            if (res.data.success) {
                setStep(STEP_OTP);
            } else {
                alert(res.data.message || "No account found with this email.");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    /* ─── STEP 2: Verify OTP ─── */
    async function verifyOtp() {
        const code = otp.join("");
        if (code.length !== 5) {
            alert("Please enter the full 5-digit code.");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post("http://127.0.0.1:8000/verify-otp/", {
                email: email,
                otp: code
            });
            if (res.data.success) {
                setStep(STEP_RESET);
            } else {
                alert("Invalid or expired code. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Verification failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    /* ─── STEP 3: Reset Password ─── */
    async function resetPassword() {
        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post("http://127.0.0.1:8000/reset-password/", {
                email: email,
                password: password
            });
            if (res.data.success) {
                alert("Password updated successfully!");
                navigate("/");
            } else {
                alert(res.data.message || "Reset failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Reset failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    /* ─── OTP input handlers ─── */
    function handleOtpChange(index, value) {
        // Only allow single digit
        const digit = value.replace(/\D/g, "").slice(-1);
        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);
        // Auto-advance to next box
        if (digit && index < 4) {
            otpRefs[index + 1].current.focus();
        }
    }

    function handleOtpKeyDown(index, e) {
        // Backspace: clear current then move back
        if (e.key === "Backspace") {
            if (otp[index] === "" && index > 0) {
                const newOtp = [...otp];
                newOtp[index - 1] = "";
                setOtp(newOtp);
                otpRefs[index - 1].current.focus();
            }
        }
        // Allow arrow navigation
        if (e.key === "ArrowLeft" && index > 0) otpRefs[index - 1].current.focus();
        if (e.key === "ArrowRight" && index < 4) otpRefs[index + 1].current.focus();
    }

    function handleOtpPaste(e) {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 5);
        const newOtp = ["", "", "", "", ""];
        pasted.split("").forEach((d, i) => { newOtp[i] = d; });
        setOtp(newOtp);
        // Focus last filled box
        const lastIndex = Math.min(pasted.length, 4);
        otpRefs[lastIndex].current.focus();
    }

    /* ─── Resend OTP ─── */
    async function resendOtp() {
        setOtp(["", "", "", "", ""]);
        otpRefs[0].current.focus();
        await sendOtp();
    }

    /* ─── Masked email for display ─── */
    const maskedEmail = email
        ? email.replace(/^(.{4})(.*)(@.*)$/, (_, a, b, c) => a + "*".repeat(Math.min(b.length, 6)) + c)
        : "";

    return (
        <div className="auth-bg">
        <div className="auth-card">

        {/* ══ STEP 1: Enter Enrollment ══ */}
        {step === STEP_EMAIL && (
        <>
            <div className="auth-tabs">
                <Link to="/" className="auth-tab">Log in</Link>
                <Link to="/signup" className="auth-tab">Sign up</Link>
            </div>

            <div className="fp-heading">
                <h2 className="fp-title">Forgot password?</h2>
                <p className="fp-sub">Enter your enrollment number and we'll send a reset code to your institute email.</p>
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
                    onKeyDown={(e) => e.key === "Enter" && sendOtp()}
                />
                <span className="auth-email-suffix">@mail.ljku.edu.in</span>
            </div>
            </div>

            <button className="auth-btn" onClick={sendOtp} disabled={loading}>
                {loading ? "Sending…" : "Send Reset Code"}
            </button>

            <p className="auth-bottom">
                Remember your password?{" "}
                <Link to="/" className="auth-link">Log in</Link>
            </p>
        </>
        )}

        {/* ══ STEP 2: Verify OTP ══ */}
        {step === STEP_OTP && (
        <>
            <button className="fp-back" onClick={() => setStep(STEP_EMAIL)}>
                <ChevLeft /> Back
            </button>

            <div className="fp-heading">
                <h2 className="fp-title">Check your email</h2>
                <p className="fp-sub">
                    We sent a reset code to <strong>{maskedEmail}</strong><br />
                    Enter the 5-digit code mentioned in the email.
                </p>
            </div>

            <div className="otp-row">
                {otp.map((digit, i) => (
                    <input
                        key={i}
                        ref={otpRefs[i]}
                        className={`otp-box${digit ? " otp-box--filled" : ""}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        onPaste={i === 0 ? handleOtpPaste : undefined}
                    />
                ))}
            </div>

            <button className="auth-btn" onClick={verifyOtp} disabled={loading}>
                {loading ? "Verifying…" : "Verify Code"}
            </button>

            <p className="auth-bottom">
                Haven't got the email yet?{" "}
                <span className="auth-link" style={{ cursor: "pointer" }} onClick={resendOtp}>
                    Resend email
                </span>
            </p>
        </>
        )}

        {/* ══ STEP 3: Reset Password ══ */}
        {step === STEP_RESET && (
        <>
            <div className="fp-heading" style={{ marginTop: "0.5rem" }}>
                <h2 className="fp-title">Update password</h2>
                <p className="fp-sub">Choose a new password for your account.</p>
            </div>

            <div className="auth-field">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrap">
                <input
                    type={showPw ? "text" : "password"}
                    className="auth-input"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="auth-eye" type="button" onClick={() => setShowPw((p) => !p)} tabIndex={-1}>
                    {showPw ? <EyeOff /> : <Eye />}
                </button>
            </div>
            </div>

            <div className="auth-field">
            <label className="auth-label">Confirm Password</label>
            <div className="auth-input-wrap">
                <input
                    type={showCpw ? "text" : "password"}
                    className="auth-input"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && resetPassword()}
                />
                <button className="auth-eye" type="button" onClick={() => setShowCpw((p) => !p)} tabIndex={-1}>
                    {showCpw ? <EyeOff /> : <Eye />}
                </button>
            </div>
            </div>

            <button className="auth-btn" onClick={resetPassword} disabled={loading}>
                {loading ? "Updating…" : "Update Password"}
            </button>
        </>
        )}

        </div>
        </div>
    );
}

/* ── Icons ── */
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
function ChevLeft() {
    return (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
        </svg>
    );
}

export default ForgotPassword;
