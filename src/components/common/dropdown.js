import React, { useState } from "react";
import {
  IconButton,
  Popover,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";

function DropdownMenu({ comp, edit, duplicate, del }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton onClick={handleOpenMenu}>{comp}</IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List>
          <ListItemButton
            onClick={() => {
              del(); // Call the 'duplicate' function
              handleCloseMenu(); // Close the menu
            }}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              duplicate(); // Call the 'duplicate' function
              handleCloseMenu(); // Close the menu
            }}
          >
            <ListItemIcon>
              <FileCopyIcon />
            </ListItemIcon>
            <ListItemText primary="Duplicate" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              edit(); // Call the 'duplicate' function
              handleCloseMenu(); // Close the menu
            }}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </ListItemButton>
        </List>
      </Popover>
    </div>
  );
}

export default DropdownMenu;
