import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import PackageCreate from "./package/packageCreate";
import PackageDetail from "./package/packageDetail";
import CreateMain from "./createAssignment/createMain";
import DetailMain from "./assignmentDetail/detailMain";
import MainCreate from "./createAssignment/createMain";

function AssignmentMain() {
  return (
    <>    
    {/* <Header content={"Learn"}/> */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="package/create" element={<PackageCreate/>}/>
      <Route path="package/:packageId" element={<PackageDetail/>} />
      <Route path="/create" element={<MainCreate/>  } />
      <Route path="/edit/:assignmentId" element={<MainCreate/>  } />
      <Route path="/detail/:assignmentId" element={<DetailMain/>  } />
    </Routes>
    </>

  );
}

export default AssignmentMain;
