import React, { useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from "@mui/material";
import { useSelector } from "react-redux";
import { HTMLConverter } from "../../../../../../services/common";

const columns = [
  { dataKey: "subject", label: "Subject", minWidth: "30vw" },
  { dataKey: "topics", label: "Topics", minWidth: "30vw" },
  {
    dataKey: "marks",
    label: "Marks alloted ",
    minWidth: 170,
    align: "start",
    width: "5vw",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    dataKey: "questions",
    label: "No. of questions ",
    minWidth: "5vw",
    align: "start",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const ScoringSyllabus = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [syllabus, setSyllabus] = useState({});
  const { viewDetails } = useSelector((state) => state.examSpecification);

  useEffect(() => {
    setSyllabus(viewDetails.syllabus);
  }, [viewDetails]);

  console.log(
    "🚀 ~ file: ScoringSyllabus.js:45 ~ ScoringSyllabus ~ syllabus:",
    syllabus
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <React.Fragment>
      <div className="h-[80vh] overflow-y-scroll scroll-smooth scrollbar-hide ">
      <div className="  p-2 my-3">
            <HTMLConverter>{syllabus.description}</HTMLConverter>
          </div>

        <div className="p-1  bg-white ">
          <div style={{ width: "100%", overflow: "hidden" }}>
            <TableContainer style={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow style={{ backgroundColor: "#24B670" }}>
                    {columns.map((column) => (
                      <TableCell
                        key={column.dataKey}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          backgroundColor: "#24B670",
                          border: "1px solid #D8D8D8",
                          color: "white",
                          fontWeight: 530,
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {syllabus?.details?.map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      {columns.map((column) => (
                        <TableCell
                          key={column.dataKey}
                          align={column.align}
                          style={{ border: "1px solid #D8D8D8" }}
                        >
                          {column.format &&
                          typeof row[column.dataKey] === "number"
                            ? column.format(row[column.dataKey])
                            : row[column.dataKey]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={1} // only one row
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ScoringSyllabus;
