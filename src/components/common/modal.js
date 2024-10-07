/* eslint-disable */

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";

export function BasicModal({ children, ...props }) {
  return (
    <Modal
      open={props.open}
      onClose={props.isClosed !== false && props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modalRoot">{children}</Box>
    </Modal>
  );
}

export default function ModalComp() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ModalComponent = ({ children }) => (
    <BasicModal open={open} handleClose={handleClose} >
      {children}
    </BasicModal>
  );

  return {
    handleOpen,
    handleClose,
    ModalComponent,
    open,
  };
}
