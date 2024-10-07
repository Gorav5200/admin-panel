import React from "react";
import { Routes, Route } from "react-router-dom";
import HerarchyGraph from "./summary";

function SummaryMain() {
  return (
    <Routes>
      <Route path="/" element={<HerarchyGraph/>} />
    </Routes>
  );
}

export default SummaryMain;
