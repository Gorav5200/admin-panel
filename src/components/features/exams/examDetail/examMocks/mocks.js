import React from "react";
import { Routes, Route } from "react-router-dom";
import MockList from "./mockList/mockList";
import MockDetail from "./mockDetail/mockDetail";
import CreatePackage from "./mockTestPackage/createPackage/createPackage";
import ViewPackage from "./mockTestPackage/viewPackage.js/page";
import QuestionDetailView from "./mockTestPackage/viewPackage.js/questionDetailView";
import EditPackage from "./mockTestPackage/createPackage/editPackage";

import CreateMain from "./create/createMain";
import Preview from "./create/preview/preview";
import MockDetails from "./mockDetail/mockDetail";

function Mocks() {
  return (
    <Routes>
      <Route path="/" element={<MockList />} />
      <Route path="/create" element={<CreateMain />} />
      <Route path="/:mockId/edit" element={<CreateMain />} />
      <Route path="/:mockId" element={<MockDetail />} />

      <Route path="/preview" element={<Preview />} />
      <Route path="/preview/:mockId" element={<Preview />} />

      <Route path="/:mockId" element={<MockDetails />} />

      <Route path="/package/create" element={<CreatePackage />} />
      <Route path="/package/edit/:packageId" element={<EditPackage />} />
      <Route path="/package/view/:packageId" element={<ViewPackage />} />
    </Routes>
  );
}

export default Mocks;
