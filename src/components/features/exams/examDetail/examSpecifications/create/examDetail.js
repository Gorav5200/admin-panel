import React, { useMemo, useState } from "react";
import PreviewCommon from "./previewCommon";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  colors,
} from "@mui/material";
import SingleImageUpload from "../../../../../common/singleImageUpload";
import BootstrapTextField from "../../../../../common/bootstrapTextField";
import {
  CustomButton,
  CustomButtonStyle,
} from "../../../../../../styles/muiRoot";
import QuillEditor from "../../../../../common/textEditor";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
} from "@mui/lab";

import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { HTMLConverter } from "../../../../../../services/common";
import { setActiveView, setExamDetail } from "../../../../../../ducks/exams/specificationSlice";
import { useSelector } from "react-redux";

function ExamDetail() {
  const dispatch = useDispatch();
  const { examDetail } = useSelector(
    (state) => state.examSpecification.createSpecificaton
  );

  // const examDetail={};

  const [timelineData, setTimeLineData] = useState(examDetail?.timeline || []);
  const [values, setValues] = useState({
    title: examDetail?.title || "",
    description: examDetail?.description || "",
    media: examDetail?.media || "",
  });

  const addCard = () => {
    const updatedTimelineData = [...timelineData];
    updatedTimelineData.unshift({
      label: "",
      value: "",
      sequence:
        updatedTimelineData.length > 0 ? updatedTimelineData.length + 1 : 1,
    });
    setTimeLineData(updatedTimelineData);
  };

  const handleRemove = (ind) => {
    const updatedTimelineData = [...timelineData];
    updatedTimelineData.splice(ind, 1);
    const updateSeq = updatedTimelineData.map((e, ind) => ({
      ...e,
      sequence: ind + 1,
    }));
    setTimeLineData(updateSeq.reverse());
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTimelineData = [...timelineData];
    updatedTimelineData[index] = {
      ...updatedTimelineData[index],
      [name]: value,
    };
    setTimeLineData(updatedTimelineData);
  };

  const sequenceValue = useMemo(() => {
    const data = [...timelineData];
    return data.sort((a, b) => a.sequence - b.sequence);
  }, [timelineData]);

  const handleContinue = async () => {
    const updatedData = { ...values, timeline: timelineData };

    try {
      await dispatch(setExamDetail(updatedData));
      dispatch(setActiveView(1))
      console.log("Dispatch successful");

      // Perform additional actions here
    } catch (error) {
      // Code to execute if dispatch fails
      console.error("Dispatch failed with error:", error);

      // Handle the error if needed
    }

    console.log("🚀 ~ handleContinue ~ updatedData:", updatedData);
  };

  return (
    <>
      <div className="flex gap-5 h-full ">
        <div className="bg-white basis-[70%]">
          <h5 className="text-primary text-base font-bold font-inder p-2 bg-medGrey">
            Exam Details
          </h5>
          <section className=" flex justify-between gap-8 my-2">
            <Box
              component="form"
              sx={{
                p: 1,
                "& > :not(style)": {
                  display: "flex",
                  flexDirection: "column",
                },

                overflow: "scroll",
              }}
            >
              <QuillEditor
                setValue={(val) => setValues({ ...values, description: val })}
                value={values.description}
              />
            </Box>

            <div>
              <SingleImageUpload
                circle={true}
                setData={(val) => setValues({ ...values, media: val })}
                data={values.media}
                endpoint={"specification"}
              />
            </div>
          </section>
          <div className="p-2">
            <BootstrapTextField
              defaultValue={values.title}
              label="Add Title"
              placeholder={"Enter here ::"}
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              size="small"
            />
          </div>
          <h5 className="text-primary text-base font-bold font-inder p-3 bg-medGrey ">
            Add Timeline
            <button
              className="text-[#336792] text-sm font-inter font-[600] underline underline-offset-4 float-right"
              onClick={addCard}
            >
              + Add Card
            </button>{" "}
          </h5>

          <div className="w-full flex flex-col gap-6 p-3 mt-5 overflow-scroll h-[50%] scroll-smooth scrollbar-hide">
            {timelineData?.map((item, ind) => (
              <div className="relative" key={ind}>
                <IconButton
                  sx={{
                    position: "absolute",
                    right: -10,
                    top: -10,
                    backgroundColor: "#ededed",
                  }}
                  onClick={() => handleRemove(ind)}
                >
                  <X size={13} />
                </IconButton>
                <Card sx={{ width: "100%" }}>
                  <CardContent sx={{ width: "100%" }}>
                    <Box
                      component="form"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <FormControl variant="filled">
                        <InputLabel htmlFor={`component-filled-label-${ind}`}>
                          Label
                        </InputLabel>
                        <FilledInput
                          id={`component-filled-label-${ind}`}
                          name="label"
                          onChange={(e) => handleInputChange(e, ind)}
                          value={item.label}
                        />
                      </FormControl>
                      <FormControl variant="filled">
                        <InputLabel htmlFor={`component-filled-value-${ind}`}>
                          Value
                        </InputLabel>
                        <FilledInput
                          id={`component-filled-value-${ind}`}
                          name="value"
                          onChange={(e) => handleInputChange(e, ind)}
                          value={item.value}
                        />
                      </FormControl>
                      <FormControl variant="filled">
                        <InputLabel
                          htmlFor={`component-filled-sequence-${ind}`}
                        >
                          Sequence
                        </InputLabel>
                        <FilledInput
                          type="number"
                          id={`component-filled-sequence-${ind}`}
                          name="sequence"
                          onChange={(e) => handleInputChange(e, ind)}
                          value={item.sequence}
                        />
                      </FormControl>
                    </Box>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Preview section */}
        <section className="bg-medGrey  basis-[30%] px-2">
          <PreviewCommon>
            <div className="p-1 rounded-md text-white">
              <div className=" flex justify-between gap-3  my-1 items-start">
                <div>
                  <h5 className="text-primary text-base font-bold font-inder">
                    Exam Details
                  </h5>
                  <p className="text-secondary text-justify text-xs my-1">
                    <HTMLConverter>{values.description}</HTMLConverter>
                  </p>
                </div>

                <div>
                  <Avatar sx={{ width: 50, height: 50 }} />
                </div>
              </div>

              <h6 className=" text-base text-primary font-semibold ">
                {values.title}
              </h6>

              <div className="h-[75vh] overflow-y-scroll  mt-4  scroll-smooth">
                <Timeline
                  sx={{
                    bgColor: "#336792",
                    width: "100%",
                    p: 0,
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0,
                    },
                  }}
                >
                  {sequenceValue?.map((item, ind) => (
                    <TimelineItem key={ind}>
                      <TimelineSeparator>
                        <TimelineDot sx={{ bgcolor: "#336792" }} />
                        {ind !== timelineData.length - 1 && (
                          <TimelineConnector sx={{ bgcolor: "#336792" }}>
                            <Divider />
                          </TimelineConnector>
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <div className="flex w-6/6 items-start gap-3 mb-4">
                          <p className=" text-xs font-bold text-primary">
                            {item.label}
                          </p>
                          <p className=" text-xs font-normal  text-primary ">
                            {item.value}
                          </p>
                        </div>

                        <Divider />
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </div>
            </div>
          </PreviewCommon>
        </section>
      </div>

      <CustomButton
        style={{
          ...CustomButtonStyle,
          float: "right",
          position: "absolute",
          right: 15,
          bottom: 30,
        }}
        onClick={handleContinue}
      >
        Save & continue
      </CustomButton>
    </>
  );
}

export default ExamDetail;
