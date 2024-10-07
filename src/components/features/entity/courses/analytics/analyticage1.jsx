import React from "react";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Grid,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { Search } from "lucide-react";
import Map1 from "./map1";
import ProgressScale from "./progressscale";
import { MoreVertical } from "lucide-react";

const AnalyticAge1 = () => {
  const [age, setAge] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState(null);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleCardClick = (id) => {
    setSelectedCard(id);
  };

  const data = [
    {
      id: 1,
      title: "0 - 2",
      users: 1364,
    },
    {
      id: 2,
      title: "2 - 4",
      users: 1120,
    },
    {
      id: 3,
      title: "4 - 6",
      users: 1181,
    },
    {
      id: 4,
      title: "6 - 8",
      users: 1484,
    },
    {
      id: 5,
      title: "8 - 10",
      users: 1284,
    },
    {
      id: 6,
      title: "10+",
      users: 284,
    },
  ];

  return (
    <>
      <Stack
        direction={"row"}
        spacing={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography
          variant="body1"
          style={{ fontWeight: 600, marginLeft: "10px" }}
        >
          User Work Experience by Location
        </Typography>
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Search />
          <Typography
            variant="subtitle2"
            style={{ color: "blue", fontWeight: 500 }}
          >
            Views State Ranking
          </Typography>
          <FormControl>
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
              sx={{ width: "170px", height: "37px" }}
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
        </Stack>
      </Stack>
      <Typography variant="body1" sx={{ marginTop: "2%", marginLeft: "10px" }}>
        Work Experience
      </Typography>
      <Box display="flex" justifyContent="center">
        <Grid container spacing={0} p={4} m={2}>
          {data.map((ele) => (
            <Grid item xs={4} key={ele.id}>
              <Card
                sx={{
                  width: "250px",
                  height: "120px",
                  border:
                    selectedCard === ele.id
                      ? "2px solid #24B670"
                      : "1px solid #EAEAEC",
                  cursor: "pointer",
                  boxShadow: "none",
                }}
                onClick={() => handleCardClick(ele.id)}
              >
                <CardContent>
                  <Typography variant="h5" style={{ fontWeight: 600 }}>
                    {ele.title} yrs
                  </Typography>
                  <Typography variant="body1">{ele.users} users</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Box sx={{ p: 1, width: "100%" }}>
              <ProgressScale />
            </Box>
          </Grid>
        </Grid>
        <div
          style={{
            flexBasis: "45%",
            position: "relative",
            height: "80vh",
            bottom: 70,
          }}
        >
          <Map1 />
        </div>
      </Box>
    </>
  );
};

export default AnalyticAge1;
