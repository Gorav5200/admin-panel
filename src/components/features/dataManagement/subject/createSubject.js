import React, { useState, useEffect, useLayoutEffect } from "react";
import { CircularProgress, IconButton, InputLabel, Stack } from "@mui/material";
import Icon from "../../../common/Icon";
import BootstrapTextField from "../../../common/bootstrapTextField";
import d from "../../../common/selectFields";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../styles/muiRoot";
import { createHandleChange } from "../../../../services/common";
import { Select, MenuItem } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useGetEntityTypeListQuery } from "../../../../services/apis/dataManagement/entityType";
import { entityTypeApi, subjectApi } from "../../../../services/Constant";
import {
  useAddSubjectMutation,
  useUpdateSubjectMutation,
} from "../../../../services/apis/dataManagement/subject";
import { toast, ToastContainer } from "react-toastify";
import { message } from "antd";
import SingleImageUpload from "../../../common/singleImageUpload";
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

function CreateSubject({ ModalComponent, close, data, compType }) {
  console.log("🚀 ~ CreateSubject ~ compType:", compType);
  const initialState = {
    title: null,
    entity_type_id: null,
    description: null,
    thumbnail:null,
  };
  const [values, setValues] = useState(initialState);
  console.log("🚀 ~ CreateSubject ~ data:", data);

  useLayoutEffect(() => {
    if (compType === "edit" && data) {
      setValues(data);
    } else setValues(initialState);
  }, [data]);

  const handleChange = createHandleChange(values, setValues);
  const [addSubject, { isLoading: isLoadingAdd, isError: isErrorAdd }] =
    useAddSubjectMutation();
  const [updateSubject, { isLoading: updateLoad, isError: isErrorUpdate }] =
    useUpdateSubjectMutation();
  const {
    data: entityTypeList,
    isLoading,
    isError,
    refetch,
  } = useGetEntityTypeListQuery(entityTypeApi.endPoint, {});

  const handleCreate = async () => {
    const response = await addSubject({
      endpoint: `${subjectApi.endPoint}/add`,
      newSubject: values,
    });
    if (response.data.success == true) {
      message.success("Added");
      //  setValues(initialState)
      close();
    } else {
      message.error("Some error occured");
      close();
    }
  };

  const handleUpdate = async () => {
    const response = await updateSubject({
      endpoint: `${subjectApi.endPoint}/${values?._id}`,
      updateSubject: values,
    });
    if (response?.data?.success) {
      message.success("Updated");

      close();
    } else {
      message.error("Some error occured");
    }
  };

  console.log("🚀 ~ CreateSubject ~ values:", values);
  return (
    <>
      <ModalComponent>
        <header className="p-2 flex justify-between items-center bg-medGrey rounded-t-md ">
          <h4 className="text-base font-inter font-semibold">
            Create Section/Subject
          </h4>
        </header>
        <div className="w-[627px] mt-7 p-2 flex flex-col gap-4  max-h-[60vh] overflow-scroll">
          <div className="flex gap-2 justify-between items-start ">
            <BootstrapTextField
              label="Name of the Subject you want to create"
              placeholder="Enter name here..."
              error={false}
              size="small"
              onChange={handleChange}
              name="title"
              value={values.title}
            />

            <div>
              <SingleImageUpload
                endpoint={`${subjectApi.endPoint}/upload/image`}
                setData={(val) => setValues({ ...values, thumbnail: val })}
                data={values.thumbnail}
              />
            </div>
          </div>
          <BootstrapTextField
            label="Description"
            placeholder="Enter some text here..."
            error={false}
            multiline
            minRows={2}
            size="small"
            onChange={handleChange}
            name="description"
            value={values.description}
          />

          <div>
            <InputLabel
              htmlFor="entityType"
              sx={{
                fontSize: 14,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                mb: 1.3,
                color: "#455564",
              }}
              name="entityType"
            >
              Select Entity Type
            </InputLabel>

            {/* Subject or topic field */}

            <Select
              sx={{ width: "100%" }}
              size="small"
              shrink
              labelId="demo-multiple-subject-label"
              name="entity_type_id"
              id="demo-multiple-subject"
              value={values.entity_type_id}
              required
              onChange={handleChange}
              input={<OutlinedInput />}
              MenuProps={MenuProps}
            >
              {entityTypeList?.data.map((item) => (
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

export default CreateSubject;
