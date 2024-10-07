import { Html } from "@mui/icons-material";
import {Empty, Image } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { HTMLConverter } from "../../../../../../services/common";
import { Avatar } from "@mui/material";

const Eligibility = () => {
  const { viewDetails } = useSelector((state) => state.examSpecification);

  return (
    <div className="h-[80vh]">
      <div className="flex p-2">
        <div className="overflow-y-scroll p-2 h-[calc(100%-10%)]">
         <HTMLConverter>
          {viewDetails?.eligibility}
         </HTMLConverter>
        </div>
      
      </div>

    
    </div>
  );
};

export default Eligibility;
