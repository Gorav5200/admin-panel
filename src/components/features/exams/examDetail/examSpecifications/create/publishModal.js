import React, { useEffect, useMemo, useRef, useState } from "react";
import { XIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../../../styles/muiRoot";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BackdropLoader } from "../../../../../common/lineLoader";
import { Box, IconButton, Modal, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import {
  useCreateSpecificationMutation,
  useUpdateSpecificationMutation,
} from "../../../../../../services/apis/exam/specification";
import { examSpecficaton } from "../../../../../../services/Constant";
import { message } from "antd";
export default function PublishModal(props) {
  const navigate = useNavigate();
  const { viewDetails } = useSelector((state) => state.examSpecification);

  const dispatch = useDispatch();
  const params = useParams();
  console.log("🚀 ~ PublishModal ~ params:", params);
  const [createSpecification, { isLoading: postLoading }] =
    useCreateSpecificationMutation();
  const [updateSpecification, { isLoading: upadateLoading }] =
    useUpdateSpecificationMutation();
  const getData = useSelector(
    (state) => state.examSpecification.createSpecificaton
  );

  const handleSubmit = async () => {
    try {
      // Call the addMockPackage mutation
      const response = await createSpecification({
        endpoint: `${examSpecficaton.endPoint}`,
        data: { ...getData, entityType: params.examId },
      });
      // Navigate to the desired path after successful deletion
      console.log("Response:", response);

      if (response && response?.data?.success) {
        // Navigate to the desired path after successful deletion
        await  props.handleClose();
        message.success("Exam specification created",2.5);
        navigate(`/main/exam/${params.examId}/specification`);
      } else {
        message.error("Some error occured to exam specification!", 2.5);
        console.error("Error exam specification. Response:", response);
      }
    } catch (error) {
      console.error("Error add exam specification:", error);
    }
  }; //for creating a new specification

  const handleUpdate = async () => {
    try {
      // Call the addMockPackage mutation
      const response = await updateSpecification({
        endpoint: `${examSpecficaton.endPoint}/${viewDetails?._id}`,
        updatedData: { ...getData, entityType: params.examId },
      });
      // Navigate to the desired path after successful deletion
      console.log("Response:", response);

      if (response && response?.data?.success) {
        // Navigate to the desired path after successful deletion
          await  props.handleClose();
          message.success("Exam specification edit successfully!",2.5);
          navigate(`/main/exam/${params.examId}/specification`);
     
    
      } else {
        message.error("Some error occured to  edit exam specification!",2.5);
        console.error("Error exam specification. Response:", response);
      }
    } catch (error) {
      console.error("Error add exam specification:", error);
    }
  };//for updae the specification

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modalRoot">
        <BackdropLoader isOpen={postLoading || upadateLoading} />
        <header className="ps-2 flex justify-between items-center">
          <h4 className="text-xl font-inter font-semibold text-gray-700">
            Publish {params.type === "edit" && " changes made in"}CAT exam
            specifications?
          </h4>
          <IconButton
            onClick={() => {
              props.handleClose();
            }}
          >
            <XIcon className="text-gray-700" />
          </IconButton>
        </header>
        <div className="w-[627px] mt-7 p-2 flex flex-col gap-4">
          <p className="text-gray-600 text-sm">
            Selecting publish post the changes you have created, making it
            visbile to the students.
          </p>

          <Stack direction="row" justifyContent="flex-end" spacing={2} my={2}>
            <CustomButton
              style={{
                ...ButtonStyle,
                width: 117,
                height: 39,
                borderRadius: 6,
              }}
              onClick={() => {
                props.handleClose();
                // dispatch(resetCoursesState());
                // navigate(`/main/exam/${params.examId}/course`);
              }}
            >
              Cancel
            </CustomButton>
            {params.type === "edit" ? (
              <CustomButton
                style={{
                  ...CustomButtonStyle,
                  width: 117,
                  height: 39,
                  borderRadius: 6,
                }}
                onClick={handleUpdate}
              >
                Publish changes
              </CustomButton>
            ) : params.type === "create" ? (
              <CustomButton
                style={{
                  ...CustomButtonStyle,
                  width: 117,
                  height: 39,
                  borderRadius: 6,
                }}
                onClick={handleSubmit}
              >
                Publish
              </CustomButton>
            ) : null}
          </Stack>
        </div>
      </Box>
    </Modal>
  );
}
