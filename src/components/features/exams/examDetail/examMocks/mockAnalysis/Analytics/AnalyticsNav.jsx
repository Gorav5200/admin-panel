import { Stack, Typography, TextField, Input } from "@mui/material";
import React from "react";
import { Box, MoreVertical } from "lucide-react";
import { Square } from "lucide-react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AnalyticsNav = () => {
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <Typography variant="body1" sx={{ fontWeight: "700", padding: "10px" }}>
          Users By Age and Gender
        </Typography>
        <Stack
          direction={"row"}
          spacing={3}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="subtitle1">Set age range :</Typography>
          <TextField
            id="outlined-basic"
            sx={{ width: "130px", height: "37px" }}
            variant="outlined"
            size="small"
          />
          <Typography variant="subtitle2">to </Typography>
          <TextField
            id="outlined-basic"
            sx={{ width: "130px", height: "37px" }}
            variant="outlined"
            size="small"
          />
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              placeholder="SORT BY: ALL"
              onChange={handleChange}
              displayEmpty
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>SORT BY: ALL</em>;
                }
                return selected;
              }}
              sx={{ width: "160px", height: "37px" }}
            >
              <MenuItem disabled value="">
                <em>This Week</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
              displayEmpty
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Past One Month</em>;
                }
                return selected;
              }}
              sx={{ width: "160px", height: "37px" }}
            >
              <MenuItem disabled value="">
                <em>Past One Month</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <MoreVertical />
        </Stack>
      </div>
      <Stack
        spacing={2}
        direction={"row"}
        justifyContent={"flex-end"}
        sx={{ marginTop: "10px", marginRight: "10px" }}
      >
        <Square fill="#02f502" strokeWidth={0} />
        <Typography variant="body1">Male</Typography>
        <Square fill="#4c12e0" strokeWidth={0} />
        <Typography variant="body1">Female</Typography>
        <Square fill="#ebbb2a" strokeWidth={0} />
        <Typography variant="body1">Others</Typography>
      </Stack>
    </>
  );
};

export default AnalyticsNav;
