// import React from "react";

// import Box from "@mui/material/Box";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { MoreVertical } from "lucide-react";
// import ActivityGraph from "./activityGraph";

// const Activity = () => {
//   const [age, setAge] = React.useState("");
//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };
//   const graphData = [
//     {
//       label: "03",
//       activeUsers: 760,
//       inactiveUsers: 380,
//     },
// {
//   label: "09",
//   activeUsers: 940,
//   inactiveUsers: 520,
// },
// {
//   label: "12",
//   activeUsers: 740,
//   inactiveUsers: 360,
// },
// {
//   label: "15",
//   activeUsers: 880,
//   inactiveUsers: 460,
// },
// {
//   label: "18",
//   activeUsers: 720,
//   inactiveUsers: 340,
// },
// {
//   label: "21",
//   activeUsers: 860,
//   inactiveUsers: 440,
// },
// {
//   label: "24",
//   activeUsers: 700,
//   inactiveUsers: 320,
// },
// {
//   label: "27",
//   activeUsers: 840,
//   inactiveUsers: 420,
// },
//   ];
//   const activeUsersData = [
//     {
//       label: "Total",
//       value: 7234,
//     },
//     {
//       label: "Discussion",
//       value: 1475,
//     },
//     {
//       label: "Challenges",
//       value: 475,
//     },
//     {
//       label: "Practice Q/A",
//       value: 3580,
//     },
//     {
//       label: "Topics",
//       value: 2589,
//     },
//   ];
//   const inactiveUsersData = [
//     {
//       label: "Total",
//       value: 7234,
//     },
//     {
//       label: "Discussion",
//       value: 1475,
//     },
//     {
//       label: "Challenges",
//       value: 475,
//     },
//     {
//       label: "Practice Q/A",
//       value: 3580,
//     },
//     {
//       label: "Topics",
//       value: 2589,
//     },
//   ];
//   return (
//     <>
//       <div className="w-3/4 h-7rem border border-#cfd0d1-50 rounded-md">
//         <div>
//           <div>
//             <div className="flex w-full text-center h-12 justify-between p-2">
//               <h2 className="text-lg font-bold">User Activity</h2>
//               <div className="mr-6">
//                 <Box sx={{ minWidth: 150 }} height="5px">
//                   <FormControl fullWidth size="small">
//                     <Select
//                       id="demo-simple-select"
//                       value={age}
//                       onChange={handleChange}
//                       displayEmpty
//                       renderValue={(selected) => {
//                         if (selected.length === 0) {
//                           return <em>Past one Month</em>;
//                         }
//                         return selected;
//                       }}
//                     >
//                       <MenuItem disabled value="">
//                         <em>Past one Month</em>
//                       </MenuItem>
//                       <MenuItem value={"Past One Month"}>
//                         Past one Month
//                       </MenuItem>

//                       <MenuItem value={10}>Ten</MenuItem>
//                       <MenuItem value={20}>Twenty</MenuItem>
//                       <MenuItem value={30}>Thirty</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Box>
//                 <div className="flex justify-end -mr-7">
//                   <MoreVertical />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex p-2 mt-10 overflow-hidden rounded-lg">
//           <div className="w-full ml-3 h-72 mb-4">
//             <ActivityGraph data={graphData} />
//           </div>
//         </div>

//         <div className="flex justify-between">
//           <div className="w-1/2 h-22 rounded-lg border border-#cfd0d1-50 mr-2 ml-6 mb-6">
//             <div className="p-4">
//               <p className="font-bold text-base mb-2 border-b border-gray-300 pb-2">
//                 Average Active Users
//               </p>
//               <div className="flex">
//                 {activeUsersData.map((item, index) => (
//                   <div
//                     key={index}
//                     className={`mr-4 ${
//                       index < activeUsersData.length - 1
//                         ? "border-r border-gray-300"
//                         : ""
//                     }`}
//                   >
//                     <p className="text-xs pr-1">{item.label}</p>
//                     <p className="font-bold text-xs">{item.value}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="w-1/2 h-22 rounded-lg border border-#cfd0d1-50 ml-2 mr-6 mb-6">
//             <div className="p-4">
//               <p className="font-bold text-base mb-2 border-b border-gray-300 pb-2">
//                 Average Inactive Users
//               </p>
//               <div className="flex">
//                 {inactiveUsersData.map((item, index) => (
//                   <div
//                     key={index}
//                     className={`mr-4 ${
//                       index < inactiveUsersData.length - 1
//                         ? "border-r border-gray-300"
//                         : ""
//                     }`}
//                   >
//                     <p className="text-xs pr-2">{item.label}</p>
//                     <p className="font-bold text-xs">{item.value}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Activity;

