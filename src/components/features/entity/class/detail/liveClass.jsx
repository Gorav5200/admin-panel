import React from "react";
import { Stack } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Dot, DotIcon, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';


import Card from "@mui/material/Card";
import { Heart } from "lucide-react";

import {
  CustomButton,
  CustomButtonStyle,
} from "../../../../../styles/muiRoot";

import CardHeader from "@mui/material/CardHeader";
import { ThumbsUp } from "lucide-react";

const LiveClass = () => {
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
      id: 3,
    },
    {
      id: 3,
    },
  ];

  const history = useNavigate();

   const params = useParams();
    const {examId,classId} = params;
    

  const navigate = useNavigate();

  return (
    <React.Fragment>

      {/* Header */}
      <div className=" p-2 flex">
            <MoveLeft className=" bg-white  rounded-full p-2 " onClick={()=> history(`/main/exam/${examId}/class/`)} size={35}  />
            <div className="ml-3">
        <h5 className=" text-base font-bold">Logical Reasoning</h5>
        <h6 className=" text-xs font-bold mt-2">Quantitaltive Abillity</h6>
            </div>
      </div>

      {/* Headers Tab   */}
      <div className="p-2 flex justify-end  ">
        <CustomButton
          style={{
            ...CustomButtonStyle,
            width: 117,
            height: 30,
            backgroundColor: "transparent",
            color: "rgba(27,127,204,.8)",
          }}
        >
          White Board
        </CustomButton>

        <CustomButton
          style={{
            ...CustomButtonStyle,
            width: 117,
            height: 30,
            backgroundColor: "transparent",
            color: "rgba(27,127,204,.8)",
          }}
        >
          Share Screen
        </CustomButton>

        <CustomButton
          onClick={() =>
            navigate(
              `/main/exam/${examId}/class/${classId}/complete`
            )
          }
          style={{
            ...CustomButtonStyle,
            width: 90,
            height: 30,
            backgroundColor: "transparent",
            color: "rgba(27,127,204,.8)",
            border: "2px solid black",
          }}
        >
          End Class
        </CustomButton>
      </div>


      {/* Main Container   */}
      <div className=" flex">
            {/* Left Screen  */}
            <div className="mr-2 w-[26%]">
              <CustomButton
                className=" hover:bg-black"
                style={{
                  ...CustomButtonStyle,
                  width: 117,
                  height: 35,
                  background: "#8AFF8A",
                  margin: "5px",
                  color: "#00A300",
                }}
              >
                Ongoing
              </CustomButton>

              <div className=" bg-white text-center p-1 m-1 w-[250px] h-[200px] rounded-md"> 
                <p>Live Video Chat</p>
              </div>

              <div className=" m-1 mt-3 w-[250px] rounded-md">
                <h6 className=" text-lg font-medium">Class Content</h6>

                <div className="classContente overflow-y-scroll h-[33vh] ">
                  {data.map((ele) => {
                    return (
                      <div
                        className=" bg-white p-1 mt-1  rounded-md"
                        style={{ border: "2px solid #5CFF5C" }}
                      >
                        <h6 className=" text-lg mb-2 font-semibold">Concept 1</h6>
                        <p className=" text-sm">
                          There are two writing tasks you'll have to conquer on the
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/*  center screen */}
            <div className=" bg-white  w-[45%] h-[99%] mt-2  rounded">
              <div className=" bg-lightGrey rounded-md p-2 flex ">
                <h6 className=" font-semibold">Concept 1</h6>
                <Dot />
                <p className=" text-sm">5 mins ago</p>
              </div>

              <div>
                <p className=" text-sm p-3">
                  In the 16th century, an age of great marine and terrestrial
                  exploration, Ferdinand Magellan led the first expedition to sail
                  around the world. As a young Portuguese noble, he served the king
                  of Portugal, but he became involved in the quagmire of political
                  intrigue at court and lost the king’s favor. After he was
                  dismissed from service by the king of Portugal, he offered to
                  serve the future Emperor Charles V of Spain.
                  <br />
                  <br />A papal decree of 1493 had assigned all land in the New
                  World west of 50 degrees W longitude to Spain and all the land
                  east of that line to Portugal. Magellan offered to prove that the
                  East Indies fell under Spanish authority. On September 20, 1519,
                  Magellan set sail from Spain with five ships. More than a year
                  later, one of these ships was exploring the topography of South
                  America in search of a water route across the continent. This ship
                  sank, but the remaining four ships searched along the southern
                  peninsula of South America. Finally they found the passage they
                  sought near 50 degrees S latitude. Magellan named this passage the
                  Strait of All Saints, but today it is known as the Strait of
                  Magellan.
                </p>
              </div>
            </div>

            {/* right screen */}
            <div className=" bg-white overflow-hidden m-2 rounded-md p-3 w-[28%] h-[80vh]">
              <div className="p-1 flex justify-between">
                <h6 className=" text-base font-bold ">Class Discussion</h6>
                <AvatarGroup max={3} sx={{ marginBottom: "4px" }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    sx={{
                      width: 20,
                      height: 20,
                      border: "none",
                    }}
                  />
                  <Avatar
                    alt="Travis Howard"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    sx={{
                      width: 20,
                      height: 20,
                      border: "none",
                    }}
                  />
                  <Avatar
                    alt="Cindy Baker"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    sx={{
                      width: 20,
                      height: 20,
                      border: "none",
                    }}
                  />
                </AvatarGroup>
              </div>

              <Divider style={{ backgroundColor: "whitesmoke" }} />
              <br />
              <div className=" classContente p-1 overflow-y-scroll -m-3 h-[93%] rounded-md">
                {data.map((ele) => {
                  return (
                    <>
                      <Card
                        sx={{
                          // maxWidth: 345,
                          // height: "150px",
                          marginBottom: "5px",
                          backgroundColor: "whitesmoke",
                        }}
                        elevation={0}
                      >
                        <CardHeader
                          avatar={
                            <Avatar
                              variant="rounded"
                              sx={{ width: 30, height: 30 }}
                              aria-label="recipe"
                              src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            >
                              R
                            </Avatar>
                          }
                          title="Shrimp"
                          subheader="Master Level"
                        />
                        <p className=" text-sm p-1">
                          This impressive paella is a perfect party dish and a fun
                          meal to cook together with your guests. Add 1 cup of
                        </p>
                      </Card>
                      <Stack
                        sx={{ margin: "5px" }}
                        direction={"row"}
                        spacing={1}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <h6 className="flex   items-center text-sm">
                          Like
                          <Dot size={20} />
                        </h6>
                        <h6 className=" flex items-center justify-center text-sm">
                          <ThumbsUp color="#00BFFF" size={15} />
                          <Heart size={15} color="red" />
                          12
                        </h6>
                        <h6 className="  flex items-center text-sm">
                          <DotIcon />
                          Reply
                        </h6>
                        <h6 className=" text-base flex items-center">comments</h6>
                      </Stack>
                    </>
                  );
                })}
                <Stack
                  direction={"row"}
                  justifyContent={"center"}
                  sx={{ marginTop: "18%" }}
                >
                  <TextField
                    id="outlined-basic"
                    size="small"
                    sx={{
                      width: "100%",
                      "&:hover": {
                        borderColor: "black",
                      },
                    }}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                          sx={{ width: 24, height: 24 }}
                        />
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <Navigation
                              style={{
                                backgroundColor: "black",
                                color: "white",
                                borderRadius: "50%",
                                padding: "6px",
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </div>
            </div>
      </div>


    </React.Fragment>
  );
};

export default LiveClass;
