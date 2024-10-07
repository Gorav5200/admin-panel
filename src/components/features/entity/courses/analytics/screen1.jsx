import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MoreVertical } from "lucide-react";

import Graph1 from "./graph1";

const Screen1 = () => {
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <div className="flex justify-between flex-col  border border-#cfd0d1-50 rounded-md w-2/4">
        <div className="flex  w-full text-center h-12 justify-between p-2">
          <h2 className=" text-lg font-bold">User Growth</h2>
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
                  <MenuItem value={"Past One Month"}>Past one Month</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <div className="flex justify-end -mr-7">
              <MoreVertical />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex p-2  w-1/5">
            <div className="p-2 flex flex-col">
              <div className="p-1">
                <h3 className="font-bold text-xl">11780</h3>
                <p>Total users</p>
              </div>
              <div className="p-1 mt-5">
                <h3 className="font-bold text-xl">7780</h3>
                <p>Total New users</p>
              </div>
            </div>
          </div>
          <div className="p-3 w-full h-80">
            <Graph1 />
          </div>
        </div>
      </div>
    </>
  );
};

export default Screen1;
