import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HTMLConverter, dateFormatting } from "../../../../../services/common";
import { useDispatch } from "react-redux";

function WhyIquanta() {
  const dispatch = useDispatch();
  const { viewDetail } = useSelector((state) => state.courses);

  const [data, setData] = useState({});

  useEffect(() => {
    if (viewDetail) {
      setData(viewDetail?.whyUs.data);
    }
  }, [viewDetail]);

  console.log("data  of  why iquanta", data);

  return (
    <div className="text-sm font-inter p-3 pt-0 my-8 w-5/6 text-justify leading-10">
      <HTMLConverter className="whitespace-pre-wrap">
        {data || "N/A"}
      </HTMLConverter>
    </div>
  );
}

export default WhyIquanta;
