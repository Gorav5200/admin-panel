// question bank sample
import React from "react";
import { Routes, Route, useParams, useLocation, Stat } from "react-router-dom";
import NestedDrawer from "../../common/nestedDrawer";
import ExamDetailMain from "./examDetail/examDetailMain";
import { useGetEntityTypeListQuery } from "../../../services/apis/dataManagement/entityType";
import { entityTypeApi } from "../../../services/Constant";
import ExamList from "./examList/examList";
import LearnMain from "../learn/learnMain";
import PastPapers from "../pastPapers/pastPapersMain";
import PracticeQaMain from "../practiceQa/practiceQaMain";
import AssigmentMain from "../assignments/assigmentMain";
import DailyQuizMain from "../dailyQuiz/dailyQuizMain";
import ModuleMain from "../moduleCreation/moduleMain";
import Main from "./accelareader/main";

function ExamMain() {
  const {
    data: entityTypeList,
    isLoading,
    isError,
    refetch,
  } = useGetEntityTypeListQuery(entityTypeApi.endPoint, {
    refetchOnMountOrArgChange: true,
  });


  console.log("entityTypeLisy:",entityTypeList);


  

  return (
    <>
     
          <NestedDrawer  >
            <div className="h-screen">
              <Routes>
                <Route path="learn/*" element={<LearnMain/>} />
                <Route path="dailyQuiz/*" element={<DailyQuizMain/>} />
                <Route path="pastPapers/*" element={<PastPapers/>} />
                <Route path="assignment/*" element={<AssigmentMain/>} />
                <Route path="practiceQa/*" element={<PracticeQaMain/>} />
                <Route path="/:examId/*" element={<ExamDetailMain />} />
                <Route path="/module/*" element={<ModuleMain/>} />
                <Route path="/accelareader/*" element={<Main/>} />
                <Route path="/" element={<ExamList examList={entityTypeList?.data || []} />} />
              </Routes>
            </div>
          </NestedDrawer>

    </>
  );
}

export default ExamMain;
