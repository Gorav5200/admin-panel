import React, { useEffect, useState } from "react";
import Header from "../../../../../common/header";
import { useNavigate, useParams } from "react-router-dom";
import FullWidthTabs from "../../../../../common/tabChanger";
import Courses from "./courses";
import AnalyticMain from "../courses_analytic/analyticMain";
import { useSelector } from "react-redux";
function HomeMain() {
const {activeEntityTitle} = useSelector(state => state.drawer)
  return (
    <div className="h-screen">
      <Header content={`${activeEntityTitle} Courses`} />
      <div className="bg-white p-3 m-2 rounded-md ">
        <FullWidthTabs
          data={[
            {
              item: 1,
              label: "Courses Analytics ",
              content: <AnalyticMain />,
            },
            {
              item: 2,
              label: "Courses",
              content: <Courses />,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default HomeMain;
