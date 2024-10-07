import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeMain from "./home/homeMain";

function Courses() {
  return (
    <Routes>
      <Route path="/" element={<HomeMain />} />
    </Routes>
  );
}

export default Courses;
