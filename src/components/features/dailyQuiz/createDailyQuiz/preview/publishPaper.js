import React from "react";
import { XIcon } from "lucide-react";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../../styles/muiRoot";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BackdropLoader } from "../../../../common/lineLoader";
import { Box, IconButton, Modal, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { dailyQuiz } from "../../../../../services/Constant";
import { message } from "antd";
import { useCreateDailyQuizMutation } from "../../../../../services/apis/dailyQuizApi";

export default function PublishPaper({ handleClose, open }) {
  const navigate = useNavigate();
  const [createDailyQuiz, { isLoading: postLoading }] =
  useCreateDailyQuizMutation();
  const { dailyQuizDetail } = useSelector((state) => state.dailyQuiz);

  const handleAllData = () => {
    let data = { ...dailyQuizDetail };
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
      const response = await createDailyQuiz({
        endpoint: `${dailyQuiz.endPoint}`,
        data: await handleAllData(),
      });
      // Navigate to the desired path after successful deletion
      console.log("Response:", response);

      if (response && response?.data?.success) {
        // Navigate to the desired path after successful deletion

        message.success("Daily-quiz Added successfully!", 2.5);
        navigate(`/main/exam/dailyQuiz`);
      } else {
        toast.error("Some error occured to Add Daily-quiz!", {
          autoClose: 2000,
        });
        console.error("Error add Daily-quiz. Response:", response);
      }
    } catch (error) {
      console.error("Error add Add Daily-quiz:", error);
    }
  };
 


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
              Publish Daily-Quiz?
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
              Would you like to publish Daily-Quiz created , By publishing, the
              students can see and attempt the following Daily-Quiz
            </p>

            <Stack direction="row" justifyContent="flex-end" spacing={2} my={2}>
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
