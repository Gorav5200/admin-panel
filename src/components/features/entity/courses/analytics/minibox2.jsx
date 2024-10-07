import React from "react";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch"; // Import the Switch component
import { MoreVertical } from "lucide-react";
import MiniBoxGraph from "./miniboxgraph";

const MiniBox2 = () => {
  const [age, setAge] = React.useState("");
  const [checked, setChecked] = React.useState(true); // State for the switch

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSwitch = (event) => {
    setChecked(event.target.checked); // Handle switch state change
  };

  return (
    <>
      <div className="w-2/4 border border-#cfd0d1-50 rounded-md">
        <div>
          <div>
            <div className="flex w-full text-center h-12 justify-between p-2">
              <h2 className="text-lg font-bold">Sales Trend</h2>
              <div className="mr-6">
                <Box sx={{ minWidth: 150 }} height="5px">
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
                      <MenuItem value={"Past One Month"}>
                        Past one Month
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <div className="flex justify-end -mr-7">
                  <MoreVertical />
                </div>
                <div className=" mt-4">
                  <span style={{ fontWeight: 500 }}>Show Comparison</span>
                  <Switch
                    checked={checked}
                    onChange={handleSwitch}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex p-2 mt-10 overflow-hidden rounded-lg">
          <div>
            <h2 className="text-xl font-bold">25,468</h2>
            <p className="mt-3 text-sm">Total Sales In units</p>
          </div>
          <div className="w-full ml-3 h-72">
            <MiniBoxGraph />
          </div>
        </div>
      </div>
    </>
  );
};

export default MiniBox2;
