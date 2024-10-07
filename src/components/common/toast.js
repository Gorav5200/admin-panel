// Toast.js
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = ({ showToast }) => {
  return (
    <div>
      <button onClick={showToast}>Show Toast</button>
      <ToastContainer />
    </div>
  );
};

export default Toast;
