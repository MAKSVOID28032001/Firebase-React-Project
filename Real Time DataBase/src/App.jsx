import React from "react";
import { Route, Routes } from "react-router-dom";
import AddStu from "./Components/AddStu";
import StuList from "./Components/StuList";
import Header from "./Components/Header";
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AddStu />} />
        <Route path="/StuList" element={<StuList />} />
      </Routes>
    </>
  );
}
export default App;