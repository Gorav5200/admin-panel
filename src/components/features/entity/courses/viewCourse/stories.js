
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HTMLConverter } from "../../../../../services/common";
import {
  Avatar,
  Stack,
  Divider,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Fade,
  Slide,
  Grow,
  ListItemAvatar,
  CircularProgress,
} from "@mui/material";
function Stories() {
  const {viewDetail}=useSelector((state)=>state.courses)

  const [data, setData] = useState([]);
  

  useEffect(() => {
    if (viewDetail) {
      setData(viewDetail?.successStories);
    }
  }, [viewDetail]);

  return (
    <div className="p-3  my-2 bg-white overflow-scroll h-[100%] rounded-md">
      <h5 className="font-semibold font-inter text-xl p-2 pt-0">Stories</h5>
      {data?.map(({name,content,image},ind) => (
        <>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt="Profile"
                src={image}
                sx={{ color: "transparent" }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={<h5 className="font-bold text-sm ">{name || "N/A"}</h5>}
              secondary={
                <HTMLConverter>
                   {content|| "N/a"}
                </HTMLConverter>
              }
            />
          </ListItem>
          <Divider/>
        </>
      ))}
    </div>
  );
}

export default Stories;
