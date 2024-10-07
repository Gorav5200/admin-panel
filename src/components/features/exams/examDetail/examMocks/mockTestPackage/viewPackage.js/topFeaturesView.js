import { Avatar, Card, CardContent } from "@mui/material";
import Item from "antd/es/list/Item";
import React from "react";
import { useSelector } from "react-redux";
import { HTMLConverter } from "../../../../../../../services/common";

function TopFeaturesView() {
  const {viewMockDetails}=useSelector((state)=>state.mockPackage)

  return (
    <div className="p-3  my-2 bg-white overflow-scroll h-[100%] rounded-md">
      {viewMockDetails?.topFeatures.map((item) => (
        <Card sx={{ boxShadow: "none", borderBottom: "1px solid  #0000000F" }}>
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 5 }}>
            {" "}
            <Avatar
              alt="Remy Sharp"
              src={Item.image || "/static/images/avatar/1.jpg"}
              sx={{ width: 56, height: 56 }}
            />
            <div>
              <h5 className="font-bold text-base">
               <HTMLConverter>{item.content}</HTMLConverter> 
              </h5>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default TopFeaturesView;
