import React, { useEffect } from "react";
import {
  useGetDailyStreakTaskQuery,
  useGetTaskListQuery,
} from "../../../../services/apis/dailyStreakApi";
import { dailyStreakApi } from "../../../../services/Constant";
import { Descriptions, Empty, Popover } from "antd";
import { useDispatch } from "react-redux";
import {
  setDailyStreakTaskDetail,
  setTaskDetail,
} from "../../../../ducks/dailyStreakSlice";
import {
  Card,
  Avatar,
  CardContent,
  IconButton,
  CardHeader,
  ListItem,
  ListItemText,
  List,
  ListItemIcon,
  Divider,
  Chip,
  CardActions,
  Tooltip,
  Grid,
  Skeleton,
  Pagination,
  PaginationItem,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { DotIcon } from "lucide-react";
import {
  dateFormattingString,
  randomColors,
  truncateTitle,
} from "../../../../services/common";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CustomButton, CustomButtonStyle } from "../../../../styles/muiRoot";
import DebouncedInput from "../../../common/searchApiField";

function StreakTask() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const count = parseInt(query.get("count") || "12", 10);
  const searchTerm = query.get("search") || "";

  const { data, isLoading, isError, isSuccess, isFetching } =
    useGetDailyStreakTaskQuery(
      `${dailyStreakApi.endPoint}/list?page=${page}&count=${count}${
        searchTerm ? `&search=${searchTerm}` : ""
      }`,
      {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
      }
    );

  const handleEdit = (data) => {
    console.log("🚀 ~ handleEdit ~ data:", data)
    dispatch(setDailyStreakTaskDetail(data));
    navigate(`/main/dailyStreak/taskList/edit/${data._id}`);
  };


    const handleSearch = (term) => {
      navigate(
        `/main/dailyStreak?page=1&count=${count}${
          term ? `&search=${term}` : ""
        }`
      );
    };

  console.log("🚀 ~ daily Task ~ data:", data);

 
  return (
    <div className="relative">
      <header className="items-center my-2 flex justify-between">
        <div className="w-2/6">
          <DebouncedInput
            placeholder="Search by Title"
            onSearch={handleSearch}
            loading={isLoading || isFetching}
            initialValue={searchTerm}
          />
        </div>
        <CustomButton
          onClick={() => navigate(`/main/dailyStreak/taskList/create`)}
          style={{
            ...CustomButtonStyle,
            borderRadius: 5,
            height: 40,
            width: 180,
            marginRight: "12px", // Adjust the margin as needed
          }}
        >
          + Add Daily Streak Task
        </CustomButton>
      </header>

      <Grid
        container
        spacing={2}
        sx={{
          mt: 1,
          alignItems: "flex-start",
          height: "80vh",
          overflow: "scroll",
          position: "relative",
          pb: 10,
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
        ) : isSuccess && data && data?.data.dailyStreak.length === 0 ? (
          <div className="h-full w-full flex justify-center items-center">
            <Empty description="No Data Found" />
          </div>
        ) : (
          data.data?.dailyStreak?.map(
            (
              { _id, title, activities, date, description, rewardId, taskId },
              ind
            ) => {
              const color = randomColors([
                "#ff7f0e",
                "#1f77b4",
                "#2ca02c",
                "#d62728",
                "#9467bd",
                "#8c564b",
                "#e377c2",
                "#7f7f7f",
                "#bcbd22",
                "#17becf",
              ]);
              return (
                <Grid item key={ind} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      width: 345,
                      height: 300,
                      borderLeft: `5px solid ${color}`,
                      overflow: "scroll",
                    }}
                  >
                    <CardHeader
                      sx={{
                        position: "sticky",
                        top: 0,
                        background: "white",
                        alignItems: "flex-start",
                      }}
                      avatar={
                        <Avatar sx={{ bgcolor: color }} aria-label="recipe">
                          {title.charAt(0)}
                        </Avatar>
                      }
                      action={
                        <IconButton
                          aria-label="settings"
                          onClick={() =>
                            handleEdit({
                              _id,
                              title,
                              activities: activities?.map((e) => e._id),
                              date,
                              description,
                              rewardId: rewardId?.map((e) => e._id),
                              taskId: taskId?._id,
                            })
                          }
                        >
                          <EditNoteIcon />
                        </IconButton>
                      }
                      title={title}
                      subheader={
                        <>
                          <small> {dateFormattingString(date)}</small>

                          <p className="min-h-[30px] max-h-min overflow-scroll text-sm text-justify">
                            <Tooltip title={description} arrow>
                              {truncateTitle(description, 10)}
                            </Tooltip>
                          </p>
                        </>
                      }
                    />
                    <CardContent>
                      <Descriptions
                        size="small"
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
                            label: "Task",
                            children: taskId?.title,
                            span: 3,
                          },
                          {
                            key: "2",
                            span: 3,
                            label: "Rewards",
                            children: (
                              <Popover
                                content={
                                  rewardId?.length > 0 ? (
                                    <List>
                                      {rewardId?.map((e) => (
                                        <>
                                          <ListItem
                                            disableGutters
                                            disablePadding
                                            key={e?._id}
                                          >
                                            <ListItemIcon>
                                              <DotIcon color="black" />
                                            </ListItemIcon>
                                            <ListItemText>
                                              <span className="text-sm ">
                                                {e?.title}
                                              </span>
                                            </ListItemText>
                                          </ListItem>
                                          <Divider />
                                        </>
                                      ))}
                                    </List>
                                  ) : (
                                    <Empty
                                      description="No Rewards"
                                      size="small"
                                    />
                                  )
                                }
                                title="Rewards"
                                trigger="hover"
                              >
                                <button>Hover to</button>
                              </Popover>
                            ),
                          },
                        ]}
                      />
                    </CardContent>

                    <Divider>
                      <Chip
                        label={
                          <h6 className="font-inter text-base font-medium">
                            Your Activities : {activities?.length || "N/A"}
                          </h6>
                        }
                      />
                    </Divider>

                    <CardContent sx={{ pt: 0 }}>
                      <List className="h-full overflow-scroll max-h-[200px]  scroll-smooth scrollbar-hide">
                        {activities?.map((e) => (
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
                    </CardContent>
                  </Card>
                </Grid>
              );
            }
          )
        )}
      </Grid>

      <div className="absolute bottom-0 left-0 p-2 text-center w-full bg-lightGrey flex justify-center border-t">
        <Pagination
          page={page}
          count={Math.ceil(data?.data?.totalItems / count) || 1}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/main/dailyStreak?page=${item.page}&count=${count}${
                searchTerm ? `&search=${searchTerm}` : ""
              }`}
              {...item}
            />
          )}
        />
      </div>
    </div>
  );
}

export default StreakTask;
