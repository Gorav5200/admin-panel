import React, { useEffect, useState } from "react";
import { ProfileCard } from "../../../common/cards";
import {
  CustomButtonStyle,
  ButtonStyle,
  CustomButton,
  QueryEnum,
} from "../../../../styles/muiRoot";
import {
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Avatar,
  Box,
  Pagination,
  PaginationItem,
  Card,
  Chip,
ListSubheader,
CardHeader,
CardContent,
Tooltip,
ListItemIcon,
LinearProgress,
Backdrop,
} from "@mui/material";
import { Badge, Button, Empty, Result, message } from "antd";
import dayjs from "dayjs";
import ModalComp from "../../../common/modal";
import Icon from "../../../common/Icon";
import { doubtApi } from "../../../../services/Constant";
import { DoubtReAssignCard } from "./commonComp.js/cards";
import { useGetDoubtListQuery, useGetDoubtSolverListQuery ,useUpdateRequestStatusMutation as useUpdateAssignDoubtSolverMuatation} from "../../../../services/apis/doubtApi";
import DebouncedInput from "../../../common/searchApiField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../../services/common";
import { ChevronRight } from "lucide-react";


function DoubtList() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const count = parseInt(query.get("count") || "12", 10);
  const searchTerm = query.get("search") || "";
  const { handleClose, handleOpen, ModalComponent } = ModalComp();
  const [details, setDetails] = useState({});

  const { data, isLoading, isFetching, isError, refetch, isSuccess } =
    useGetDoubtListQuery(`${doubtApi.endPoint}/list`, {
      refetchOnMountOrArgChange: true,
    });

  const handleSearch = (term) => {
    navigate(`/main/doubts?page=1&count=${count}&search=${term}`);
  };

  console.log("🚀 ~ DoubtList ~ data:", data);
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
      <header className="px-4 mb-1">
        <div className="w-1/4 ">
          <DebouncedInput
            placeholder="Search by Title"
            onSearch={handleSearch}
            loading={isLoading || isFetching}
            initialValue={searchTerm}
          />
        </div>
      </header>
      {/* ---------------------------- CARD GRID---------------------------- */}
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
        {isLoading || isFetching ? (
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
        ) : isSuccess && data?.doubtNotifications?.length === 0 ? (
          <div className="h-full w-full flex justify-center items-center">
            <Empty description="No Data Found" />
          </div>
        ) : (
          data?.doubtNotifications?.map((items, ind) => {
            return (
              <Grid item key={ind} xs={12} sm={6} md={4} lg={3}>
                <DoubtReAssignCard
                  style={{ height: "39ch" }}
                  isTruncate={true}
                  {...items}
                  actions={
                    <div className="flex items-center gap-3 flex-col">
                      <div className="my-2">
                        <CustomButton
                          onClick={() => {
                            handleOpen();
                            setDetails(items);
                          }}
                          style={{
                            ...CustomButtonStyle,
                            width: 150,
                            borderRadius: 5,
                            height: 45,
                          }}
                        >
                          {items?.doubtStatus.toLowerCase() === "created"
                            ? "Assign"
                            : "Re-Assign"}
                        </CustomButton>
                      </div>
                    </div>
                  }
                  {...items}
                />
              </Grid>
            );
          })
        )}
      </Grid>

      {/* ------------------IMPORT ASSIGN-DOUBT MODAL------------------------ */}
      <ModalComponent>
        <AssignDoubt
          handleClose={handleClose}
          cardDetail={details}
          refetchList={refetch}
        />
      </ModalComponent>

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
    </div>
  );
}

