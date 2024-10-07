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

function Feature() {
  const { viewDetail } = useSelector((state) => state.courses);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (viewDetail) {
      setData(viewDetail.topFeatures);
    }
  }, [viewDetail]);

  console.log("data  of  top features", data);
  return (
    <div className="p-3  my-2 bg-white overflow-scroll h-[100%] rounded-md">
      <h5 className="font-semibold font-inter text-xl p-2 pt-0">Top Features</h5>
      {data?.map(({image,content},ind) => (
        <>
          <ListItem key={ind}>
            <ListItemAvatar>
              <Avatar alt="Profile" src={image} sx={{ color: "transparent" }} />
            </ListItemAvatar>
            <ListItemText>
              <HTMLConverter>{content || "N/a"}</HTMLConverter>
            </ListItemText>
          </ListItem>
          <Divider />
        </>
      ))}
    </div>
  );
}

export default Feature;
