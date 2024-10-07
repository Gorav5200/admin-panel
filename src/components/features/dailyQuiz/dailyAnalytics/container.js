import React from "react";
import Revenue from "./revenue";
import Sales from "./sales";
import Growth from "./growth";
import Type from "./type";
import Engagement from "./engagement";
import Participation from "./participation";
import Navbar from "./navbar";
import Analytic from "./analytic";
import Age from "./age";

const Container = () => {
  return (
    <>
      <div className=" flex space-x-7 m-6" style={{ width: "1330px" }}>
        <Revenue />
        <Sales />
      </div>
      <div className=" flex space-x-7 m-6" style={{ width: "1350px" }}>
        <Growth />
        <Type />
      </div>
      <div className=" flex space-x-7 m-6" style={{ width: "1340px" }}>
        <Participation />
        <Engagement />
      </div>
      <div className="p-1 , m-3 rounded-md border border-r-emerald-50">
        <Navbar />
        <Analytic />
      </div>
      <div
        className="p-2 m-3 rounded-md border border-#ebeded-50"
        style={{ height: "590px" }}
      >
        <Age />
      </div>
    </>
  );
};

export default Container;
