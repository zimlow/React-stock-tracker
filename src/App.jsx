import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Display from "./components/Display";
import NavBar from "./components/NavBar";
import Chartpage from "./components/Chartpage";

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        {/*Routes replaces Switch, must use when using Route*/}
        <Route path="/" element={<Navigate replace to="/main" />} />
        <Route path="/main" element={<Display />} />
        <Route path="/main/:item" element={<Chartpage />} />
      </Routes>
    </>
  );
}

export default App;
