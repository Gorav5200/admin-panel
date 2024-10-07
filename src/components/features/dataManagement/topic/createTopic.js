import React, { useState, useEffect, useLayoutEffect } from "react";
import { CircularProgress, IconButton, InputLabel, Stack } from "@mui/material";
import Icon from "../../../common/Icon";
import BootstrapTextField from "../../../common/bootstrapTextField";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../styles/muiRoot";
import { createHandleChange } from "../../../../services/common";
import { Select, MenuItem } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useGetSubjectListQuery } from "../../../../services/apis/dataManagement/subject";
import { subjectApi, topicApi } from "../../../../services/Constant";
import {
  useAddTopicMutation,
  useUpdateTopicMutation,
} from "../../../../services/apis/dataManagement/topic";
import { toast, ToastContainer } from "react-toastify";
import { Create } from "@mui/icons-material";
import { message } from "antd";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function CreateTopic({ ModalComponent, close, data, compType }) {
  const initialState = {
    title: null,
    description: null,
    subject_id: null,
  };
  const [values, setValues] = useState(initialState);
  const handleChange = createHandleChange(values, setValues);
  const [addTopic, { isLoading: isLoadingAdd, isError: isErrorAdd }] =
    useAddTopicMutation();
  const [updateTopic, { isLoading: updateLoad, isError: isErrorUpdate }] =
    useUpdateTopicMutation();
  const {
    data: subjectList,
    isLoading,
    isError,
    refetch,
  } = useGetSubjectListQuery(subjectApi.endPoint, {
    refetchOnMountOrArgChange: true,
  });

  useLayoutEffect(() => {
    if (compType === "edit" && data) {
      setValues(data);
    } else setValues(initialState);
  }, [data]);

  console.log("🚀 ~ CreateTopic ~ compType:", compType);
  console.log("🚀 ~ CreateTopic ~ data:", data);

  const handleCreate = async (e) => {
    e.preventDefault();
    // console.log("values:",values);

    const response = await addTopic({
      endpoint: `${topicApi.endPoint}`,
      newTopic: values,
    });

    if (response.data?.success) {
      message.success("Topic Added");
      close();
    } else {
      message.error("Some error occured");
    }
  };

  const handleUpdate = async () => {
    const response = await updateTopic({
      endpoint: `${topicApi.endPoint}/${values._id}`,
      updateTopic: values,
    });
    if (response?.data?.success) {
      message.success("Updated");

      close();
    } else {
      message.error("Some error occured");
    }
  };

  console.log("🚀 ~ CreateTopic ~ values:", values);

  return (
    <>
      <ModalComponent>
        <header className="p-2 flex justify-between items-center   bg-medGrey rounded-t-md ">
          <h4 className="text-xl font-inter font-semibold">Create Topic</h4>
        </header>
        <div className="w-[627px] mt-7 p-2 flex flex-col gap-4 max-h-[60vh] overflow-scroll ">
          <BootstrapTextField
            label="Name of the Topic you want to create"
            placeholder="Enter name here..."
            error={false}
            size="small"
            onChange={handleChange}
            name="title"
            value={values.title}
          />

          <BootstrapTextField
            label="Description"
            placeholder="Text here..."
            multiline
            minRows={3}
            value={values.description}
            size="small"
            onChange={handleChange}
            name="description"
          />

          <div>
            <InputLabel
              //shrink
              htmlFor="subject"
              sx={{
                fontSize: 14,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                mb: 1.3,
                color: "#455564",
              }}
              onChange={handleChange}
              name="subject"
            >
              Select Subject
            </InputLabel>

            {/* Subject or topic field */}
            <Select
              shrink
              sx={{ width: "100%" }}
              size="small"
              labelId="demo-multiple-subject-label"
              name="subject_id"
              value={values.subject_id}
              required
              onChange={handleChange}
              input={<OutlinedInput />}
              MenuProps={MenuProps}
            >
              {subjectList?.data.map((item) => (
                <MenuItem key={item.title} value={item._id}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </div>

          <Stack direction="row" justifyContent="flex-end" spacing={2} my={2}>
            <CustomButton
              style={{
                ...ButtonStyle,
                width: 117,
                height: 39,
                borderRadius: 6,
              }}
              onClick={close}
            >
              Cancel
            </CustomButton>
            <CustomButton
              disabled={isLoadingAdd || updateLoad}
              style={{
                ...CustomButtonStyle,
                width: updateLoad || isLoadingAdd ? "fit-content" : 117,
                height: 39,
                borderRadius: 6,
                transition: "all 3s ease-in-out linear",
              }}
              onClick={compType === "create" ? handleCreate : handleUpdate}
            >
              {updateLoad || isLoading ? (
                <CircularProgress size={18} color="inherit" />
              ) : compType === "create" ? (
                " Continue"
              ) : (
                "Save changes"
              )}
            </CustomButton>
          </Stack>
        </div>
      </ModalComponent>
    </>
  );
}

export default CreateTopic;
