import React, { useState } from "react";
import { Dot, X } from "lucide-react";
import { Select, MenuItem, Divider } from "@mui/material";
import { MessageSquareDiff } from "lucide-react";
import { CardHeader, CardContent, Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";

const Comments = () => {
  const [selectedDay, setSelectedDay] = React.useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
    console.log(comment);
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const buttonStyle = {
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "black",
    },
  };

  return (
    <div className="  p-1 min-w-[270px] w-[310px] h-[80vh] border border-[#EAEAEC]">
      <div className=" flex  justify-between items-center p-2">
        <h6 className=" font-semibold text-lg">Comments</h6>
        <X onClick={() => alert("Close")} />
      </div>
      <div className="p-2 flex items-center">
        <Select
          labelId="day-select-label"
          id="day-select"
          sx={{ width: "150px" }}
          size="small"
          value={selectedDay}
          onChange={handleDayChange}
        >
          <MenuItem value="Week">This week</MenuItem>
          <MenuItem value="Month">This month</MenuItem>
        </Select>
        <MessageSquareDiff
          className=" ml-3 cursor-pointer"
          onClick={openModal}
        />

        {/*  Comment Modal */}

        <Dialog open={isModalOpen} onClose={closeModal}>
          <h6 className=" text-lg font-semibold p-3">Comments</h6>
          <DialogContent>
            <DialogContentText>
              <TextField
                id="outlined-size-small"
                placeholder="Anything on your mind? 😀"
                size="small"
                multiline
                className="border"
                rows={4}
                value={comment}
                onChange={handleChange}
              />
            </DialogContentText>
          </DialogContent>
          <div className=" m-4 ml-8 -mt-1">
            <Button
              sx={buttonStyle}
              style={{ width: "90%", textTransform: "capitalize" }}
              variant="contained"
              onClick={() => console.log(comment)}
            >
              Send
            </Button>
          </div>
        </Dialog>
      </div>
      <Divider sx={{ margin: "3px", border: "1px solid #f2f2f2" }} />
      <div className="scrollHedden p-1  mt-1 h-[60vh]  overflow-y-scroll">
        {[...Array(50)].map((ele) => {
          return (
            <div className=" bg-white rounded-md border border-[#EAEAEC] mb-4  w-[292px]">
              <CardHeader
                avatar={
                  <Avatar
                    alt="Remy Sharp"
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                }
                title="Raj patel"
                subheader="Eligibility and fees"
              />
              <p className="text-xs font-semibold	 flex ml-16 -mt-3 -mb-1">
                <Dot />
                Appication and Fees
              </p>
              <div className=" flex p-5  -mb-3  text-sm ">
                <h6 className=" font-medium text-sm">
                  <b className=" text-[#336792]  font-normal">@Dev Kapoor </b>
                  please update this with the latest fees structure
                </h6>
              </div>
              <CardContent className=" flex text-sm justify-between">
                <h6 className=" font-semibold text-xs">
                  <b className="font-semibold  mr-1 text-[#9092A3]">
                    ASSIGNED TO :
                  </b>
                  Dev Rana
                </h6>
              </CardContent>
              <div className=" flex  ml-3 mb-3 -mt-1 p-1 text-sm justify-between">
                <h6 className=" font-semibold text-sm flex items-center">
                  <b
                    className=" text-sm font-normal  mr-1 text-[#000000]"
                    onClick={() => alert("Mark as Done")}
                  >
                    Mark as done{" "}
                  </b>
                  <Dot />
                  <p className=" font-normal" onClick={() => alert("Reply")}>
                    Reply
                  </p>
                </h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
