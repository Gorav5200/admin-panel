import React from "react";
import { Routes, Route } from "react-router-dom";
import SubTopic from "./subTopic";
import CreateSubTopic from "./createSubTopic";

function SubTopicMain() {
  return (
    <Routes>
      <Route path="/" element={<SubTopic/>} />
      <Route path="create" element={<CreateSubTopic/>} />
      </Routes>
  );
}

export default SubTopicMain;
