import React, { useState } from "react";
import Header, { HeaderWithNavigation } from "../../common/header";
import Box from "@mui/material/Box";
import BootstrapTextField from "../../common/bootstrapTextField";
import MultipleSelectTable from "../../common/tableMultipleSelect";
import { CustomButton, CustomButtonStyle } from "../../../styles/muiRoot";
import { useCreatePackageMutation } from "../../../services/apis/learnApi";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { packageSchema } from "../../../services/utilities/formSchemas";

function PackageForm({
  handleChange,
  values,
  tableData,
  headCells,
  apiUrl,
  redirectUrl,
  title,
}) {
  const [createPackage, isLoading, isError] = useCreatePackageMutation();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleData = () => {
    const { list: packageList, ...others } = values;
    const list = packageList?.map((e) => e._id);
    const data = { list, ...others };
    return data;
  };

  console.log("🚀 ~ values:", values);

  const handleSubmit = async () => {
    const checkValidation =  packageSchema(values, title);
    console.log("🚀 ~ handleSubmit ~ checkValidation:", checkValidation)
    if (Object.keys(checkValidation)?.length > 0) {
      setErrors(checkValidation);
      if (Object.keys(checkValidation).length ===1 && checkValidation.list) {
        message.error(checkValidation.list);
      }
      return;
    }

    try {
      const response = await createPackage({
        endpoint: `${apiUrl}`,
        newPackage: await handleData(),
      });
      // Navigate to the desired path after successful deletion
      console.log("Response:", response);

      if (response && response?.data?.success) {
        // Navigate to the desired path after successful
        message.success("Package Added successfully!", 2.5);
        navigate(redirectUrl);
      } else {
        message.error("Some error occured to Add package!", 2.5);
        console.error("Error add package. Response:", response);
      }
    } catch (error) {
      console.error("Error add Add package:", error);
    }
  };

  console.log("🚀 ~ errors:", errors);
  console.log("🚀 ~ handleData ~ handleData:", handleData());
  return (
    <>
      <HeaderWithNavigation cont={"Create Package"} />
      <div className="bg-lightGrey h-[98%] overflow-scroll scroll-smooth pt-0 ">
        <div className="flex flex-col gap-3 justify-start items-start p-5">
          <Box
            component="form"
            display={"flex"}
            gap={3}
            width={"100%"}
            noValidate
            autoComplete="off"
          >
            <BootstrapTextField
              name="title"
              label="Add title"
              onChange={handleChange}
              value={values.title}
              error={errors?.title}
              helperText={errors?.title}
            />
            <BootstrapTextField
              name="description"
              label="Add Description"
              onChange={handleChange}
              value={values.description}
              error={errors?.description}
              helperText={errors?.description}
            />
          </Box>
          <div className="w-full h-[70vh] overflow-scroll">
            <h6 className="font-inter font-medium text-gray-700">
              Add {title || "N/A"}
            </h6>
            <MultipleSelectTable
              headCells={headCells}
              rows={tableData}
              value={values?.list}
              setValue={(val) =>
                handleChange({
                  target: {
                    name: "list",
                    value: val,
                  },
                })
              }
              loading={false}
            />
          </div>
        </div>

        <CustomButton
          onClick={handleSubmit}
          style={{
            ...CustomButtonStyle,
            width: 156,
            borderRadius: 5,
            height: 50,
            float: "right",
            margin: "12px",
            marginTop: "3px",
          }}
        >
          Save
        </CustomButton>
      </div>
    </>
  );
}

export default PackageForm;
