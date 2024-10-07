import React, { useEffect, useRef, useState } from "react";
import { ButtonStyle, CustomButton } from "../../../../../styles/muiRoot";
import {
    Divider,
    IconButton,
    Backdrop,
    LinearProgress,
    Card,
    Chip,
    CardHeader,
    CardContent,
    Avatar,
    Tooltip,
    ListItem,
    List,
    ListItemText,
    ListItemAvatar,
    ListSubheader,
    Collapse,
} from "@mui/material";
import { Image, message } from "antd";
import { ChevronRight, XIcon } from "lucide-react";
import { doubtApi } from "../../../../../services/Constant";
import {
    useUpdateRequestStatusMutation,
    useHandleCorrectIncorrectMutation,
    useLazyGetSolutionByIdQuery,
} from "../../../../../services/apis/doubtApi";
import { QueryEnum } from "../../../../../styles/muiRoot";
import dayjs from "dayjs";
import { Attachment, TaskAltOutlined } from "@mui/icons-material";
import VideoPlayer from "../../../../common/videoPlayer";
import { capitalizeFirstLetter, truncateTitle, } from "../../../../../services/common";
import { reviewDoubtDetail } from "../../../../../ducks/doubtSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import DoubtSolverForm from "./doubtSolverForm";
import AddSolutionForm from "./solutionForm";