//=================================ASSIGN DOUBT MODAL ======================================= //
const AssignDoubt = ({ handleClose, cardDetail ,refetchList }) => {
console.log("🚀 ~ AssignDoubt ~ cardDetail:", cardDetail)


 const { data, isLoading, isFetching, isError, isSuccess } =useGetDoubtSolverListQuery(
        `${doubtApi.endPoint}/solver/list/${cardDetail._id}/${cardDetail.entityType}`,
        {
          refetchOnMountOrArgChange: true,
        }
      );
  const [
   updateAssignDoubtSolver,
    { isLoading: updateLoading, isError: statusError },
  ] = useUpdateAssignDoubtSolverMuatation();

   const handleAssign = async (id) => {
     try {
       const response = await updateAssignDoubtSolver({
         endpoint: `${doubtApi.endPoint}/assign`,
         data: {
          doubtId:cardDetail._id,
          doubtSolverId:id
         },
       });

       if (response.data && response.data.success) {
         handleClose();
         message.info("Assigned");
         refetchList();
       } else {
         message.error(response.message);
       }
     } catch (error) {
       console.error("Error add Assignment api:", error);
     }
   };


  console.log("🚀 ~ AssignDoubt ~ data:", data);

  const { createdBy } = cardDetail;

// -------------------------ASSIGN LIST----------------//
  const AssignList = () => {
    return (
      <List
        dense
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        {isLoading || isFetching
          ? [...Array(30)].map((_, index) => (
              <ListItem key={`loading-${index}`} sx={{ gap: 2 }}>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={38} />
                </ListItemAvatar>
                <ListItemText>
                  <Skeleton variant="rounded" width="100%">
                    <div style={{ paddingTop: "10%" }} />
                  </Skeleton>
                </ListItemText>
                <ListItemText>
                  <Skeleton variant="rounded" width="100%">
                    <div style={{ paddingTop: "10%" }} />
                  </Skeleton>
                </ListItemText>
                <ListItemText>
                  <Skeleton variant="rounded" width="100%">
                    <div style={{ paddingTop: "10%" }} />
                  </Skeleton>
                </ListItemText>
                <ListItemText>
                  <Skeleton variant="rounded" width="100%">
                    <div style={{ paddingTop: "10%" }} />
                  </Skeleton>
                </ListItemText>
              </ListItem>
            ))
          : data?.solverList.map(
              (
                { name, profilePic, _id, notified, status, requestStatus },
                i
              ) => {
                const labelId = `checkbox-list-secondary-label-${i}`;
                return (
                  <React.Fragment key={i}>
                    <ListItem
                      sx={{ py: 2, px: 0, width: "100%" }}
                      disablePadding
                      secondaryAction={
                        <Button
                          onClick={() => handleAssign(_id)}
                          style={{
                            ...ButtonStyle,
                            borderRadius: 5,
                            height: 40,
                            width: 108,
                            marginRight: "12px", // Adjust the margin as needed
                          }}
                        >
                          Assign
                        </Button>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt="Travis Howard"
                          src={profilePic}
                          sx={{ width: 40, height: 40 }}
                        />
                      </ListItemAvatar>
                      <Box
                        sx={{
                          display: "flex",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <ListItemText
                          secondary={
                            notified && (
                              <Chip
                                size="small"
                                label={requestStatus}
                                sx={{ borderRadius: 1, fontSize: 12 }}
                              ></Chip>
                            )
                          }
                          id={`${labelId}-name`}
                          primary={name}
                          sx={{ flex: 1 }}
                        />
                        <ListItemText
                          id={`${labelId}-id`}
                          primary={`ID: ${_id}`}
                          sx={{ flex: 1 }}
                        />
                        <ListItemText
                          id={`${labelId}-status`}
                          primary={
                            <div className="flex items-center">
                              <Icon
                                name="Dot"
                                color={status === "active" ? "green" : "red"}
                                size="35"
                              />{" "}
                              {capitalizeFirstLetter(status)}
                            </div>
                          }
                          sx={{ flex: 1 }}
                        />
                      </Box>
                    </ListItem>

                    <Divider />
                  </React.Fragment>
                );
              }
            )}
      </List>
    );
  };

  return (
    <div className="max-h-[80vh] w-[50vw] overflow-scroll">
      <LinearProgress
        color="inherit"
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 2,
          opacity: isLoading || isFetching || updateLoading ? 1 : 0,
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
     
        }}
        open={isLoading || isFetching || updateLoading}
      />
      <header className="ps-2 flex justify-between items-center">
        <h4 className="text-xl font-inter font-semibold">Assign To</h4>
        <IconButton
          onClick={() => {
            handleClose();
          }}
        >
          <Icon name="X" size="25" />
        </IconButton>
      </header>
      <Divider />

      <br />

      <Card
        sx={{
          width: "100%",
          fontFamily: "var(--font-inter)",
          borderRadius: 2,
          p: 1,
          height: "fit-content",
          // boxShadow: "none",
          position: "relative",
        }}
      >
        <Chip
          className="absolute top-0 right-0  "
          label="Group Query"
          sx={{
            background:
              cardDetail?.type && cardDetail.type === "group"
                ? QueryEnum.GROUP
                : cardDetail.type === "class"
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
              src={cardDetail?.createdBy?.profilePic}
              sx={{ width: 50, height: 50 }}
            />
          }
          title={
            <div className="flex items-center font-inter ">Doubt Info</div>
          }
          subheader={
            <div className="text-sm font-inter ">
              {" "}
              {cardDetail?.createdBy?._id}
            </div>
          }
        />
        <Divider />
        {/* --------------Details Section----------- */}
        <CardContent className="text-sm font-inter font-[600] text-primary">
          <h4 className="text-sm text-secondary flex items-center">
            Group - {cardDetail?.groupId?.title} <ChevronRight size="15" />{" "}
            Topic: {/* {topicId?.title} */}
          </h4>
          <p className="text-sm font-normal my-2 min-h-[30px]">
            {cardDetail.isTruncate ? (
              <Tooltip placement="top" arrow title={cardDetail?.title}>
                {cardDetail?.title}
              </Tooltip>
            ) : (
              cardDetail?.title
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
                      <Avatar alt="Natacha" src={createdBy?.profilePic} />
                    }
                    label={createdBy?.name}
                    variant="outlined"
                  />
                ),
              },
              {
                label: "Status",
                component: (
                  <Chip
                    label={capitalizeFirstLetter(cardDetail?.doubtStatus)}
                    color="success"
                  />
                ),
              },

              {
                label: "Date Created",
                component: dayjs(cardDetail?.createdAt)?.format("L"),
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
                <ListItemAvatar>{component}</ListItemAvatar>
              </ListItem>
            ))}
          </List>
          <div className="flex gap-3 justify-start flex-wrap">
            {cardDetail?.media?.map((url) => {
              return url?.startsWith("data:video/") || url?.endsWith(".mp4") ? (
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
            {dayjs.utc(cardDetail?.createdAt)?.format(`MMMM D, YYYY`)}
          </p>
        </footer>
      </Card>

      <div className="mt-[-10px] p-2">
        <AssignList />
      </div>
    </div>
  );
};

export default DoubtList;
