import React from "react";
import { Routes, Route } from "react-router-dom";
import Specifications from "./home/specifications";
import CreateMain from "./create/createMain";

function SpecificatioMain() {
  return (
    <Routes>
      <Route path="/" element={<Specifications/>} />
      <Route path="/:type" element={<CreateMain/>} />
     
 
     
    </Routes>
  );
}

export default SpecificatioMain;