//================================VIEW SOLUTION MODAL========================================= //
export const DetailModal = ({ handleClose, refetchList }) => {
  const { detail: doubtDetail } = useSelector(reviewDoubtDetail); //handle particular doubt detail
 const dispatch = useDispatch();
  const [detail, setDetail] = useState({});
  const [expand,setExpand]=useState(false)

  const [trigger, { data, isLoading, isFetching }] =useLazyGetSolutionByIdQuery();
    useEffect(() => {
    if (doubtDetail) {
      trigger(
        `${doubtApi.endPoint}/assigned/detail/${doubtDetail?.doubtId?._id}`
      );
    }
  }, [doubtDetail]);

  useEffect(() => {
    if (data) {
      setDetail(data.doubtAssignedDetail);
      if (
        data?.doubtAssignedDetail?.doubtId.solutionId?.solutionStatus ===
        "incorrect"
      ) {
        setExpand(true);
      };
     
    }
  }, [data]);

  useEffect(() => {
    return () => {
      refetchList();
    };
  }, []);

  const { doubtId, doubtSolverId, ...others } = detail;
  console.log("🚀 ~ DetailModal ~ data:", detail);
  console.log("🚀 ~ DetailModal ~ expand:", expand);

  //===========HANDLE CORRECT ======================//
  const [handleCorrectIncorrect, { isLoading: loading, isError: isError }] =
    useHandleCorrectIncorrectMutation();
  const handleAction = async (status) => {
    try {
      const response = await handleCorrectIncorrect({
        endpoint: `/exams/v1/review/${status}`,
        data: {
          doubtId: doubtId._id,
          doubtSolverId: doubtSolverId._id,
        },
      });
    console.log("🚀 ~ handleAction ~ response:", response);
      if (response.data && response.data.success) {
  
        const statusType=status?.toLowerCase()
         if (statusType==="correct"){
           handleClose()  
           message.success(`Mark ${status}`)
          }
         else if(statusType === "incorrect") {
          setExpand(true)
          message.success("Fill the Solution")
        }
       
      } else {
        message.error(response.error.data.message);
      }
    } catch (error) {
      console.error("Error add Assignment api:", error);
    }
  };


  //=============HANDLE PASS ACTION API===========================//
  const [updateRequestStatus, { isLoading: passLoad, isError: statusError }] =useUpdateRequestStatusMutation();
  const handlePassStatus = async () => {
    try {
      const response = await updateRequestStatus({
        endpoint: `/exams/v1/review/request/passed`,
        data: {
          doubtId: doubtDetail.doubtId._id,
          doubtSolutionReviewId: doubtDetail._id,
        },
      });

      if (response.data && response.data.success) {
        message.success("Doubt Passed");
        handleClose();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Error add Assignment api:", error);
    }
  };



  return (
    <div className="modalRoot max-h-[90vh]   overflow-scroll font-inter ">
      <LinearProgress
        color="inherit"
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 2,
          opacity: loading || isLoading || isFetching || passLoad ? 1 : 0,
        }}
      />

      <Backdrop
        sx={{
          color: "white",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#fffdfd6e",
          display: isLoading || isFetching ? "flex" : "none",
        }}
        open={isLoading || isFetching || passLoad || loading}
      />

      <div className="w-[60vw]">
        <header className="ps-2 flex justify-between items-center bg-medGrey rounded-t-md sticky top-0 z-50">
          <h4 className="text-xl font-inter font-semibold text-gray-700">
            Solution
          </h4>
          <IconButton onClick={handleClose}>
            <XIcon className="text-gray-700" />
          </IconButton>
        </header>
        <Divider />
        <br />

        {/* ======================================CARDS SECTION====================================== */}
        <section className="flex justify-start  gap-2 bg-lightGrey rounded-md p-2">
          {/* -----------------------------------------------||DOUBT INFO||---------------------------------------- */}

          <Card
            sx={{
              flexBasis: "50%",
              width: "50%",
              fontFamily: "var(--font-inter)",
              borderRadius: 2,
              p: 1,
              height: "inherit",
              // boxShadow: "none",
              position: "relative",
            }}
          >
            <Chip
              className="absolute top-0 right-0  "
              label="Group Query"
              sx={{
                background:
                  doubtId?.type && doubtId?.type === "group"
                    ? QueryEnum.GROUP
                    : doubtId?.type === "class"
                    ? QueryEnum.CLASS
                    : QueryEnum.OTHER,
                color: "white",
                font: "600 14px var(--font-inter)",
                borderRadius: "0 0 0 2px",
              }}
            />

            {/* --------------Header-------------- */}
            <CardHeader
              sx={{ p: 0, mb: 1 }}
              avatar={
                <Avatar
                  alt="Remy Sharp"
                  src={doubtId?.createdBy?.profilePic}
                  sx={{ width: 50, height: 50 }}
                />
              }
              title={
                <div className="flex items-center font-inter ">Doubt Info</div>
              }
              subheader={
                <div className="text-sm font-inter ">
                  {" "}
                  {doubtId?.createdBy?._id}
                </div>
              }
            />
            <Divider />
            {/* --------------Details Section----------- */}
            <CardContent className="text-sm font-inter font-[600] text-primary">
              <h4 className="text-sm text-secondary flex items-center">
                Group - {doubtId?.groupId?.title} <ChevronRight size="15" />{" "}
                {/* Topic: {doubtId.topicId?.title} */}
              </h4>
              <p className="text-sm font-normal my-2 min-h-[30px]">
                {others.isTruncate ? (
                  <Tooltip placement="top" arrow title={doubtId?.title}>
                    {doubtId?.title}
                  </Tooltip>
                ) : (
                  doubtId?.title
                )}
              </p>

              <List
                subheader={
                  <ListSubheader disableGutters>
                    <h2 className="font-inter text-base font-semibold text-black">
                      Details
                    </h2>
                  </ListSubheader>
                }
              >
                {[
                  {
                    label: "Author",
                    component: (
                      <Chip
                        avatar={
                          <Avatar
                            alt="Natacha"
                            src={doubtId?.createdBy?.profilePic}
                          />
                        }
                        label={doubtId?.createdBy?.name}
                        variant="outlined"
                      />
                    ),
                  },
                  {
                    label: "Status",
                    component: (
                      <div className="flex gap-2 items-center font-inter">
                        <TaskAltOutlined
                          color="success"
                          sx={{ fontSize: 20 }}
                        />
                        <p>{capitalizeFirstLetter(doubtId?.doubtStatus)}</p>
                      </div>
                    ),
                  },

                  {
                    label: "Date Created",
                    component: dayjs(doubtId?.createdAt)?.format("L"),
                  },
                  {
                    label: "Attachments",
                  },
                ].map(({ label, component }) => (
                  <ListItem disableGutters>
                    <ListItemText>
                      <h2 className="font-inter text-base text-gray-500 ">
                        {label}
                      </h2>
                    </ListItemText>
                    <ListItemAvatar sx={{ textAlign: "right" }}>
                      {component}
                    </ListItemAvatar>
                  </ListItem>
                ))}
              </List>
              <div className="flex gap-3 justify-start flex-wrap">
                {doubtId?.media?.map((url) => {
                  return url?.startsWith("data:video/") ||
                    url?.endsWith(".mp4") ? (
                    <video style={{ width: "100%", height: "30vh" }} controls>
                      <source src={url} />
                      Your browser does not support the video tag.
                    </video>
                  ) : url?.endsWith(".pdf") ? (
                    <Chip
                      sx={{ maxWidth: 200 }}
                      component="a"
                      target="_blank"
                      href={url}
                      label={url}
                      clickable
                      key={url}
                    />
                  ) : (
                    <Chip
                      size="small"
                      sx={{ maxWidth: 200 }}
                      component="a"
                      target="_blank"
                      href={url}
                      label={url}
                      clickable
                      key={url}
                    />
                  );
                })}
              </div>
              <br />
            </CardContent>

            <footer>
              <p className="text-right text-secondary text-xs">
                {dayjs.utc(doubtId?.createdAt)?.format(`MMMM D, YYYY`)}
              </p>
            </footer>
          </Card>
          {/* -----------------------------------------------||DOUBT SOLVER INFO||---------------------------------------- */}
          <Card
            sx={{
              width: "50%",
              flexBasis: "50%",
              fontFamily: "var(--font-inter)",
              borderRadius: 2,
              p: 1,
              // boxShadow: "none",
              height: "inherit",
              position: "relative",
            }}
          >
            <CardHeader
              sx={{ p: 0, mb: 1 }}
              avatar={
                <Avatar
                  alt="Remy Sharp"
                  src={doubtSolverId?.profilePic}
                  sx={{ width: 50, height: 50 }}
                />
              }
              title={
                <div className="flex items-center font-inter ">
                  Doubt Solver Info
                </div>
              }
              subheader={
                <div className="text-sm font-inter ">
                  {" "}
                  {doubtId?.solutionId?._id}
                </div>
              }
            />
            <Divider />

            <CardContent className="text-sm font-inter font-[600] text-primary">
              <p className="text-sm font-normal my-2 min-h-[30px]">
                <Tooltip
                  placement="top"
                  arrow
                  title={doubtId?.solutionId?.description}
                >
                  {truncateTitle(doubtId?.solutionId?.description, 15)}
                </Tooltip>
              </p>

              <List
                subheader={
                  <ListSubheader disableGutters>
                    <h2 className="font-inter text-base font-semibold text-black">
                      Details
                    </h2>
                  </ListSubheader>
                }
              >
                {[
                  {
                    label: "Author",
                    component: (
                      <Chip
                        avatar={
                          <Avatar
                            alt="Natacha"
                            src={doubtSolverId?.profilePic}
                          />
                        }
                        label={doubtSolverId?.name}
                        variant="outlined"
                      />
                    ),
                  },
                  {
                    label: "Status",
                    component: (
                      <div className="flex gap-2 items-center font-inter">
                        <TaskAltOutlined
                          color="success"
                          sx={{ fontSize: 20 }}
                        />
                        <p>{capitalizeFirstLetter(detail?.status)}</p>
                      </div>
                    ),
                  },
                  {
                    label: "Earned Points",
                    component: detail?.earnedPoints ?? "N/A",
                  },
                  {
                    label: "Earned Coins ",
                    component: detail?.earnedCoins ?? "N/A",
                  },
                  {
                    label: "Time Consumed",
                    component: <p>N/A</p>,
                  },

                  {
                    label: "Date Created",
                    component: dayjs(doubtId?.solutionId?.createdAt)?.format(
                      "L"
                    ),
                  },
                ].map(({ label, component }) => (
                  <ListItem disableGutters>
                    <ListItemText>
                      <h2 className="font-inter text-base text-gray-500 ">
                        {label}
                      </h2>
                    </ListItemText>
                    <ListItemAvatar sx={{ textAlign: "right" }}>
                      {component}
                    </ListItemAvatar>
                  </ListItem>
                ))}
              </List>

              <br />
            </CardContent>

            <footer>
              <p className="text-right text-secondary text-xs">
                {dayjs.utc(doubtId?.createdAt)?.format(`MMMM D, YYYY`)}
              </p>
            </footer>
          </Card>
        </section>

        {/* --------------------------SOLUTION SECTION--------------------------- */}
        <header className=" flex justify-between items-center">
          <h4 className="text-xl font-inter font-base mt-4 font-semibold p-2">
            Solution
          </h4>

          <div className="flex gap-2 items-center text-sm mr-2 font-inter pt-4">
            <Chip
              icon={<TaskAltOutlined color="success" sx={{ fontSize: 20 }} />}
              label={capitalizeFirstLetter(doubtId?.solutionId?.solutionStatus)}
              color="success"
            />
          </div>
        </header>
        <Divider />
        <section className="mt-2 text-left p-2">
          <h3 className="fon-inter text-base">{doubtId?.solutionId?.title}</h3>
          <p className="text-sm font-inter text-gray-600  font-normal">
            {doubtId?.solutionId?.description}
          </p>

          <br />
          <h4 className="text-sm  font-inter mb-2  font-light ">
            {" "}
            <Attachment className="mr-2" />
            {doubtId?.solutionId.media.length === 0
              ? "No Attachments"
              : "Attachments"}
          </h4>
          {doubtId?.solutionId.media?.map((url) => {
            return url?.startsWith("data:video/") || url?.endsWith(".mp4") ? (
              <VideoPlayer videoUrl={url} />
            ) : url?.endsWith(".pdf") ? (
              <Chip
                sx={{ maxWidth: 200 }}
                component="a"
                target="_blank"
                href={url}
                label={url}
                clickable
                key={url}
              />
            ) : (
              <Image
                alt="example"
                preview={{ zIndex: 12000 }}
                style={{
                  width: 200,
                  height: "auto",
                  objectFit: "contain",
                }}
                src={url}
              />
            );
          })}
          {/* ---------------------|| CORRECT || INCORRECT || PASS ||--------------------------------- */}
          {!expand && (
            <div className="flex items-center gap-3  justify-end py-5">
              <CustomButton
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(56,115,239,255) "
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-step-forward"
                  >
                    <line x1="6" x2="6" y1="4" y2="20" />
                    <polygon points="10,4 20,12 10,20" />
                  </svg>
                }
                disabled={passLoad}
                onClick={() => handlePassStatus()}
                style={{
                  ...ButtonStyle,
                  width: 120,
                  borderRadius: 5,
                  height: 45,
                  color: "rgba(56,115,239,255) ",
                  borderColor: "#e6e6e6",
                }}
              >
                Pass
              </CustomButton>

              <CustomButton
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#EC725D"
                    stroke="#EC725D"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-x italic "
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                }
                onClick={() => handleAction("inCorrect")}
                disabled={passLoad}
                style={{
                  ...ButtonStyle,
                  width: 120,
                  borderRadius: 5,
                  height: 45,
                  color: "#EC725D",
                  borderColor: "#e6e6e6",
                }}
              >
                Incorrect
              </CustomButton>

              {/* ---------------pass button---------------- */}

              <CustomButton
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#66af7d"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-check"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                }
                onClick={() => handleAction("correct")}
                style={{
                  ...ButtonStyle,
                  width: 110,
                  borderRadius: 5,
                  height: 45,
                  color: "#66af7d",
                  borderColor: "#e6e6e6",
                }}
              >
                Correct
              </CustomButton>
            </div>
          )}
        </section>

        <Collapse in={expand}>
          <AddSolutionForm
            initialValue={doubtId?.solutionId}
            doubtDetail={doubtId}
            handleClose={handleClose}
          />
        </Collapse>
      </div>
    </div>
  );
};
