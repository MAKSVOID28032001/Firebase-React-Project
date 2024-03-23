import React, { useState } from "react";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const SignUpHandler = (event) => {
        event.preventDefault();
        const AUTH = getAuth(app);
        createUserWithEmailAndPassword(AUTH, email, password)
        .then(res => {
            console.log(res.user);
            console.log(res.user.uid);
            navigate("/LogIn");
        }) 
        .catch(error => console.log(error.message));
    }
    return (
        <>
            <h1> Welcome To SignUp Page!</h1>
            <form onSubmit={SignUpHandler}>
                <div>
                    <label htmlFor="mail">User Email:</label>
                    <input required type="email" placeholder="User Email" onChange={e=>setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">User Password:</label>
                    <input required type="password" placeholder="User Password" onChange={e=>setPassword(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </>
    );
}
export default SignUp;