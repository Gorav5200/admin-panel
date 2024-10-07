import React from "react";
import {
  Box,
  Modal,

} from "@mui/material";


export default function DetailModal({ open,children }) {
  return (
    <>
  
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalRoot bg-transparent ">
         {children}
        </Box>
      </Modal>
    </>
  );
}
