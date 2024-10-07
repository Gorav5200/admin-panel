import React from "react";
import { Routes, Route } from "react-router-dom";
import GroupHome from "./groupHome";
import CreateGroupMain from "./group/createGroupMain";

function GroupMain() {
  return (
    <Routes>
      <Route path="/" element={<GroupHome />} />
      <Route path="/:groupId" element={<CreateGroupMain />} />
    </Routes>
  );
}

export default GroupMain;
