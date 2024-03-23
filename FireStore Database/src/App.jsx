import React from "react";
import { Route, Routes } from "react-router-dom";
import AddStu from "./Components/AddStu";
import StuList from "./Components/StuList";
import Header from "./Components/Header";
import AddSir from "./Components/AddSir";
import SirList from "./Components/SirList";
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AddStu />} />
        <Route path="/StuList" element={<StuList />} />
        <Route path="/AddSir" element={<AddSir />} />
        <Route path="/SirList" element={<SirList />} />
      </Routes>
    </>
  );
}
export default App;