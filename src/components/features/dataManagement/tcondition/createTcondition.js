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
import { useNavigate } from "react-router-dom";
import {
  useAddTermsMutation,
  useUpdateTermsMutation,
} from "../../../../services/apis/dataManagement/terms";

import { XIcon } from "lucide-react";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../styles/muiRoot";
import { toast } from "react-toastify";
// import { entityApi, entityTypeApi } from "../../../../services/Constant";
import { termsApi } from "../../../../services/Constant";

import BootstrapTextField from "../../../common/bootstrapTextField";

import { createHandleChange } from "../../../../services/common";
import { Empty, message } from "antd";
import { useGetTermsListQuery } from "../../../../services/apis/dataManagement/entity";
// import TextArea from "./textarea";
import TextSpace from "./textspace";
import QuillEditor from "../../../common/textEditor";
import { entityTypeApi, subjectApi } from "../../../../services/Constant";
import { useGetEntityTypeListQuery } from "../../../../services/apis/dataManagement/entityType";


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

export default function CreateTcondition({
  handleClose,
  open,
  data,
  compType,
  refetch,
}) {
  console.log("🚀 ~ data:", data);

  const initialState = {
    name: "",
    title: "",
    entity_type_id: "",
    termsAndCondition: "",
  };
  //entityType 
  const {
    data: entityTypeList,
    // isLoading,
    // isError,
    // refetch,
  } = useGetEntityTypeListQuery(entityTypeApi.endPoint, {});
  const [addTerms, { isLoading, isError }] = useAddTermsMutation();
  const [updateTerms, { isLoading: updateLoad, isError: updateError }] =
    useUpdateTermsMutation();

  
  const [values, setValues] = useState(initialState);
  //const [description , setDescription] = useState('');

  const handleChange = createHandleChange(values, setValues);

  // const handleChange = (name) => (event) => {
  //   setValues({ ...values, [name]: event.target.value });
  // };

  const handleCreate = async () => {
    try {
      const response = await addTerms({
        endpoint: `${termsApi.endPoint}`,
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
      const response = await updateTerms({
        endpoint: `${termsApi.endPoint}/${id}`,
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

  //   useEffect(() => {
  //     if (compType === "edit" && data) {
  //       setValues(data);
  //     } else {
  //       //setValues(initialState);
  //     }
  //   }, [data]);

  useEffect(() => {
    if (compType === "edit" && data) {
      setValues(data);
    } else {
      setValues(initialState);
    }
  }, [data, compType]);

  useEffect(() => {
    return () => {
      setValues(initialState);
    };
  }, [open]);
  // console.log("ttttyyy", values);

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
            {compType === "create"
              ? "Create Term & Condition"
              : "Edit Term & Condition"}
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
          <BootstrapTextField
            label="Name"
            size="small"
            value={values.name}
            onChange={handleChange}
            name="name"
          />
          <BootstrapTextField
            label="Name of the Title"
            size="small"
            value={values.title}
            onChange={handleChange}
            name="title"
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
          {/* <BootstrapTextField
            label="Description"
            size="small"
            multiline
            minRows={5}
            value={values.description}
            onChange={handleChange}
            name="description"
          /> */}
          <div>
            <h1>TermsAndCondition</h1>

            {/* <TextSpace
              label="TermsAndCondition"
              size="small"
              multiline
              minRows={5}
              value={values.termsAndCondition}
              onChange={handleChange("termsAndCondition")}
              name="termsAndCondition"
            /> */}
            <QuillEditor
              setValue={(val) =>
                handleChange({
                  target: {
                    name: "termsAndCondition",
                    value: val,
                  },
                })
              }
              value={values.termsAndCondition}
              placeholder="Write explainations..."
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
              // disabled={isLoading || updateLoad}
              style={{
                ...CustomButtonStyle,
                // width: updateLoad || isLoading ? "fit-content" : 117,
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
              {/* {updateLoad || isLoading ? (
                <CircularProgress size={18} color="inherit" />
              ) : compType === "create" ? (
                " Continue"
              ) : (
                "Save changes"
              )} */}
              {compType === "create" ? " Continue" : "Save changes"}
            </CustomButton>
          </Stack>
        </div>
      </Box>
    </Modal>
  );
}
