// question bank sample

import React from "react";
import { Routes, Route ,useParams} from "react-router-dom";
import Summary from "./examSpecifications/examSummary/summary";
import QuestionBank from "./examQuestionBank/questionMain";
import Practice from "./examPractice/practice";
import Mocks from "./examMocks/mocks";
import Learn from "./examLearn/learn";
import Courses from "./examCourses/courses";
import Challanges from "./examChallenges/challanges";
import GroupMain from "./examGroups/groupMain";
import ClassMain from "./examClasses/classMain";
import SpecificatioMain from "./examSpecifications/specificationMain";
import SummaryMain from "./examSpecifications/examSummary/main";
function ExamDetailMain() {
  const params=useParams();
  
  console.log("paraams exam detail", params);
  return (
    <Routes>
      <Route path="/summary" element={<SummaryMain />} />
      
      <Route path="challenges" element={<Challanges />} />
      <Route path="class/*" element={<ClassMain />} />
      <Route path="courses/*" element={<Courses />} />
      <Route path="learn" element={<Learn />} />
      <Route path="mocks/*" element={<Mocks />} />
      <Route path="groups/*" element={<GroupMain />} />
      <Route path="practice" element={<Practice />} />
      <Route path="qbank/*" element={<QuestionBank />} />
      <Route path="specification/*" element={<SpecificatioMain />} />
    </Routes>
  );
}

export default ExamDetailMain;
