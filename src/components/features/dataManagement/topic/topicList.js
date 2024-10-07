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
import { dateFormatting } from "../../../../services/common";
import InputWithIcon from "../../../common/searchBox";
import UseCustomRouter from "../../../../services/utilities/customRouter";
import { Skeleton } from "@mui/material";
import { CustomButton, ButtonStyle } from "../../../../styles/muiRoot";
import SearchField from "../../../common/searchField";
import TruncateText from "../../../common/FunctionComponents/truncate";

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

export default function TopicList({
  data,
  comp,
  columns,
  placeholder,
  path,
  loading,
  editFun,
}) {
  const [filteredData, setFilteredData] = React.useState(data);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { navigate } = UseCustomRouter();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="mb-2 flex justify-between items-center gap-4 sticky top-0  ">
        <div className="basis-1/3">
          <SearchField
            data={data}
            onFilter={(val) => setFilteredData(val)}
            searchBy={"title"}
            placeholder={placeholder}
          />
        </div>
        <div className="basis-auto">{comp}</div>
      </div>
      <Suspense fallback={<Skeleton active />}>
        {loading ? (
          <TableContainer sx={{ height: "75vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
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
                {Array.from({ length: rowsPerPage }).map((_, index) => (
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
          <TableContainer sx={{ height: "75vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <StyledTableCell
                      key={index}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}

                  <StyledTableCell align={"right"} sx={{ pr: 3 }}>
                    Actions
                  </StyledTableCell>
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
                        onClick={() => navigate(`${path}/${row._id}`)}
                      >
                        {columns?.map((column, ind) => {
                          const value =
                            column.type === "date" ? (
                              dateFormatting(row[column.dataKey]).date
                            ) : Array.isArray(row[column.dataKey]) ? (
                              row[column.dataKey]?.[0]?.title
                            ) : typeof row[column.dataKey] === "boolean" ? (
                              row[column.dataKey] === true ? (
                                column?.showValue.yes
                              ) : (
                                column?.showValue.no
                              ) // Convert boolean to string
                            ) : column.type === "truncate" ? (
                              <TruncateText
                                text={row[column.dataKey]}
                                maxLength={80}
                              />
                            ) : (
                              row[column.dataKey]
                            );

                          return (
                            <StyledTableCell
                              key={column.dataKey}
                              align={column.align}
                              width={column.maxWidth}
                            >
                              {value}
                            </StyledTableCell>
                          );
                        })}
                        <StyledTableCell align={"right"} >
                          <CustomButton
                            onClick={() => editFun(row)}
                            sx={{
                              ...ButtonStyle,
                              width: "fit-content",
                              height: "max-content",
                              borderRadius: 2,
                            }}
                          >
                            Edit
                          </CustomButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Suspense>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
