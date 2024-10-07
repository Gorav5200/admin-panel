import React from "react";
import { Routes, Route } from "react-router-dom";
import Entity from "./entity";

function EntityMain() {
  return (
    <Routes>
      <Route path="/" element={<Entity />} />
    </Routes>
  );
}

export default EntityMain;
