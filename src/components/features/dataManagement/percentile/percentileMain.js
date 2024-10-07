import React from "react";
import { Routes, Route } from "react-router-dom";
import Percentile from "./percentile";
import CreatePercentile from "./createPercentile";

function EntityTypeMain() {
  return (
    <Routes>
      <Route path="/" element={<Percentile/>} />
      <Route path="create" element={<CreatePercentile/>} />
    </Routes>
  );
}

export default EntityTypeMain;
