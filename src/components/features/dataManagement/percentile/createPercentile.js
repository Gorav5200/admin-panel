import React, { useEffect, useState } from "react";
import { Box, CircularProgress, IconButton, Modal, Stack, InputLabel, Select, MenuItem } from "@mui/material";
import { XIcon } from "lucide-react";
import { CustomButton, ButtonStyle } from "../../../../styles/muiRoot";
import { toast } from "react-toastify";
import { percentileApi } from "../../../../services/Constant";
import BootstrapTextField from "../../../common/bootstrapTextField";
import { message } from "antd";
import { useGetEntityTypeListQuery } from "../../../../services/apis/dataManagement/entityType";
import { entityTypeApi, subjectApi } from "../../../../services/Constant";
import OutlinedInput from "@mui/material/OutlinedInput";

import {
  useAddPercentileMutation,
  useUpdatePercentileMutation,
} from "../../../../services/apis/dataManagement/percentile";

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
export default function CreatePercentile({
  handleClose,
  open,
  data,
  compType,
  refetch,
}) {
  const initialState = {
    entity_type_id: "",
    title: "",
    // business_subcategory_id: null,
    file: null, // State to manage selected file
  };

  const [addPercentile, { isLoading, isError }] = useAddPercentileMutation();
  const [updatePercentile, { isLoading: updateLoad, isError: updateError }] =
    useUpdatePercentileMutation();

  const {
    data: entityTypeList,
    // isLoading,
    // isError,
    // refetch,
  } = useGetEntityTypeListQuery(entityTypeApi.endPoint, {});

  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("entityType", values.entity_type_id);
      formData.append("title", values.title);
      formData.append("file", values.file);
      console.log("handleCreate:", values);
      message.success("Added", 2.5);
      const response = await addPercentile({
        endpoint: `${percentileApi.endPoint}/upload`,
        newTopic: formData,
      });
      console.log("@formData", formData);
      if (response.data && response.data.success) {
        handleClose();
        message.success("Added", 2.5);
        refetch();
      } else {
        toast.error("Some error occurred while submitting the form!", {
          transition: "fade",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error adding Assignment api:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await updatePercentile({
        endpoint: `${percentileApi.endPoint}/${id}`,
        updatePercentile: values,
      });
      if (response.data && response.data.success) {
        message.success("Updated", 2.5);
        handleClose();
        refetch();
      } else {
        message.error("Some error occurred while updating!", 2.5);
      }
    } catch (error) {
      console.error("Error adding Assignment api:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (compType === "edit" && data) {
      setValues(data);
    } else {
      setValues(initialState);
    }
  }, [data, compType]);

  useEffect(() => {
    if (!open) {
      setValues(initialState);
    }
  }, [open]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setValues((prevState) => ({
      ...prevState,
      file: file,
    }));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modalRoot max-h-[60vh] overflow-scroll">
        <header className="ps-2 flex justify-between items-center bg-medGrey rounded-t-md">
          <h4 className="text-xl font-inter font-semibold text-gray-700">
            {compType === "create" ? "Create Percentile" : "Edit Percentile"}
          </h4>
          <IconButton onClick={handleClose}>
            <XIcon className="text-gray-700" />
          </IconButton>
        </header>
        <div className="w-[627px] mt-7 p-2 flex flex-col gap-4">
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
          <BootstrapTextField
            label="Name of the Title"
            size="small"
            value={values.title}
            onChange={handleChange}
            name="title"
          />

          <div>
            <h1
              style={{
                paddingBottom: "20px",
                fontWeight: "bold",
              }}
            >
              Upload File
            </h1>

            <input
              accept=".json"
              style={{}}
              id="file-upload"
              multiple
              type="file"
              onChange={handleFileChange}
            />
          </div>

          <Stack direction="row" justifyContent="flex-end" spacing={2} my={2}>
            <CustomButton
              style={{
                ...ButtonStyle,
                width: 117,
                height: 39,
                borderRadius: 6,
              }}
              onClick={handleClose}
            >
              Cancel
            </CustomButton>

            <CustomButton
              disabled={isLoading || updateLoad}
              style={{
                ...ButtonStyle,
                width: updateLoad || isLoading ? "fit-content" : 117,
                height: 39,
                borderRadius: 6,
              }}
              onClick={
                compType === "create"
                  ? handleCreate
                  : () => handleUpdate(data._id)
              }
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
      </Box>
    </Modal>
  );
}
