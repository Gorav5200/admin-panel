// question bank sample

import React from "react";
import { Routes, Route } from "react-router-dom";
import Promotion from "./promotion";
import HomePage from "./homePage";
import Schedule from "./schedule";

function SalesMain() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/schedule" element={<Schedule />} />
    </Routes>
  );
}

export default SalesMain;
