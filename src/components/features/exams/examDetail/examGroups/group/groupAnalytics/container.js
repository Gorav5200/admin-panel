import React from "react";
import GroupPerformance from "./groupPerformance";
import Activity from "./activity";
import Challenge from "./challenge";
import Doubts from "./doubts";
import Navbars from "./navbars";
import Analytic from "./analytic";
import Years from "./years";

const Container = () => {
  return (
    <>
      <div className=" flex space-x-7 m-6">
        <GroupPerformance />
        <Activity />
      </div>
      <div className=" flex space-x-7 m-6">
        <Challenge />
        <Doubts />
      </div>
      <div className="p-1 , m-3 rounded-md border border-r-emerald-50">
        <Navbars />
        <Analytic />
      </div>
      <div
        className="p-2 m-3 rounded-md border border-#ebeded-50"
        style={{ height: "590px" }}
      >
        <Years />
        {/* <Counter /> */}
      </div>
    </>
  );
};

export default Container;
