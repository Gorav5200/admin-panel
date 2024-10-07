import React, { useEffect } from "react";
import {
  useGetDailyStreakRewardQuery,
  useGetTaskListQuery,
} from "../../../../services/apis/dailyStreakApi";
import { dailyStreakApi } from "../../../../services/Constant";
import { Empty } from "antd";
import { useDispatch } from "react-redux";
import { setTaskDetail, setTaskList } from "../../../../ducks/dailyStreakSlice";
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
  Grid,
  Skeleton,
  PaginationItem,
  Pagination,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { DotIcon } from "lucide-react";
import {
  dateFormattingString,
  randomColors,
} from "../../../../services/common";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CustomButton, CustomButtonStyle } from "../../../../styles/muiRoot";
import DebouncedInput from "../../../common/searchApiField";

function Task() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const count = parseInt(query.get("count") || "12", 10);
  const searchTerm = query.get("search") || "";

  const { data, isLoading, isError, isSuccess, isFetching } =
    useGetTaskListQuery(
      `${dailyStreakApi.endPoint}/task/list?page=${page}&count=${count}${
        searchTerm ? `&search=${searchTerm}` : ""
      }`,
      {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
      }
    );

  useEffect(() => {
    if (data) {
      dispatch(setTaskList(data?.data.dailyTask));
    }
  }, [data]);

  const handleEdit = (_id, title, activities) => {
    dispatch(
      setTaskDetail({ _id, title, activities: activities.map((e) => e._id) })
    );
    navigate(`/main/dailyStreak/task/edit/${_id}`);
  };

  const handleSearch = (term) => {
    navigate(
      `/main/dailyStreak?page=1&count=${count}${term ? `&search=${term}` : ""}`
    );
  };
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
          onClick={() => navigate(`/main/dailyStreak/task/create`)}
          style={{
            ...CustomButtonStyle,
            borderRadius: 5,
            height: 40,
            width: 108,
            marginRight: "12px", // Adjust the margin as needed
          }}
        >
          + Add Task
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
              <div key={ind} className="skeleton-card ">
                <Skeleton variant="rounded" width={"100%"} height={168} />
                <Skeleton />
                <Skeleton width="60%" />
              </div>
            </Grid>
          ))
        ) : isSuccess && data && data?.data.dailyTask.length === 0 ? (
          <>
            <div className="h-full w-full flex justify-center items-center">
              <Empty description="No Data Found" />
            </div>
          </>
        ) : (
          data?.data?.dailyTask?.map(
            ({ _id, title, activities, createdAt }, ind) => {
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
                      minWidth: 345,
                      height: 300,
                      borderLeft: `5px solid ${color}`,
                    }}
                  >
                    <CardHeader
                      sx={{ position: "sticky", top: 0, bgColor: "white" }}
                      avatar={
                        <Avatar sx={{ bgcolor: color }} aria-label="recipe">
                          {title.charAt(0)}
                        </Avatar>
                      }
                      action={
                        <IconButton
                          aria-label="settings"
                          onClick={() => handleEdit(_id, title, activities)}
                        >
                          <EditNoteIcon />
                        </IconButton>
                      }
                      title={title}
                      subheader={dateFormattingString(createdAt)}
                    />

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

export default Task;
