// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   {
//     label: "03",
//     activeUsers: [700, 600, 500, 400],
//     inactiveUsers: [384, 300, 250, 200],
//   },
//   {
//     label: "09",
//     activeUsers: [900, 800, 700, 600],
//     inactiveUsers: [541, 450, 350, 300],
//   },
//   {
//     label: "12",
//     activeUsers: [750, 700, 650, 600],
//     inactiveUsers: [379, 300, 250, 200],
//   },
//   {
//     label: "15",
//     activeUsers: [900, 850, 800, 750],
//     inactiveUsers: [471, 400, 350, 300],
//   },
//   {
//     label: "18",
//     activeUsers: [750, 700, 650, 600],
//     inactiveUsers: [365, 300, 250, 200],
//   },
//   {
//     label: "21",
//     activeUsers: [850, 800, 750, 700],
//     inactiveUsers: [453, 400, 350, 300],
//   },
//   {
//     label: "24",
//     activeUsers: [750, 700, 650, 600],
//     inactiveUsers: [381, 300, 250, 200],
//   },
//   {
//     label: "27",
//     activeUsers: [850, 800, 750, 700],
//     inactiveUsers: [483, 400, 350, 300],
//   },
// ];

// const colorsActive = ["#DAE2FE", "#9CAFED", "#6157DB", "#392EBD"];
// const colorsInactive = ["#50DE93", "#2FCB78", "#24B670", "#129355"];

// const ActivityGraph = () => {
//   return (
//     <ResponsiveContainer width="100%" height={280}>
//       <BarChart
//         data={data}
//         margin={{
//           top: 20,
//           right: 30,
//           left: 20,
//           bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="label" />
//         <YAxis
//           label={{
//             value: "Users (in lakhs)",
//             angle: -90,
//             position: "insideLeft",
//             dx: -5,
//             dy: 30,
//             style: { fontWeight: 600 },
//           }}
//         />
//         {colorsActive.map((color, index) => (
//           <Bar
//             key={`active-${index}`}
//             dataKey={(d) => d.activeUsers[index]}
//             stackId="a"
//             fill={color}
//             barSize={15}
//           />
//         ))}
//         {colorsInactive.map((color, index) => (
//           <Bar
//             key={`inactive-${index}`}
//             dataKey={(d) => d.inactiveUsers[index]}
//             stackId="b"
//             fill={color}
//             barSize={15}
//           />
//         ))}
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default ActivityGraph;

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const colorsActive = ["#c0d2f0", "#8fb4f2", "#3a7ff2", "#0958de"];
const colorsInactive = ["#bbf2c3", "#87f597", "#42f55d", "#04c922"];

const ActivityGraph = ({ data, onBarClick }) => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis
          label={{
            value: "Users (in lakhs)",
            angle: -90,
            position: "insideLeft",
            dx: -5,
            dy: 30,
            style: { fontWeight: 600 },
          }}
        />
        {colorsActive.map((color, index) => (
          <Bar
            key={`active-${index}`}
            dataKey={(d) => d.activeUsers[index]}
            stackId="a"
            fill={color}
            barSize={17}
            onClick={(data) => onBarClick(data)}
          />
        ))}
        {colorsInactive.map((color, index) => (
          <Bar
            key={`inactive-${index}`}
            dataKey={(d) => d.inactiveUsers[index]}
            stackId="b"
            fill={color}
            barSize={17}
            onClick={(data) => onBarClick(data)}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ActivityGraph;
