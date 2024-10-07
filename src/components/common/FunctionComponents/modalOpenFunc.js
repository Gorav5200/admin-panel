import { useState } from "react";

function ModalFunc() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return {
    handleOpen,
    handleClose,
    open,
    setOpen,
  };
}

export default ModalFunc;







