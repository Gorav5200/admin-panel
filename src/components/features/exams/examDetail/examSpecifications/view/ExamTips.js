import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HTMLConverter } from "../../../../../../services/common";
import { Avatar } from "@mui/material";

const ExamTips = () => {
  const { viewDetails } = useSelector((state) => state.examSpecification);

  return (
    <div className="flex p-4 h-[80vh] overflow-scroll">
      <HTMLConverter>{viewDetails.examTips}</HTMLConverter>

    </div>
  );
};

export default ExamTips;
