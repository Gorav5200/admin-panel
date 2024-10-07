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
import {
  HTMLConverter,
  checkQuestionType,
  dateFormatting,
  truncateString,
  truncateTitle,
} from "../../services/common";
import InputWithIcon from "../common/searchBox";
import UseCustomRouter from "../../services/utilities/customRouter";
import { Skeleton } from "@mui/material";
import dayjs from "dayjs";

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


export default function ManualTable({ data, comp, columns,input,path,loading }) {
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
        <div className="basis-1/3">
          {input}
        </div>
        <div className="basis-2/12">{comp}</div>
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
                        onClick={() => {
                          if (path) {
                            navigate(`${path}/${row._id}`);
                          } else {
                            return;
                          }
                        }}
                      >
                        {columns?.map((column, ind) => {
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
                            <StyledTableCell
                              key={column.dataKey}
                              align={column.align}
                            >
                              {column.type === "truncateWithHtml" ? (
                                <HTMLConverter>{value}</HTMLConverter>
                              ) : (
                                value
                              )}
                            </StyledTableCell>
                          );
                        })}
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