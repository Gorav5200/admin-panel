import React from "react";
import { Routes, Route } from "react-router-dom";
import Instruction from "./instruction";
import CreateInstruction from "./createInstruction";

function EntityTypeMain() {
  return (
    <Routes>
      <Route path="/" element={<Instruction/>} />
      <Route path="create" element={<CreateInstruction/>} />
    </Routes>
  );
}

export default EntityTypeMain;
