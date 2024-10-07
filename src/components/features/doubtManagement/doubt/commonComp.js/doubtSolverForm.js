import React from "react";
import { TextField, Autocomplete, Box, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { useGetTopicListQuery } from "../../../../../services/apis/dataManagement/topic";
import { useGetSubjectListQuery } from "../../../../../services/apis/dataManagement/subject";
import {
  doubtApi,
  subjectApi,
  topicApi,
} from "../../../../../services/Constant";
import { Skeleton } from "antd";
import { useAddDoubtSolverInfoMutation } from "../../../../../services/apis/doubtApi";
import { message } from "antd";
import { toast } from "react-toastify";
const DoubtSolverForm = ({ uid, closeModal }) => {
  const {
    data: topicList,
    isLoading: topicLoad,
    isError: topicError,
    refetch: topicRefetch,
  } = useGetTopicListQuery(topicApi.endPoint, {
    refetchOnMountOrArgChange: false,
  });

  const {
    data: subjectList,
    isLoading: subjectLoad,
    isError: subjectError,
    refetch: subjectRefetch,
  } = useGetSubjectListQuery(subjectApi.endPoint, {
    refetchOnMountOrArgChange: false,
  });

  const [addDoubtSolverInfo, { isLoading: infoLoading }] = useAddDoubtSolverInfoMutation();
  const [selectedTopics, setSelectedTopics] = React.useState([]);
  const [selectedSubjects, setSelectedSubjects] = React.useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("48");

    console.log("Selected Topics:", selectedTopics);
    console.log("Selected Subjects:", selectedSubjects);
    try {
      // Call the addMockPackage mutation
      const response = await addDoubtSolverInfo({
        endpoint: `${doubtApi.endPoint}/solverInfo`,
        updatedData: {
          info: {
            strongTopics: selectedTopics.map((item) => {
              return item._id;
            }),
            strongSubjects: selectedSubjects.map((item) => {
              return item._id;
            }),
          },
          doubtSolverId: uid,
        },
      });
      // Navigate to the desired path after successful deletion
      console.log("Response:", response);

      if (response && response?.data?.success) {
        // Navigate to the desired path after successful deletion

        message.success("Info Add Success!", 2.5);
        closeModal();
      } else {
        toast.error("Some error occured to Update Info!", {
          autoClose: 2000,
        });
        console.error("Error Update Info. Response:", response);
      }
    } catch (error) {
      console.error("Error add Add Info:", error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: "600px",
        padding: "40px",
      }}
    >
      {!subjectLoad ? (
        <Autocomplete
          multiple
          options={subjectList?.data}
          getOptionLabel={(option) => option.title}
          value={selectedSubjects}
          onChange={(event, newValue) => setSelectedSubjects(newValue)}
          renderInput={(params) => <TextField {...params} label="Subjects" />}
        />
      ) : (
        <div className="h-full w-full p-2">
          <Skeleton variant="rounded" width={"100%"} height={"100%"} />
        </div>
      )}
      {!topicLoad ? (
        <Autocomplete
          multiple
          options={topicList?.data}
          getOptionLabel={(option) => option.title}
          value={selectedTopics}
          onChange={(event, newValue) => setSelectedTopics(newValue)}
          renderInput={(params) => <TextField {...params} label="Topics" />}
        />
      ) : (
        <div className="h-full w-full p-2">
          <Skeleton variant="rounded" width={"100%"} height={"100%"} />
        </div>
      )}

      <LoadingButton
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#171717",
          width: 178,
          height: 46,
          fontFamily: "var(--font-inter)",
          fontSize: 15,
          borderRadius: 2,
          textTransform: "none",
          alignSelf: "end",
          mb: 9,
          ":hover": {
            backgroundColor: "#171717",
          },
        }}
      >
        Add Info
      </LoadingButton>
    </Box>
  );
};

export default DoubtSolverForm;
