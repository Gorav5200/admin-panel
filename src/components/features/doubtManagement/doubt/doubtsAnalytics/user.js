import React from "react";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MoreVertical } from "lucide-react";

import UserGraph from "./userGraph";

const User = () => {
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <div className="w-2/4 h-96 border border-#cfd0d1-50 rounded-md">
        <div>
          <div>
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
                          return <em>This Week</em>;
                        }
                        return selected;
                      }}
                    >
                      <MenuItem disabled value="">
                        <em>This Week</em>
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
              </div>
            </div>
            <div className="flex space-x-2">
              <div style={{ height: "1px", fontSize: "35px", fontWeight: 600 }}>
                79%{" "}
              </div>
              <div style={{ paddingTop: "20px" }}>Increase in Users</div>
            </div>
          </div>
        </div>

        <div className="flex p-2 mt-10 overflow-hidden rounded-lg">
          <div className="w-full ml-3v h-60">
            <UserGraph />
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
