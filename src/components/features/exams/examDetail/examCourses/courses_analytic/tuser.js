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
import TuserGraph from "./tuserGraph";

// Define the colors
const colors = {
  fullCourse: "#5146D6",
  sixMonthsPack: "#D28715",
  crashCourse: "#8AF1B9",
  quickLearn: "#d62728",
};

const Tuser = () => {
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
              Total Users
            </Typography>

            <Box display={"flex"} alignItems={"center"} height={"30%"}>
              <FormControl sx={{ width: "170px" }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  placeholder="Past One Month"
                  value={selectedOption}
                  onChange={handleSelectChange}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Past one Month</em>;
                    }
                    return selected;
                  }}
                  size="small"
                >
                  <MenuItem disabled value="">
                    <em>Past one Month</em>
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
        <div className="w-full flex justify-center items-center">
          <div className="w-[450px]">
            <TuserGraph />
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-y-2 p-2">
          <div className="flex gap-2 items-center text-sm text-gray-800 basis-[50%]">
            <CircleDot
              size={20}
              color={colors.fullCourse}
              strokeWidth={4}
              style={{ marginRight: "3px" }}
            />
            CAT full Course : <strong>788 Users</strong>
          </div>

          <div className="flex gap-2 items-center text-sm text-gray-800 basis-[50%]">
            <CircleDot
              size={20}
              color={colors.sixMonthsPack}
              strokeWidth={4}
              style={{ marginRight: "3px" }}
            />
            CAT six months pack: <strong>255 Users</strong>
          </div>

          <div className="flex gap-2 items-center text-sm text-gray-800 basis-[50%]">
            <CircleDot
              size={20}
              color={colors.crashCourse}
              strokeWidth={4}
              style={{ marginRight: "3px" }}
            />
            CAT crash course: <strong>458 Users</strong>
          </div>

          <div className="flex gap-2 items-center text-sm text-gray-800 basis-[50%]">
            <CircleDot
              size={20}
              color={colors.quickLearn}
              strokeWidth={4}
              style={{ marginRight: "3px" }}
            />
            CAT quick learn: <strong>125 Users</strong>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Tuser;
