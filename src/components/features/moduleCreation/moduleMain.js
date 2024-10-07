import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateMain from "./createModule/createMain";
import Home from "./home";
import DetailMain from "./detail/detailMain";

function ModuleMain() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create" element={<CreateMain />} />
        <Route path="/:moduleId/edit" element={<CreateMain />} />
        <Route path="/:moduleId" element={<DetailMain />} />
      </Routes>
    </>
  );
}

export default ModuleMain;
