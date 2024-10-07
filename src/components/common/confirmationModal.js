import { LoadingButton } from "@mui/lab";
import { CustomButton, CustomButtonStyle, ButtonStyle } from "../../styles/muiRoot";
import ModalComp from "./modal";
import { useEffect, useState } from "react";
import { CircularProgress, Stack } from "@mui/material";
import { act } from "react-dom/test-utils";
import { useNavigate } from "react-router-dom";

function ConfirmationModal({ loading, ModalComponent, handleClose, handleSectionTab }) {


  return (
    <ModalComponent>
      <header className="ps-2 flex justify-between items-center">
        <h4 className="text-xl font-inter font-semibold">Confirm Import Question</h4>

      </header>
      <div className="w-[627px] mt-7 p-2 flex flex-col gap-4">
        <p className="text-gray-600 text-base">
          Do you to want to import the question.
        </p>
        <Stack direction="row" justifyContent="flex-end" spacing={2} my={2}>
          <CustomButton style={{ ...ButtonStyle, width: 117, height: 39, borderRadius: 6 }} onClick={handleClose}>Discard</CustomButton>
          <LoadingButton sx={{ ...CustomButtonStyle, width: 117, height: 39, borderRadius: 2 }} onClick={handleSectionTab} loading={loading} loadingIndicator={
            <CircularProgress style={{ color: 'white' }} size={24} /> // Change the color here
          } >
            Confirm</LoadingButton>
        </Stack>
      </div>
    </ModalComponent>
  )
}

export default ConfirmationModal;
