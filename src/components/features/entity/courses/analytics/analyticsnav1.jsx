import { Stack, Typography, TextField, Input } from "@mui/material";
import React from "react";
import { Box, MoreVertical } from "lucide-react";
import { Square } from "lucide-react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AnalyticsNav1 = () => {
  const [age, setAge] = React.useState("");
  const [data, setData] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleDataChange = (event) => {
    setData(event.target.value);
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
              value={data}
              onChange={handleDataChange}
              displayEmpty
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Sorted By</em>;
                }
                return selected;
              }}
              sx={{ width: "150px", height: "37px" }}
            >
              <MenuItem disabled value="">
                <em>Sorted By</em>
              </MenuItem>
              <MenuItem value={"Option 1"}>Option 1</MenuItem>
              <MenuItem value={"Option 2"}>Option 2</MenuItem>
              <MenuItem value={"Option 3"}>Option 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              placeholder="SORT By ALl:"
              onChange={handleChange}
              displayEmpty
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Past one Month</em>;
                }
                return selected;
              }}
              sx={{ width: "170px", height: "37px" }}
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
        <Square fill="#e0c812" strokeWidth={0} />
        <Typography variant="body1">Others</Typography>
      </Stack>
    </>
  );
};

export default AnalyticsNav1;
