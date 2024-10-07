import React from "react";
import { Route, Routes } from "react-router-dom";
import ClassMain from "./class/classMain";
import NestedDrawer from "../../common/nestedDrawer";
import Courses from "./courses/courses";

function EntityMain() {
  return (
    <div className="h-screen">
      <NestedDrawer>
        <Routes>
          <Route path=":entityId/course/*" element={<Courses/>} />
          <Route path=":entityId/class/*" element={<ClassMain />} />
        </Routes>
      </NestedDrawer>
    </div>
  );
}

export default EntityMain;
