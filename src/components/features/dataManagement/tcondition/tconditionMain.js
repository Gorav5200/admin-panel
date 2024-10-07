import React from "react";
import { Routes, Route } from "react-router-dom";

import Tcondition from "./tcondition";
import CreateTcondition from "./createTcondition";

function TconditionMain() {
  return (
    <Routes>
      <Route path="/" element={<Tcondition />} />
      <Route path="create" element={<CreateTcondition />} />
    </Routes>
  );
}

export default TconditionMain;
