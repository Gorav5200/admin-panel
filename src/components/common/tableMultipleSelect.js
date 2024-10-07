import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useCallback } from "react";
import { boolean } from "yup";
import {
  HTMLConverter,
  dateFormatting,
  truncateString,
  truncateTitle,
} from "../../services/common";
import { Avatar, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";
import { SmileOutlined } from "@ant-design/icons";


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numvalue,
    rowCount,
    onRequestSort,
    headCells,
    loading,
  } = props;
  console.log("🚀 ~ EnhancedTableHead ~ props:", props);

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            disabled={loading}
            indeterminate={numvalue > 0 && numvalue < rowCount}
            checked={rowCount > 0 && numvalue === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "left" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              disabled={loading}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numvalue: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "black",
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",

    backgroundColor: theme.palette.common.white,

    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default function MultipleSelectTable({
  headCells,
  rows,
  setValue,
  value,
  loading,
}) {
  console.log(rows, value, "129");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // Select all rows
      const newvalue = rows?.map((n) => n);
      setValue(newvalue);
    } else {
      // Deselect all rows
      setValue([]);
    }
  };

  const handleClick = (valueObject) => {
    if (!valueObject) {
      return;
    }

    const rowId = valueObject._id;

    if (!value) {
      // handle the case where value is null or undefined
      return;
    }

    const isvalue = (id) => value.some((item) => item._id === id);

    if (isvalue(rowId)) {
      const filterValue = value.filter((obj) => obj._id !== rowId);
      setValue(filterValue);
    } else {
      setValue([...value, valueObject]);
    }
  };

  // Now you can use `memoizedHandleClick` in your component

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isvalue = (id) => value && value.some((item) => item._id === id);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return stableSort(rows, getComparator(order, orderBy)).slice(
      startIndex,
      endIndex
    );
  }, [order, orderBy, page, rowsPerPage, rows]);

  console.log("value", value);
  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          {loading ? (
            <EnhancedTableHead headCells={headCells} loading={loading} />
          ) : (
            <EnhancedTableHead
              numvalue={value?.length}
              order={order}
              loading={loading}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
              headCells={headCells}
            />
          )}
          <TableBody>
            {loading
              ? // Skeleton loading for body
                [...Array(21)].map(() => (
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Skeleton />
                    </TableCell>
                    {headCells.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "left" : "left"}
                      >
                        <Skeleton />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : visibleRows?.map((row, index) => {
                  const isItemvalue = isvalue(row?._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={() => handleClick(row)}
                      role="checkbox"
                      aria-checked={isItemvalue}
                      tabIndex={-1}
                      key={row.id}
                      value={isItemvalue}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemvalue}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>

                      {headCells?.map((headCell) => {
                        let cellValue;
                        if (headCell.type === "boolean") {
                          // If it's a boolean type, use the showValue object
                          cellValue = headCell.showValue[row[headCell.dataKey]];
                        } else if (headCell.type === "date") {
                          cellValue = dateFormatting(
                            row[headCell.dataKey]
                          ).date;
                        } else if (headCell.type === "truncateText") {
                          cellValue = truncateString(row[headCell.dataKey], 15);
                        } else if (headCell.type === "avatar") {
                          cellValue = <Avatar src={row[headCell.dataKey]} />;
                        } else if (headCell.type === "array") {
                          cellValue = row[headCell.dataKey]
                            ?.map((e) => e.title)
                            .join();
                        } else if (headCell.type === "html") {
                          cellValue = (
                            <HTMLConverter>
                              {truncateTitle(row[headCell.dataKey], 13)}
                            </HTMLConverter>
                          );
                        } else if (
                          headCell.type === "object" &&
                          headCell.innerKey
                        ) {
                          cellValue =
                            row[headCell.dataKey]?.[headCell.innerKey];
                        } else if (headCell.type === "object") {
                          cellValue =
                            row[headCell.dataKey]?.title ||
                            row[headCell.dataKey]?._id;
                        } else {
                          // For other types, just use the regular dataKey
                          cellValue = row[headCell.dataKey];
                        }

                        return (
                          <BootstrapTooltip
                            arrow
                            placement="top"
                            title={
                              headCell?.type === "html" ? (
                                <HTMLConverter>
                                  {row[headCell.dataKey]}
                                </HTMLConverter>
                              ) : null
                            }
                          >
                            <TableCell key={headCell.id}>{cellValue}</TableCell>
                          </BootstrapTooltip>
                        );
                      })}
                    </TableRow>
                  );
                })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={headCells.length + 1} />
              </TableRow>
            )}

            {rows?.length === 0 && (
              <TableRow className="w-full flex justify-center items-center h-2/4">
                <TableCell colSpan={headCells.length +1}>
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
                    <p className="font-inter text-base">Data Not Found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        sx={{ position: "sticky", bottom: 0, bgcolor: "background.paper" }}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
