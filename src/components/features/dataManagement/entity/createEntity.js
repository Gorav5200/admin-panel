import {
  Box,
  CircularProgress,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAddEntityMutation } from "../../../../services/apis/dataManagement/entityType";
import { XIcon } from "lucide-react";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../styles/muiRoot";
import { toast } from "react-toastify";
import { entityApi } from "../../../../services/Constant";
import BootstrapTextField from "../../../common/bootstrapTextField";
import { createHandleChange } from "../../../../services/common";
import { Empty, message } from "antd";
import {
  useGetEntityListQuery,
  useUpdateEntityMutation,
} from "../../../../services/apis/dataManagement/entity";

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
export default function CreateEntity({
  handleClose,
  open,
  data,
  compType,
  refetch,
}) {
  console.log(
    "🚀 ~ CreateEntity ~ handleClose, open, data, compType:",
    open,
    data,
    compType
  );

  const initialState = {
    title: null,
    category_id: null,
    thumbnail:null
  };

  const [addEntity, { isLoading, isError }] = useAddEntityMutation();
  const [updateEntity, { isLoading: updateLoad, isError: updateError }] =
    useUpdateEntityMutation();

  const [values, setValues] = useState(initialState);
  const handleChange = createHandleChange(values, setValues);

  const handleCreate = async () => {
    try {
      const response = await addEntity({
        endpoint: `${entityApi.endPoint}`,
        data: values,
      });

      if (response.data && response.data.success) {
        handleClose();
        message.success("Added", 2.5);
        refetch();
      } else {
        toast.error("Some error occured to submit form!", {
          transition: "fade",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error add Assignment api:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await updateEntity({
        endpoint: `${entityApi.endPoint}/${id}`,
        updateEntity: values,
      });
      if (response.data && response.data.success) {
        message.success("Updated", 2.5);
        handleClose();
        refetch();
      } else {
        message.error("Some error occured to update!", 2.5);
      }
    } catch (error) {
      console.error("Error add Assignment api:", error);
      throw error;
    }
  };

  const {
    data: entityList,
    isLoading: entityLoading,
    isError: entityError,
    isSuccess: entitySuccess,
  } = useGetEntityListQuery(entityApi.categoryEndPoint, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (compType === "edit" && data) {
      setValues(data);
    } else {
      setValues(initialState);
    }
  }, [data]);

  useEffect(() => {
    return () => {
      setValues(initialState);
    };
  }, [open]);

  console.log("🚀 ~ CreateEntity ~ entityList:", entityList);
  console.log("🚀 ~ CreateEntity ~ values:", values);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modalRoot">
        <header className="ps-2 flex justify-between items-center bg-medGrey rounded-t-md">
          <h4 className="text-xl font-inter font-semibold text-gray-700">
            {compType === "create" ? "Create Entity" : "Edit Entity"}
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
          <div className="flex justify-between w-full gap-3">
            <BootstrapTextField
              label="Name of the title"
              size="small"
              value={values.title}
              onChange={handleChange}
              name="title"
            />

            <div>
              <SingleImageUpload
                endpoint={`${entityApi.endPoint}/upload/image`}
                setData={(val) => setValues({ ...values, thumbnail: val })}
                data={values.thumbnail}
              />
            </div>
          </div>
          <div>
            <InputLabel
              htmlFor="category"
              sx={{
                fontSize: 14,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                mb: 1.3,
                color: "#455564",
              }}
              onChange={handleChange}
              name="category"
            >
              Select Category
            </InputLabel>

            <Select
              sx={{ width: "100%" }}
              size="small"
              shrink
              labelId="demo-multiple-subject-label"
              name="category_id"
              value={values.category_id}
              defaultValue={values.category_id}
              required
              onChange={handleChange}
              input={<OutlinedInput />}
              MenuProps={MenuProps}
            >
              {entityLoading ? (
                <MenuItem value="" disabled>
                  <div className="flex flex-col justify-center items-center w-full ">
                    <CircularProgress size={20} color="inherit" />
                    Loading...
                  </div>
                </MenuItem>
              ) : entityError ? (
                <MenuItem value="" disabled>
                  Some error occured
                </MenuItem>
              ) : entitySuccess && entityList.data?.length === 0 ? (
                <MenuItem value="" disabled>
                  <Empty description="No Data found" className="mx-auto" />
                </MenuItem>
              ) : (
                entityList.data?.map(({ _id, title, name, value: val }) => (
                  <MenuItem key={_id} value={_id ?? val}>
                    {title ?? name}
                  </MenuItem>
                ))
              )}
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
              onClick={handleClose}
            >
              Cancel
            </CustomButton>

            <CustomButton
              disabled={isLoading || updateLoad}
              style={{
                ...CustomButtonStyle,
                width: updateLoad || isLoading ? "fit-content" : 117,
                height: 39,
                borderRadius: 6,
                transition: "all 3s ease-in-out linear",
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
