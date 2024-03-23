import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState(null);
    const [code, setCode] = useState('');
    const navigate = useNavigate();
    const LogInHandler = (event) => {
        event.preventDefault();
        const AUTH = getAuth(app);
        signInWithEmailAndPassword(AUTH, email, password)
            .then(res => {
                console.log(res.user);
                console.log(res.user.uid);
                navigate("/AddStu");
            }).catch(error => console.log(error.message))
    }
    //Google Login Start
    const GoogleLogIn = () => {
        const AUTH = getAuth(app);
        const provider = new GoogleAuthProvider();
        signInWithPopup(AUTH, provider)
            .then(res => {
                console.log(res.user);
                console.log(res.user.uid);
                navigate("/AddStu");
            }).catch(error => console.log(error.message))
    }
    //Google Login End

    //OTP Start
    const SendOTP = () => {
        const AUTH = getAuth(app);
        const AppVerifier = new RecaptchaVerifier(AUTH, "ATISH", { "size": "invisible" });
        signInWithPhoneNumber(AUTH, phone, AppVerifier)
            .then(res => {
                console.log(res);
                window.confirmationResult = res;
                console.log("OTP Send");
            }).catch(error => console.log(error))
    }
    const ConfirmOTP = () => {
        window.confirmationResult.confirm(code).then(res => {
            console.log(res)
            navigate("/AddStu");
        }).catch(error => console.log(error))
    }
    //OTP End
    return (
        <>
            <h1>Welcome To Login Page!</h1>
            <form onSubmit={LogInHandler}>
                <div>
                    <label htmlFor="email">User Email:</label>
                    <input required type="email" placeholder="User Email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">User Password:</label>
                    <input required type="password" placeholder="User Password" onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Log In</button>
                    <button type="button" onClick={GoogleLogIn}>Log In With Google</button>
                </div>
                <div>
                    <label htmlFor="phone">Phone Number:</label>
                    <input placeholder="phone number" onChange={e => setPhone(e.target.value)} />
                    <div id="ATISH"></div>
                    <button type="button" onClick={SendOTP}>Send OTP</button>
                    <label>OTP:</label>
                    <input type="text" onChange={e => setCode(e.target.value)} />
                    <button type="button" onClick={ConfirmOTP}>Verify</button>
                </div>
            </form>

        </>
    );
}
export default Login;