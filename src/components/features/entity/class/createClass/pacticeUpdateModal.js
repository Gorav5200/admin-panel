import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { CustomButton, CustomButtonStyle } from "../../../../../styles/muiRoot";

import {
  Alert,
  Backdrop,
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Modal,
  Stack,
} from "@mui/material";

import Icon from "../../../../common/Icon";
import {
  HTMLConverter,
  createHandleChange,
  dateFormatting,
} from "../../../../../services/common";
import TruncateText from "../../../../common/FunctionComponents/truncate";
import TimePickerComp from "../../../../common/timePicker";
import dayjs from "dayjs";
import { useUpdateContextMutation } from "../../../../../services/apis/exam/class";
import { message } from "antd";
import { classApi } from "../../../../../services/Constant";
import { isError } from "lodash";
import { useSelector } from "react-redux";

export default function PracticeUpdate({
  handleClose,
  open,
  data,
  updateData,
}) {
  const { classDetails } = useSelector((state) => state.class);
  const [values, setValues] = useState(data);
  const [errorOpen, setErrorOpen] = useState(false); // State to control error alert visibility

  useEffect(() => {
    setValues(data);
    setErrorOpen(false)
  }, [data,open]);

  const handleChange = createHandleChange(values, setValues);

  const [
    updateContext,
    { isError: updateError, isLoading: updateLoad, isError: upateError },
  ] = useUpdateContextMutation();

  const handleUpdate = async () => {
    try {
      const response = await updateContext({
        endpoint: `${classApi.endPoint}/practice/update/${values?._id}`,
        updatedData: {startTime:values?.startTime,endTime:values?.endTime,question:values?.question?._id},
      });

      if (response && response?.data?.success) {
        const res = await updateData();
        console.log("🚀 ~ handleSave ~ res:", res);

        if (res.success && res.data) {
          message.success("Practice Updated");
        } else {
          setErrorOpen(true); // Display error alert
          message.error("Some error Occurred");
        }
      } else {
        setErrorOpen(true); // Display error alert
        message.error("Some error to Update !", 2.5);
      }
    } catch (error) {
      console.error("Error update class: api:", error);
    }
  };


  return (
    <>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalRoot">
          <div className="w-[80vw] h-fit p-2 overflow-scroll">
            {/* header */}
            <header className="flex justify-between items-start">
              <div className="basis-3/12">
                <h3 className="text-xl font-bold text-primary">
                  Edit Practice
                </h3>
              </div>

              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <X color="var(--primary)" />
              </IconButton>
            </header>
            {errorOpen && (
              <Alert severity="error" >
                Some error to Update Practice
              </Alert>
            )}
            {/* Content */}
            <div className="mt-4 ">
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
                  sx={{
                    backgroundColor: "var(--med-grey)",
                  }}
                  justifyContent={"space-between"}
                >
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
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium font-inter text-base ">
                        Question
                      </h5>
                    </div>

                    <div className="flex gap-5 justify-between">
                      <div className="text-justify basis-4/6">
                        <HTMLConverter>{data.question?.question}</HTMLConverter>
                      </div>
                      <div className="text-xs text-darkblue flex gap-2 items-start border p-2 rounded-md h-fit w-fit">
                        <div>
                          <h5 className="font-medium font-inter text-sm my-1 ">
                            Start Time :
                          </h5>
                          <TimePickerComp

                            setValue={(val) =>
                              handleChange({
                                target: {
                                  name: "startTime",
                                  value: val,
                                },
                              })
                            }
                            controlTime={true}
                            startTime={dayjs.utc(classDetails?.startTime)}
                            endTime={dayjs.utc(classDetails?.endTime  )}
                            value={
                              values.startTime ? dayjs.utc(values.startTime) : null
                            }
                          />
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <div>
                          <h5 className="font-medium font-inter text-sm my-1 ">
                            End Time :
                          </h5>
                          <TimePickerComp
                            controlTime={true}
                              startTime={dayjs.utc(classDetails?.startTime)}
                              endTime={dayjs.utc(classDetails?.endTime  )}
                            setValue={(val) =>
                              handleChange({
                                target: {
                                  name: "endTime",
                                  value: val,
                                },
                              })
                            }
                       
                            value={
                              values.endTime ? dayjs(values.endTime) : null
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                  <Divider />
                  <div className="answer-section mt-2 text-left">
                    <h5 className="font-medium font-inter text-base ">
                      Answer:
                    </h5>

                    {data?.question?.options === null ? (
                      <div className="my-2">
                        <p className="text-sm text-black">
                          {data?.question.answer}
                        </p>
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

                <CardActions>
                  <CustomButton
                    size="small"
                    disabled={updateLoad}
                    onClick={handleUpdate}
                    sx={{
                      ...CustomButtonStyle,
                      width: "150px",
                      height: "40px",
                      borderRadius: 2,
                      ml: "auto",

                      "&:hover": {
                        backgroundColor: "black",
                      },
                    }}
                  >
                  {updateLoad ?<CircularProgress color="inherit" size={18}/>:"Save Changes"}
                  </CustomButton>


                
                </CardActions>
              </Card>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
