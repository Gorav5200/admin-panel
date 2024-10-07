import React, { useState } from "react";
import { HeaderWithNavigation } from "../../common/header";
import { Link, json, useLocation, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Stack,
  Button,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import Icon from "../../common/Icon";
import CustomDatePicker from "../../common/datePicker";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../styles/muiRoot";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import ImageUploader from "../../common/imageUploader";
import {
  useAddUserMutation,
  useUpdateUserMutation,
} from "../../../services/apis/users";
import { usersApi } from "../../../services/Constant";
import { createHandleChange } from "../../../services/common";
import { validationSchema } from "../../../services/utilities/commonForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGetListDataQuery } from "../../../services/apis/exam/questionBank";
import SingleSelect, {
  MultipleSelect,
  MultiSelectOutlined,
} from "../../common/selectFields";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { MultipleSelectChipComp } from "../../common/selectChipComp";
import SingleImageUpload from "../../common/singleImageUpload";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { roleEnumArray } from "../../../services/utilities/enums";

function AddUser() {
  const [addUser, { isLoading, isError, isFetching }] = useAddUserMutation();
  const [updateUser, { isLoading: updateLoad, isError: updateError }] =
    useUpdateUserMutation();

  const initialState = useSelector((state) => state.users);
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.pathname.includes("edit");
  const params = useParams();
  const [values, setValues] = useState(initialState.userDetail);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const schema = validationSchema[name];
    if (!schema || !schema.validator) {
      console.error(`Validator not found for field: ${name}`);
      return;
    }

    const isValid = schema.validator(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isValid ? "" : schema.message,
    }));
  };

  console.log("valoue of user", values);
  const handleChange = createHandleChange(values, setValues, validateField);

  const {
    data: listsData,
    isLoading: listLoading,
    isError: listError,
    isFetching: listFetching,
    isSuccess: listSuccess,
  } = useGetListDataQuery(
    `exams/v1/entity`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const dataManuplation = () => {
    const { exam, languages, ...others } = values;
    const filterObjects = listsData?.data.subject?.reduce((acc, obj) => {
      if (exam.includes(obj._id)) {
        acc.push({ title: obj.title, _id: obj._id });
      }
      return acc;
    }, []);

    const languagesArray = languages?.split(",")?.map((lang) => lang.trim());

    return { ...others, exam: filterObjects, languages: languagesArray };
  };

  
  console.log("🚀 ~ dataManuplation ~ dataManuplation:", dataManuplation());

  const handleCreate = async (e) => {
    const newErrors = {};
    for (const field in values) {
      validateField(field, values[field]);
      if (errors[field]) {
        newErrors[field] = errors[field];
        console.log("eroror of field", newErrors[field]);
      }
    }

    console.log(newErrors, "new errors");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await addUser({
          endpoint: usersApi.endPoint, // Make sure you have defined usersApi.endPoint
          newUser: await dataManuplation(), // Assuming values is the new user data
        });
        console.log("Response:", response); // Log the response

        if (response && response.data?.success) {
          toast.success("User Add  Sucessfully", {
            onOpen: () => {
              navigate("/main/user");
            },
          });
        } else {
          toast.error("Some error occurred, form not submitted.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const handleUpdate = async (e) => {
    const newErrors = {};
    for (const field in values) {
      validateField(field, values[field]);
      if (errors[field]) {
        newErrors[field] = errors[field];
        console.log("eroror of field", newErrors[field]);
      }
    }

    console.log(newErrors, "new errors");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await updateUser({
          endpoint: `${usersApi.endPoint}/${params.uid}`, // Make sure you have defined usersApi.endPoint
          updatedData: await dataManuplation(), // Assuming values is the new user data
        });
        console.log("Response:", response); // Log the response

        if (response && response.data?.success) {
          toast.success("User Update  Sucessfully", {
            onOpen: () => {
              navigate(`/main/user/detail/${params.uid}`);
            },
          });
        } else {
          toast.error("Some error occurred, form not submitted.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  console.log(errors, "errorroroor");

  return (
    <>
      <div className="h-screen  font-inter text-sm ">
        <HeaderWithNavigation cont={isEdit ? "Edit User" : "Add User"} />
        <div className=" profile-view flex flex-row h-5/6 gap-7 bg-white m-3   p-4 rounded-md overflow-scroll">
          <div className="m-2 p-2">
            <SingleImageUpload
              endpoint={`${usersApi.endPoint}/image/upload`}
              setData={(val) => setValues({ ...values, profilePic: val })}
              data={values.profilePic}
            />
          </div>
          <div className=" w-4/6 ">
            <h5 className="text-xl font-inter font-bold">
              Profile Information{" "}
            </h5>
            <div className="flex flex-col gap-4 w-full mt-3 ">
              <div className="flex  align-center gap-14 w-full">
                <div className="w-full">
                  <label htmlFor="name" className="text-sm font-[500] pl-1 ">
                    Name
                  </label>

                  <TextField
                    size="small"
                    margin="dense"
                    required
                    id="outlined-multiline-static"
                    placeholder="Enter here"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth // Makes the text area take up the full width of its container
                    helperText={errors.name}
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="email" className="text-sm font-[500] pl-1 ">
                    Email
                  </label>

                  <TextField
                    size="small"
                    margin="dense"
                    id="outlined-multiline-static"
                    placeholder="someone@mail.com"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    type="email"
                    variant="outlined"
                    error={errors?.email && true}
                    fullWidth // Makes the text area take up the full width of its container
                    required
                    helperText={errors.email}
                  />
                </div>
              </div>
              {/* phone or dob */}
              <div className="flex  align-center gap-14 w-full">
                <div className="w-full">
                  <label htmlFor="phone" className="text-sm font-[500] pl-1 ">
                    Phone
                  </label>

                  <TextField
                    size="small"
                    id="outlined-multiline-static"
                    placeholder="10 characters"
                    name="phone"
                    value={values.phone}
                    onChange={(e) => {
                      let inputVal = e.target.value.slice(0, 10);
                      handleChange({
                        target: { name: "phone", value: inputVal },
                      });
                    }}
                    margin="dense"
                    variant="outlined"
                    type="number"
                    required
                    fullWidth // Makes the text area take up the full width of its container
                    helperText={errors.phone}
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="date of birth"
                    className="text-sm font-[600] "
                  >
                    Date of Birth
                  </label>

                  <div className="mt-2">
                    <CustomDatePicker
                      DynamicName={"dob"}
                      setData={(val) =>
                        setValues({
                          ...values,
                          dob: dayjs(val).format("DD-MM-YYYY"),
                        })
                      }
                      data={values.dob && dayjs().utc(values.dob)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
              {/* Age or gender */}
              <div className="flex  align-center gap-14 w-full">
                {/* <div className="w-full">
                  <label htmlFor="age" className="text-sm font-[500] pl-1 ">
                    Age
                  </label>

                  <TextField
                    size="small"
                    id="outlined-multiline-static"
                    placeholder="Enter here"
                    name="age"
                    value={values.age}
                    onChange={(e) => {
                      let inputVal = e.target.value.slice(0, 3);
                      handleChange({
                        target: { name: "age", value: inputVal },
                      });
                    }}
                    margin="dense"
                    variant="outlined"
                    type="number"
                    fullWidth // Makes the text area take up the full width of its container
                  />
                </div> */}

                <div className="w-full flex flex-col ">
                  <label
                    htmlFor="date of birth"
                    className="text-sm font-[600] mb-2"
                  >
                    Exam
                  </label>

                  <MultipleSelect
                    size="small"
                    data={listsData?.data}
                    loading={listLoading || listFetching}
                    isSuccess={listSuccess}
                    error={listError}
                    style={{ width: "100% ", ml: 0 }}
                    placeholder="Select Exam"
                    setValue={(val) =>
                      handleChange({
                        target: {
                          name: "exam",
                          value: val,
                        },
                      })
                    }
                    value={values.exam}
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="gender" className="text-sm font-[600]">
                    Gender
                  </label>
                  <FormControl sx={{ mt: 1, width: "100%" }}>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={values.gender}
                      size="small"
                      onChange={handleChange}
                      fullWidth
                      name="gender"
                      margin="normal"
                    >
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"female"}>Female</MenuItem>
                      <MenuItem value={"transgender"}>Trans-Gender</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="flex  align-center gap-14 w-full">
                <div className="w-full">
                  <label
                    htmlFor="languages"
                    className="text-sm font-[500] pl-1 "
                  >
                    Languages
                  </label>

                  <TextField
                    size="small"
                    id="outlined-multiline-static"
                    placeholder="Enter here"
                    name="languages"
                    value={values.languages}
                    onChange={handleChange}
                    margin="dense"
                    variant="outlined"
                    type="string"
                    fullWidth // Makes the text area take up the full width of its container
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="designation"
                    className="text-sm font-[500] pl-1"
                  >
                    Roles
                  </label>
                  <MultipleSelectChipComp
                    style={{ width: "100%", ml: "0px" }}
                    value={values.roles}
                    data={roleEnumArray}
                    loading={false}
                    error={false}
                    handleChange={(val) =>
                      handleChange({ target: { name: "roles", value: val } })
                    }
                  />
                </div>
              </div>
              {/* Exams */}
            </div>
            {/* Button */}
            <Stack direction="row" spacing={3} mt={3} sx={{ float: "right" }}>
              <CustomButton
                variant="outlined"
                onClick={() => navigate(-1)}
                style={{
                  ...ButtonStyle,
                  width: 178,
                  height: 46,
                  borderRadius: 5,
                }}
              >
                Cancel
              </CustomButton>
              <CustomButton
                variant="filled"
                disabled={isLoading || updateLoad}
                style={{ ...CustomButtonStyle }}
                onClick={() => (isEdit ? handleUpdate() : handleCreate())}
              >
                {isLoading || updateLoad ? (
                  <CircularProgress color="inherit" size={18} />
                ) : isEdit ? (
                  "Save Changes"
                ) : (
                  "Add User"
                )}
              </CustomButton>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddUser;
