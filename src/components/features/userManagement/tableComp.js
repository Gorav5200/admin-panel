import React, { Suspense, useEffect, useState } from "react";
import {
  Paper,
  Button,
  IconButton,
  Avatar,
  Checkbox,
  Divider,
  Collapse,
  ButtonGroup,
  Tooltip,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { dateFormatting } from "../../../services/common";
import UseCustomRouter from "../../../services/utilities/customRouter";
import { Skeleton } from "@mui/material";
import TruncateText from "../../common/FunctionComponents/truncate";
import { MoreVerticalIcon, UserCog } from "lucide-react";
import DebouncedInput from "../../common/searchApiField";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Popover,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import {
  useDeleteUserMutation,
  useHandleMultiDeleteMutation,
  useUserBlockActionsMutation,
  useUserRolesUpdateMutation,
} from "../../../services/apis/users";
import { Popconfirm, Select, message } from "antd";
import { usersApi } from "../../../services/Constant";
import StoreIcon from "@mui/icons-material/Store";
import { Block, CheckBox, ExpandMoreSharp } from "@mui/icons-material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import ChangeUserRoleModal from "./changeRoleModal";
import { roleEnum, roleEnumArray } from "../../../services/utilities/enums";

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

export default function ActionTable({
  data,
  comp,
  columns,
  loading,
  placeholder,
  count,
  isError,
  value,
  setValue,
}) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("search") || "";
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { navigate } = UseCustomRouter();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    navigate(
      `/main/user?page=${page + 1}&count=${rowsPerPage}
     ${searchTerm ? `&search=${searchTerm}` : ""}`
    );
  }, [page, rowsPerPage]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleSearch = (term) => {
    navigate(
      `/main/user?page=1&count=${rowsPerPage}${term ? `&search=${term}` : ""}`
    );
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newvalue = data.map((n) => n._id);
      setValue(newvalue);
      return;
    }
    setValue([]);
  };

  const handleClick = (event, id) => {
    const valueIndex = value.indexOf(id);
    let newvalue = [];
    console.log("🚀 ~ handleClick ~ valueIndex:", valueIndex, value);
    if (valueIndex === -1) {
      newvalue = newvalue.concat(value, id);
    } else if (valueIndex === 0) {
      newvalue = newvalue.concat(value.slice(1));
    } else if (valueIndex === value.length - 1) {
      newvalue = newvalue.concat(value.slice(0, -1));
    } else if (valueIndex > 0) {
      newvalue = newvalue.concat(
        value.slice(0, valueIndex),
        value.slice(valueIndex + 1)
      );
    }

    setValue(newvalue);
  };

  const isvalue = (id) => value.indexOf(id) !== -1;

  const [
    handleMultiDeleteMutation,
    { isLoading: delLoading, isError: delError },
  ] = useHandleMultiDeleteMutation();

  const handleMultipleDelete = async () => {
    try {
      const response = await handleMultiDeleteMutation({
        endpoint: `${usersApi.endPoint}/delete/multi`,
        data: { users: value },
      });
      console.log("Response:", response);

      if (response && response.data?.success) {
        message.success(response.data?.message);
        setValue([]); //After success selection will clear
      } else {
        message.error("Some error occurred");
      }
    } catch (error) {
      console.error("Error delete", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center gap-4 sticky top-0 mb-2  ">
        <div className="basis-1/3">
          {" "}
          <DebouncedInput
            placeholder={placeholder}
            onSearch={handleSearch}
            loading={loading}
            initialValue={searchTerm}
            disabled={isError}
          />
        </div>
        <div className="basis-auto">{comp}</div>
      </div>
      {/* Multiple user actions */}
      <Collapse in={value.length > 0} className="float-right m-2">
        <ButtonGroup size="medium" aria-label="Small button group">
          <Popconfirm
            title="Delete the Users"
            description="Are you sure to delete this users?"
            onConfirm={handleMultipleDelete}
            placement="leftTop"
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              loading: delLoading, //Add the delete api loading state
              style: { backgroundColor: "black", borderColor: "black" },
            }}
            cancelButtonProps={{
              style: { borderColor: "black", color: "black" },
            }}
          >
            <Tooltip
              arrow
              // placement="top"
              title={<small className="font-inter text-sm">Delete users</small>}
            >
              <Button key="one">
                <DeleteIcon />
              </Button>
            </Tooltip>
          </Popconfirm>

          <Tooltip
            arrow
            // placement="top"
            title={
              <small className="font-inter text-sm">Change users role</small>
            }
          >
            <ChangeUserRoleModal users={value} />
          </Tooltip>
        </ButtonGroup>
      </Collapse>

      <Suspense fallback={<Skeleton active />}>
        {loading ? (
          <TableContainer sx={{ height: "75vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell padding="checkbox">
                    <StyledTableCell padding="checkbox">
                      <Skeleton />
                    </StyledTableCell>
                  </StyledTableCell>
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
                    <StyledTableCell padding="checkbox">
                      <Skeleton />
                    </StyledTableCell>
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
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        value.length > 0 && value.length < data.length
                      }
                      checked={data.length > 0 && value.length === data.length}
                      onChange={handleSelectAllClick}
                    />
                  </StyledTableCell>
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
                {data?.map((row, ind) => {
                  const isItemvalue = isvalue(row._id);
                  const labelId = `enhanced-table-checkbox-${ind}`;
                  return (
                    <StyledTableRow
                      hover
                      tabIndex={-1}
                      key={row._id}
                      value={isItemvalue}
                    >
                      <StyledTableCell padding="checkbox">
                        <Checkbox
                          onChange={(event) => handleClick(event, row._id)}
                          checked={isItemvalue}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </StyledTableCell>
                      {columns?.map((column, ind) => {
                        let value;
                        if (column.type === "date") {
                          value = dateFormatting(row[column.dataKey]).date;
                        } else if (Array.isArray(row[column.dataKey])) {
                          value = row[column.dataKey]?.[0]?.title;
                        } else if (column.type === "boolean") {
                          value = column.showValue[row[column.dataKey]];
                        } else if (column.type === "truncate") {
                          value = (
                            <TruncateText
                              text={row[column.dataKey]}
                              maxLength={80}
                            />
                          );
                        } else {
                          value = row[column.dataKey];
                        }
                        return (
                          <StyledTableCell
                            key={column.dataKey}
                            align={column.align}
                            width={column.maxWidth}
                          >
                            <div className="flex items-center gap-2">
                              {ind === 0 && (
                                <Avatar
                                  src={row?.profilePic}
                                  sx={{
                                    border:
                                      row.isUserBlocked && "3px solid red",
                                  }}
                                  about="blocked"
                                />
                              )}{" "}
                              {value}
                            </div>
                          </StyledTableCell>
                        );
                      })}
                      <StyledTableCell align={"right"}>
                        <DropdownMenu
                          id={row._id}
                          blockStatus={row.isUserBlocked}
                          roles={row.roles.toLowerCase()?.split(",")}
                        />
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
          count={count || data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

function DropdownMenu({ id, blockStatus, roles }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [roleAnchorEl, setRoleAnchorEl] = useState(false);
  const [valueRole, setValueRole] = useState([]);
  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenRoleMenu = (event, roles) => {
    setRoleAnchorEl(!roleAnchorEl);
    setValueRole(roles);
  };

  const open = Boolean(anchorEl);
  const openRoleMenu = Boolean(roleAnchorEl);
  const [deleteUser, { isError: isDeleteError, isLoading: deleteLoading }] =
    useDeleteUserMutation();
  const [
    userBlockActions,
    { isError: blockError, isLoading: blockLoading, error: blockErrorMessage },
  ] = useUserBlockActionsMutation();
  const [
    userRolesUpdate,
    { isError: rolesError, isLoading: rolesLoading, error: rolesErrorMessage },
  ] = useUserRolesUpdateMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteUser(`${usersApi.endPoint}/${id}`);
      console.error("Response:", response);
      if (response && response.data.success) {
        message.success(response.data.message);
        handleCloseMenu();
      } else {
        message.error(response.data.error.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleBlock = async (status) => {
    try {
      const response = await userBlockActions(
        `${usersApi.endPoint}/blockstatus/${id}/${status}`
      );
      console.error("Response:", response);
      if (response && response.data.success) {
        message.success(response.data.message);
        handleCloseMenu();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Error Block :", error);
    }
  };
  const handleRoleChange = async (role) => {
    try {
      const updatedRoles = valueRole.includes(role)
        ? valueRole.filter((r) => r !== role)
        : [...valueRole, role];

      // Directly call the API to update roles
      const response = await userRolesUpdate({
        endpoint: `${usersApi.endPoint}/updaterole/${id}/`,
        data: { roles: updatedRoles },
      });

      if (response && response.data.success) {
        message.success(response.data.message);
        setValueRole(updatedRoles); // Update local state only if API call succeeds
      } else {
        message.error(response?.data?.message || "Failed to update roles");
      }
    } catch (error) {
      console.error("Error updating roles:", error);
      message.error("Failed to update roles");
    }

  };
      

  return (
    <div>
      <IconButton onClick={handleOpenMenu}>
        <MoreVerticalIcon />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List>
          <ListItemButton onClick={(e) => handleOpenRoleMenu(e, roles)}>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText>
              <p className="text-sm font-inter ">Change Role</p>
            </ListItemText>

            <div className="pl-2">
              <ExpandMoreSharp
                style={{
                  transform: roleAnchorEl && "rotate(180deg)",
                  transition: "all 0.3s ease-in-out",
                }}
              />
            </div>
          </ListItemButton>

          <Collapse in={openRoleMenu}>
            <List>
              {roleEnumArray.map(({ title, value }) => (
                <ListItemButton
                  key={value}
                  disabled={value === "member"}
                  onClick={() => handleRoleChange(value)}
                >
                  <Checkbox checked={valueRole.includes(value)} />
                  <ListItemText>
                    <small className="text-sm font-inter ">{title}</small>
                  </ListItemText>
                </ListItemButton>
              ))}
            </List>
            <Divider />
          </Collapse>

          <ListItemButton
            onClick={() => {
              navigate(`/main/user/detail/${id}`);
            }}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>
              <p className="text-sm font-inter">Edit</p>
            </ListItemText>
          </ListItemButton>
          <ListItemButton onClick={handleDelete}>
            <ListItemIcon>
              <DeleteSweepIcon />
            </ListItemIcon>
            <ListItemText>
              <p className="text-sm font-inter">Delete</p>
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              const status = blockStatus ? "unblock" : "block";
              handleBlock(status);
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              {blockStatus ? <PersonOffIcon /> : <Block />}
            </ListItemIcon>
            <ListItemText>
              <p className="text-sm font-inter ">
                {blockStatus ? "Unblock" : "Block"}
              </p>
            </ListItemText>
          </ListItemButton>
          <ListItemButton onClick={handleCloseMenu}>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText>
              <p className="text-sm font-inter ">Purchased Items</p>
            </ListItemText>
          </ListItemButton>
        </List>
      </Popover>
    </div>
  );
}
