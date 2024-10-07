import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import { CustomButton, ButtonStyle } from "../../../../styles/muiRoot";
import { BasicModal } from "./modal";
import DynamicTable from "./dynamicTable";
import Icon, { GreenUp, RedDown } from "./icon";
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";
import ModalComp from "./modal";

function ModalOpen() {
  const { handleClose, handleOpen, ModalComponent } = ModalComp();
  const columns = [
    { dataKey: "Product Name", label: "Product Name", minWidth: 170 },
    { dataKey: "User Growth", label: "User Growth", align: "left" },
    {
      dataKey: "Premium Users",
      label: "Premium Users",
      align: "left",
    },
    {
      dataKey: "Total Revenue",
      label: "Total Revenue",
      align: "left",
    },
  ];

  return (
    <>
      <CustomButton
        style={{
          ...ButtonStyle,
          fontSize: "14px",
          height: 34,
          width: 107,
          borderRadius: 5,
        }}
        onClick={handleOpen}
      >
        View Details
      </CustomButton>

      <ModalComponent>
        {" "}
        <div>
          <DynamicTable
            data={[
              { "Product Name": 123, "User Growth": "123", "Premium Users": 3 },
              {
                "Product Name": 1233,
                "User Growth": "123",
                "Premium Users": 3,
              },
              {
                "Product Name": 1323,
                "User Growth": "123",
                "Premium Users": 3,
              },
              { "Product Name": 323, "User Growth": "123", "Premium Users": 3 },
            ]}
            columns={columns}
            style={{
              height: "20vh",
              width: 773,
              height: 443,
              overflow: "scroll",
            }}
            loading={false}
          />
        </div>
      </ModalComponent>
    </>
  );
}
//update this
function createData(
  examName,
  userGrowth,
  premiumUsers,
  totalRevenue,
  totalSales,
  examDate
) {
  return {
    examName,
    userGrowth,
    premiumUsers,
    totalRevenue,
    totalSales,
    examDate,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

// This is creating the rows
function Row(props) {
  const { row, colLength } = props;
  const [open, setOpen] = React.useState(false);
  const { handleClose, handleOpen, ModalComponent } = ModalComp();
  const columns = [
    { dataKey: "Product Name", label: "Product Name", minWidth: 170 },
    { dataKey: "User Growth", label: "User Growth", align: "left" },
    {
      dataKey: "Premium Users",
      label: "Premium Users",
      align: "left",
    },
    {
      dataKey: "Total Revenue",
      label: "Total Revenue",
      align: "left",
    },
  ];

  return (
    <React.Fragment>
      <ModalComponent>
        <div>
          <DynamicTable
            columns={columns}
            style={{
              height: "20vh",
              width: 773,
              height: 443,
              overflow: "scroll",
            }}
            loading={false}
          />
        </div>
      </ModalComponent>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row" align="left">
          {row.examName}
          <h5 className="text-secondary text-xs">
            {" "}
            1.5k Modules • 6k Users • MBA
          </h5>
        </TableCell>
        <TableCell align="left">
          <div className="flex gap-1 items-center">
            {row.userGrowth}
            <GreenUp />
          </div>
          <h5 className="text-secondary text-xs"> 154 New users</h5>
        </TableCell>
        <TableCell align="left">{row.premiumUsers}</TableCell>
        <TableCell align="left">
          <div className="flex gap-1 items-center">
            {row.totalRevenue}
            <RedDown />
          </div>

          <h5 className="text-secondary text-xs"> 22%</h5>
        </TableCell>
        <TableCell align="left" className="flex">
          <div className="flex gap-1 items-center">
            {row.totalSales}
            <RedDown />
          </div>
          <h5 className="text-secondary text-xs"> 22%</h5>
        </TableCell>
        <TableCell align="left" width={139}>
          {row.examDate}
        </TableCell>
        <TableCell width={20}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      {/* inner row */}
      <TableCell
        style={{
          paddingBottom: 0,
          paddingTop: 0,
          backgroundColor: "#FFFDF5",
          border: "none",
        }}
        colSpan={7}
      >
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Table size="large" aria-label="purchases">
            <TableBody>
              {props?.modules?.map((mod, ind) => (
                <TableRow
                  sx={{ "& > *": { p: 2.5, px: 0, cursor: "pointer" } }}
                  onClick={() => handleOpen()}
                >
                  <TableCell align="left" width={298.14}>
                    {mod.title}
                    <h5 className="text-secondary text-xs">
                      {" "}
                      {/* 1.5k Modules • 6k Users • MBA */}
                      {mod.count}
                    </h5>
                  </TableCell>
                  <TableCell
                    align="left"
                    width={207.86}
                    sx={{ px: 1, ml: 1.6 }}
                  >
                    {" "}
                    <div className="flex gap-1 items-center">
                      {row.userGrowth}
                      <GreenUp />
                    </div>
                    <h5 className="text-secondary text-xs"> 154 New users</h5>
                  </TableCell>
                  <TableCell
                    align="left"
                    width={233.46}
                    sx={{ px: 1, ml: 1.6 }}
                  >
                    {row.premiumUsers}
                  </TableCell>
                  <TableCell align="left" width={222.1} sx={{ px: 2, ml: 1.6 }}>
                    <div className="flex gap-1 items-center">
                      {row.totalRevenue}
                      <RedDown />
                    </div>
                    <h5 className="text-secondary text-xs"> 22%</h5>
                  </TableCell>
                  <TableCell
                    align="left"
                    width={191.73}
                    sx={{ px: 2, ml: 1.8 }}
                  >
                    <div className="flex gap-1 items-center">
                      {row.totalSales}
                      <RedDown />
                    </div>{" "}
                    <h5 className="text-secondary text-xs"> 22%</h5>
                  </TableCell>
                  <TableCell align="left" width={139} sx={{ px: 3, ml: 1.6 }}>
                    {row.totalSales}
                  </TableCell>
                  <TableCell align="left" width={60}></TableCell>
                  {/* <ModalComp data={mod}/> */}
                </TableRow>
              ))}
            </TableBody>

            {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.modal * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}
          </Table>
        </Collapse>
      </TableCell>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ examList }) {
  console.log("exam in table", examList);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let rows = examList?.map((exam, eindex) => {
    //console.log("275",eindex,exam.title);
    return createData(exam.title, 159, 6.0, 24, 39, <ModalOpen />);
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [sortColumn, setSortColumn] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState("asc");

  const handleChangeSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  // Sort the rows based on the selected column and order
  const sortedRows = rows?.sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {[
                "Exam Name",
                "Revenue to date",
                "Premium Users",
                "Module Sales",
              ]?.map((examName) => (
                <TableCell
                  style={{
                    backgroundColor: "#f6f0fc",
                    color: "#333",
                  }}
                >
                  <div-
                    className="flex items-center"
                    onClick={() => handleChangeSort("examName")}
                  >
                    {examName}
                    <IconButton>
                      {sortOrder === "asc" ? (
                        <ArrowDownAZ size={14} />
                      ) : (
                        <ArrowDownZA size={14} />
                      )}
                    </IconButton>
                  </div->
                </TableCell>
              ))}
              <TableCell
                style={{
                  backgroundColor: "#f6f0fc",
                  color: "#333",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows?.map((row) => (
              <Row
                key={row.title}
                row={row}
                colLength={7}
                modules={[
                  { title: "Groups", count: 3 },
                  { title: "Mocks", count: 3 },
                  { title: "Courses", count: 3 },
                ]}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
