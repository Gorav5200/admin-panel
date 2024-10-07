import React, { useState } from "react";
import MultipleSelectTable from "../../../common/tableMultipleSelect";
import { useSelector } from "react-redux";
import { Avatar, Box, CircularProgress, IconButton, Modal, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../styles/muiRoot";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { assignmentApi, practiceQaApi, questionApi } from "../../../../services/Constant";
import { BackdropLoader } from "../../../common/lineLoader";
import { XIcon } from "lucide-react";
import { useGetQuestionListQuery } from "../../../../services/apis/exam/questionBank";
import { questionBankHeader } from "../../../../services/constHeaders";
import { message } from "antd";
import { useCreatePracticeQaMutation, useUpdatePracticeQaMutation } from "../../../../services/apis/practiceQaApi";
import { createQuestionList } from "../../../../ducks/practiceQaSlice";
function ImportQuestion({ handleNext, compType }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.practiceQa);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(state.newPracticeQa.questionList || []);

  const handleContinue = () => {
    if(values.length === 0){
      message.error("Atleast One Question Must be Selected")
      return;
    }
    dispatch(createQuestionList(values));
    handleNext();
    setOpen(true);
  };

  const {
    data: questionListRes,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetQuestionListQuery(
    `${questionApi.endPoint}/topic/${state.newPracticeQa.topic}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  console.log("🚀 ~ ImportQuestion ~ questionListRes:", questionListRes);

  return (
    <div>
      <MultipleSelectTable
        headCells={questionBankHeader}
        rows={questionListRes?.data?.question_banks || []}
        value={values}
        setValue={(val) => setValues(val)}
        loading={isLoading || isFetching}
      />
      <CustomButton
        size="small"
        onClick={handleContinue}
        sx={{
          ...CustomButtonStyle,
          width: "150px",
          height: "40px",
          borderRadius: 2,
          float: "right",
          my: 2,
          "&:hover": {
            backgroundColor: "black",
          },
        }}
      >
        Save & Continue
      </CustomButton>

      <PublishModal
        handleClose={() => setOpen(false)}
        open={open}
        compType={compType}
      />
    </div>
  );
}

export default ImportQuestion;

export function PublishModal({ handleClose, open, compType }) {
  const navigate = useNavigate();
  const params = useParams();
  const { newPracticeQa } = useSelector((state) => state.practiceQa);
  console.log("🚀 ~ PublishModal ~ newPracticeQa:", newPracticeQa.questionList.length)

  const [createPracticeQa, { isLoading, isError }] =useCreatePracticeQaMutation();

  const [updatePracticeQa, { isLoading: updateLoading, isError: updateError }] =
  useUpdatePracticeQaMutation();


  const handleData =() => {
    const { questionList:list,topic, ...other } = newPracticeQa;
    const questionList =list.map((e) => e._id);
    return { questionList, ...other ,totalQuestions:questionList.length,topic:[topic]};
  };
  console.log("🚀 ~ handleData ~ handleData:", handleData())

  const handleCreateAssignment = async () => {
    try {
      const response = await createPracticeQa({
        endpoint: `${practiceQaApi.endPoint}`,
        data: await handleData(),
      });

      if (response.data && response.data.success) {
        toast.success("Practice Qa Added successfully!", {
          autoClose: 2000,
          onOpen: () => {
            navigate(`/main/exam/practiceQa`);
          },
        });
      } else {
        toast.error("Some error occured to submit form!", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error add Practice Qa api:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await updatePracticeQa({
        endpoint: `${practiceQaApi.endPoint}/${params.practiceId}`,
        updatedData: await handleData(),
      });

      if (response.data && response.data.success) {
        message.success("Pratice Q/A Added successfully!", 2.5);
        navigate(`/main/exam/practiceQa/detail/${params.practiceId}`);
      } else {
        message.error("Some error occured to Edit practiceQa!", 2.5);
      }
    } catch (error) {
      console.error("Error add Assignment api:", error);
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

          <header className="ps-2 flex justify-between items-center">
            <h4 className="text-xl font-inter font-semibold text-gray-700">
              Publish Practice Q/A?
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
              Do you to want to publish changes made in QID 110345 of arthmetic
              topic.
            </p>

            <Stack direction="row" justifyContent="flex-end" spacing={2} my={2}>
              {compType === "create" ? (
                <CustomButton
                  style={{
                    ...CustomButtonStyle,
                    width: 117,
                    height: 39,
                    borderRadius: 6,
                  }}
                  disabled={isLoading}
                  onClick={handleCreateAssignment}
                >
                  {isLoading?<CircularProgress color="inherit" size={18}/>:"Publish"}
                </CustomButton>
              ) : compType === "edit" ? (
                <CustomButton
                   disabled={updateLoading}
                  style={{
                    ...CustomButtonStyle,
                    width: 117,
                    height: 39,
                    borderRadius: 6,
                  }}
                  onClick={handleUpdate}
                >
                 {updateLoading?<CircularProgress color="inherit" size={18}/>:"Save Changes"}
                </CustomButton>
              ) : (
                "N/a"
              )}
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
