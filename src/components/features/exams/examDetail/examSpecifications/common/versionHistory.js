import React, { useState } from "react";
import Switch from "@mui/joy/Switch";
import { Dot } from "lucide-react";

import { MoreHorizontal } from "lucide-react";

const CollegeVersion = () => {
  const [checked, setChecked] = useState(false);

  const [selectedBox, setSelectedBox] = useState(null);

  const handleBoxClick = (index) => {
    setSelectedBox(selectedBox === index ? null : index);
    alert(index);
  };

  return (
    <div className=" p-2 ">
      <div className=" bg-white p-2   border rounded-md w-[25%]">
        <h6 className=" text-base p-2  font-semibold">Version History</h6>
        <div className=" p-2 flex justify-between">
          <h6 className=" text-xs text-[#808080] font-semibold ">
            Show only name versions
          </h6>
          <Switch
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
          />
        </div>
        <div className="scrollHedden overflow-y-scroll h-[75vh] mt-4">
          {[...Array(20)].map((ele, index) => {
            return (
              <div
                className={`p-1 border rounded-md mt-2 w-[100%] ${
                  selectedBox === index ? "border-black" : "border-[#f2f2f2]"
                }`}
                key={index}
                onClick={() => handleBoxClick(index)}
              >
                <div className="p-2 flex justify-between">
                  <h6 className="text-lg font-semibold">5 Jun’ 21, 9:30am</h6>
                  <MoreHorizontal />
                </div>
                <p className="p-1 text-sm">Current version</p>
                <div className="p-1 flex justify-between text-sm items-center">
                  <p className="text-xs flex items-center">
                    <Dot size={40} color="#5146D6" /> Dev Patel
                  </p>
                  <p className="text-xs">Changes Unpublished</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CollegeVersion;
