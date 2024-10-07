import React from "react";
import DonutBox from "./donutbox";
import Screen1 from "./screen1";
import MiniBox2 from "./minibox2";
import MiniBox3 from "./minibox3";
import AnalyticsNav1 from "./analyticsnav1";
import Analytics1 from "./analytics1";
import AnalyticAge1 from "./analyticage1";

const Container1 = () => {
  return (
    <>
      <div className="flex space-x-7 m-6">
        <DonutBox />
        <Screen1 />
      </div>
      <div className="flex space-x-7 m-6">
        <MiniBox2 />
        <MiniBox3 />
      </div>

      <div className="p-1 , m-3 rounded-md border border-r-emerald-50">
        <AnalyticsNav1 />
        <Analytics1 />
      </div>
      <div
        className="p-2 m-3 rounded-md border border-#ebeded-50"
        style={{ height: "590px" }}
      >
        <AnalyticAge1 />
      </div>
    </>
  );
};

export default Container1;
