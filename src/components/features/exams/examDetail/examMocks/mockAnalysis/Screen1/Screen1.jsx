import React from "react";
import Graph from "../Graph";

const Screen1 = () => {
  return (
    <>
      <div className="flex justify-between -mt-3  p-4 ">
        <div className="flex p-2  w-1/5">
          <div className="p-2 flex flex-col">
            <div className="p-1">
              <h3 className="font-bold text-xl">11780</h3>
              <p>Total users</p>
            </div>
            <div className="p-1 mt-5">
              <h3 className="font-bold text-xl">7780</h3>
              <p>Total New users</p>
            </div>
          </div>
        </div>
        <div className="p-1 w-full h-96">
          <Graph />
        </div>
      </div>
    </>
  );
};

export default Screen1;
