import React from "react";
import { Routes, Route } from "react-router-dom";
import ClassHome from "./classHome";

function ClassMain() {
  return (
    <Routes>
      <Route path="/*" element={<ClassHome />} />
    </Routes>
  );
}

export default ClassMain;
