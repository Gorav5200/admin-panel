import React, { useState, useEffect, useLayoutEffect } from "react";
import { CircularProgress, IconButton, InputLabel, Stack } from "@mui/material";
import BootstrapTextField from "../../../common/bootstrapTextField";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../styles/muiRoot";
import { createHandleChange } from "../../../../services/common";
import { Select, MenuItem } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useGetTopicListQuery } from "../../../../services/apis/dataManagement/topic";
import { subTopicApi, topicApi } from "../../../../services/Constant";
import {
  useAddSubTopicMutation,
  useUpdateSubTopicMutation,
} from "../../../../services/apis/dataManagement/subTopic";
import { toast, ToastContainer } from "react-toastify";
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

function CreateSubTopic({ ModalComponent, close, compType, data }) {
  const initialState = {
    title: null,
    description: null,
    business_topic_list_id: null,
  };
  const [values, setValues] = useState(initialState);
  const handleChange = createHandleChange(values, setValues);
  const [addSubTopic, { isLoading: isLoadingAdd, isError: isErrorAdd }] =
    useAddSubTopicMutation();
  const [updateSubTopic, { isLoading: updateLoad, isError: isErrorUpdate }] =
    useUpdateSubTopicMutation();

  const {
    data: topicList,
    isLoading,
    isError,
    refetch,
  } = useGetTopicListQuery(topicApi.endPoint, {
    refetchOnMountOrArgChange: true,
  });

  const handleCreate = async () => {
    const response = await addSubTopic({
      endpoint: `${subTopicApi.endPoint}/add`,
      newSubTopic: values,
    });
    // console.log("response:data:",response.data);
    if (response.data?.success) {
      toast.success("SubTopic Added Successfully!", {
        autoClose: 2000,
        onOpen: () => setValues({ ...initialState, context: values.context }),
        // Auto close the toast after 3 seconds
      });
      close();
    } else {
      close();
    }
  };

  useLayoutEffect(() => {
    if (compType === "edit" && data) {
      setValues(data);
    } else setValues(initialState);
  }, [data]);


  const handleUpdate = async () => {
    const response = await updateSubTopic({
      endpoint: `${subTopicApi.endPoint}/${values._id}`,
      updateSubTopic: values,
    });
    if (response?.data?.success) {
      message.success("Subtopic updated");

      close();
    } else {
      message.error("Some error occured");
    }
  };
  return (
    <>
      <ModalComponent>
        <header className="p-2 flex justify-between items-center   bg-medGrey rounded-t-md ">
          <h4 className="text-xl font-inter font-semibold">Create Sub-Topic</h4>
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
              name="business_topic_list_id"
              value={values.business_topic_list_id}
              required
              onChange={handleChange}
              input={<OutlinedInput />}
              MenuProps={MenuProps}
            >
              {topicList?.data.map((item) => (
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

export default CreateSubTopic;
