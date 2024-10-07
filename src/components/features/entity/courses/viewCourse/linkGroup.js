import { Avatar, Card, CardContent, Divider, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HTMLConverter } from "../../../../../services/common";
import { Empty } from "antd";

function LinkGroups() {
  const { viewDetail } = useSelector((state) => state.courses);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (viewDetail) {
      setData(viewDetail?.groups);
    }
  }, [viewDetail]);

  if (data.length === 0) {
    return (
      <div className=" bg-white h-[70vh] rounded-md flex items-center justify-center">
        <Empty />
      </div>
    );
  }
  return (
    <div className="p-3  my-2 bg-white overflow-scroll h-[100%] rounded-md">
    <h5 className="font-semibold font-inter text-xl p-2 pt-0">Groups</h5>
      {data?.map(({ _id,displayPic, title }) => (
        <>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt="Profile"
                src={displayPic?.[0].url}
                sx={{ color: "transparent" }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={<h5 className="font-bold text-sm ">{title || "N/A"}</h5>}
              secondary={
                <p className="text-xs text-secondary pt-1 ">
                  ID : {_id || "N/a"}
                </p>
              }
            />
          </ListItem>
          <Divider/>
        </>
      ))}
    </div>
  );
}

export default LinkGroups;
