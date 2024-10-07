import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MoreVertical } from "lucide-react";
import { CircleDot } from "lucide-react";

import StudyGraph from "./studyGraph";

const Study = () => {
  const [selectedOption, setSelectedOption] = React.useState("");
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <Card sx={{ width: "50%", height: "fit-content" }}>
        <CardContent>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Study Room
            </Typography>

            <Box display={"flex"} alignItems={"center"} height={"30%"}>
              <FormControl sx={{ width: "150px" }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  placeholder="Past One Month"
                  value={selectedOption}
                  onChange={handleSelectChange}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>This Week</em>;
                    }
                    return selected;
                  }}
                  size="small"
                >
                  <MenuItem disabled value="">
                    <em>This Week</em>
                  </MenuItem>
                  <MenuItem value={"Past One Month"}>Past one Month</MenuItem>

                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <MoreVertical />
            </Box>
          </Stack>
        </CardContent>
        <div className=" w-full flex justify-center items-center">
          <div className="w-[460px]  ">
            <StudyGraph />
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-y-2 p-2">
          <div className="flex gap-2 items-center text-sm text-gray-800 basis-[50%]">
            <b>768</b> Total Study Room
          </div>
          <div className="flex gap-2 items-center text-sm text-gray-800 basis-[50%]"></div>

          <div className="flex gap-2 items-center text-sm text-gray-800 basis-[50%]">
            <CircleDot
              size={20}
              color="#c94d2a"
              strokeWidth={4}
              style={{ marginRight: "3px" }}
            />
            <b>168</b> Avg.Active Study Room
          </div>

          <div className="flex gap-2 items-center text-sm text-gray-800 basis-[50%]">
            <CircleDot
              size={20}
              color="#4432a8"
              strokeWidth={4}
              style={{ marginRight: "3px" }}
            />
            <b> 468</b> Avg.InActive Study Room
          </div>
        </div>
      </Card>
    </>
  );
};

export default Study;
