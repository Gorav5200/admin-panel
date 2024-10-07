import React, { useEffect, useState } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import {
  CustomButtonStyle,
  ButtonStyle,
  CustomButton,
} from "../../../../styles/muiRoot";
import {
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Backdrop,
  LinearProgress,
  Pagination,
  PaginationItem,
  Card,
  Chip,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Avatar,
  Tooltip,
  ListItem,
  List,
  ListItemText,
  ListItemAvatar,
  ListSubheader,
  Stack,
} from "@mui/material";
import { Button, Descriptions, Empty, Image, Result } from "antd";
import ModalComp from "../../../common/modal";
import {
  ChevronRight,
  ChevronsRight,
  XIcon,
  
} from "lucide-react";
import { doubtApi } from "../../../../services/Constant";
import { DoubtCard } from "./commonComp.js/cards";
import {
  useGetSolutionByIdQuery,
  useGetDoubtListQuery as useGetSolveDoubtQuery,
} from "../../../../services/apis/doubtApi";
import DebouncedInput from "../../../common/searchApiField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { QueryEnum } from "../../../../styles/muiRoot";
import dayjs from "dayjs";
import { Attachment } from "@mui/icons-material";
import VideoPlayer from "../../../common/videoPlayer";
import {
  capitalizeFirstLetter,
  truncateTitle,
} from "../../../../services/common";


