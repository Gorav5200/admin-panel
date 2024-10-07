import React from "react";
import { Stack, Typography } from "@mui/material";
import AnalyticsGraphs from "./AnalyticsGraphs";

const Analytics = () => {
  return (
    <>
      <Stack
        direction={"row"}
        spacing={1}
        justifyContent={"space-between"}
        sx={{ marginTop: "30px" }}
      >
        <Stack direction={"column"} spacing={1} padding={"10px"}>
          <Typography variant="h6" sx={{ fontWeight: "700" }}>
            18-24
          </Typography>
          <Typography variant="subtitle2">Average Age Group</Typography>
          <Typography variant="h6" sx={{ fontWeight: "700" }}>
            2,585
          </Typography>
          <Typography variant="subtitle2">Tatal Male</Typography>
          <Typography variant="h6" sx={{ fontWeight: "700" }}>
            1,020
          </Typography>
          <Typography variant="subtitle2">Tatal Female</Typography>
        </Stack>
        <div className="p-1 w-full h-80">
          <AnalyticsGraphs />
        </div>
      </Stack>
    </>
  );
};

export default Analytics;
