import React, { useEffect } from "react";
import { XIcon } from "lucide-react";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../../styles/muiRoot";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BackdropLoader } from "../../../../common/lineLoader";
import { Box, CircularProgress, IconButton, Modal, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { pastPaperApi } from "../../../../../services/Constant";
import { message } from "antd";
import { useCreatePastPaperMutation, useUpdatePastPaperMutation } from "../../../../../services/apis/pastPapersApi";

export default function PublishPaper({ handleClose, open }) {
  const navigate = useNavigate();
  const params=useParams();
  const [createPastPaper, { isLoading: postLoading }] =useCreatePastPaperMutation();

  const { pastPaperDetail } = useSelector((state) => state.pastPapers);

  const handleAllData = () => {
    let data = { ...pastPaperDetail };
    const updatedData = data.sections
      .map((item) => {
        if (data.commonTimer == null) {
          return {
            section: item.section,
            positiveMarks: item.positiveMarks,
            negativeMarks: item.negativeMarks,
            timer: item.timer,
            questions: item.questions.map((q) => q._id),
          };
        } else {
          return {
            section: item.section,
            positiveMarks: item.positiveMarks,
            negativeMarks: item.negativeMarks,
            questions: item.questions.map((q) => q._id),
          };
        }
      })
      .filter((section) => section !== null); // Filter out null sections

    data.sections = updatedData;

    return data;
  };

  console.log("handle data", handleAllData());

  const handleSubmit = async () => {
    try {
      // Call the addMockPackage mutation
      const response = await createPastPaper({
        endpoint: `${pastPaperApi.endPoint}`,
        data: await handleAllData(),
      });
      // Navigate to the desired path after successful deletion
      console.log("Response:", response);

      if (response && response?.data?.success) {
        // Navigate to the desired path after successful deletion

        message.success("Past-Paper Added successfully!", 2.5);
        navigate(`/main/exam/pastPapers`);
      } else {
        toast.error("Some error occured to Add Past-Paper!", {
          autoClose: 2000,
        });
        console.error("Error add Past-Paper. Response:", response);
      }
    } catch (error) {
      console.error("Error add Add Past-Paper:", error);
    }
  };
  // const handleUpdate = async () => {
  //   try {
  //     // Call the addMockPackage mutation
  //     const response = await updatePastPaper({
  //       endpoint: `${pastPaperApi.endPoint}`,
  //       data: await handleAllData(),
  //     });
  //     // Navigate to the desired path after successful deletion
  //     console.log("Response:", response);

  //     if (response && response?.data?.success) {
  //       // Navigate to the desired path after successful deletion

  //       message.success("Past-Paper Edit successfully!", 2.5);
  //       navigate(`/main/exam/pastPapers/${params.paperId}`);
  //     } else {
  //       toast.error("Some error occured to Add Past-Paper!", {
  //         autoClose: 2000,
  //       });
  //       console.error("Error add Past-Paper. Response:", response);
  //     }
  //   } catch (error) {
  //     console.error("Error add Add Past-Paper:", error);
  //   }
  // };



  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalRoot">
          <BackdropLoader isOpen={postLoading} />
          <header className="ps-2 flex justify-between items-center">
            <h4 className="text-xl font-inter font-semibold text-gray-700">
              Publish Past-Paper?
            </h4>
            <IconButton
              onClick={() => {
                handleClose();
              }}
            >
              <XIcon className="text-gray-700" />
            </IconButton>
          </header>
          <div className="w-[627px] mt-7 p-2 flex flex-col gap-4">
            <p className="text-gray-600 text-sm">
              Would you like to publish Past Paper created , By publishing, the
              students can see and attempt the following Past paper
            </p>

            <Stack direction="row" justifyContent="flex-end" spacing={2} my={2}>
              <CustomButton
              disabed={postLoading}
                style={{
                  ...CustomButtonStyle,
                  width: 117,
                  height: 39,
                  borderRadius: 6,
                }}
                onClick={handleSubmit}
              >
               { postLoading?<CircularProgress color="inherit" size={18}/>:" Publish"}
              </CustomButton>
              <CustomButton
                style={{
                  ...ButtonStyle,
                  width: 117,
                  height: 39,
                  borderRadius: 6,
                }}
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </CustomButton>
            </Stack>
          </div>
        </Box>
      </Modal>
    </>
  );
}
