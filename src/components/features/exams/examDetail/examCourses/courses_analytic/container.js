import React from "react";
import Tuser from "./tuser";
import Growth from "./growth";
import Sales from "./sales";
import Revenue from "./revenue";
import UserNavbar from "./userNavbar";
import UserAge from "./userAge";
import Work from "./work";

const Container = () => {
  return (
    <>
      <div className="flex space-x-7 m-6">
        <Tuser />
        <Growth />
      </div>
      <div className="flex space-x-7 m-6">
        <Sales />
        <Revenue />
      </div>
      <div className="p-1 , m-3 rounded-md border border-r-emerald-50">
        <UserNavbar />
        <UserAge />
      </div>
      <div
        className="p-2 m-3 rounded-md border border-#ebeded-50"
        style={{ height: "590px" }}
      >
        <Work />
        {/* <Count /> */}
      </div>
    </>
  );
};

export default Container;
