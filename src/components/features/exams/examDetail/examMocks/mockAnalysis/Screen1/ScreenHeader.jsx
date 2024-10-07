import React from "react";
import { Square } from "lucide-react";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MoreHorizontal } from "lucide-react";
import { MoreVertical } from "lucide-react";

const ScreenHeader = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <div className=" flex justify-between p-2">
        <div>
          <h2 className="font-bold">Users Growth</h2>
        </div>
        <div className="p-1 mr-10">
          <Box sx={{ minWidth: 210 }} height="10px">
            <FormControl fullWidth size="small">
              <Select
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <em>Past One Month</em>;
                  }
                  return selected;
                }}
              >
                <MenuItem disabled value="">
                  <em>Past One Month</em>
                </MenuItem>

                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div className="flex justify-end -mr-16">
            <MoreVertical style={{ width: 50, height: 18 }} />
          </div>
        </div>
      </div>
      <div className="flex justify-end -mt-1 items-end h-10">
        <div className="flex mr-14">
          <div className="flex p-1 justify-end items-center">
            <Square
              fill="#24B670"
              stroke="none"
              style={{ width: 50, height: 20 }}
            />
            <p>Total User</p>
          </div>

          <div className="flex p-1 justify-end ml-1 items-center ">
            <Square
              fill="#5146D6"
              stroke="none"
              style={{ width: 50, height: 20 }}
            />
            <p>New Users</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenHeader;
