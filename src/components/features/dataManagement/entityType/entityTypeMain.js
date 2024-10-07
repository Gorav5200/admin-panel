import React from "react";
import { Routes, Route } from "react-router-dom";
import EntityType from "./entityType";
import CreateEntityType from "./createEntityType";

function EntityTypeMain() {
  return (
    <Routes>
      <Route path="/" element={<EntityType/>} />
      <Route path="create" element={<CreateEntityType/>} />
    </Routes>
  );
}

export default EntityTypeMain;
