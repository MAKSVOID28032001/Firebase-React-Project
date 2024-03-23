import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const Header = () => {
    const navigate = useNavigate();
    const LogOut = () => {
        const AUTH = getAuth(app);
        signOut(AUTH).then(res=>{
            navigate("/LogIn");
        })
    }
    // useEffect(()=>{
    //     const AUTH = getAuth(app);
    //     const unSubscribe = onAuthStateChanged(AUTH, (user)=>{
    //         if(user){
    //             console.log("Yes Login", user)
    //         } else {
    //             console.log("No Login");
    //         }
    //     })
    //     return ()=>unSubscribe()
    // },[])
    return (
        <>
            <div style={{margin: "10px", display:"flex", justifyContent:"space-around"}}>
                <Link to="/">
                    SignUp
                </Link>
                <Link to="/LogIn">
                    LogIn
                </Link>
                <Link to="/AddStu">
                    AddStu
                </Link>
                <Link to="/StuList">
                    StuList
                </Link>
                <Link to="/AddSir">
                    AddSir
                </Link>
                <Link to="/SirList">
                    SirList
                </Link>
                <button type="button" onClick={LogOut}>Log Out</button>
            </div>
        </>
    );
}
export default Header;