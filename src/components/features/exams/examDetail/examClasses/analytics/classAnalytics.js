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
import PieGraph from "./pieGraph";
import LineGraphs from "./lineGraphs";
import BarGraph from "./barGraph";

const ClassAnalytics = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Stack
        sx={{ backgroundColor: "white", margin: "10px", padding: "10px" }}
        direction={"row"}
        justifyContent={"space-around"}
      >
        <Card sx={{ width: "50%" }}>
          <CardContent>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
                ClassRecord
              </Typography>

              <Box display={"flex"} alignItems={"center"}>
                <FormControl sx={{ width: "150px" }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
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
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <MoreVertical />
              </Box>
            </Stack>
          </CardContent>

          <Stack
            sx={{ padding: "10px" }}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"column"} spacing={2}>
              <Typography variant="h6">768</Typography>
              <Typography variant="body2">TotalClasses Created</Typography>
              <Typography variant="body1">168</Typography>
              <Typography variant="body2">
                {" "}
                <CircleDot
                  size={20}
                  color="#0fd730"
                  strokeWidth={4}
                  style={{ marginRight: "3px" }}
                />
                TotalClasses Scheduled
              </Typography>
              <Typography variant="body1">468</Typography>
              <Typography variant="body2">
                {" "}
                <CircleDot
                  size={20}
                  color="#5924bc"
                  strokeWidth={4}
                  style={{ marginRight: "3px" }}
                />{" "}
                TotalClasses conducted
              </Typography>
            </Stack>
            <div className=" w-full flex justify-center items-center">
              <div className="w-[480px]">
                <PieGraph />
              </div>
            </div>
          </Stack>
        </Card>

        <Card sx={{ width: "50%", marginLeft: "10px" }}>
          <CardContent>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
                Users Growth
              </Typography>

              <Box display={"flex"} alignItems={"center"}>
                <FormControl sx={{ width: "150px" }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
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
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <MoreVertical />
              </Box>
            </Stack>
          </CardContent>

          <Box sx={{ padding: "10px" }} alignItems={"center"}>
            <Stack direction={"row"} spacing={0.8} alignItems={"center"}>
              <Typography variant="h3">79%</Typography>
              <Typography variant="body2">increase in users</Typography>
            </Stack>
            <LineGraphs />
          </Box>
        </Card>
      </Stack>

      <Stack
        sx={{
          backgroundColor: "white",
          margin: "10px",
          padding: "10px",
          marginTop: "-10px",
        }}
      >
        <Card>
          <CardContent>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
                Overall Class Performance
              </Typography>
              <Box display={"flex"} alignItems={"center"}>
                <FormControl sx={{ width: "150px" }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
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
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <MoreVertical />
              </Box>
            </Stack>
            <BarGraph />
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default ClassAnalytics;
