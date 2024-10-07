import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";


const Structure = () => {

  const { viewDetail } = useSelector((state) => state.courses);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (viewDetail) {
      
      setData(viewDetail?.courseStructure);
    }
  }, [viewDetail]);


console.log("data  of  strytuew", data);

  return (
    <>
      <div className="flex p-2 justify-center w-full">
        <TableContainer
          component={Paper}
          sx={{ width: "25%", borderRadius: "5px 0 0 0px" }}
        >
          <Table>
            <TableHead style={{ backgroundColor: "#20c906" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Topic</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.topic}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer
          component={Paper}
          sx={{ width: "50%", borderRadius: 0 }}
        >
          <Table>
            <TableHead style={{ backgroundColor: "#20c906" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>
                  Session on each sub topic
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item["session on each sub topic"]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer
          component={Paper}
          sx={{ width: "25%", borderRadius: " 0 5px 0 0px" }}
        >
          <Table>
            <TableHead style={{ backgroundColor: "#20c906" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Number of session</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item["number of Session"]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Structure;
