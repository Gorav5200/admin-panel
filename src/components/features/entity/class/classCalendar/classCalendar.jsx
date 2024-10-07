import React, { useState, useEffect } from "react";
import {
  Box,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { ChevronLeft, Dot } from "lucide-react";
import { ChevronRight } from "lucide-react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Checkbox from "@mui/material/Checkbox";
import { randomColors } from "../../../../../services/common";
import {
  useGetCalenderListQuery,
  useLazyGetCalenderDetailQuery,
} from "../../../../../services/apis/exam/class";
import { classApi } from "../../../../../services/Constant";
import dayjs from "dayjs";
import { Empty } from "antd";

const label = { inputProps: { "aria-label": "Checkbox demo" } };


const ClassCalendar = () => {
  const [age, setAge] = React.useState("");

  const [idObject, setIdObject] = useState(null);
  const [detail, setDetail] = useState({});

  const {
    data: getList,
    isLoading,
    isFetching,
    isError,
  } = useGetCalenderListQuery(`${classApi.endPoint}/list/calendar`, {
    refetchOnMountOrArgChange: true,
  });

  const [
    trigger,
    {
      data: getDetail,
      isLoading: detailLoad,
      isError: detailError,
      isFetching: detailFetch,
    },
  ] = useLazyGetCalenderDetailQuery();

  useEffect(() => {
    if (getDetail) {
      setDetail(getDetail?.data?.calendarDetail);
    }
  }, [getDetail]);

  const fetchDetails = () => {
    trigger(`${classApi.endPoint}/calendar/${idObject?._id}`);
  };

  useEffect(() => {
    if (idObject) {
      fetchDetails();
    }
  }, [idObject]);

  console.log("🚀 ~ ClassCalendar ~ detail:", detail);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const data = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 4,
    },
  ];

  const dateData = [
    {
      id: 1,
      day: "Mon",
      dayNumber: 1,
      status: "Quants Live - Hardik Dhawan",
      time: "10 : 00 MP",
      status: "See",
    },
    {
      id: 2,
      day: "Mon",
      dayNumber: 1,
      status: "Quants Live - Hardik Dhawan",
      time: "10 : 00 MP",
      status: "NotSee",
    },
    {
      id: 3,
      day: "Mon",
      dayNumber: 1,
      status: "Quants Live - Hardik Dhawan",
      time: "10 : 00 MP",
      status: "See",
    },
    {
      id: 4,
      day: "Mon",
      dayNumber: 1,
      status: "Quants Live - Hardik Dhawan",
      time: "10 : 00 MP",
      status: "NotSee",
    },
  ];

  const [currentDate, setCurrentDate] = useState(new Date());

  const handleLeftClick = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleRightClick = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  useEffect(() => {
    if (getList?.data) {
      setIdObject(getList?.data[0]);
    }
  }, [getList]);

  console.log("🚀 ~ ClassCalendar ~ idObject:", idObject);

  return (
    <div className="flex h-[87vh]">
      {/* Left Box */}
      <div
        className="basis-[25%] p-2"
        style={{ borderRight: "2px solid #f2f2f2" }}
      >
        {/*  Profile Card  */}

        <Card elevation={0} sx={{ p: 0 }}>
          <h5 className="text-lg font-bold ml-2">Class Details</h5>
          <CardHeader
            sx={{ p: 1 }}
            avatar={<Avatar></Avatar>}
            title={<p className="text-base font-inder ">Ankith Adhyapak</p>}
            subheader={
              <div>
                <p className="text-gray-400  font-medium text-xs">
                  Sheduled{" "}
                  <small className=" text-gray-400 ml-4">45 Min Session</small>
                </p>
                <small className="text-gray-800">26 Jun’21, 10:00 am</small>
              </div>
            }
          />
          <Divider />
          <CardContent sx={{ p: 1 }}>
            <h5 className="text-base font-bold my-2">Class Description</h5>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>

          <CardContent sx={{ p: 1 }}>
            <h5 className="text-base font-bold my-2 ">Class Content</h5>
            <List
              sx={{
                width: "100%",
                m: 0,
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                maxHeight: 300,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                sx={{ border: "1px solid #D8D8D8", borderRadius: 2, p: 1 }}
              >
                <ListItemText
                  sx={{ py: 0 }}
                  primary={<h6 className="text-base font-bold ">Concept 1</h6>}
                  secondary={
                    <React.Fragment>
                      <p className="text-sm text-left text-gray-600 mt-3">
                        There are two writing tasks you'll have to conquer on
                        the GRE to get the score you deserver
                      </p>
                    </React.Fragment>
                  }
                />
              </ListItemButton>
            </List>
          </CardContent>
        </Card>
      </div>

      {/* Right  */}
      <div className=" p-2  w-full  rounded-sm bg-white   basis-[75%] ">
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <p className=" text-lg font-medium">{currentDate.toDateString()}</p>
          <Stack direction={"row"} alignItems={"center"}>
            <ChevronLeft
              size={30}
              onClick={() => handleLeftClick()}
              strokeWidth={2}
            />
            <ChevronRight
              size={30}
              onClick={() => handleRightClick()}
              strokeWidth={2}
            />
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChange}
                size="small"
                sx={{ width: "100px" }}
              >
                <MenuItem value={10}>Day</MenuItem>
                <MenuItem value={20}>Week</MenuItem>
                <MenuItem value={30}>Month</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        <div className=" flex  p-1  items-center">
          <Checkbox {...label} defaultChecked />
          <Typography variant="body1">All</Typography>
          <Checkbox {...label} defaultChecked />
          <Typography variant="body1">Ongoing</Typography>
          <Checkbox {...label} />
          <Typography variant="body1">Conpleted</Typography>
          <Checkbox {...label} />
          <Typography variant="body1">Scheduled</Typography>
        </div>

        {dateData.map((ele) => {
          return (
            <div>
              <Stack
                direction={"row"}
                key={ele.id}
                spacing={3}
                sx={{
                  padding: "2%",
                  marginTop: "-10px",
                }}
              >
                <Stack direction={"column"} spacing={1}>
                  <h6 className=" text-base font-medium">Mon</h6>
                  <h6 className=" text-base font-medium">02</h6>
                </Stack>
                <>
                  <Box
                    sx={{
                      backgroundColor: "#f2f2f2",
                      width: "100%",
                      height: "75px",
                      borderRadius: "5px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h6 className=" text-base font-bold flex items-center ">
                        <Dot color="#0ee647" size={40} />
                        Quants Live - Hardik Dhawan
                      </h6>
                      <h6 className="text-base ml-[15%]">10 : 00 PM</h6>
                    </div>
                    <Avatar
                      sx={{
                        bgcolor: green[500],
                        width: 32,
                        height: 30,
                        marginRight: "10px",
                      }}
                      src="https://images.unsplash.com/photo-1500048993953-d23a436266cf?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      variant="rounded"
                    >
                      <AssignmentIcon />
                    </Avatar>
                  </Box>
                </>
              </Stack>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassCalendar;
