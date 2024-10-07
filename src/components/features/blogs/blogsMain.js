import React from "react";
import { Routes, Route } from "react-router-dom";
import DetailMain from "./detail/detailMain";
import CreateMain from "./create/createMain";
import Main from "./home/homeMain";


function BlogsMain() {
  return (
    <>    
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/detail/:blogId" element={<DetailMain/>} />
      <Route path="/create" element={<CreateMain/>} />
      <Route path="/edit/:blogId" element={<CreateMain/>} />
    </Routes>
    </>

  );
}

export default BlogsMain;
