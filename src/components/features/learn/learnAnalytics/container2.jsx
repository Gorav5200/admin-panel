import React from "react";
import Revenue from "./revenue";
import Sales from "./sales";
import UserGrowth from "./userGrowth";
import UserType from "./userType";
import UserParticipation from "./userParticipation";
import UserEngagement from "./userEngagement";
import AnalyticsNavbar from "./analyticsnavbar";
import Analytical from "./analytical";
import AnalyticAges from "./analyticAges";

const Container2 = () => {
  return (
    <>
      <div className=" flex space-x-7 m-6">
        <Revenue />
        <Sales />
      </div>

      <div className=" flex space-x-7 m-6">
        <UserGrowth />
        <UserType />
      </div>
      <div className=" flex space-x-7 m-6">
        <UserParticipation />
        <UserEngagement />
      </div>
      <div className="p-1 , m-3 rounded-md border border-r-emerald-50">
        <AnalyticsNavbar />
        <Analytical />
      </div>
      <div
        className="p-2 m-3 rounded-md border border-#ebeded-50"
        style={{ height: "590px" }}
      >
        <AnalyticAges />
      </div>
    </>
  );
};

export default Container2;
