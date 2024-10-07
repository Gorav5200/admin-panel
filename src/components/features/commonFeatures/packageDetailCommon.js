import React, { useEffect, useState } from "react";
import Header, { HeaderWithNavigation } from "../../common/header";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import BootstrapTextField from "../../common/bootstrapTextField";
import { Avatar, Button, Divider, Stack } from "@mui/material";
import PaginationTable from "../../common/PaginationTable";
import MultipleSelectTable from "../../common/tableMultipleSelect";
import { CustomButton, CustomButtonStyle } from "../../../styles/muiRoot";
import {
  useGetLearnPackageDetailQuery,
  useUpdatePackageMutation,
} from "../../../services/apis/learnApi";
import { useParams } from "react-router-dom";
import Icon from "../../common/Icon";
import { Empty, message } from "antd";
import { packageSchema } from "../../../services/utilities/formSchemas";

function PackageDetailCommon({ apiUrl, headCells, title, tableData }) {
  const params = useParams();
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    list: [],
    title: "",
    description: "",
  });

  const {
    data: getDetails,
    isLoading,
    isError,
  } = useGetLearnPackageDetailQuery(`${apiUrl}/detail/${params.packageId}`, {
    refetchOnMountOrArgChange: true,
  });

  const [updatePackage, { isLoading: updateLoading, isError: updateError }] =
    useUpdatePackageMutation(`${apiUrl}/${params.packageId}`);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (getDetails) {
      setValues({
        ...values,
        title: getDetails.data.packageData.title,
        description: getDetails.data.packageData.description,
        list: getDetails.data.packageData.list,
      });
    }
  }, [getDetails]);

  const handleUpdate = async () => {
    const checkValidation = packageSchema(values, title);
    if (Object.keys(checkValidation).length > 0) {
      setErrors(checkValidation);
      if (Object.keys(checkValidation).length === 1 && checkValidation.list) {
        message.error("Add Some topic");
      }
      return;
    }

    try {
      const response = await updatePackage({
        endpoint: `${apiUrl}/update/${params.packageId}`,
        updatedData: values,
      });
      // Navigate to the desired path after successful deletion
      console.log("Response:", response);

      if (response && response?.data?.success) {
        message.success("Package Edit successfully!", 2.5);
        setEdit(false);
        // navigate(redirectUrl);
      } else {
        message.error("Some error occured to edit package!", 2.5);
        console.error("Error edit package. Response:", response);
      }
    } catch (error) {
      console.error("Error edit package:", error);
    }
  };

  if (isError) {
    return (
      <div>
        <HeaderWithNavigation cont={"Package Details"} />
        <div className="bg-lightGrey h-[90vh] flex justify-center items-center ">
          <Empty
            description={
              <span className="text-base font-normal font-inter ">
                Some error occcured to fetch Details
              </span>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <HeaderWithNavigation cont={"Package Details"} />

      <div className="bg-lightGrey h-[98%] overflow-scroll scroll-smooth pt-0 ">
        <Stack
          direction="row"
          spacing={3}
          alignSelf={"flex-end"}
          justifyContent={"flex-end"}
          m={1.5}
        >
          <Button
            sx={{
              color: "#455564",
              fontFamily: "var(--inter)",
              fontSize: "14px",
              bgcolor: edit && "var(--med-grey)",
              fontWeight: edit && "bold",
            }}
            onClick={() => setEdit(!edit)}
            startIcon={<Icon name="FileEdit" color="#336792" size={20} />}
          >
            Edit
          </Button>
          <Button
            sx={{
              color: "#455564",
              fontFamily: "var(--inter)",
              fontSize: "14px",
            }}
            startIcon={<Icon name="Files" color="#336792" size={20} />}
            // onClick={handleDuplicate}
          >
            Duplicate
          </Button>
          <Button
            sx={{
              color: "#455564",
              fontFamily: "var(--inter)",
              fontSize: "14px",
            }}
            startIcon={<Icon name="Upload" color="#336792" size={20} />}
          >
            Unpublish
          </Button>
        </Stack>
        <Divider />

        <div className="flex flex-col gap-3 justify-start items-start p-5">
          <Box
            component="form"
            display={"flex"}
            gap={3}
            width={"100%"}
            autoComplete="off"
          >
            <BootstrapTextField
              name="title"
              label="Title"
              value={values.title}
              onChange={handleChange}
              readOnly={!edit && true}
              error={errors?.title}
              helperText={errors?.title}
            />
            <BootstrapTextField
              name="description"
              label="Description"
              value={values.description}
              onChange={handleChange}
              readOnly={!edit && true}
              error={errors?.description}
              helperText={errors?.description}
            />
          </Box>
          <div className="w-full h-[63vh] overflow-scroll">
            <h6 className="font-inter font-medium text-gray-700">
              Add {title}
            </h6>
            {edit ? (
              <>
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
              </>
            ) : (
              <PaginationTable
                data={values.list || []}
                columns={headCells}
                loading={isLoading}
              />
            )}
          </div>
        </div>

        {edit && (
          <CustomButton
            onClick={handleUpdate}
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
            Save Chnanges
          </CustomButton>
        )}
      </div>
    </>
  );
}

export default PackageDetailCommon;
