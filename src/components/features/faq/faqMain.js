import React from "react";
import { Routes, Route } from "react-router-dom";
import FaqList from "./faqList";

import FAQ from "./faq";

function FaqMain() {
  return (
    <Routes>
      <Route path="/" element={<FaqList/>} />
      <Route path="create" element={<FAQ/>} />
      <Route path="/edit/:id" element={<FAQ/>} />
    </Routes>
  );
}

export default FaqMain;
