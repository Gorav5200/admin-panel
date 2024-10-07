import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import PackageCreate from "./package/packageCreate";
import PackageDetail from "./package/packageDetail";
import CreateMain from "./createPracticeQA/createMain"
import DetailMain from "./practiceQaDetail/detailMain"
function AssignmentMain() {
  return (
    <>    
    {/* <Header content={"Learn"}/> */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="package/create" element={<PackageCreate/>}/>
      <Route path="package/:packageId" element={<PackageDetail/>} />
      <Route path="/create" element={<CreateMain/> } />
      <Route path="/edit/:practiceId" element={<CreateMain/>  } />
      <Route path="/detail/:practiceId" element={<DetailMain/>  } />
    </Routes>
    </>

  );
}

export default AssignmentMain;
