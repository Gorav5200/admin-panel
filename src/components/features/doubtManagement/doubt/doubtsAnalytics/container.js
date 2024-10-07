import React from "react";
import Study from "./study";
import User from "./user";
import Hours from "./hours";
import Navbar from "./navbar";
import Analytic from "./analytic";
import Exam from "./exam";

const Container = () => {
  return (
    <>
      <div className=" flex  space-x-7 m-6">
        <Study />
        <User />
      </div>
      <div className="p-1 , m-3 rounded-md border border-r-emerald-50">
        <Hours />
      </div>
      <div className="p-1 , m-3 rounded-md border border-r-emerald-50">
        <Navbar />
        <Analytic />
      </div>
      <div className="p-1 , m-3 rounded-md border border-r-emerald-50 pb-10">
        <Exam />
      </div>
    </>
  );
};

export default Container;
