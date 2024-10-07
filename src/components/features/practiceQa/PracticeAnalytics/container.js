import React from "react";
import Revenues from "./revenues";
import Trends from "./trends";
import UserGrowths from "./userGrowths";
import UserTypes from "./userTypes";
import Participation from "./participation";
import Engagement from "./engagement";
import Navbar from "./navbar";
import Analyticals from "./analyticals";
import Ages from "./ages";

const Container = () => {
  return (
    <>
      <div className=" flex space-x-7 m-6">
        <Revenues />
        <Trends />
      </div>

      <div className=" flex space-x-7 m-6">
        <UserGrowths />
        <UserTypes />
      </div>
      <div className=" flex space-x-7 m-6">
        <Participation />
        <Engagement />
      </div>

      <div className="p-1 , m-3 rounded-md border border-r-emerald-50">
        <Navbar />
        <Analyticals />
      </div>
      <div
        className="p-2 m-3 rounded-md border border-#ebeded-50"
        style={{ height: "590px" }}
      >
        <Ages />
        {/* <Count /> */}
      </div>
    </>
  );
};

export default Container;
