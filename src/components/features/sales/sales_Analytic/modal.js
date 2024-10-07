/* eslint-disable */

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Icon from "./icon";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "auto",
//   bgcolor: "background.paper",
//   border: "none",
//   boxShadow: 24,
//   p: 1,
//   borderRadius: 3,
// };

//we use this style from  index.css file

export function BasicModal({ children, ...props }) {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
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
    <BasicModal open={open} handleClose={handleClose}>
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

//   return (props) => {
//     const [open, setOpen] = useState(false);  // Use useState directly inside the functional component

//     const handleOpen = () => {
//       setOpen(true);
//     };

//     const handleClose = () => {
//       setOpen(false);
//     };

//     return (
//       <>
//         <WrappedComponent {...props} openModal={handleOpen} closeModal={handleClose} />
//         <Modal open={open} onClose={handleClose}   aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
//           <Box sx={style} >
//           <header className="ps-2 flex justify-between items-center">
//           <h4 className="text-xl font-inter font-semibold">{props.heading}</h4>
//           <IconButton
//             onClick={()=>handleClose()}
//           >
//             <Icon name="X" size="25" />
//           </IconButton>
//         </header>

//           {props.children || "Default Modal Content"} {/* You can pass custom modal content via props */}
//           </Box>
//         </Modal>
//       </>
//     );
//   };
// };
