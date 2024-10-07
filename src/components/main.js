import React from "react";
import { Routes, Route,useParams, useLocation } from "react-router-dom";
import MiniDrawer from "./common/Drawer";
import UserMain from "./features/userManagement/userMain";
import FaqMain from "./features/faq/faqMain";
import Index from "./features/doubtManagement";
import SalesMain from "./features/sales/main";
import ExamMain from "./features/exams/examsMain";
import DataManagementMain from "./features/dataManagement/dataManagementMain";
import isUserLoggedIn from "./features/authentication/isLoggedIn";
import { useDispatch } from "react-redux";
import EntityMain from "./features/entity/entityMain";
import RewardsMain from "./features/rewards/rewardsMain";
import BlogsMain from "./features/blogs/blogsMain";
import EventsRoute from "./features/events/eventsRoute";
import DailyStreakRoutes from "./features/dailyStreak/dailyStreakRoutes";
import VideoBankMain from "./features/videoBank/VideoBankRoutes";
import InterestMain from "./features/interestGroups.js/interestMain";

function Main() {
  const params=useParams();
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  //console.log("exam main========>>>>>>>>", pathname)
  return (
    <div className="relative">
     <MiniDrawer />
      <div className="absolute top-0 right-0 left-16 p-1  bg-medGrey ">
        <Routes>

          <Route path="exam/*" element={<ExamMain/>} />
          <Route path="rewards/*" element={<RewardsMain/>} />
          <Route path="interest/groups/*" element={<InterestMain/>} />
          <Route path="entity/*" element={<EntityMain/>} />
          <Route path="data/*" element={<DataManagementMain/>} />
          <Route path="user/*" element={<UserMain />} />
          <Route path="faq/*" element={<FaqMain/>} />
          <Route path="doubt/*" element={<Index/>} />
          <Route path="sales/*" element={<SalesMain/>} />
          <Route path="blogs/*" element={<BlogsMain/>} />
          <Route path="events/*" element={<EventsRoute/>} />
          <Route path="dailyStreak/*" element={<DailyStreakRoutes/>} />
          <Route path="video/bank/*" element={<VideoBankMain/>} />
          
        </Routes>
      </div>
    </div>
  );
}

export default isUserLoggedIn(Main);
