import React from "react";
import Product from "./product";
import Revenue from "./revenue";
import Cources from "./cources";
import Mock from "./mock";
import Learn from "./learn";
import Groups from "./groups";
import Coins from "./coins";
import Express from "./express";
import ExamList from "./examList";

const Container = () => {
  return (
    <>
      <div>
        <h1 className="m-5 space-x-9 text-lg font-bold">SALES OVERVIEW</h1>
        <div className=" flex space-x-7 m-6">
          <Product />
          <Revenue />
        </div>
      </div>
      <div>
        <h1 className="m-5 space-x-9 text-lg font-bold">MODULE OVERVIEW</h1>

        <div className=" flex space-x-7 m-6">
          <Cources />
          <Mock />
        </div>
        <div className=" flex space-x-7 m-6">
          <Learn />
          <Groups />
        </div>
      </div>
      <div>
        <h1 className="m-5 space-x-9 text-lg font-bold">COINS SALES</h1>

        <div className=" flex space-x-7 m-6">
          <Coins />
          <Express />
        </div>
      </div>
      <div className="p-1 , m-3 rounded-md border border-r-emerald-50">
        <h1 className="m-5 space-x-9 text-lg font-bold">Exam Wise Breakdown</h1>
        <ExamList />
      </div>
    </>
  );
};

export default Container;
