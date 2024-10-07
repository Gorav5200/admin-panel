import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateMain from "./create/createMain";
import ViewMain from "./view/viewMain";
import Home from "./home";


function Main() {
  return (
    <>    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/create" element={<CreateMain/>} />
      <Route path="/:accelareaderId" element={<ViewMain/>} />
      <Route path="edit/:accelareaderId" element={<CreateMain/>} />

    </Routes>
    </>

  );
}

export default Main;
