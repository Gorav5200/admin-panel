import React from "react";
import RevenueTrend from "./revenueTrend";
import SalesTrend from "./salesTrend";
import Growth from "./growth";
import Types from "./types";
import Participations from "./participations";
import Engagements from "./engagements";
import Navbars from "./navbars";
import Analytic from "./analytic";
import Year from "./year";

const Container = () => {
  return (
    <>
      <div className=" flex space-x-7 m-6">
        <RevenueTrend />
        <SalesTrend />
      </div>
      <div className=" flex space-x-7 m-6">
        <Growth />
        <Types />
      </div>
      <div className=" flex space-x-7 m-6">
        <Participations />
        <Engagements />
      </div>
      <div className="p-1 , m-3 rounded-md border border-r-emerald-50">
        <Navbars />
        <Analytic />
      </div>
      <div
        className="p-2 m-3 rounded-md border border-#ebeded-50"
        style={{ height: "590px" }}
      >
        <Year />
        {/* <Counting /> */}
      </div>
    </>
  );
};

export default Container;
