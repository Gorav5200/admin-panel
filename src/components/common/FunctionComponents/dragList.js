import React, { useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Popover,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";

function DragList({ isLoading, list, dropdownFunctions }) {
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = [...list];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    //  Now you have the updated order of items in the 'items' array.
    // You can dispatch an action to update the state with the new order if needed.

    // Example dispatch:
    // dispatch(updateQuestionOrder(items));
  };

  const Dropdown = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
      <>
        <MoreVertIcon onClick={handleOpenMenu} />
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
            {dropdownFunctions?.map((item, ind) => (
              <ListItemButton
                key={item.name}
                onClick={() => {
                  item.func(ind);
                  handleCloseMenu(); // Close the menu
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </List>
        </Popover>
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            bgcolor: "white",
            p: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {[...Array(20)].map(() => (
            <Skeleton
              sx={{ bgcolor: "grey.200" }}
              variant="rounded"
              width="100%"
              height={48}
            />
          ))}
        </Box>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="question-list">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {list?.map((item, ind) => (
                  <Draggable
                    key={ind}
                    draggableId={`question-${ind}`}
                    index={ind}
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 1,
                          p: 1,
                          border:
                            item._id === 1
                              ? "2px solid black"
                              : "1px solid #CFCFCF",
                        }}
                      >
                        <DragIndicatorIcon
                          fontSize="small"
                          className="text-secondary"
                        />
                        <h5 className="text-darkGrey font-medium text-xs">
                          {ind + 1}
                        </h5>
                        <p className="text-secondary text-xs font-light">
                          {item.type}
                        </p>

                        <Dropdown />
                      </Box>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
}

export default DragList;
