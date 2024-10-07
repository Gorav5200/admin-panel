import * as React from "react";
import { useState,useMemo } from "react";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Collapse, TablePagination, Skeleton } from "@mui/material";
import MultipleSelectTable from "./tableMultipleSelect";
import { dateFormatting, truncateString } from "../../services/common";

function Row({ row, upperHeader, valueTransform, ...props }) {
  const [open, setOpen] = useState(false);

  const getVal = useMemo(() => {
    if(!valueTransform){
      return props.value
    }
    const existingPackageIndex = props?.value.findIndex(e => e.packageId === row._id);
    if (existingPackageIndex !== -1) {
      return props.value[existingPackageIndex]?.mockTests || [];
    } else {
      return [];
    }
  }, [props.value, row._id,open]);

  const getCellValue = (cellData, cellType, innerKey) => {
    let cellValue;

    switch (cellType) {
      case "boolean":
        cellValue = cellData ? "Publish" : "Unpublish";
        break;
      case "date":
        // Assuming dateFormatting function is defined elsewhere
        cellValue = dateFormatting(cellData).date;
        break;
      case "truncateText":
        // Assuming truncateString function is defined elsewhere
        cellValue = truncateString(cellData, 15);
        break;
      case "object":
        cellValue = innerKey ? cellData?.[innerKey] : cellData?._id;
        break;
      case "truncateWithHtml":
        const plainText = cellData?.replace(/<[^>]*>?/g, ""); // Remove HTML tags
        cellValue = truncateString(plainText, 5);
        break;
      default:
        cellValue = cellData;
    }

    return cellValue;
  };

  const valueTransformer = (packageId, values, mockPackages) => {
    let updatedMockPackages = [...mockPackages];
    const existingPackageIndex = updatedMockPackages.findIndex(pkg => pkg.packageId === packageId);

    if (existingPackageIndex !== -1) {
      const existingPackage = updatedMockPackages[existingPackageIndex];
      const updatedMockTests = [...values];
      const updatedPackage = { ...existingPackage, mockTests: updatedMockTests };
      updatedMockPackages[existingPackageIndex] = updatedPackage;
    } else {
      updatedMockPackages.push({ packageId: packageId, mockTests: values });
    }

    return updatedMockPackages;
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {props.loading ? (
          <>
            {[...Array(upperHeader.length + 1)].map((_, index) => (
              <TableCell key={index}>
                {/* Assuming Skeleton is a placeholder for loading state */}
                <Skeleton />
              </TableCell>
            ))}
          </>
        ) : (
          <React.Fragment>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            {upperHeader?.map((column, ind) => (
              <TableCell key={ind} component="th" scope="row">
                {getCellValue(
                  row[column.dataKey],
                  column.type,
                  column.innerKey
                )}
              </TableCell>
            ))}
          </React.Fragment>
        )}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, bgcolor: "var(--med-grey)" }}>
              <h5 className="bg-white p-2 font-inter text-base font-semibold">
                {props.title}
              </h5>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow>
                    {/* Assuming MultipleSelectTable is a component to handle selection */}
                    <MultipleSelectTable
                      headCells={props.nestedHeader}
                      rows={row.list}
                      value={getVal}
                      setValue={val => {
                        if(valueTransform){
                          const transformedData = valueTransformer(row._id, val, props.value);
                           props.setValue(transformedData);
                        }else{
                          props.setValue(val);
                        }
                      
                      }}
                      loading={props.loading}
                    />
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}




export default function NestedTable({
  valueTransform,
  upperHeader,
  data,
  nestedTitle,
  nestedHeader,
  loading,
  ...props
}) {
  console.log("🚀 ~ data-----in table:", props);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(selectedRow === row ? null : row);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {upperHeader?.map(({ label }) => (
              <TableCell key={label}>{label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row) => (
            <React.Fragment key={row._id}>
              <Row
                row={row}
                upperHeader={upperHeader}
                valueTransform={valueTransform}
                title={nestedTitle || "N/A"}
                onClick={() => handleRowClick(row)}
                nestedHeader={nestedHeader}
                loading={loading}
                {...props}
              />
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
