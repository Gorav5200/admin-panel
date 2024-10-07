import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
  AppBar,
  Toolbar,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import Avatar from "@mui/material/Avatar";
import { Dot, DotIcon } from "lucide-react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { X } from "lucide-react";
import { Card } from "@mui/material";
import { classApi } from "../../../../../services/Constant";
import {
  useGetClassDetailQuery,
  useUpdateClassMutation,
} from "../../../../../services/apis/exam/class";
import { HeaderWithNavigation } from "../../../../common/header";
import TruncateText from "../../../../common/FunctionComponents/truncate";
import Icon from "../../../../common/Icon";
import {
  HTMLConverter,
  dateFormatting,
  findDuration,
} from "../../../../../services/common";
import {
  createClass,
  createConcept,
  createPractice,
  setClassDetails,
} from "../../../../../ducks/exams/classSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Badge, Empty, Image } from "antd";
import dayjs from "dayjs";
import VideoPlayer from "../../../../common/videoPlayer";
import { DateTimePicker } from "@mui/x-date-pickers";
import { toast } from "react-toastify";
import moment from "moment";
import {
  CustomButton,
  ButtonStyle,
  CustomButtonStyle,
} from "../../../../../styles/muiRoot";

const ClassDetail = () => {
  const cardStyle = {
    backgroundColor: "white",
    border: "1px solid #D9DBDD",
    width: "100%",
    minHeight: "242px",
  };
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classDetails } = useSelector((state) => state.class);
  const { entityId, classId } = params;
  console.log("🚀 ~ ClassDetail ~ params:", params);

  const {
    data: getDetails,
    isLoading,
    isFetching,
    isError,
  } = useGetClassDetailQuery(`${classApi.endPoint}/details/${classId}`, {
    refetchOnMountOrArgChange: true,
  });

  const mergeData = useMemo(() => {
    if (classDetails && (classDetails.practice || classDetails.concepts)) {
      const data = [...classDetails?.practice, ...classDetails.concepts];
      return data.sort((a, b) => a.sequence - b.sequence);
    } else {
      return [];
    }
  }, [dispatch, classDetails]);

  useEffect(() => {
    if (getDetails) {
      dispatch(setClassDetails(getDetails?.data.classDetails));
    }
  }, [getDetails, mergeData]);

  useEffect(() => {
    if (classDetails && classDetails.startDate && classDetails.startTime) {
      const combinedDateTime = dayjs(
        `${classDetails.startDate} ${classDetails.startTime}`
      );

      if (combinedDateTime.isValid()) {
        const defaultTime = combinedDateTime.toDate();

        console.log("time:", defaultTime);
      } else {
        console.error(
          "Invalid date/time format",
          classDetails.startDate,
          classDetails.startTime
        );
      }
    } else {
      console.error("Invalid classDetails or missing startDate/startTime");
    }
  }, [classDetails]);

  const handleEdit = async () => {
    const { concepts, practice, ...others } = classDetails;
    const newPractice = await practice?.map((e) => ({
      ...e,
    }));

    try {
      await Promise.all([
        dispatch(createConcept(concepts)),
        dispatch(createPractice(newPractice)),
        dispatch(
          createClass({
            ...others,
            topic: others?.topic._id,
            teacher: others?.teacher._id,
            assignment: others?.assignment?._id,
            entityType: others.entityType?.map((e) => e._id),
            groups: others.groups?.map((e) => e._id),
          })
        ),
      ]);
      navigate(`/main/entity/${params.entityId}/class/${params.classId}/edit`);
    } catch (error) {
      toast.error(error);
    }
  };

  const combinedDate = useMemo(() => {
    const startDate = dayjs.utc(classDetails.startDate);
    const startTime = dayjs.utc(classDetails.startTime);
    const date = startDate
      .set("hour", startTime.hour())
      .set("minute", startTime.minute())
      .set("second", startTime.second());
    return date;
  }, [classDetails]);

  console.log(combinedDate);

  return (
    <div className="p-3 bg-slate-100">
      {/* headerr */}
      <HeaderWithNavigation
        cont={
          <div>
            <h2 className="text-darkblue text-2xl font-bold font-inder">
              {" "}
              {classDetails?.title || "N/A"}
            </h2>
          </div>
        }
      />

      {isError ? (
        <div className="bg-white p-2 h-[80vh] flex items-center justify-center rounded-md">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{ height: 60 }}
            description={
              <span className="text-red-600 text-sm font-inter ">
                Some Error to fetch Data
              </span>
            }
          >
            <CustomButton
              onClick={() => navigate(`main/entity/{params.enitiyId}/class`)}
              sx={{
                ...ButtonStyle,
                width: "fit-coontent",
                height: "fit-content",
              }}
            >
              Back to Home
            </CustomButton>
          </Empty>
        </div>
      ) : (
        <div className="sm:flex sm:justify-between overflow-hidden">
          {/* Left side div */}
          <Paper
            elevation={0}
            className=" p-3  w-full mr-3 sm:w-[100%]"
            sx={{
              maxWidth: 345,
              height: "fit-content",
              borderRadius: 2,
              overflow: "scroll",
              height: "91vh",
              p: 2,
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <Avatar
                alt="Remy Sharp"
                src={classDetails.image}
                sx={{ color: "transparent" }}
              />

              <h6 className="text-base font-inder font-semibold">
                {classDetails.teacher?.name ?? "N/A"}
              </h6>

              <Button
                onClick={handleEdit}
                sx={{
                  fontWeight: 700,
                  textTransform: "none",
                  color: "#20617D",
                  "&:hover": {
                    backgroundColor: "none",
                    color: "none",
                  },
                }}
              >
                Re-Assign
              </Button>
            </div>
            <Divider />
            <section className="flex flex-col gap-3  items-start w-full mt-2">
              <div className="w-full">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Date and Time "
                      value={combinedDate}
                      readOnly
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <h5 className="pl-1 text-gray-500 font-normal text-xs float-right ml-auto">
                End Time : {dayjs.utc(classDetails.endTime).format("LT")}
              </h5>
              <List disablePadding className="w-full">
                <ListItem className="flex  items-center " disableGutters>
                  <ListItemAvatar
                    disablePadding
                    sx={{ minWidth: "max-content" }}
                  >
                    <Dot />
                  </ListItemAvatar>
                  <h5 className="pl-1 font-semibold text-sm basis-2/5">
                    Total enrolled
                  </h5>

                  <span className="text-sm">{516}</span>
                </ListItem>
                <Divider />
                <ListItem className="flex  items-center " disableGutters>
                  <ListItemAvatar
                    disablePadding
                    sx={{ minWidth: "max-content" }}
                  >
                    <Dot />
                  </ListItemAvatar>
                  <h5 className="pl-1 font-semibold text-sm basis-2/5">
                    Status
                  </h5>

                  <Chip
                    variant="outlined"
                    // avatar={<Dot color="white"></Dot>}
                    sx={{ color: "white", background: "#11cf00" }}
                    label={
                      classDetails?.status?.charAt(0)?.toUpperCase() +
                        classDetails?.status?.slice(1) || "N/A"
                    }
                  />
                </ListItem>
              </List>
            </section>
            <Divider />
            <h6 className="text-base font-inder font-semibold m-1 my-2">
              Assignment : {classDetails?.assignment?.title || "N/A"}
            </h6>
            <Divider />
            <div>
              <h6 className="text-base font-inder font-semibold  mt-2 pl-1">
                Entity Types
              </h6>

              <List className="h-full overflow-scroll max-h-[200px]  scroll-smooth scrollbar-hide">
                {classDetails.entityType?.map((e) => (
                  <>
                    <ListItem disableGutters key={e._id}>
                      <ListItemIcon>
                        <DotIcon color="black" />
                      </ListItemIcon>
                      <ListItemText>
                        <span className="text-sm ">{e.title}</span>
                      </ListItemText>
                    </ListItem>
                    <Divider />
                  </>
                ))}
              </List>
            </div>
            <div>
              <h6 className="text-base font-inder font-semibold  mt-2 pl-1">
                Groups
              </h6>
              <List
                className="h-full overflow-scroll max-h-[200px]  scroll-smooth scrollbar-hide"
                disablePadding
                disableGutters
              >
                {classDetails.groups?.map((e) => (
                  <>
                    <ListItem disableGutters key={e._id}>
                      <ListItemIcon>
                        <DotIcon color="black" />
                      </ListItemIcon>
                      <ListItemText
                        primary={<span className="text-sm ">{e.title}</span>}
                        secondary={
                          <span className="text-xs ">{e.groupType}</span>
                        }
                      ></ListItemText>
                    </ListItem>
                  </>
                ))}
              </List>
            </div>
            <div className="topics-subtopic p-1 mb-2 ">
              <h6 className="text-base font-inder font-semibold  mb-2">
                {classDetails?.topic?.title}
              </h6>

              <Stack
                direction="row"
                spacing={2}
                className="overflow-scroll scrollbar-hide"
              >
                {classDetails?.subTopics?.map(({ _id, title }) => (
                  <Chip
                    avatar={
                      <Avatar sx={{ color: "black" }}>
                        {title?.charAt(0)}
                      </Avatar>
                    }
                    label={title}
                    key={_id}
                  />
                ))}
              </Stack>
            </div>{" "}
            <Divider />
            <div className="p-1">
              <h6 className="text-base font-inder font-semibold mb-2">
                Class Description
              </h6>

              <p className="text-justify text-sm text-gray-600 my-1">
                {classDetails?.description}
              </p>

              <CustomButton
                variant="contained"
                size="small"
                sx={{
                  ...CustomButtonStyle,
                  borderRadius: 1.5,
                  height: "fit-content",
                  width: "fit-content",
                  padding: "4px 12px",
                  float: "right",
                }}
                onClick={() =>
                  navigate(`/main/entity/${entityId}/class/${classId}/start`)
                }
              >
                Start Class
              </CustomButton>
            </div>
          </Paper>
          {/* Right div */}
          <div className=" mt-3 sm:mt-0 w-full sm:w-[80%]">
            <Box
              sx={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                borderRadius: 2,
              }}
            >
              <Stack
                direction="row"
                spacing={3}
                alignSelf={"flex-end"}
                justifyContent={"flex-end"}
                my={1}
              >
                <Button
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                  }}
                  startIcon={<Icon name="FileEdit" color="#336792" size={20} />}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                  }}
                  startIcon={<Icon name="Files" color="#336792" size={20} />}
                  // onClick={handleDuplicate}
                >
                  Duplicate
                </Button>
                <Button
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                  }}
                  startIcon={<Icon name="Upload" color="#336792" size={20} />}
                >
                  Unpublish
                </Button>
              </Stack>

              <Divider />
              <br />
              <div className=" overflow-scroll h-[80vh]">
                <Stack
                  direction={"column"}
                  spacing={2}
                  justifyContent={"flex-end"}
                >
                  {!isLoading && !isFetching && mergeData.length === 0 ? (
                    <div className="flex justify-center  items-center h-[75vh]">
                      <Empty />
                    </div>
                  ) : (
                    mergeData?.map((item, qInd) => {
                      return (
                        <div key={item.id} className="w-full">
                          {item?.cardType === "concept" ? (
                            <Card
                              key={item.id}
                              elevation={0}
                              sx={{ ...cardStyle }}
                            >
                              <CardContent sx={{ p: 1 }}>
                                <div className="flex justify-between items-center p-2 mb-1 bg-medGrey rounded-md">
                                  <h5 className="text-base float-left font-bold">
                                    {qInd + 1}. Concept <br />
                                    <span className="text-xs font-normal italic">
                                      Title: {item.title}
                                    </span>
                                  </h5>
                                  <Chip
                                    sx={{ py: 2, borderRadius: 2 }}
                                    variant="outlined"
                                    label={
                                      <div className="text-xs text-darkblue flex gap-2 items-center  w-max ">
                                        <h5 className="font-medium font-inter ">
                                          Start Time :{" "}
                                          {dayjs
                                            .utc(item.startTime)
                                            .format("LT")}
                                        </h5>
                                        <Divider
                                          orientation="vertical"
                                          flexItem
                                        />
                                        <h5 className="font-medium font-inter ">
                                          End Time{" "}
                                          {dayjs.utc(item.endTime).format("LT")}
                                        </h5>
                                      </div>
                                    }
                                  ></Chip>
                                </div>
                                <Divider />
                                <div className="flex justify-start items-start gap-10 my-5">
                                  <div className="basis-30%">
                                    <Image
                                      width={200}
                                      height={200}
                                      className="rounded-md"
                                      src={
                                        item?.media.find(
                                          (e) => e.type === "photo"
                                        )?.media
                                      }
                                      style={{
                                        borderRadius: "10px",
                                        border: "1px solid #D9DBDD",
                                      }}
                                      preview={{
                                        zIndex: 1300,
                                        maskClassName: "rounded-xl",
                                      }}
                                    />
                                  </div>

                                  <div>
                                    {item?.media?.find(
                                      (e) => e.type === "video"
                                    )?.media && (
                                      <div className="mx-2">
                                        <VideoPlayer
                                          videoUrl={
                                            item?.media?.find(
                                              (e) => e.type === "video"
                                            )?.media || ""
                                          }
                                        />
                                      </div>
                                    )}

                                    <HTMLConverter>
                                      {item?.description}
                                    </HTMLConverter>
                                  </div>
                                </div>

                                <h5 className="text-xs text-[##828282] float-right  mx-2">
                                  {findDuration(item.startTime, item.endTime)}
                                </h5>
                              </CardContent>
                            </Card>
                          ) : (
                            <Card
                              key={item.id}
                              elevation={0}
                              sx={{ ...cardStyle }}
                            >
                              <CardContent sx={{ p: 1 }}>
                                <div className="flex justify-between items-center p-2 mb-1 bg-medGrey rounded-md">
                                  <h5 className="text-base float-left font-bold">
                                    {qInd + 1}. Practice
                                  </h5>
                                  <Chip
                                    sx={{ py: 2, borderRadius: 2 }}
                                    variant="outlined"
                                    label={
                                      <div className="text-xs text-darkblue flex gap-2 items-center  w-max ">
                                        <h5 className="font-medium font-inter ">
                                          Start Time :{" "}
                                          {dayjs
                                            .utc(item.startTime)
                                            .format("LT")}
                                        </h5>
                                        <Divider
                                          orientation="vertical"
                                          flexItem
                                        />
                                        <h5 className="font-medium font-inter ">
                                          End Time{" "}
                                          {dayjs.utc(item.endTime).format("LT")}
                                        </h5>
                                      </div>
                                    }
                                  ></Chip>
                                </div>
                                <br />
                                <Divider />

                                {
                                  <HTMLConverter>
                                    {item?.question.question}
                                  </HTMLConverter>
                                }
                                <div className="answer-section mt-2">
                                  <h5 className="text-base font-medium">
                                    Answer:
                                  </h5>

                                  {item.question.options === null ? (
                                    <div className="my-2">
                                      <p className="text-sm text-black">
                                        {item?.question.answer}
                                      </p>
                                    </div>
                                  ) : (
                                    item.question.options?.map((ans, index) => (
                                      <div
                                        className="flex gap-2 w-5/6 mt-2"
                                        key={index}
                                      >
                                        <Card
                                          sx={{
                                            width: "max-content",
                                            border: "1px solid #D6D7D9",
                                            p: 1.5,
                                            boxShadow: "none",
                                          }}
                                        >
                                          <text variant="text">
                                            {
                                              <span className="text-primary font-medium px-1">
                                                {String.fromCharCode(
                                                  65 + index
                                                )}
                                              </span>
                                            }
                                          </text>
                                        </Card>
                                        <Card
                                          sx={{
                                            border:
                                              ans === item?.question.answer
                                                ? "1px solid #24B670"
                                                : "1px solid #D6D7D9",
                                            minWidth: "60%",
                                            alignItems: "center",
                                            p: 1.5,
                                            boxShadow: "none",
                                          }}
                                        >
                                          <p variant="text">
                                            <TruncateText
                                              text={ans}
                                              maxLength={55}
                                            />
                                          </p>
                                        </Card>
                                        <Card
                                          sx={{
                                            width: "max-content",
                                            border: "1px solid #D6D7D9",
                                            p: 1.5,
                                            background:
                                              ans === item?.question.answer &&
                                              "#24B670",

                                            boxShadow: "none",
                                          }}
                                        >
                                          <Icon name="Check" color="white" />
                                        </Card>
                                      </div>
                                    ))
                                  )}
                                </div>
                                <h5 className="text-xs text-[##828282] float-right  mx-2">
                                  {findDuration(item.startTime, item.endTime)}
                                </h5>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      );
                    })
                  )}
                </Stack>
              </div>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassDetail;
