import React, { useState } from "react";
import {
  Box,
  CardHeader,
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
const label = { inputProps: { "aria-label": "Checkbox demo" } };


const ClassCalendar = () => {
  const [age, setAge] = React.useState("");

  console.log(age);

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

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className=" p-1 flex">
      {/* Left Box */}
      <div className="sm:w-2/6 p-2 -mt-2  -ml-4" style={{borderRight:"2px solid #f2f2f2"}}>
        {/*  Profile Card  */}
        <div className=" mb-2">
          <Card elevation={0}>
            <h5 className=" font-medium ml-3 text-lg">Class Details</h5>
            <CardHeader
              avatar={<Avatar></Avatar>}
              title="Scheduled"
              subheader="45 Min Session"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* Class Description  */}
        <div className=" mb-2">
          <Card elevation={0}>
            <h5 className=" font-medium ml-3 text-lg">Class Details</h5>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* Class Contente */}

         <div className="classContente rounded-sm "  style={{ maxHeight: "300px", overflowY: "auto" }}> 
          <Card elevation={0} sx={{padding:'2px'}}>
            <h5 className=" font-medium ml-3 text-lg">Class Contente</h5>
                         {data.map((ele) => {
                return (
                  <div
                    className=" rounded-md p-2  mt-2 shadow-sm ml-3 "
                    style={{
                      width:'250px',
                      border: "1px solid #87D37C",
                    }}
                  >
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <h6 className=" text-base font-normal">concept 1</h6>
                      <p className=" text-sm">5 Min</p>
                    </Stack>

                    <p className=" text-sm">
                      Lorem ipsum dolor sit, amet consectetu
                    </p>
                  </div>
                );
              })}
          </Card>
        </div>

      </div>


      {/* Right Box */}
      <div className=" p-2 w-full  rounded-sm  sm:w-[68.67%] bg-white   sm:ml-2  sm:mt-0 overflow-hidden">
       
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
                  <h6 className=" text-base font-medium">
                    02
                  </h6>
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
                        marginRight:"10px"
                      }}
                      src="https://images.unsplash.com/photo-1500048993953-d23a436266cf?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      variant="rounded"
                    >
                      <AssignmentIcon  />
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
