// question bank sample

import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./main";
import Doubt from "./doubt/doubtMain";
import Help from "./help/help";
import Report from "./report/report";

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="/" element={<Doubt />} />
        <Route path="help" element={<Help />} />
        <Route path="report" element={<Report />} />
      </Route>
    </Routes>
  );
}

export default Index;
