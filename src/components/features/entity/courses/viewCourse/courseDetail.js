import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HTMLConverter,
  dateFormatting,
} from "../../../../../services/common";
import { Image } from "antd";
import { Eye } from "lucide-react";
import {Chip } from "@mui/material";

function CourseDetail() {
  const {viewDetail} = useSelector((state) => state.courses);
 
  return (
    <div className="flex flex-row-reverse  justify-between w-full p-3 ">
      <div className="h-[150px] w-[150px] rounded-full border-red-100 overflow-hidden text-center">
        <Image
          src={viewDetail?.image}
          width={"100%"}
          height={"100%"}
          alt="no_image_found"
          className="rounded-md"
          zIndex={1300}
          preview={{
            mask: (
              <div className="flex gap-1 items-center font-inter">
                <span role="img" aria-label="camera">
                  <Eye size={15} />
                </span>{" "}
                View
              </div>
            ),
            maskStyle: {
              border: "1px solid red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            zIndex: 1200,
          }}
        />
      </div>
      <div className="text-sm font-inter p-3 pt-0 basis-4/6">
        <ul className="leading-9 mt-3">
          {[
            { heading: "Name", value: viewDetail?.title || "N/A" },
            {
              heading: "Price",
              value: viewDetail?.price || "null",
            },
            {
              heading: "Entity",
              value: viewDetail?.entityId?.title || "N/A",
            },
            {
              heading: "Entity Types",
              value: (
                <div className="flex gap-3 items-center pt-1">
                  {viewDetail?.entityTypes?.map(({ _id, title }) => (
                    <Chip key={_id} label={title} size="small" />
                  ))}
                </div>
              ),
            },
            {
              heading: "Start Date",
              value: dateFormatting(viewDetail?.startDate).date || "null",
            },
            {
              heading: "Expiry Date",
              value: dateFormatting(viewDetail?.endDate).date || "null",
            },
            {
              heading: "Course Type",
              value: viewDetail?.courseType
            },
            {
              heading: "Tax",
              value: viewDetail?.taxPercentage + "%" || "N/A",
            },
            {
              heading: "Package Highlights",
              value:
                <HTMLConverter>{viewDetail?.highlights}</HTMLConverter> ||
                "null",
            },
          ].map((item) => (
            <li className="flex">
              <h6 className="basis-1/4 text-[#455564] ">{item.heading}:</h6>
              {Array.isArray(item.value) ? (
                <ul className="list-disc font-bold pl-3">
                  {item.value.map((itemValue, index) => (
                    <li key={index}>
                      <HTMLConverter>{itemValue} </HTMLConverter>{" "}
                    </li>
                  ))}
                </ul>
              ) : (
                <h6 className="font-bold">{item.value}</h6>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CourseDetail;
