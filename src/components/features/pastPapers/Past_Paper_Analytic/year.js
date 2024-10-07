// import React from "react";

// import BoxAges from "./boxages";

// import Map9 from "./map9";
// import { MoreVertical } from "lucide-react";
// import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
// import { Search, Users } from "lucide-react";

// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

// const Year = () => {
//   const [age, setAge] = React.useState("");
//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };
//   const data = [
//     {
//       id: 1,
//       title: "0 - 2",
//       users: 1364,
//     },
//     {
//       id: 2,
//       title: "2 - 4",
//       users: 1120,
//     },
//     {
//       id: 3,
//       title: "4 - 6",
//       users: 1181,
//     },
//     {
//       id: 4,
//       title: "6 - 8",
//       users: 1484,
//     },
//     {
//       id: 5,
//       title: "8 - 10",
//       users: 1284,
//     },
//     {
//       id: 6,
//       title: "10+",
//       users: 284,
//     },
//   ];
//   return (
//     <>
//       <Stack
//         direction={"row"}
//         spacing={2}
//         justifyContent={"space-between"}
//         alignItems={"center"}
//       >
//         <Typography
//           variant="body1"
//           style={{ fontWeight: 600, fontSize: 20, marginLeft: "10px" }}
//         >
//           User Work Experience by Location
//         </Typography>
//         <Stack
//           direction={"row"}
//           spacing={2}
//           justifyContent={"center"}
//           alignItems={"center"}
//         >
//           <Search />
//           <Typography variant="subtitle2" style={{ color: "blue" }}>
//             Views State Ranking
//           </Typography>
//           <FormControl>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={age}
//               placeholder="SORT By ALl:"
//               onChange={handleChange}
//               displayEmpty
//               renderValue={(selected) => {
//                 if (selected.length === 0) {
//                   return <em>Past one Month</em>;
//                 }
//                 return selected;
//               }}
//               sx={{ width: "170px", height: "37px" }}
//             >
//               <MenuItem disabled value="">
//                 <em>Past one Month</em>
//               </MenuItem>
//               <MenuItem value={"Past One Month"}>Past one Month</MenuItem>
//               <MenuItem value={10}>Ten</MenuItem>
//               <MenuItem value={20}>Twenty</MenuItem>
//               <MenuItem value={30}>Thirty</MenuItem>
//             </Select>
//           </FormControl>
//           <MoreVertical />
//         </Stack>
//       </Stack>
//       <Typography
//         variant="body1"
//         sx={{ marginTop: "2%", fontSize: 15, marginLeft: "10px" }}
//       >
//         Work Experience
//       </Typography>
//       <div className="flex justify-center">
//         <Box
//           sx={{
//             // display: "flex",
//             // justifyContent: "center",
//             // alignItems: "center",
//             // flexWrap: "wrap",
//             // width: "60%",
//             // padding: "5px",
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
//             justifyContent: "center",
//             alignItems: "center",
//             gap: "80px ",
//             width: "60%",
//             padding: "10px",
//           }}
//         >
//           {data.map((ele) => {
//             return (
//               <Card
//                 sx={{
//                   width: "250px",
//                   margin: "3px",
//                   height: "140px",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6">{ele.title} yrs</Typography>
//                   <Typography variant="body1">{ele.users} users</Typography>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </Box>
//         <Map9 />
//       </div>
//     </>
//   );
// };

// export default Year;

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
import { Search, MoreVertical } from "lucide-react";
import Map9 from "./map9";
import Counting from "./counting";

const Year = () => {
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
          style={{ fontWeight: 600, fontSize: 19, paddingLeft: "20px" }}
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
      <Typography variant="body1" sx={{ marginTop: "2%", paddingLeft: "20px" }}>
        Work Experience
      </Typography>
      <Box display="flex" justifyContent="center">
        <Grid container spacing={0} p={4} m={2}>
          {data.map((ele) => (
            <Grid item xs={4} key={ele.id}>
              <Card
                sx={{
                  width: "270px",
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
              <Counting />
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
          <Map9 />
        </div>
      </Box>
    </>
  );
};

export default Year;
