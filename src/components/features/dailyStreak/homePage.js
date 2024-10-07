import React, { useEffect, useState } from "react"; 
import PaginationTable from "../../common/PaginationTable";
import FullWidthTabs from "../../common/tabChanger";
import {
  CustomButton,
  ButtonStyle,
  CustomButtonStyle,
} from "../../../styles/muiRoot";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useGetDailyQuizPackageQuery,
  useGetDailyQuizQuery,
} from "../../../services/apis/dailyQuizApi";
import { dailyQuiz } from "../../../services/Constant";
import { useDispatch } from "react-redux";
import { resetDailyQuiz, setDailyQuiz } from "../../../ducks/dailyQuizSlice";
import { dailyQuizHeader, packageHeader } from "../../../services/constHeaders";
import SearchField from "../../common/searchField";
import Header from "../../common/header";
import Task from "./task/task";
import StreakTask from "./dailyStreakTask/streakTask";
import StreakReward from "./dailyStreakReward/streakReward";


function HomePage() {
 
  const tabsData = [
    {
      id: 1,
      label: "Task List",
      content:(
       <Task/>
      ) ,
    },
    {
      id: 2,
      label: "Daily Streak Task's List",
      content: (
       <StreakTask/>
      ),
    },
    {
      id: 3,
      label: "Daily Streak Reward List",
      content: (
        <StreakReward/>
      ),
    },
    
  ];

  

  return (
    <div className=" h-full p-2">
    <Header content={"Daily Streak"}/>
      <FullWidthTabs data={tabsData} />
    </div>
  );
}

export default HomePage;
