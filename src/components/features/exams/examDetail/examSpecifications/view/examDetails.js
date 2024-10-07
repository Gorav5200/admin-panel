import React, { useEffect } from "react";
import { Avatar, Divider } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { useSelector } from "react-redux";
import { useState } from "react";
import { HTMLConverter } from "../../../../../../services/common";

const ExamDetails = () => {
  const [examDetail, setExamDetail] = useState({});
  const { viewDetails } = useSelector((state) => state.examSpecification);

  useEffect(() => {

    setExamDetail(viewDetails?.examDetail);
  }, [viewDetails]);

  return (
    <React.Fragment>
      <div className="h-[80vh] flex justify-between p-2">
        <div className=" basis-[80%]">
          <div className="p-3">
            <p className=" text-sm font-inter text-gray-700">
            <HTMLConverter>
            {examDetail?.description}
            </HTMLConverter> 
            </p>
          </div>

          <div className="p-2 ">
            <h6 className=" text-base text-gray-700 font-semibold p-2">
              {examDetail?.title}
            </h6>

            <div className="h-[75vh] overflow-y-scroll  mt-4  scroll-smooth">
              <Timeline
                sx={{
                  // bgColor: "#336792",
                  width: "100%",
                  [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0,
                  },
                }}
              >
                {examDetail?.timeline?.map((item, ind) => (
                  <TimelineItem key={ind}>
                    <TimelineSeparator>
                      <TimelineDot sx={{ bgcolor: "#336792" }} />
                      {ind !== examDetail.timeline.length - 1 && (
                        <TimelineConnector sx={{ bgcolor: "#336792" }}>
                          <Divider />
                        </TimelineConnector>
                      )}
                    </TimelineSeparator>
                    <TimelineContent>
                      <div className="flex w-6/6 items-start mb-5 gap-20">
                        <p className=" text-sm font-bold ">{item.value}</p>
                        <p className=" text-sm font-normal ">{item.label}</p>
                      </div>

                      <Divider />
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
          </div>
        </div>

        <div className="p-1 basis-[20%] h-[40vh] flex justify-center">
          <Avatar
            src="https://images.pexels.com/photos/951408/pexels-photo-951408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            style={{
              borderRadius: "50%",
              width: 130,
              height: 130,
              // optional: adds a smooth transition effect
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ExamDetails;