import React, { useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MoreVertical } from "lucide-react";
import ActivityGraph from "./activityGraph";

const Activity = () => {
  const [age, setAge] = useState("");
  const [selectedData, setSelectedData] = useState({
    activeUsersData: [],
    inactiveUsersData: [],
  });

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleBarClick = (data) => {
    const { activeUsers, inactiveUsers } = data;
    setSelectedData({
      activeUsersData: [
        { label: "Total", value: activeUsers.reduce((a, b) => a + b, 0) },
        { label: "Discussion", value: activeUsers[0] },
        { label: "Challenges", value: activeUsers[1] },
        { label: "Practice Q/A", value: activeUsers[2] },
        { label: "Topics", value: activeUsers[3] },
      ],
      inactiveUsersData: [
        { label: "Total", value: inactiveUsers.reduce((a, b) => a + b, 0) },
        { label: "Discussion", value: inactiveUsers[0] },
        { label: "Challenges", value: inactiveUsers[1] },
        { label: "Practice Q/A", value: inactiveUsers[2] },
        { label: "Topics", value: inactiveUsers[3] },
      ],
    });
  };

  const graphData = [
    {
      label: "03",
      activeUsers: [700, 600, 500, 400],
      inactiveUsers: [384, 300, 250, 200],
    },
    {
      label: "09",
      activeUsers: [900, 800, 700, 600],
      inactiveUsers: [541, 450, 350, 300],
    },
    {
      label: "12",
      activeUsers: [750, 700, 650, 600],
      inactiveUsers: [379, 300, 250, 200],
    },
    {
      label: "15",
      activeUsers: [900, 850, 800, 750],
      inactiveUsers: [471, 400, 350, 300],
    },
    {
      label: "18",
      activeUsers: [750, 700, 650, 600],
      inactiveUsers: [365, 300, 250, 200],
    },
    {
      label: "21",
      activeUsers: [850, 800, 750, 700],
      inactiveUsers: [453, 400, 350, 300],
    },
    {
      label: "24",
      activeUsers: [750, 700, 650, 600],
      inactiveUsers: [381, 300, 250, 200],
    },
    {
      label: "27",
      activeUsers: [850, 800, 750, 700],
      inactiveUsers: [483, 400, 350, 300],
    },
  ];

  return (
    <>
      <div className="w-3/4 h-7rem border border-#cfd0d1-50 rounded-md">
        <div>
          <div>
            <div className="flex w-full text-center h-12 justify-between p-2">
              <h2 className="text-lg font-bold">User Activity</h2>
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
              </div>
            </div>
          </div>
        </div>

        <div className="flex p-2 mt-10 overflow-hidden rounded-lg">
          <div className="w-full ml-3 h-72 mb-4">
            <ActivityGraph data={graphData} onBarClick={handleBarClick} />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="w-1/2 h-22 rounded-lg border border-#cfd0d1-50 mr-2 ml-6 mb-6">
            <div className="p-4">
              <p className="font-bold text-base mb-2 border-b border-gray-300 pb-2">
                Average Active Users
              </p>
              <div className="flex">
                {selectedData.activeUsersData.map((item, index) => (
                  <div
                    key={index}
                    className={`mr-4 ${
                      index < selectedData.activeUsersData.length - 1
                        ? "border-r border-gray-300"
                        : ""
                    }`}
                  >
                    <p className="text-xs pr-1">{item.label}</p>
                    <p className="font-bold text-xs">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-1/2 h-22 rounded-lg border border-#cfd0d1-50 ml-2 mr-6 mb-6">
            <div className="p-4">
              <p className="font-bold text-base mb-2 border-b border-gray-300 pb-2">
                Average Inactive Users
              </p>
              <div className="flex">
                {selectedData.inactiveUsersData.map((item, index) => (
                  <div
                    key={index}
                    className={`mr-4 ${
                      index < selectedData.inactiveUsersData.length - 1
                        ? "border-r border-gray-300"
                        : ""
                    }`}
                  >
                    <p className="text-xs pr-2">{item.label}</p>
                    <p className="font-bold text-xs">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Activity;
