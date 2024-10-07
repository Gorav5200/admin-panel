import React, { useEffect } from "react";
import {
  useGetDailyStreakRewardQuery,
  useGetDailyStreakTaskQuery,
  useGetTaskListQuery,
} from "../../../../services/apis/dailyStreakApi";
import { dailyStreakApi, rewardsApi } from "../../../../services/Constant";
import { Descriptions, Empty, Popover } from "antd";
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
import CreateReward from "./createReward";
import DebouncedInput from "../../../common/searchApiField";

function StreakReward() {
  const [openModal, setOpenModal] = React.useState(false);
  const [data, setData] = React.useState({});
  const [modalType, setModalType] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const count = parseInt(query.get("count") || "12", 10);
  const searchTerm = query.get("search") || "";

  const {
    data: rewardList,
    isLoading,
    isError,
    isSuccess,
    refetch,
    isFetching,
  } = useGetDailyStreakRewardQuery(
    `${
      rewardsApi.rewardsEndPoint
    }/daily/streak/list?page=${page}&count=${count}${
      searchTerm ? `&search=${searchTerm}` : ""
    }`,
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const handleEdit = (getData) => {
    setModalType("edit");
    setData(getData);
    setOpenModal(true);
  };

  console.log("🚀 ~ daily Task ~ data:", rewardList);

 
 const handleSearch = (term) => {
   navigate(
     `/main/dailyStreak?page=1&count=${count}${term ? `&search=${term}` : ""}`
   );
 };
  const handleOpenModal = () => {
    setModalType("create");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalType(null);
    setData({
      rewards: [],
      days: null,
    });
  };

  return (
    <div className="relative">
      <CreateReward
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
        data={data}
        type={modalType}
        refetch={refetch}
      />
      <header className="items-center my-2 flex justify-between">
        <div className="w-2/6">
          <DebouncedInput
            placeholder="Search by Days"
            onSearch={handleSearch}
            loading={isLoading || isFetching}
            initialValue={searchTerm}
          />
        </div>
        <CustomButton
          onClick={handleOpenModal}
          style={{
            ...CustomButtonStyle,
            borderRadius: 5,
            height: 40,
            width: 200,
            marginRight: "12px",
            ml: "auto",
          }}
        >
          + Daily Streak Reward
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

                <div className="px-2">
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                </div>
              </div>
            </Grid>
          ))
        ) : isSuccess &&
          rewardList?.data.streakRewards?.length === 0 ? (
          <div className="h-full w-full flex justify-center items-center">
            <Empty description="No Data Found" />
          </div>
        ) : (
          rewardList.data.streakRewards?.map(
            ({ days, rewards, ...others }, ind) => {
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
                          {days}
                        </Avatar>
                      }
                      action={
                        <IconButton
                          aria-label="settings"
                          onClick={() =>
                            handleEdit({
                              days: Number(days),
                              rewards: rewards?.map((e) => e._id),
                              ...others,
                            })
                          }
                        >
                          <EditNoteIcon />
                        </IconButton>
                      }
                      title={days + " - Day set"}
                      subheader={
                        <>
                          <small>Your streak Days</small>
                        </>
                      }
                    />

                    <Divider>
                      <Chip
                        label={
                          <h6 className="font-inter text-base font-medium">
                            Your Rewards : {rewards?.length || "N/A"}
                          </h6>
                        }
                      />
                    </Divider>

                    <CardContent sx={{ pt: 0 }}>
                      <List className="h-full overflow-scroll max-h-[200px]  scroll-smooth scrollbar-hide">
                        {rewards?.map((e) => (
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

export default StreakReward;