function DoubtSolve() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const count = parseInt(query.get("count") || "12", 10);
  const searchTerm = query.get("search") || "";
  const { handleClose, handleOpen, ModalComponent } = ModalComp();
  const { userInfo } = useSelector((state) => state.users);
  const [detail, setDetail] = useState({});

  const { data, isLoading, isFetching, isError, refetch, isSuccess } =
    useGetSolveDoubtQuery(
      `${doubtApi.endPoint}/solution/list/${userInfo._id}`,
      {
        refetchOnMountOrArgChange: true,
      }
    );

  const handleSearch = (term) => {
    navigate(`/main/doubt?page=1&count=${count}&search=${term}`);
  };

  if (isError) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <Result
          status="404"
          title="404"
          subTitle={"Some error occurred to fetch data"}
          extra={
            <Button type="primary" onClick={() => refetch()}>
              Refech-again
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <header className="px-4 mb-1 flex justify-between items-center">
        <div className="w-1/4 ">
          <DebouncedInput
            placeholder="Search by Title"
            onSearch={handleSearch}
            loading={isLoading || isFetching}
            initialValue={searchTerm}
          />
        </div>
      </header>

      <Grid
        container
        spacing={2}
        sx={{
          alignItems: "flex-start",
          height: "82vh",
          mt: 1,
          overflow: "scroll",
          position: "relative",
          pb: 10,
          px: 2,
        }}
      >
        <Divider />
        {
          (isLoading||
          isFetching ? (
            Array.from({ length: 20 }).map((_, ind) => (
              <Grid item key={ind} xs={12} sm={6} md={4} lg={3}>
                <div key={ind} className="skeleton-card p-2 ">
                  <div className="flex gap-4 w-full justify-start px-2">
                    <Skeleton height={50} width={60} variant="circular" />
                    <Skeleton variant="rounded" width={"100%"} height={80} />
                  </div>

                  <div className="flex gap-2 w-full justify-center p-2">
                    <Skeleton height={50} width={"100%"} />
                    <Skeleton height={50} width={"100%"} />
                  </div>
                  <div className="px-2">
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                  </div>
                </div>
              </Grid>
            ))
          ) : isSuccess &&
            isSuccess &&
            (data?.doubtNotifications?.length === 0) === 0 ? (
            <div className="h-full w-full flex justify-center items-center">
              <Empty description="No Data Found" />
            </div>
          ) : (
            data?.doubtNotifications?.map((item, ind) => {
              return (
                <Grid item key={ind} xs={12} sm={6} md={4} lg={3}>
                  <DoubtCard
                    style={{ height: "23rem", overflow: "Scroll" }}
                    actions={
                      <button
                        onClick={() => {
                          handleOpen();
                          setDetail(item);
                        }}
                        className="relative  z-10 flex items-center justify-center overflow-hidden w-auto p-2 h-10 bg-gray-700 text-white border-none text-sm font-bold group rounded-3xl cursor-pointer "
                      >
                        View Details
                        <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
                        <span className="absolute w-36 h-32 -top-8 -left-2 bg-gray-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
                        <span className="absolute w-36 h-32 -top-8 -left-2 bg-gray-600 rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
                        <span className="absolute top-2.5 z-10 opacity-0 group-hover:opacity-100 group-hover:duration-1000 duration-100 flex pl-2">
                          Go <ChevronsRight />
                        </span>
                      </button>
                    }
                    {...item}
                  />
                </Grid>
              );
            })
          ))
        }
      </Grid>

      <div className="absolute bottom-0 left-0 p-2 text-center w-full bg-lightGrey flex justify-center border-t">
        <Pagination
          page={page}
          count={Math.ceil(data?.data?.totalItems / count) || 1}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/main/doubt?page=${item.page}&count=${count}${
                searchTerm && `&{search=${searchTerm}}`
              }`}
              {...item}
            />
          )}
        />
      </div>
      {/* ----------------------------IMPORT VIEW SOLUTION M3ODAL --------------------------------- */}
      <ModalComponent>
        <ViewSolutionModal
          handleClose={handleClose}
          id={detail?.doubtId?._id}
        />
      </ModalComponent>
    </div>
  );
}
//================================VIEW SOLUTION MODAL========================================= //
const ViewSolutionModal = ({ handleClose, id }) => {
  const { data, isLoading, isFetching } = useGetSolutionByIdQuery(
    `${doubtApi.endPoint}/assigned/detail/${id}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [detail, setDetail] = useState({});

  useEffect(() => {
    if(data){
     setDetail(data.doubtAssignedDetail);
    }
  }, [data])

  const { doubtId, 
doubtSolverId
,...others } = detail;

  console.log("🚀 ~ ViewSolutionModal ~ data:", detail);

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
          opacity: isLoading || isFetching ? 1 : 0,
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
        open={isLoading || isFetching}
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
                      <Chip
                      
                        label={
                          <span className="font-inter">
                            {capitalizeFirstLetter(doubtId?.doubtStatus)}
                          </span>
                        }
                        sx={{
                          bgcolor:"rgb(250, 218, 94)",
                          color: "black",
                        }}
                      />
                    ),
                  },

                  {
                    label: "Date Created",
                    component: (
                      <Stack gap={1} direction={"row"} alignItems={"center"}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#055deb"
                          stroke-width="2.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-calendar"
                        >
                          <path d="M8 2v4" />
                          <path d="M16 2v4" />
                          <rect width="18" height="18" x="3" y="4" rx="2" />
                          <path d="M3 10h18" />
                        </svg>
                        {dayjs(doubtId?.createdAt)?.format("L")}
                      </Stack>
                    ),
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
                    <ListItemAvatar sx={{textAlign:"right"}}>{component}</ListItemAvatar>
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
              <p className="text-right text-secondary text-xs absolute bottom-2 right-2">
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
              height: "fit-content",
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
                      <Chip
                        label={
                          <span className="font-inter">
                            {capitalizeFirstLetter(detail?.status)}
                          </span>
                        }
                        sx={{
                          bgcolor: "rgba(221,255,221,1.1)",
                          color: "black",
                        }}
                        icon={<></>}
                      />
                    ),
                  },
                  {
                    label: "Earned Points",
                    component: (
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0bc129"
                          stroke-width="2.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-coins"
                        >
                          <circle cx="8" cy="8" r="6" />
                          <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
                          <path d="M7 6h1v4" />
                          <path d="m16.71 13.88.7.71-2.82 2.82" />
                        </svg>
                        {detail?.earnedPoints ?? "N/A"}
                      </div>
                    ),
                  },
                  {
                    label: "Earned Coins ",
                    component: (
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#e4be01"
                          stroke-width="2.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-coins-stack"
                        >
                          <ellipse cx="12" cy="6" rx="9" ry="3" />
                          <path d="M3 10c0 1.7 4 3 9 3s9-1.3 9-3" />
                          <path d="M3 14c0 1.7 4 3 9 3s9-1.3 9-3" />
                          <path d="M3 6v12c0 1.7 4 3 9 3s9-1.3 9-3V6" />
                        </svg>
                        {detail?.earnedCoins ?? "N/A"}
                      </div>
                    ),
                  },
                  {
                    label: "Time Consumed",
                    component: <p>N/A</p>,
                  },

                  {
                    label: "Date Created",
                    component: (
                      <Stack gap={1} direction={"row"} alignItems={"center"}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#055deb"
                          stroke-width="2.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-calendar"
                        >
                          <path d="M8 2v4" />
                          <path d="M16 2v4" />
                          <rect width="18" height="18" x="3" y="4" rx="2" />
                          <path d="M3 10h18" />
                        </svg>
                        {dayjs(doubtId?.solutionId?.createdAt)?.format("L")}
                      </Stack>
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

        <h4 className="text-xl font-inter font-base mt-4 font-semibold p-2">
          Solution
        </h4>
        <Divider />
        <section className="mt-2 text-left p-2">
          <h3 className="fon-inter text-base">{doubtId?.solutionId?.title}</h3>
          <p className="text-sm font-inter text-gray-600  font-normal">
            {doubtId?.solutionId?.description}
          </p>

          <br />
          <h4 className="text-sm  font-inter mb-2  font-light">
            {" "}
            <Attachment />
            Attachments
          </h4>
          {doubtId?.solutionId.media?.map((url) => {
            return url?.startsWith("data:video/") || url?.endsWith(".mp4") ? (
              <VideoPlayer videoUrl={url} />
            ) : url?.endsWith(".pdf") || url?.endsWith("pptx") ? (
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
                  height: 200,
                  height: "auto",
                  objectFit: "contain",
                }}
                src={url}
              />
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default DoubtSolve;
