import React, { useState } from "react";
import {
  Box,
  Divider,
  Stack,
  Typography,
  CardHeader,
  CardContent,
  IconButton,
  TextField,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { DotIcon } from "lucide-react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { X } from "lucide-react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import BasicLineChart from "../../../../common/lineChart";
import { useParams } from 'react-router-dom';


// Main component for Performance
const CompleteClass = () => {
  const navigater = useNavigate();

  const data = [{ id: 1 }];

  // State for managing modal open/close
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Function to open the modal
  const handleOpen = () => {
    setOpen(true);
  };

   const params = useParams();
    const {examId} = params;


  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate({day:date.$D,month:date.$M,year:date.$y});
    console.log(selectedDate);
  };

   const [selectedValue, setSelectedValue] = useState('0');

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    console.log('Selected Value:', value);
  };

  return (
    <div className="h-fit  bg-lightGrey">
      {/* Top Header */}
      <div className=" p-3 flex">
        {/* Arrow back button */}
        <ArrowLeft
          onClick={() =>
            navigater(`/main/exam/${examId}/class/`)
          }
          style={{
            backgroundColor: "white",
            borderRadius: "50%",
            padding: "1px",
          }}
        />
        <div className=" ml-3">
          <h6 className=" text-base font-semibold">Logical Reasoning</h6>
          <Typography variant=" text-sm">Quantitative Ability</Typography>
        </div>
      </div>

      {/* Main Container */}
      <div className=" flex w-full justify-between">
        {/* Left Side */}
        <div className=" p-3 mr-3 -mt-2">
          {/* Profile Card */}
          <div className=" h-[300px] w-[350px] rounded-[5px] bg-white ">
            {/* Card header with avatar */}
            <CardHeader
              avatar={<Avatar aria-label="recipe">R</Avatar>}
              action={<IconButton aria-label="settings"></IconButton>}
              title="Shrimp and Chorizo Paella"
              subheader="24 Jun'21 | 3:30 P.M | 2 Hrs"
            />

            {/* Status indicator and date picker */}
            <div className=" flex items-center">
              <DotIcon
                color="#32CD30"
                size={30}
                style={{ marginLeft: "50px" }}
              />
              <p className=" text-[#32CD30] text-base  font-bold">Completed</p>
            </div>

            {/* Date picker */}
            <div className="flex justify-center  items-center mt-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "170px" }}
                  slotProps={{ textField: { size: "small" } }}
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Select Date"
                    />
                  )}
                />
              </LocalizationProvider>
            </div>

            {/* Card content with class description */}
            <CardContent>
              <Divider />
              <h6 className=" text-sm font-semibold mt-3">Class Description</h6>
              <p className=" text-sm  mt-2 text-[background: #3E4347]">
                In today’s class, Hardik Sir will go through the basics of
                Quants and help you get started with your journey of scoring as
                much as you can during the final exams.
              </p>
            </CardContent>
          </div>

          {/* Class performance card */}
          <div className="  h-[300px] w-[350px] rounded-[5px] bg-white mt-3 p-3">
            {/* Performance header with dropdown */}
            <div className="p-1 flex items-center justify-between">
              <h6 className=" text-sm font-semibold ">Class Performance</h6>
             <FormControl>
      <Select
        labelId="select-label"
        id="select"
        sx={{ width: '100px' }}
        size="small"
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <MenuItem value="0">None</MenuItem>
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </Select>
    </FormControl>
            </div>

            {/* Performance metrics */}
            <div className="flex justify-between mb-2">
              <p className="  text-sm font-normal">Enrolled:123</p>
              <p className="  text-sm font-normal">Attendess:213</p>
              <p className=" text-sm font-normal">total view:512</p>
            </div>

            {/* Line chart for performance */}
            <BasicLineChart />
          </div>

          {/* Class recorded card with video player */}
          <div className="  h-[300px] w-[350px] rounded-[5px] bg-white mt-3 p-3">
            {/* Recorded class information */}
            <Stack direction={"column"}>
              <p className=" text-sm font-semibold mb-2">Class Recorded</p>
              <p className=" text-xs mb-3 ml-2">45 Minutes session</p>
            </Stack>

            {/* Video player */}
            <div className=" bg-lightGrey h-[200px] flex justify-center items-center">
              <div
                className=" bg-white rounded-full absolute p-5"
                onClick={() => handleOpen()}
              >
                <svg
                  viewBox="0 0 448 512"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  width="26px"
                >
                  <path
                    d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>

              {/* Modal for video playback */}
              <Modal open={open} onClose={handleClose}>
                <div
                className=" justify-around rounded-md p-5"
                  style={{
                    background:"white",
                     position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "40%",
                    height:"300px",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    textAlign: "center",
                    p: 2,
                    outline: "none",
                  }}
                >
                  <X onClick={() => handleClose()} className=" absolute right-2 -mt-4" />
                  <iframe
                    className=" h-[100%] p-3 w-[100%]  "
                    src="https://www.youtube.com/embed/xRwIqdON1WM?si=Ff-uSLGNSW9xQJs-"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </Modal>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="  p-4 rounded-md  bg-white w-[70%] mt-1">
          {/* Mapping over data to display information */}
          {data.map((ele) => {
            return (
              <React.Fragment key={ele.id}>
                {/* Concept information */}
                <div className=" bg-white border  p-2 rounded-lg  mt-3 ">
                  <div className=" flex justify-between">
                    <h6 className=" text-base font-bold p-1">
                      Concept {ele.id}
                    </h6>
                    <h6 className=" text-base p-1 text-[lightGrey] ">
                      5:00 Min
                    </h6>
                  </div>

                  {/* Concept description */}
                  <p className=" p-1 text-sm font-normal">
                    There are two writing tasks you'll have to conquer on the
                    GRE to get the score you deserve: the argument essay and the
                    issue essay. We won't be going over the broad view in this
                    article, but instead will concentrate on some of the finer
                    details. Both essays are graded holistically. This means
                    that you'll be judged not only on your reasoning, but also
                    on how you write (the basics: putting sentences together,
                    using the correct words and punctuating properly). There are
                    two writing tasks you'll have to conquer on the GRE to get
                    the score you deserve: the argument essay and the issue
                    essay... (See more)
                  </p>
                </div>

                {/* Concept information */}
                <div className=" bg-white border  p-2 rounded-lg  mt-3 ">
                  <div className=" flex justify-between">
                    <h6 className=" text-base font-bold p-1">
                      Concept {ele.id}
                    </h6>
                    <h6 className=" text-base p-1 text-[lightGrey] ">
                      5:00 Min
                    </h6>
                  </div>

                  {/* Concept description */}
                  <p className=" p-1 text-sm font-normal">
                    There are two writing tasks you'll have to conquer on the
                    GRE to get the score you deserve: the argument essay and the
                    issue essay. We won't be going over the broad view in this
                    article, but instead will concentrate on some of the finer
                    details. Both essays are graded holistically. This means
                    that you'll be judged not only on your reasoning, but also
                    on how you write (the basics: putting sentences together,
                    using the correct words and punctuating properly). There are
                    two writing tasks you'll have to conquer on the GRE to get
                    the score you deserve: the argument essay and the issue
                    essay... (See more)
                  </p>
                </div>

                {/* Concept information */}
                <div className=" bg-white border  p-2 rounded-lg  mt-3 ">
                  <div className=" flex justify-between">
                    <h6 className=" text-base font-bold p-1">
                      Concept {ele.id}
                    </h6>
                    <h6 className=" text-base p-1 text-[lightGrey] ">
                      5:00 Min
                    </h6>
                  </div>

                  {/* Video player using iframe */}
                  <iframe
                    className=" h-fit w-fit rounded-md"
                    src="https://www.youtube.com/embed/xRwIqdON1WM?si=Ff-uSLGNSW9xQJs-"
                    title="YouTube video player"
                    // frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompleteClass;
