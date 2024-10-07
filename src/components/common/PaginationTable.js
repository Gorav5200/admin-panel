import React, { Suspense, useDeferredValue, useEffect } from "react";
import { PaginationItem, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Empty } from "antd";
import {
  HTMLConverter,
  capitalizeFirstLetter,
  checkQuestionType,
  truncateString,
  truncateTitle,
} from "../../services/common";
import UseCustomRouter from "../../services/utilities/customRouter";
import { Skeleton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { tooltipClasses } from "@mui/material/Tooltip";
import dayjs from "dayjs";
import { Link, useLocation } from "react-router-dom";
import { SmileOutlined } from "@ant-design/icons";


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

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    backgroundColor: theme.palette.common.white,
    color: "black",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default function PaginationTable({
  data,
  comp,
  columns,
  path,
  loading,
  fetching,
  pageChange,
  count,
  searchBar,
  resetPagination,
  isError,
}) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(0); // Initialize to 0 for internal logic
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const { navigate } = UseCustomRouter();
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const { examDetails } = useSelector((state) => state.exam);

  useEffect(() => {
    setPage(0); // Reset to 0 for internal logic
    setRowsPerPage(20);
    if (resetPagination === true) {
      setPage(1); // Reset to 0 for internal logic
      setRowsPerPage(20);
    }
  }, [examDetails.examId, resetPagination]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Page is zero-based
    pageChange({ page: newPage + 1, rowsPerPage }); // Convert to 1-based for API
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to 0 for internal logic
    pageChange({ page: 1, rowsPerPage: parseInt(event.target.value, 10) }); // Reset to 1 for API
  };

  // if (isError) {
  //   return <div className="error-screen">error</div>;
  // }

  return (
    <>
      <div className="p-3 flex justify-between items-center gap-4 sticky top-0">
        {searchBar && <div className="basis-1/3">{searchBar}</div>}
        <div className="basis-2/12">{comp}</div>
      </div>
      <Suspense fallback={<Skeleton active />}>
        {loading === true || fetching === true ? (
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
        ) : isError ? (
          <TableContainer sx={{ height: "75vh", justifyContent: "center" }}>
            <Table stickyHeader aria-label="sticky table">
              <Empty
                description={
                  <p className="font-inter text-base">Some Error Occured</p>
                }
              />
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
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0 &&
                  data.map((row, ind) => (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={ind}
                      className="cursor-pointer"
                      onClick={() => {
                        if (path) {
                          navigate(`${path}/${row._id}`);
                        }
                      }}
                    >
                      {columns.map((column, ind) => {
                        let value = row[column.dataKey];

                        if (column.type === "date") {
                          value = dayjs.utc(value).format("DD/MM/YYYY");
                        } else if (column.type === "html") {
                          value = (
                            <HTMLConverter>
                              {truncateTitle(row[column.dataKey], 10)}
                            </HTMLConverter>
                          );
                        } else if (column.type === "object") {
                          value = value?.title;
                        } else if (Array.isArray(value)) {
                          value = value?.[0]?.title;
                        } else if (value == null) {
                          value = null;
                        } else if (
                          value !== null &&
                          Object.keys(value).length > 0
                        ) {
                          value = value.title ? value.title : value;
                        } else if (column.type === "boolean") {
                          value = column.showValue[row[column.dataKey]];
                        } else if (column.type === "truncateWithHtml") {
                          const plainText = value?.replace(/<[^>]*>?/g, ""); // Remove HTML tags
                          value = truncateString(plainText, 5);
                        } else if (column.type === "checkQuestionType") {
                          value = checkQuestionType(value);
                        }

                        return (
                          <BootstrapTooltip
                            type="arrow"
                            title={
                              column?.type === "html" ? (
                                <HTMLConverter>
                                  {row[column.dataKey]}
                                </HTMLConverter>
                              ) : null
                            }
                          >
                            <StyledTableCell
                              key={column.dataKey}
                              align={column.align}
                            >
                              {column.type === "truncateWithHtml" ? (
                                <HTMLConverter>{value}</HTMLConverter>
                              ) : (
                                capitalizeFirstLetter(value)
                              )}
                            </StyledTableCell>
                          </BootstrapTooltip>
                        );
                      })}
                    </StyledTableRow>
                  ))}
                {data.length === 0 && (
                  <StyledTableRow className="w-full flex justify-center items-center h-[70vh]">
                    <StyledTableCell colSpan={columns.length}>
                      <div
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <SmileOutlined
                          style={{
                            fontSize: 20,
                          }}
                        />
                        <p className="font-inter text-base">
                          Data Not Found
                        </p>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Suspense>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TablePagination
          rowsPerPageOptions={[5, 20, 50, 100]}
          component="div"
          count={count || data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} of ${count}`
          }
          labelRowsPerPage="Rows per page"
        />
      </Paper>
    </>
  );
}
