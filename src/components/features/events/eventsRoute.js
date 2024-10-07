import React from "react";
import { Routes, Route } from "react-router-dom";
import Create from "./create";
import HomePage from "./homePage";


function BlogsMain() {
  return (
    <>    
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/create" element={<Create/>} />
      <Route path="/edit/:eventId" element={<Create/>} />
    </Routes>
    </>

  );
}

export default BlogsMain;
