import React from "react";

import ScreenHeader from "./Screen1/ScreenHeader";
import Screen1 from "./Screen1/Screen1";
import MiniBox1 from "./Box/MiniBox1";
import MiniBox2 from "./Box/MiniBox2";
import Analytics from "./Analytics/Analytics";
import AnalyticsNav from "./Analytics/AnalyticsNav";
import AnalyticsAge from "./AnalyticsAge/AnalyticsAge";

const Container = () => {
  return (
    <>
      <div
        className="relative p-3 m-3 bg-white border rounded-md border-r-emerald-50 h-96"
        style={{ height: "410px" }}
      >
        <ScreenHeader />
        <Screen1 />
      </div>

      <div className=" flex m-3 ">
        <MiniBox1 />
        <MiniBox2 />
      </div>

      <div className="p-1 , m-3 rounded-md border border-r-emerald-50">
        <AnalyticsNav />
        <Analytics />
      </div>

      <div
        className="p-2 m-3 rounded-md border border-#ebeded-50"
        style={{ height: "580px" }}
      >
        <AnalyticsAge />
      </div>
    </>
  );
};

export default Container;
