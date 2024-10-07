import React, { useEffect, useMemo, useRef, useState } from "react";
import { XIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { resetCoursesState } from "../../../../../ducks/exams/courseSlice";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../../styles/muiRoot";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BackdropLoader } from "../../../../common/lineLoader";
import { Box, IconButton, Modal, Stack } from "@mui/material";
import { useCreateCourseMutation } from "../../../../../services/apis/exam/courses";
import { useSelector } from "react-redux";

export default function PublishModal(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [createCourse, { isLoading: postLoading }] = useCreateCourseMutation();
  const {
    courseDescription,
    learn,
    successStories,
    topFeatures,
    whyIquanta,
    courseDetail,
    courseStructure,
    learnDetails,
    groups,
  } = useSelector((state) => state.courses);

  const handleAllData = () => {
    const getLearnData = Object.entries(learn).reduce((acc, [key, value]) => {
      acc[key] = value.map((el) => el?._id);
      return acc;
    }, {});

    console.log(getLearnData);

    const updatedData = {
      description: courseDescription,
      ...getLearnData,
      successStories,
      learnDetails,
      topFeatures,
      whyUs: { data: whyIquanta },
      ...courseDetail,
      courseStructure,
      groups,
    };
    return updatedData;
  };

  console.log("🚀 ~ handleAllData ~ handleAllData:", handleAllData());

  const handleSubmit = async () => {
    try {
      // Call the addMockPackage mutation
      const response = await createCourse({
        endpoint: `/exams/v1/course/basic`,
        newCourse: await handleAllData(),
      });
      // Navigate to the desired path after successful deletion
      console.log("Response:", response);

      if (response && response?.data?.success) {
        // Navigate to the desired path after successful deletion

        toast.success("Course Added successfully!", {
          autoClose: 2000,
          onOpen: () => {
            navigate(`/main/entity/${params.entityId}/course`);
            dispatch(resetCoursesState());
          },

          // Auto close the toast after 3 seconds
        });
      } else {
        toast.error("Some error occured to Add Course!", {
          autoClose: 2000,
        });
        console.error("Error add course. Response:", response);
      }
    } catch (error) {
      console.error("Error add Add course:", error);
    }
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modalRoot">
        <BackdropLoader isOpen={postLoading} />
        <header className="ps-2 flex justify-between items-center">
          <h4 className="text-xl font-inter font-semibold text-gray-700">
            Publish Course?
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
            Would you like to publish course created in CAT Exams, by publishing
            the students can see and purchase the following course
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
                dispatch(resetCoursesState());
                navigate(`/main/exam/${params.entityId}/course`);
              }}
            >
              Save
            </CustomButton>

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
          </Stack>
        </div>
      </Box>
    </Modal>
  );
}
