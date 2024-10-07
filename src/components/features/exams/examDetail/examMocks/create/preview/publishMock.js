import React, { useEffect } from "react";
import { XIcon } from "lucide-react";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../../../../styles/muiRoot";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BackdropLoader } from "../../../../../../common/lineLoader";
import { Box, IconButton, Modal, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { mocksApi } from "../../../../../../../services/Constant";
import { message } from "antd";
import { useCreateMockMutation } from "../../../../../../../services/apis/exam/mock";

export default function PublishMock({ handleClose, open }) {
  const navigate = useNavigate();
  const [createMock, { isLoading: postLoading }] = useCreateMockMutation();
  const { mockDetail } = useSelector((state) => state.mock);

  const params = useParams();

 const handleAllData = async () => {
   let data = { ...mockDetail }; // Assuming mockDetail is defined somewhere

  
   const updatedData = await Promise.all(
     data.sections.map(async (item) => {
       if (data.commonTimer == null) {
         return {
           section: item.section,
           positiveMarks: item.positiveMarks,
           negativeMarks: item.negativeMarks,
           timer: item.timer,
           questions: item.questions.map((q) => q._id),
           partialMarks: item.partialMarks,
         };
       } else {
         return {
           section: item.section,
           positiveMarks: item.positiveMarks,
           negativeMarks: item.negativeMarks,
           questions: item.questions.map((q) => q._id),
           partialMarks: item.partialMarks,
         };
       }
     })
   );

   // Filter out any null sections
   const filteredData = updatedData.filter((section) => section !== null);

   data.sections = filteredData;

   // Pass data to addAllowedModules function
   return addAllowedModules(data);
 };

 const addAllowedModules = (data) => {
   const allowedModules = [
     "errorTracker",
     "viewSolutions",
     "mockComparison",
     "allMockAnalysis",
     data.isOnboarding ? "onboarding" : null, 
     data.isGoalTracker ? "goalTracker" : null,
     data.isScorePercentile ? "scorePercentile" : null,
   ].filter(Boolean); // Filter out null entries

  
   return { ...data, allowedModules };
 };

  console.log("🚀 ~ addAllowedModules ~ mockDetail:", addAllowedModules(mockDetail));

  const handleSubmit = async () => {
    try {
      // Call the addMockPackage mutation
      const response = await createMock({
        endpoint: `${mocksApi.endPoint}`,
        data: await handleAllData(),
      });
      // Navigate to the desired path after successful deletion
      console.log("Response:", response);

      if (response && response?.data?.success) {
        // Navigate to the desired path after successful deletion

        message.success("Mock added successfully!", 2.5);
        navigate(`/main/exam/${params.examId}/mocks`);
      } else {
        toast.error("Some error occured to Add Mock!", {
          autoClose: 2000,
        });
        console.error("Error add Mock. Response:", response);
      }
    } catch (error) {
      console.error("Error add Add Mock:", error);
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
              Publish Mock?
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
              Would you like to publish Mock created , By publishing, the
              students can see and attempt the following Mock paper
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
