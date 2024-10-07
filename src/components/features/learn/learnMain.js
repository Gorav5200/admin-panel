import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Header from "../../common/header";
import CreateMain from "./createLearnTopics/createMain";
import PackageCreate from "./package/packageCreate";
import LearnDetail from "./learnTopicsdetail/learnDetail";
import PackageDetail from "./package/packageDetail";
function LearnMain() {
  return (
    <>    
    {/* <Header content={"Learn"}/> */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateMain/>} />
      <Route path=":learnId/edit" element={<CreateMain/>} />
      <Route path="detail/:learnId" element={<LearnDetail/>} />
      <Route path="package/create" element={<PackageCreate/>} />
      <Route path="package/:packageId" element={<PackageDetail/>} />
    
    </Routes>
    </>

  );
}

export default LearnMain;
