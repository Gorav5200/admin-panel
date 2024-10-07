import React, { useState } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ToggleSwitch from "../../../../../common/toggleSwtch";
import { Image } from "antd";
import { Collapse, TablePagination } from "@mui/material";
import { useSelector } from "react-redux";
import { HTMLConverter } from "../../../../../../services/common";

function TopCollege() {
  const [checked, setChecked] = useState(false);
  const { viewDetails } = useSelector((state) => state.examSpecification);

  return (
    <div className="h-[80vh]">
      <div className=" bg-[#FFF7F0] p-3  w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p
              className={`text-sm font-semibold ${
                checked ? "text-[#24B670]" : "text-[red]"
              }`}
            >
              {checked ? "*Published" : "*Changes not published"}
            </p>
            {!checked && (
              <Button
                variant="contained"
                style={{
                  textTransform: "capitalize",
                  backgroundColor: "black",
                  minWidth: "20px",
                  marginLeft: "20px",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
                onClick={() => alert("Hello")}
              >
                Publish changes
              </Button>
            )}
          </div>
          <div>
            <ToggleSwitch
              label={
                checked ? (
                  <p className=" text-sm font-medium pr-2">Show Published on</p>
                ) : (
                  <p className=" text-sm font-medium pr-2">
                    Show Published off
                  </p>
                )
              }
              handleChange={(val) => setChecked(val)}
              value={checked}
            />
          </div>
        </div>
      </div>
      <div className="w-[100%] flex bg-white h-full ">
      
            <div className=" mt-2 h-[70vh] overflow-y-scroll scroll-smooth p-2  w-full">
             <Collapse easing={"ease-in-out"} timeout={10} in={checked} className="p-2">
                <HTMLConverter >
                  {viewDetails.topColleges.description}
                </HTMLConverter>
              </Collapse>

              <div className="h-[45vh]  sm:h-[57vh] overflow-y-scroll scroll-smooth p-2 ">
                <TableComp data={viewDetails?.topColleges.details || []} />
              </div>
            </div>

          
    
      </div>
    </div>
  );
}

export default TopCollege;

const TableComp = ({data}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const columns = [
    { dataKey: "college", label: "College Name", minWidth: 250 },
    { dataKey: "percentile", label: "Percentile", minWidth: 100 },
    
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
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
          {data?.map((row) => (
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
  );
};
