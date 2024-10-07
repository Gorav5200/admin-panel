import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  CardContent,
  Chip,
  Fade,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { IndianRupee } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { learnApi } from "../../../../services/Constant";
import { HeaderWithNavigation } from "../../../common/header";
import Icon from "../../../common/Icon";
import { HTMLConverter } from "../../../../services/common";
import { createLearn } from "../../../../ducks/learnSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Empty, Image } from "antd";
import VideoPlayer from "../../../common/videoPlayer";
import { toast } from "react-toastify";
import { useGetLearnListQuery } from "../../../../services/apis/learnApi";
import { setLearnTopicDetail } from "../../../../ducks/learnSlice";
import { BorderLessAccordion } from "../../../common/accordian";
import SwiperComp from "../../../common/swiper";
import {
  CustomButtonStyle,
  ButtonStyle,
  CustomButton,
} from "../../../../styles/muiRoot";
import SmallSwiper from "../../../common/imageSwiper";

// import "swiper/css";

const LearnDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [viewIndex, setViewIndex] = useState(0);
  const { learnTopicDetail } = useSelector((state) => state.learn);
  const {
    data: getDetails,
    isLoading,
    isFetching,
  } = useGetLearnListQuery(`${learnApi.endPoint}/${params.learnId}`, {
    refetchOnMountOrArgChange: true,
  });

  const mergeData = useMemo(() => {
    if (learnTopicDetail && learnTopicDetail.concepts) {
      const data = [...learnTopicDetail.concepts];
      return data.sort((a, b) => a.sequence - b.sequence);
    } else {
      return [];
    }
  }, [dispatch, learnTopicDetail]);

  console.log("🚀 ~ mergeData ~ mergeData:", mergeData);

  const cardStyle = {
    backgroundColor: "white",
    border: "1px solid #D9DBDD",
    width: "100%",
    minHeight: "242px",
  };

  useEffect(() => {
    if (getDetails) {
      dispatch(setLearnTopicDetail(getDetails?.data.learnData));
    }
  }, [getDetails]);

  const handleEdit = async () => {
    const { topic, subject, subTopic, notes, videos, concepts, ...others } =
      learnTopicDetail;

    console.log("datatatta", {
      topic: topic._id,
      subTopic: subTopic._id,
      subject: subject[0]._id,
      ...others,
    });

    try {
      await Promise.all([
        dispatch(
          createLearn({
            topic: topic._id,
            subTopic: subTopic._id,
            subject: subject[0]._id,
            concepts: concepts.map(({ notes, videos, ...rest }) => ({
              ...rest,
              notes: notes.map(({ _id }) => _id),
              videos: videos.map(({ _id }) => _id),
              
            })),
            ...others,
          })
        ),
      ]);
      navigate(`/main/exam/learn/${params.learnId}/edit`);
    } catch (error) {
      toast.error(error);
    }
  };

  console.log("🚀 ~ LearnDetail ~ getDetails:", getDetails);

  return (
    <div className="h-screen">
      {/* headerr */}
      <HeaderWithNavigation
        cont={
          <div>
            <h2 className="text-darkblue text-2xl font-bold font-inder">
              {" "}
              {learnTopicDetail?.title || "N/A"}
            </h2>
            <h4 className="text-darkblue text-base font-medium font-inder">
              {" "}
              {/* {learnTopicDetail?.title} */}
            </h4>
          </div>
        }
      />

      {!isLoading && (
        <div className="flex gap-3 ">
          {/* Left side div */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              flexBasis: "25%",
              p: 1,
              overflow: "scroll",
              height: "93vh",
            }}
          >
            {isLoading || isFetching ? (
              <div className="h-full w-full">
                <Skeleton variant="rounded" width={"100%"} height={"100%"} />
              </div>
            ) : (
              <>
                <Stack
                  direction={"row"}
                  spacing={2}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  mb={1.5}
                  p={1}
                  bgcolor={"var(--med-grey)"}
                  borderRadius={1}
                >
                  <h6 className="text-[#1e1e1e] font-medium font-inter text-base">
                    {learnTopicDetail?.title}
                  </h6>

                  {learnTopicDetail.paid?.status === true && (
                    <div className="p-2 flex items-end  mt-3 float-right text-[#2b601b]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-hand-coins"
                      >
                        <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
                        <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
                        <path d="m2 16 6 6" />
                        <circle cx="16" cy="9" r="2.9" />
                        <circle cx="6" cy="5" r="3" />
                      </svg>
                      <h6 className="text-[#2b601b] font-medium font-inter text-sm">
                        Coins:{learnTopicDetail.coin}
                      </h6>
                    </div>
                  )}
                </Stack>
                <div className="justify-between flex items-center">
                  <h6 className=" text-base font-bold  text-[#383838] my-2 flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-notebook-tabs"
                    >
                      <path d="M2 6h4" />
                      <path d="M2 10h4" />
                      <path d="M2 14h4" />
                      <path d="M2 18h4" />
                      <rect width="16" height="20" x="4" y="2" rx="2" />
                      <path d="M15 2v20" />
                      <path d="M15 7h5" />
                      <path d="M15 12h5" />
                      <path d="M15 17h5" />
                    </svg>
                    {learnTopicDetail?.subject?.[0]?.title}
                  </h6>
                  <Chip
                    sx={{
                      borderRadius: 12,
                      bgcolor: "var(--dark-blue)",
                      color: "#fff",
                      fontWeight: "500",
                      lineHeight: 24,
                    }}
                    label={
                      <h6 className=" font-medium font-inter text-sm">
                        {learnTopicDetail.paid?.status === true
                          ? ` Charges:${learnTopicDetail?.paid.charge}`
                          : "Free"}
                      </h6>
                    }
                  />
                </div>
                <Divider />

                <p className="text-gray-800 text-sm text-justify font-inter py-2">
                  {learnTopicDetail.description}
                </p>

                {learnTopicDetail?.description && <Divider />}
                <h6 className=" text-base font-bold  text-[#383838] my-2">
                  Topic and Sub-Topics ::
                </h6>
                <div className="flex justify-between items-end">
                  <BorderLessAccordion
                    header={
                      <h6 className=" text-sm font-medium text-gray-800">
                        {learnTopicDetail?.topic?.title}
                      </h6>
                    }
                    content={
                      <ul className="list-disc">
                        <li className="text-gray-700 text-xs ">
                          {learnTopicDetail?.subTopic?.title}
                        </li>
                      </ul>
                    }
                    id={learnTopicDetail?.topic?._id}
                  />
                </div>
              </>
            )}
          </Paper>
          {/* Right div */}

          <Box
            sx={{
              backgroundColor: "white",
              flexBasis: "75%",
              padding: "10px",
              borderRadius: "5px",
              borderRadius: 2,
              overflow: "hidden",
              height: "93vh",
            }}
          >
            {!isLoading && (
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
            )}

            <Divider />
            <Stack
              sx={{ overflowX: "scroll", p: 2, width: "max-content" }}
              direction={"row"}
              spacing={3}
            >
              {isLoading || isFetching ? (
                <>
                  {[...Array(10)].map(() => (
                    <Skeleton
                      width={100}
                      height={50}
                      variant="rounded"
                      sx={{ borderRadius: 8 }}
                    />
                  ))}
                </>
              ) : (
                mergeData?.map(({ title }, ind) => (
                  <CustomButton
                    sx={{
                      ...CustomButtonStyle,
                      background:
                        viewIndex === ind ? "var(--primary)" : "transparent",
                      color: viewIndex === ind ? "white" : "black",
                      borderRadius: 10,
                      width: "fit-content",
                      minWidth: 120,
                      height: 40,
                      p: 2,
                      "&:hover": {
                        background: viewIndex === ind ? "var(--primary)" : "transparent",
                        color: viewIndex === ind ? "white" : "black",
                      },
                    }}
                    variant="outlined"
                    label={title}
                    onClick={() => setViewIndex(ind)}
                  >
                    {title}
                  </CustomButton>
                ))
              )}
            </Stack>
            <Divider />
            <div className=" overflow-scroll h-[75vh] mt-2">
              <Stack
                direction={"column"}
                spacing={2}
                justifyContent={"flex-end"}
              >
                {isLoading || isFetching ? (
                  <div className="flex flex-col gap-5">
                    {[...Array(10)].map(() => (
                      <Skeleton width={"100%"} height={242} variant="rounded" />
                    ))}
                  </div>
                ) : mergeData.length === 0 ? (
                  <div className="flex justify-center  items-center h-[75vh]">
                    <Empty />
                  </div>
                ) : (
                  <Fade in={true} key={viewIndex}>
                    <div key={mergeData[viewIndex].id} className="w-full">
                      <Card
                        key={mergeData[viewIndex].id}
                        elevation={0}
                        sx={{ ...cardStyle }}
                      >
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <h5 className="text-base float-left font-bold  mb-2">
                              {mergeData[viewIndex].title || "N/A"}
                            </h5>
                          </div>
                          <div className=" my-2">
                            <HTMLConverter>
                              {mergeData[viewIndex]?.content}
                            </HTMLConverter>
                          </div>

                          <div className="flex justify-start items-start gap-10 my-5">
                            {/* <Image
                              width={200}
                              height={200}
                              src={
                                (mergeData[viewIndex]?.images.length > 0 &&
                                  mergeData[viewIndex].images[0]) ||
                                null
                              }
                              style={{
                                borderRadius: "10px",
                                border: "1px solid #D9DBDD",
                              }}

                              
                            /> */}
                            <div className="w-[270px] h-[200px]">
                              <SmallSwiper
                                style={{ width: 200, height: 200 }}
                                data={
                                  mergeData[viewIndex]?.images.length > 0
                                    ? mergeData[viewIndex].images
                                    : []
                                }
                              />
                            </div>

                            <VideoPlayer
                              videoUrl={
                                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
                              }
                            />
                          </div>
                        </CardContent>{" "}
                        <Divider />
                        <Box
                          sx={{
                            width: "60vw",
                            height: "auto",
                            // bgcolor: "red",

                            textAlign: "center",
                            p: 2,
                          }}
                        >
                          <SwiperComp
                            content={mergeData[viewIndex].questions}
                          />
                        </Box>
                      </Card>
                    </div>
                  </Fade>
                )}
              </Stack>
            </div>
          </Box>
        </div>
      )}
    </div>
  );
};

export default LearnDetail;
