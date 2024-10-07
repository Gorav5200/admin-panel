import React, { useEffect, useMemo, useRef, useState } from "react";
import { XIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../styles/muiRoot";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BackdropLoader } from "../../../common/lineLoader";
import { Box, IconButton, Modal, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useCreateLearnTopicMutation } from "../../../../services/apis/learnApi";
import { learnApi } from "../../../../services/Constant";
import { message } from "antd";

export default function PublishModal({ handleClose, open }) {
  const navigate = useNavigate();
  const params = useParams();

  const [createLearnTopic, { isLoading: postLoading }] = useCreateLearnTopicMutation();
  const { newLearn } = useSelector((state) => state.learn);

  const handleAllData = () => {
    const { concepts: getConcepts, ...others } = newLearn;
    const concepts =  getConcepts.map((e) => ({
      ...e,
      questions: e.questions.map((e) => e._id),
    }));
    const res = {
      concepts,
      ...others,
    };
    return res;
  };
  console.log("🚀 ~ handleAllData ~ handleAllData:", handleAllData())



  const handleSubmit = async () => {
    try {
      // Call the addMockPackage mutation
      const response = await createLearnTopic({
        endpoint: `${learnApi.endPoint}`,
        newLearn: await handleAllData(),
      });
      // Navigate to the desired path after successful deletion
      console.log("Response:", response);

      if (response && response?.data?.success) {
        // Navigate to the desired path after successful deletion

        message.success("Learn Added successfully!", 2.5);
        navigate(`/main/exam/learn`);
      } else {
        toast.error("Some error occured to Add Learn!", {
          autoClose: 2000,
        });
        console.error("Error add Learn. Response:", response);
      }
    } catch (error) {
      console.error("Error add Add Learn:", error);
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
              Publish Learn?
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
              Would you like to publish learn topic created in CAT Exams? By
              publishing, the students can see and attempt the following topic
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
                  // navigate(`/main/exam/${params.examId}/class`);
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
