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
} from "@mui/material";
import ReactQuill from "react-quill";
import SingleImageUpload from "../../../common/singleImageUpload";
import TruncateText from "../../../common/FunctionComponents/truncate";
import Icon from "../../../common/Icon";
import { HTMLConverter } from "../../../../services/common";
import "../../../../styles/videoCards.css";
import { ImportVideoModal } from "./importVideoModal";
import Badge from "@mui/material/Badge";
import { AddNotes } from "./addNotes";
import { learnApi } from "../../../../services/Constant";
import MultipleImageUpload from "../../../common/multipleImage";

export function ConceptCard({
  content,
  image,
  handleImageChange,
  handleContentChange,
  sequence,
  show,
  ...props
}) {
  const { newLearn } = useSelector((state) => state.learn);

  
  return (
    <div className="object-cover p-2">
      <Stack
        direction={"row"}
        sx={{
          backgroundColor: "var(--med-grey)",
        }}
        justifyContent={"space-between"}
      >
        <h5 className="text-base font-bold p-2 bg-medGrey ">
          Concept {sequence}
        </h5>
      </Stack>

      <Card
        className="min-h-[210px] flex gap-3 border "
        sx={{
          boxShadow: show === sequence ? 1 : "none",
          border: show === sequence ? "1px solid black" : "none",
        }}
      >
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
            <ReactQuill
              onChange={handleContentChange}
              value={content}
              className="w-full"
            />
          </div>

          <div className="flex  items-start gap-5 flex-col ">
            <div className="flex">
            <h1 className="font-inter text-sm text-center my-auto me-2">Add images</h1>
              <MultipleImageUpload
                setData={(val) => {
                 
                  handleImageChange(val);
                  
                }}
                data={image}
                endpoint={ `${learnApi.endPoint}/upload/image`}
                circle={false}
              
              />
            </div>

            <div className="w-full">
              <div className="flex justify-end mb-2 pr-2 gap-5">
                <div className="mr-auto align-baseline">
                  <Badge
                    badgeContent={props?.notes?.length || 0}
                    color="primary"
                  >
                    <AddNotes
                      topicId={newLearn.topic}
                      setValues={(val) => props.handleNotes(val)}
                      values={props.notes}
                    />
                  </Badge>
                </div>

                <Badge
                  badgeContent={props?.questions?.length || 0}
                  color="primary"
                >
                  <div>{props.addQuestion}</div>
                </Badge>

                {/* Upload video */}
                <div>
                  <Badge
                    badgeContent={props?.videos?.length || 0}
                    color="primary"
                  >
                    <div>
                      <UploadButton
                        sequence={sequence}
                        values={props.videos}
                        setValues={(val) =>props.handleVideos(val)}
                      />
                    </div>
                  </Badge>

                </div>
              </div>

              <Divider />

              <div className="mt-2 w-full">{props.addTitle}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export function PracticeCard({ question, answer, options, sequence, show }) {
  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          backgroundColor: "var(--med-grey)",
        }}
        justifyContent={"space-between"}
      >
        <h5 className="text-base font-bold p-2 bg-medGrey ">
          Practice {sequence}
        </h5>
      </Stack>

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
        <CardContent>
          <section className="flex justify-between items-start">
            <h5 className="font-medium font-inter text-xl basis-[50%] ">
              Question
            </h5>
          </section>
          <br />

          {<HTMLConverter>{question}</HTMLConverter>}
          <div className="answer-section mt-2">
            <h5 className="text-base font-medium">Answer:</h5>

            {options === null ? (
              <div className="my-2">
                <p className="text-sm text-black">{answer}</p>
              </div>
            ) : (
              options?.map((ans, index) => (
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
                        ans === answer
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
                      background: ans === answer && "#24B670",

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

const UploadButton = ({ sequence, setValues,values}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      {" "}
      <div
        className="group relative flex justify-center items-center text-zinc-600 text-sm font-bold"
        onClick={handleOpen}
      >
        <div className="absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-[150%] -translate-y-[300%] duration-500 group-hover:delay-500 skew-y-[20deg] group-hover:skew-y-0 shadow-md">
          <div className="shadow-md bg-grey-200 absolute bottom-0 translate-y-1/2 left-1/2 translate-x-full rotate-45 p-1"></div>
          <div className="rounded-md bg-white group-hover:opacity-0 group-hover:scale-[115%] group-hover:delay-700 duration-500 w-full h-full absolute top-0 left-0">
            <div className="border-b border-r border-white bg-white absolute bottom-0 translate-y-1/2 left-1/2 translate-x-full rotate-45 p-1"></div>
          </div>
        </div>

        <div className="shadow-md flex items-center group-hover:gap-2 bg-gradient-to-br from-gray-800 to-gray-200 p-3 rounded-md cursor-pointer duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-file-video-2"
          >
            <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <rect width="8" height="6" x="2" y="12" rx="1" />
            <path d="m10 15.5 4 2.5v-6l-4 2.5" />
          </svg>
          <span className="text-[0px] group-hover:text-sm duration-300 text-white">
            Add Video
          </span>
        </div>
      </div>
      <ImportVideoModal
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        values={values}
        setValues={setValues}
        sequence={sequence}
      />
    </>
  );
};
