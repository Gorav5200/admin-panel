import React, { Suspense, useState } from "react";
import {
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Skeleton } from "@mui/material";
import { CustomButton, ButtonStyle } from "../../../../styles/muiRoot";
import SearchField from "../../../common/searchField";
import { HTMLConverter, dateFormatting } from "../../../../services/common"; // Make sure to import HTMLConverter and dateFormatting functions

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: "#F4F3FE",
    color: theme.palette.common.black,
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TconditionList({
  data,
  comp,
  columns,
  placeholder,
  path,
  loading,
  editFun,
  deleteFun,
}) {
  const [filteredData, setFilteredData] = useState(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showFullDescriptionIndex, setShowFullDescriptionIndex] =
    useState(null); // Store the index of the description to show full
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const toggleDescription = (index) => {
    setShowFullDescriptionIndex(
      index === showFullDescriptionIndex ? null : index
    );
  };

  const handleEdit = (row) => {
    setEditMode(row._id);
    setEditedTitle(row.title);
    setEditedDescription(row.description);
  };

  const handleDelete = (row) => {
    setSelectedRow(row);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Call the delete function with the selected row
    deleteFun(selectedRow);
    // Update filteredData after deletion
    setFilteredData(
      filteredData.filter((item) => item._id !== selectedRow._id)
    );
    // Close the delete confirmation dialog
    setDeleteDialogOpen(false);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const saveChanges = () => {
    const newData = filteredData.map((item) => {
      if (item._id === editMode) {
        return { ...item, title: editedTitle, description: editedDescription };
      }
      return item;
    });
    setFilteredData(newData);
    setEditMode(null);
  };

  return (
    <>
      <div className="mb-2 flex justify-between items-center gap-4 sticky top-0">
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
            {/* Skeleton loading logic */}
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
                  <StyledTableCell align="right" sx={{ pr: 15 }}>
                    Actions
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => {
                    return (
                      <StyledTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={rowIndex}
                        className="cursor-pointer"
                      >
                        {columns?.map((column, colIndex) => {
                          let value = row[column.dataKey];
                          if (
                            column.dataKey === "description" &&
                            value.length > 100 &&
                            !showFullDescriptionIndex !== null &&
                            showFullDescriptionIndex !== rowIndex
                          ) {
                            value = value.substring(0, 100) + "...";
                          }

                          return (
                            <StyledTableCell
                              key={column.dataKey}
                              align={column.align}
                            >
                              {editMode === row._id &&
                              column.dataKey === "title" ? (
                                <TextField
                                  value={editedTitle}
                                  onChange={handleTitleChange}
                                />
                              ) : column.dataKey === "description" ? (
                                editMode === row._id ? (
                                  <TextField
                                    value={editedDescription}
                                    onChange={handleDescriptionChange}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    multiline
                                    rows={6} // Adjusting height of the description edit box
                                  />
                                ) : (
                                  <HTMLConverter>{value}</HTMLConverter>
                                )
                              ) : (
                                value
                              )}
                              {column.dataKey === "description" &&
                                value.length > 100 && (
                                  <Button
                                    onClick={() => toggleDescription(rowIndex)}
                                    style={{
                                      color: "black",
                                      fontWeight: "bold",
                                      fontStyle: "revert",
                                    }}
                                  >
                                    {showFullDescriptionIndex === rowIndex
                                      ? "...Read Less"
                                      : "Read More..."}
                                  </Button>
                                )}
                            </StyledTableCell>
                          );
                        })}
                        <StyledTableCell align="right" sx={{ pr: 10 }}>
                          {editMode === row._id ? (
                            <>
                              <CustomButton
                                onClick={saveChanges}
                                sx={{
                                  ...ButtonStyle,
                                  width: "fit-content",
                                  height: "max-content",
                                  borderRadius: 2,
                                  margin: "6px",
                                }}
                              >
                                Save
                              </CustomButton>
                              <CustomButton
                                onClick={() => setEditMode(null)}
                                sx={{
                                  ...ButtonStyle,
                                  width: "fit-content",
                                  height: "max-content",
                                  borderRadius: 2,
                                }}
                              >
                                Cancel
                              </CustomButton>
                            </>
                          ) : (
                            <>
                              <CustomButton
                                onClick={() => handleEdit(row)}
                                sx={{
                                  ...ButtonStyle,
                                  width: "fit-content",
                                  height: "max-content",
                                  borderRadius: 2,
                                  margin: "6px",
                                }}
                              >
                                Edit
                              </CustomButton>
                              <CustomButton
                                onClick={() => handleDelete(row)}
                                sx={{
                                  ...ButtonStyle,
                                  width: "fit-content",
                                  height: "max-content",
                                  borderRadius: 2,
                                }}
                              >
                                Delete
                              </CustomButton>
                            </>
                          )}
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

      {/* Modal for editing title and description */}
      <Dialog open={editMode !== null} onClose={() => setEditMode(null)}>
        <DialogTitle>Edit Title and Description</DialogTitle>
        <DialogContent style={{ height: "450px", width: "600px" }}>
          <TextField
            label="Title"
            value={editedTitle}
            onChange={handleTitleChange}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="termsAndCondition"
            value={editedDescription}
            onChange={handleDescriptionChange}
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
            rows={12} // Adjusting height of the description edit box
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={saveChanges} color="primary">
            Save
          </Button>
          <Button onClick={() => setEditMode(null)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this item?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
