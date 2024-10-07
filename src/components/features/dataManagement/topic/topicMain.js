import React from "react";
import { Routes, Route } from "react-router-dom";
import Topic from "./topic";
import CreateTopic from "./createTopic";

function TopicMain() {
  return (
    <Routes>
      <Route path="/" element={<Topic/>} />
      <Route path="create" element={<CreateTopic/>} />
      </Routes>
  );
}

export default TopicMain;
