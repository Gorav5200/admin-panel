import React, { useState } from "react";
import { InputLabel, Stack } from "@mui/material";
import BootstrapTextField from "../../../common/bootstrapTextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../styles/muiRoot";
import { Select, MenuItem } from "@mui/material";
import { createHandleChange } from "../../../../services/common";
import { entityTypeApi } from "../../../../services/Constant";
import { useAddEntityTypeMutation } from "../../../../services/apis/dataManagement/entityType";
import { toast } from "react-toastify";
import SingleSelect from "../../../common/selectFields";

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
function CreateExam({ ModalComponent, close, entityList }) {
  const initialState = {
    entityType: "",
    entity: "",
  };
  const [addEntityType, { isLoading: isLoadingAdd, isError: isErrorAdd }] =
    useAddEntityTypeMutation();
  const [values, setValues] = useState(initialState);
  const handleChange = createHandleChange(values, setValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("values:",values);
    let obj = {
      business_subcategory_id: values.entity,
      title: values.entityType,
      description: "description",
    };
    const response = await addEntityType({
      endpoint: `${entityTypeApi.endPoint}/add`,
      newEntityType: obj,
    });
    // console.log("response:data:",response.data);
    if (response.data.success == true) {
      toast.success("Exam Type Added Successfully!", {
        autoClose: 2000,
        onOpen: () => setValues({ ...initialState, context: values.context }),
        // Auto close the toast after 3 seconds
      });
      close();
    } else {
      close();
    }
  };

  console.log("jkm", entityList);
  return (
    <>
      <ModalComponent>
        <header className="ps-2 flex justify-between items-center">
          <h4 className="text-xl font-inter font-semibold">Create Exam</h4>
          {/* <IconButton
            onClick={() => {
              close();
            }}
          >
            <Icon name="X" size="25" />
          </IconButton> */}
        </header>
        <div className="w-[627px] mt-7 p-2 flex flex-col gap-4">
          <BootstrapTextField
            label="Name of the exam you want to create"
            placeholder="Enter name here..."
            error={false}
            size="small"
            onChange={handleChange}
            name="entityType"
            value={values.entityType}
          />

          <div>
            <InputLabel
              shrink
              htmlFor="entity"
              sx={{
                fontSize: 20,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                mt: 2,
                color: "#455564",
              }}
              onChange={handleChange}
              name="entity"
            >
              Exam Category
            </InputLabel>

            {/* Subject or topic field */}

            <SingleSelect
              readOnly={false}
              data={entityList?.map((e) => e)}
              value={values.entity}
              style={{ width: "50%" }}
              size="small"
              setData={(val) => {
                handleChange({
                  target: {
                    name: "entity",
                    value: val,
                  },
                });
              }}
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
              onClick={close}
            >
              Cancel
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
              Continue
            </CustomButton>
          </Stack>
        </div>
      </ModalComponent>
    </>
  );
}

export default CreateExam;
