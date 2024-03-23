import React, { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import AddStu from "./Components/AddStu";
import StuList from "./Components/StuList";
import Header from "./Components/Header";
import AddSir from "./Components/AddSir";
import SirList from "./Components/SirList";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import { app } from "./firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const AUTH = getAuth(app);
    const unSubscribe = onAuthStateChanged(AUTH, (user) => {
      setUser(user);
    });
    return () => unSubscribe();
  }, []); // Empty dependency array to run only once

  const LogOut = () => {
    const AUTH = getAuth(app);
    signOut(AUTH).then(() => {
      setUser(null);
      navigate("/LogIn");
    });
  };

  return (
    <>
      <div style={{ margin: "10px", display: "flex", justifyContent: "space-around" }}>
        <Link to="/">SignUp</Link>
        <Link to="/LogIn">LogIn</Link>
        {user && (
          <>
            <Link to="/AddStu">AddStu</Link>
            <Link to="/StuList">StuList</Link>
            <Link to="/AddSir">AddSir</Link>
            <Link to="/SirList">SirList</Link>
            <button type="button" onClick={LogOut}>Log Out</button>
          </>
        )}
      </div>
      <Routes>
        <Route path="/LogIn" element={<Login />} />
        <Route path="/" element={<SignUp />} />
        {user && (
          <>
            <Route path="/AddStu" element={<AddStu />} />
            <Route path="/StuList" element={<StuList />} />
            <Route path="/AddSir" element={<AddSir />} />
            <Route path="/SirList" element={<SirList />} />
          </>
        )}
      </Routes>
    </>
  );
};
export default App;