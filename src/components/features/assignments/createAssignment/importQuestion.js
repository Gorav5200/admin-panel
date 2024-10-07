import React, { useState } from "react";
import MultipleSelectTable from "../../../common/tableMultipleSelect";
import { useSelector } from "react-redux";
import { Avatar, Box, IconButton, Modal, Stack } from "@mui/material";
import {
  createQuestionList,
  resetAssignment,
} from "../../../../ducks/assignmentSlice";
import { useDispatch } from "react-redux";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../styles/muiRoot";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateAssignmentPackageMutation,
  useUpdateAssignmentMutation,
} from "../../../../services/apis/assignmentApi";
import { toast } from "react-toastify";
import { assignmentApi, questionApi } from "../../../../services/Constant";
import { BackdropLoader } from "../../../common/lineLoader";
import { XIcon } from "lucide-react";
import { useGetQuestionListQuery } from "../../../../services/apis/exam/questionBank";
import { questionBankHeader } from "../../../../services/constHeaders";
import { message } from "antd";
function ImportQuestion({ handleNext, compType }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.assignment);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(state.newAssignment.questionList || []);

  const handleContinue = () => {
    if (values.length === 0) {
      message.error("Atleast one question must be selected");
    } else {
      dispatch(createQuestionList(values));
      handleNext();
      setOpen(true);
    }
  };

  const {
    data: questionListRes,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetQuestionListQuery(
    `${questionApi.endPoint}/topic/${state.newAssignment.topic}`,
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
  const dispatch = useDispatch();
  const params = useParams();
  const { newAssignment } = useSelector((state) => state.assignment);

  const [createAssignmentPackage, { isLoading, isError }] =
    useCreateAssignmentPackageMutation();

  const [updateAssignment, { isLoading: updateLoading, isError: updateError }] =
    useUpdateAssignmentMutation();

  const handleData = () => {
    const { questionList: list, ...other } = newAssignment;
    const questionList = list.map((e) => e._id);
    return { questionList, totalQuestions: questionList.length, ...other };
  };

  const handleCreateAssignment = async () => {
    try {
      const response = await createAssignmentPackage({
        endpoint: `${assignmentApi.endPoint}/basic`,
        newData: await handleData(),
      });

      if (response.data && response.data.success) {
        toast.success("Assignment Added successfully!", {
          autoClose: 2000,
          onOpen: () => {
            navigate(`/main/exam/assignment`);
          },
        });
      } else {
        toast.error("Some error occured to submit form!", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error add Assignment api:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await updateAssignment({
        endpoint: `${assignmentApi.endPoint}/basic/${params.assignmentId}`,
        updatedData: await handleData(),
      });

      if (response.data && response.data.success) {
        message.success("Assignment Edit successfully!", 2.5);
        navigate(`/main/exam/assignment/detail/${params.assignmentId}`);
      } else {
        message.error("Some error occured to Edit Assignment!", 2.5);
      }
    } catch (error) {
      console.error("Error add Assignment api:", error);
      throw error;
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
          <BackdropLoader isOpen={isLoading} />
          <header className="ps-2 flex justify-between items-center">
            <h4 className="text-xl font-inter font-semibold text-gray-700">
              Publish Assignment?
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
                  onClick={handleCreateAssignment}
                >
                  Publish
                </CustomButton>
              ) : compType === "edit" ? (
                <CustomButton
                  style={{
                    ...CustomButtonStyle,
                    width: 117,
                    height: 39,
                    borderRadius: 6,
                  }}
                  onClick={handleUpdate}
                >
                  Save Changes
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
