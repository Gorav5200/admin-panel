import React from "react";
import { Routes, Route } from "react-router-dom";
import Subject from "./subject";
import CreateSubject from "./createSubject";

function SubjectMain() {
  return (
    <Routes>
      <Route path="/" element={<Subject/>} />
      <Route path="create" element={<CreateSubject/>} />
      </Routes>
  );
}

export default SubjectMain;