import React from "react";
import { Routes, Route } from "react-router-dom";
import ClassHome from "./classHome";
import ClassDetail from "./detail/classDetail";
import ClassStart from "./detail/classStart";
import LiveClass from "./detail/liveClass";
import CompleteClass from "./detail/completeClass";
import CreateMain from "./createClass/main";
function ClassMain() {
  return (
    <Routes>
      <Route path="/*" element={<ClassHome />} />
      <Route path="/create" element={<CreateMain />} />
      <Route path="/:classId/edit" element={<CreateMain />} />
      <Route path="/:classId/detail" element={<ClassDetail />} />
      <Route path="/:classId/start" element={<ClassStart />} />
      <Route path="/:classId/live" element={<LiveClass />} />
      <Route path="/:classId/complete" element={<CompleteClass />} />
    </Routes>
  );
}

export default ClassMain;
