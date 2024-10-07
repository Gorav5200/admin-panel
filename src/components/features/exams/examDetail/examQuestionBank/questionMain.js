// question bank sample

import React from "react";
import { Routes, Route } from "react-router-dom";
import QuestionBank from "./questionBank";
import CreateQuestion from "./createQuestion";
import QuestionDetail from "./questionDetail";
import EditQuestion from "./editQuestion";

function QuestionMain() {
  return (
    <Routes>
      <Route path="/create" element={<CreateQuestion />} />
      <Route path="/:qid/edit" element={<EditQuestion />} />
      <Route path="/:qid" element={<QuestionDetail />} />
      <Route path="/" element={<QuestionBank />} />
    </Routes>
  );
}

export default QuestionMain;
