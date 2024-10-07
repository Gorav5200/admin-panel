import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import PackageCreate from "../dailyQuiz/package/packageCreate";
import PackageDetail from "./package/packageDetail";
import CreateMain from "./createDailyQuiz/createMain";
import Preview from "./createDailyQuiz/preview/preview";
import DailyQuizDetail from "./detail/dailyQuizDetail";

function DailyQuizMain() {
  return (
    <>    
    {/* <Header content={"Learn"}/> */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="package/create" element={<PackageCreate/>}/>
       <Route path="package/:packageId" element={<PackageDetail/>} />
      <Route path="/create" element={<CreateMain/> } />
      <Route path="/edit/:quizId" element={<CreateMain/> } />
      <Route path="/preview" element={<Preview/>} />{/*this is for while creating a daily-quiz*/}
       <Route path="/preview/:quizId" element={<Preview/>} />  {/*This route for detail pre-view while view the detail*/}
       <Route path="/:quizId" element={<DailyQuizDetail/>} />
      


    </Routes>
    </>

  );
}

export default DailyQuizMain;
