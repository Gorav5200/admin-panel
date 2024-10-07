import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeMain from "./home/homeMain";
import ViewMain from "./viewCourse/viewMain";
import CreateMain from "./createCourse/createMain";

function Courses() {
  return (
    <Routes>
      <Route path="/" element={<HomeMain />} />
      <Route path=":courseId/view" element={<ViewMain />} />
      <Route path="/create" element={<CreateMain/>} />
      <Route path=":courseId/edit" element={<CreateMain/>} />
     
    </Routes>
  );
}

export default Courses;
