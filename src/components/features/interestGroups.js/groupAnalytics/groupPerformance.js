import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MoreVertical } from "lucide-react";
import GroupGraph from "./groupGraph";

const GroupPerformance = () => {
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="w-2/4 h-auto border border-#cfd0d1-50 rounded-md">
      <div className="flex w-full text-center h-12 justify-between p-2">
        <h2 className="text-lg font-bold">Group Performance</h2>
        <div className="flex items-center">
          <Box sx={{ minWidth: 150 }} height="5px" marginBottom={"23px"}>
            <FormControl fullWidth size="small">
              <Select
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Past one Month</em>;
                  }
                  return selected;
                }}
              >
                <MenuItem disabled value="">
                  <em>Past one Month</em>
                </MenuItem>
                <MenuItem value={"Past One Month"}>Past One Month</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div className="flex justify-end -mr-1">
            <MoreVertical />
          </div>
        </div>
      </div>

      <div
        className="p-2 overflow-hidden rounded-lg"
        style={{ width: "480px" }}
      >
        <div className="h-96 pt-11" style={{ width: "470px" }}>
          <GroupGraph />
        </div>
      </div>

      <div className="flex justify-around p-2 mt-4">
        <div className="text-center">
          <h2 className="text-xl font-bold">11,780</h2>
          <p className="mt-1 text-sm">Total Users</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">7,780</h2>
          <p className="mt-1 text-sm">Total New Users</p>
        </div>
      </div>
    </div>
  );
};

export default GroupPerformance;
