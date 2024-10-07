import React, { Suspense, useDeferredValue } from "react";
import { Paper, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { dateFormatting } from "../../services/common";
import InputWithIcon from "../common/searchBox";
import UseCustomRouter from "../../services/utilities/customRouter";
import { Skeleton } from "@mui/material";
import { GreenUp } from "./Icon";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F4F3FE",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


export default function DynamicTable({ data, columns, placeholder, path, loading, style }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredData, setFilteredData] = React.useState(data);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { navigate } = UseCustomRouter();
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const filterData = () => {
    // const filtered = data?.filter((item) => {
    //   const { topic_id, subject_id } = item;
    //   return (
    //     topic_id?.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
    //     subject_id?.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    //   );
    // });
    setFilteredData(data);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    filterData(); // Filter data whenever the deferredSearchTerm changes
  }, [deferredSearchTerm, data]);

  return (
    <>
      <div className="p-3 flex justify-between items-center gap-4 sticky top-0  ">
        {/* <div className="basis-1/3">
            <InputWithIcon
              placeholder={placeholder}
              handleChange={handleSearchChange}
              value={searchTerm}
            />
          </div> */}

      </div>
      <Suspense fallback={<Skeleton active />}>
        {loading ? (
          <TableContainer sx={{ ...style }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns?.map((column, index) => (
                    <StyledTableCell
                      key={index}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <Skeleton />
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: rowsPerPage })?.map((_, index) => (
                  <StyledTableRow key={index}>
                    {columns.map((column, ind) => (
                      <StyledTableCell key={ind} align={column.align}>
                        <Skeleton />
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer sx={{ ...style }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns?.map((column, index) => (
                    <StyledTableCell
                      key={index}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, ind) => {
                    return (
                      <StyledTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={ind}
                        className="cursor-pointer"
                        onClick={() =>
                          navigate(`${path}/${row._id}`)
                        }
                      >
                        {columns?.map((column, ind) => {
                          const value =
                            column.type === "date"
                              ? dateFormatting(row[column.dataKey]).date
                              : Array.isArray(row[column.dataKey])
                                ? row[column.dataKey]?.[0]?.title
                                : typeof row[column.dataKey] === "boolean"
                                  ? row[column.dataKey] === true
                                    ? column?.showValue.yes
                                    : column?.showValue.no // Convert boolean to string
                                  : row[column.dataKey];


                          return (
                            <StyledTableCell
                              key={column.dataKey}
                              align={column.align}
                            >
                              {value}
                            </StyledTableCell>
                          );
                        })}
                      </StyledTableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Suspense>




      {/* <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper> */}
    </>
  );
}
