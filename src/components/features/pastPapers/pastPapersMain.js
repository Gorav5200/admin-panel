import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import CreateMain from "./create/createMain";
import Preview from "./create/preview/preview";
import PastPaperDetail from "./detail/pastPaperDetail";
import PackageDetail from "./package/packageDetail";
import PackageCreate from "./package/packageCreate";

function PastPapersMain() {
  return (
    <>    
    <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/create" element={<CreateMain/>} />
       <Route path="/edit/:paperId" element={<CreateMain/>} />
       <Route path="/preview" element={<Preview/>} />
       <Route path="/preview/:paperId" element={<Preview/>} />
       <Route path="/:paperId" element={<PastPaperDetail/>} />
       <Route path="package/create" element={<PackageCreate/>} />
       <Route path="package/:packageId" element={<PackageDetail/>} />
    </Routes>
    </>

  );
}

export default PastPapersMain;
