import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Stack,
  CardContent,
  Card,
  IconButton,
  CardMedia,
  Chip,
  Divider,
  CardHeader,
} from "@mui/material";
import ReactQuill from "react-quill";
import SingleImageUpload from "../../../../common/singleImageUpload";
import TruncateText from "../../../../common/FunctionComponents/truncate";
import Icon from "../../../../common/Icon";
import {
  HTMLConverter,
  dateFormatting,
  truncateTitle,
} from "../../../../../services/common";
import dayjs from "dayjs";
import TimePickerComp from "../../../../common/timePicker";
import { LuUpload } from "react-icons/lu";
import { CustomButton, ButtonStyle } from "../../../../../styles/muiRoot";
import "../../../../../styles/videoCards.css";

import { ImportVideoModal } from "./videoModal";
import { Descriptions, Empty, Image } from "antd";

export function ConceptCard({ show, data, ...props }) {
  const { sequence, description, media, startTime, endTime, title } = data;

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          backgroundColor: "var(--med-grey)",
        }}
        justifyContent={"space-between"}
      >
        <h5 className="text-base font-bold p-2 bg-white rounded-t-md  border w-full ">
        {props.ind}. Concept 
        </h5>
      </Stack>
      <Card
        sx={{
          boxShadow: show === sequence ? 1 : "none",
          borderRadius: 0,
          minHeight: 210,
          border: "1.5px solid var(--med-grey)",
          borderTop: 0,
          maxHeight: 300,
          overflow: "scroll",
        }}
      >
        <Divider />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
            gap: 3,

            width: "100%",
            height: "auto",
            overflow: "scroll",
          }}
        >
          <div>
            <Descriptions
              layout="vertical"
              contentStyle={{
                color: "#636262",
                fontFamily: "var(--font-inter)",
              }}
              labelStyle={{
                fontFamily: "var(--font-inter)",
                color: "var(--dark-blue)",
              }}
              bordered
              items={[
                {
                  key: "1",
                  label: "Start Time",
                  children: <time>      {dayjs.utc(startTime).format("LT")}</time>,
                  span: 1,
                },
                {
                  key: "2",
                  label: "End Time",
                  children: <time>{dayjs.utc(endTime).format("LT")}</time>,
                  span: 1,
                },
                {
                  key: "3",
                  label: "Video Link",
                  children: (
                    <Chip
                      sx={{ borderRadius: 2, maxWidth: "30ch" }}
                      label={
                        <a
                          title={truncateTitle(
                            media?.find((e) => e?.type === "video")?.media
                          )}
                          target="_blank"
                          href={truncateTitle(
                            media?.find((e) => e?.type === "video")?.media || "#"
                          )}
                          rel="noopener noreferrer"
                        >
                          {truncateTitle(
                            media?.find((e) => e?.type === "video")?.media ||
                              "N/A",
                            3
                          )}
                        </a>
                      }
                    />
                  ),
                  span: 1,
                },
              ]}
            />
          </div>

          <div className="flex  justify-start items-start gap-5 ">
            <div className=" content-center h-auto">
              <Image
                className="rounded-md"
                preview={{ maskClassName: "rounded-md", zIndex: 1300 }}
                src={media?.find((e) => e?.type === "photo")?.media}
                width={150}
                height={150}
              />
            </div>
            <div>
              <h5 className="text-base font-bold ">{title}</h5>
              <HTMLConverter className="w-full text-justify">
                {description || <Empty description="Content Not Available" />}
              </HTMLConverter>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export function PracticeCard({ data, show, ...props }) {
  console.log("🚀 ~ PracticeCard ~ data:", data);

  return (
    <>
        {/* <Stack
          direction={"row"}
          sx={{
            backgroundColor: "var(--med-grey)",
          }}
          justifyContent={"space-between"}
        >
          <h5 className="text-base font-bold p-2 bg-medGrey ">Practice</h5>
        </Stack> */}

      <Card
        key={""}
        elevation={0}
        sx={{
          backgroundColor: "white",
          border: "1px solid #D9DBDD",

          width: "100%",
          minHeight: "242px",
          overflow: "scroll",
        }}
      >
        <Stack
          direction={"row"}
          position={"sticky"}
          top={0}
         sx={{background:"white", borderBottom:"1px solid var(--med-grey)"}}
          justifyContent={"space-between"}
        >
          <h5 className="text-base font-bold p-2">
          {props.ind}. Practice
          </h5>
          <h5 className="text-sm p-2  ">
            <Chip
              sx={{
                borderRadius: 2,
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
              }}
              label={data?.question?.qid}
            ></Chip>
            {/* {data.difficulty_level_manual.toUpperCase()} */}
          </h5>
        </Stack>
       
        <CardContent>
          <section className="text-left">
            <div className="flex justify-between items-center mb-2 ">
              <h5 className="font-medium font-inter text-base ">Question</h5>
              <div className="text-xs text-darkblue flex gap-2 items-center border p-1 rounded-md bg-medGrey">
                <h5 className="font-medium font-inter ">
                  Start Time :  {dayjs.utc(data?.startTime).format("LT")}
                </h5>
                <Divider orientation="vertical" flexItem />
                <h5 className="font-medium font-inter ">
                  End Time  {dayjs.utc(data.endTime).format("LT")}
                </h5>
              </div>
            </div>

            {
              <HTMLConverter className="text-justify">
                {data.question?.question}
              </HTMLConverter>
            }
          </section>
          <Divider />
          <div className="answer-section mt-2 text-left">
            <h5 className="font-medium font-inter text-base ">Answer:</h5>

            {data?.question?.options === null ? (
              <div className="my-2">
                <p className="text-sm text-black">{data?.question.answer}</p>
              </div>
            ) : (
              data.question?.options?.map((ans, index) => (
                <div className="flex gap-2 w-5/6 mt-2" key={index}>
                  <Card
                    sx={{
                      width: "max-content",
                      border: "1px solid #D6D7D9",
                      p: 1.5,
                      boxShadow: "none",
                    }}
                    // Add a key prop for each mapped item
                  >
                    <text variant="text">
                      {
                        <span className="text-primary font-medium px-1">
                          {String.fromCharCode(65 + index)}
                        </span>
                      }
                    </text>
                  </Card> 
                  <Card
                    sx={{
                      border:
                        ans === data.answer
                          ? "1px solid #24B670"
                          : "1px solid #D6D7D9",
                      minWidth: "60%",
                      alignItems: "center",
                      p: 1.5,
                      boxShadow: "none",
                    }}
                  >
                    <p variant="text">
                      <TruncateText text={ans} maxLength={30} />
                    </p>
                  </Card>
                  <Card
                    sx={{
                      width: "max-content",
                      border: "1px solid #D6D7D9",
                      p: 1.5,
                      background: ans === data.answer && "#24B670",

                      boxShadow: "none",
                    }}
                  >
                    <Icon name="Check" color="white" />
                  </Card>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
