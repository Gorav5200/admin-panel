import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  InputLabel,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Card,
  CardContent,
  Chip,
  FormHelperText,
  Collapse,
  Select,
  MenuItem,
} from "@mui/material";

import BootstrapTextField from "../../../../common/bootstrapTextField";
import DatePickerComp from "../../../../common/datePicker";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IndianRupee, Percent } from "lucide-react";
import PreviewCommon from "./previewCommon";
import { useDispatch, useSelector } from "react-redux";
import QuillEditor from "../../../../common/textEditor";
import SingleImageUpload from "../../../../common/singleImageUpload";
import { CustomButton, CustomButtonStyle } from "../../../../../styles/muiRoot";
import { HTMLConverter } from "../../../../../services/common";
import {
  setCourseDetail,
  setActiveView,
  setErrors,
} from "../../../../../ducks/exams/courseSlice";
import { Empty } from "antd";
import { courseApi } from "../../../../../services/Constant";
const CreateDetail = () => {
  const params = useParams();
  console.log("🚀 ~ CreateDetail ~ params:", params);
  const dispatch = useDispatch();
  const { courseDetail, errorStatus } = useSelector(
    (state) => state.courses
  );

  const { entity } = useSelector((state) => state.entity);
  const [values, setValues] = useState(courseDetail);

  
  const latestValues = useRef(values);

  const validationSchema = () => {
    const errors = {};

    //title  validation
    if (!values.title || values.title === "") {
      errors.title = "Course Name is required";
    }

    //Price validation
    if (isNaN(values.price) || values.price < 0) {
      errors.price = "Package Price must be a non-negative number";
    } else if (values.price === "") {
      errors.price = "Price is required";
    }

    // Start Date validation
    if (values.startDate === null || values.startDate === undefined) {
      errors.startDate = "Start Date is required";
    }

    // End Date validation
    if (values.endDate === (null || undefined)) {
      errors.endDate = "End Date is required";
    }

    // Highlights validation
    if (
      !values.highlights ||
      values.highlights === "<p><br></p>" ||
      values.highlights === ""
    ) {
      errors.highlights = "Highlights are required";
    }

    dispatch(setErrors(errors));
    return errors;
  };

  const handleContinue = async () => {
    const res = validationSchema();
    console.log("eeesss", res);
    if (Object.keys(res).length === 0) {
      dispatch(setCourseDetail(latestValues.current));
      dispatch(setActiveView("description"));
    } else {
      return;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });

    removeError([name]);
  };

  const removeError = (name) => {
    if (errorStatus.hasOwnProperty([name])) {
      const { [name]: removedError, ...otherErrors } = errorStatus;
      dispatch(setErrors(otherErrors));
    }
  };

  // console.log("form erorr", errorStatus);

  useEffect(() => {
    latestValues.current = values;
  }, [values]);

  useEffect(() => {
    return () => {
      dispatch(setCourseDetail(latestValues.current));
    };
  }, []);

  const getEntityList = useMemo(() => {
    const activeEntity = params.entityId;
    setValues((prev) => ({ ...prev, entity: activeEntity }));
    const data = entity.find((e) => e._id === activeEntity)?.entityType;
    return data?.filter((e) => !e.hasOwnProperty("accordian")) || [];
  }, [params]);


  
  console.log("🚀 ~ CreateDetail ~ values:", values,getEntityList);
  return (
    <>
      <div className="flex gap-5 h-full p-2">
        <div className="bg-white basis-[70%] p-2 flex h-[calc(100vh-18vh)] overflow-scroll scrollbar-hide ">
          <Box
            component="form"
            sx={{
              width: "100%",
              flexBasis: "60%",
              "& > :not(style)": {
                my: 3,
                display: "flex",
                flexDirection: "column",
              },
            }}
            noValidate
            autoComplete="off"
          >
            {/* package Name */}
            <div>
              <BootstrapTextField
                label="Course Name"
                placeholder="Enter here..."
                size="small"
                onChange={handleChange}
                name="title"
                value={values.title}
                error={errorStatus?.title && true}
              />
              <small className="text-red-700 ">{errorStatus?.title}</small>
            </div>

            <div className="entity">
              <InputLabel
                shrink
                htmlFor="entity"
                sx={{
                  fontSize: 20,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  color: "#455564",
                }}
              >
                Select Entity
              </InputLabel>

              <FormControl sx={{ width: "100%" }}>
                <Select
                  labelId="demo-simple-select-label"
                  size="small"
                  id="demo-simple-select"
                  placeholder="Select Entity"
                  name="entity"
                  readOnly
                  disabled
                  defaultValue={values.entity}
                >
                  {!entity ? (
                    <MenuItem value="" disabled>
                      Error loading Entity
                    </MenuItem>
                  ) : entity?.length === 0 ? (
                    <MenuItem value="" disabled>
                      <Empty className="mx-auto" />
                    </MenuItem>
                  ) : Array.isArray(entity) ? (
                    entity?.map((e, ind) => (
                      <MenuItem key={e._id} value={e._id}>
                        {e.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No Entity available
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>

            <div className="entityTypes">
              <InputLabel
                shrink
                htmlFor="entityTypes"
                sx={{
                  fontSize: 20,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  color: "#455564",
                }}
              >
                Entity Types
              </InputLabel>

              <FormControl sx={{ width: "100%" }}>
                <Select
                  labelId="demo-simple-select-label"
                  size="small"
                  id="demo-simple-select"
                  placeholder="Select Entity"
                  name="entityTypes"
                  value={values.entityTypes}
                  multiple
                  // error={errors.teacher ? true : false}
                  // helperText={errors.teacher}
                  onChange={handleChange}
                >
                  {!getEntityList ? (
                    <MenuItem value="" disabled>
                      Please select first Entity
                    </MenuItem>
                  ) : getEntityList?.length === 0 ? (
                    <MenuItem value="" disabled>
                      <Empty className="mx-auto" />
                    </MenuItem>
                  ) : Array.isArray(getEntityList) ? (
                    getEntityList?.map((e, ind) => (
                      <MenuItem key={e._id} value={e._id}>
                        {e.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No Entity available
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>

            <div className="courseType w-full">
              <InputLabel
                shrink
                htmlFor="courseType"
                sx={{
                  fontSize: 20,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  color: "#455564",
                }}
              >
                Select Course Type
              </InputLabel>

              {/* Subject or topic field */}

              <FormControl sx={{ width: "100%" }}>
                <Select
                  labelId="demo-simple-select-label"
                  size="small"
                  multiple
                  id="demo-simple-select"
                  placeholder="Select courseType"
                  name="courseType"
                  value={values.courseType || []}
                  onChange={handleChange}
                >
                  {[
                    { title: "Crash Course", _id: "crashCourse" },
                    { title: "Full Course", _id: "fullCourse" },
                    { title: "Study Material", _id: "studyMaterial" },
                    { title: "Book", _id: "book" },
                  ].map((e) => (
                    <MenuItem key={e._id} value={e._id}>
                      {e.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {/* Course Price */}
            <div>
              <InputLabel
                htmlFor="outlined-adornment-amount"
                shrink
                sx={{
                  fontSize: 20,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  color: "#455564",
                }}
              >
                Course Price
              </InputLabel>
              <FormControl
                fullWidth
                sx={{ width: "100%", mt: 0 }}
                variant="outlined"
              >
                <OutlinedInput
                  id="outlined-adornment-amount"
                  size="small"
                  name="price"
                  value={values.price}
                  type="number"
                  error={errorStatus?.price && true}
                  startAdornment={
                    <InputAdornment position="start">
                      <IndianRupee size={15} />
                    </InputAdornment>
                  }
                  onChange={handleChange}
                />
              </FormControl>
              <small className="text-red-700">{errorStatus?.price}</small>
            </div>
            {/* tax precentage */}
            <div>
              <InputLabel
                htmlFor="outlined-adornment-amount"
                shrink
                sx={{
                  fontSize: 20,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  color: "#455564",
                }}
              >
                Tax Precentage
              </InputLabel>
              <FormControl
                fullWidth
                sx={{ width: "100%", mt: 0 }}
                variant="outlined"
              >
                <OutlinedInput
                  disabled={!values.price}
                  id="outlined-adornment-amount"
                  size="small"
                  name="taxPercentage"
                  sx={{ pr: 0.5 }}
                  value={values.taxPercentage}
                  defaultValue={0}
                  type="number"
                  error={errorStatus?.taxPercentage && true}
                  startAdornment={
                    <InputAdornment position="start">
                      <Percent size={15} />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end" sx={{ p: 0 }}>
                      <Chip
                        label={`Rs. ${
                          (values?.taxPercentage / 100) * values.price
                        }`}
                        sx={{ borderRadius: 1, width: 100 }}
                      />
                    </InputAdornment>
                  }
                  onChange={(e) => {
                    const { name, value } = e.target;
                    let newValue = value;
                    if (!isNaN(value) && value > 30) {
                      return;
                    }
                    if (!isNaN(value) && value.length <= 2) {
                      newValue = parseFloat(value);
                    } else {
                      newValue = value.slice(0, 2);
                    }
                    handleChange({
                      target: {
                        name: name,
                        value: newValue,
                      },
                    });
                  }}
                />

                <FormHelperText info sx={{ ml: 0 }}>
                  Tax Percentage should be smaller or equal than 30%
                </FormHelperText>
              </FormControl>
            </div>
            {/* Start date */}
            <div className="startDate">
              <InputLabel
                shrink
                htmlFor="startDate"
                sx={{
                  fontSize: 20,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  color: "#455564",
                }}
              >
                Start Date
              </InputLabel>

              {/* Subject or topic field */}

              <DatePickerComp
                style={{ height: 10, width: "100%" }}
                size="small"
                data={values.startDate}
                error={true}
                setData={(val) => {
                  setValues({ ...values, startDate: val });
                  removeError("startDate");
                }}
                name="startDate"
              />
              <small className="text-red-700 mt-9">
                {errorStatus?.startDate}
              </small>
            </div>
            {/* End date */}
            <div className="endDate">
              <InputLabel
                shrink
                htmlFor="endDate"
                sx={{
                  fontSize: 20,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  // mt: 1,

                  color: "#455564",
                }}
              >
                End Date
              </InputLabel>

              {/* Subject or topic field */}

              <DatePickerComp
                style={{ height: 10, width: "100%" }}
                size="small"
                data={values?.endDate}
                onChange={handleChange}
                setData={(val) => {
                  setValues({ ...values, endDate: val });
                  removeError("endDate");
                }}
                name="endDate"
              />
              <small className="text-red-700 mt-9">
                {errorStatus?.endDate}
              </small>
            </div>

            <div>
              <InputLabel
                shrink
                htmlFor="highlight"
                sx={{
                  fontSize: 20,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,

                  color: "#455564",
                }}
              >
                Highlights
              </InputLabel>
              <QuillEditor
                name="highlights"
                setValue={(val) => {
                  setValues({ ...values, highlights: val });
                  removeError("highlights");
                }}
                value={
                  Array.isArray(values.highlights)
                    ? { ...values.highlights }
                    : values.highlights
                }
              />
              <small className="text-red-700">{errorStatus?.highlights}</small>
            </div>
          </Box>

          <div className="flex justify-center basis-[40%] ">
            <div className=" text-center p-3">
              <SingleImageUpload
                endpoint={`${courseApi.endPoint}/basic/upload/image`}
                setData={(val) => setValues({ ...values, image: val })}
                data={values.image}
              />
            </div>
          </div>
        </div>
        <div className="bg-medGrey rounded-md basis-[30%] p-2   h-[calc(100vh-18vh)] overflow-scroll ">
          <PreviewCommon>
            <div className="p-2 bg-[#336792] rounded-md text-white">
              <img
                src={values.image || "/backgroundImages/previewHeader.png"}
                className="w-full object-contain max-h-28  "
              />
              <h5 className="font-bold  text-sm my-2">{values.title}</h5>
              <HTMLConverter>{values.highlights}</HTMLConverter>

              <Card
                sx={{
                  backgroundColor: "#000000B8",
                  color: "white",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1,
                  fontWeight: "700",
                }}
              >
                <div className="flex gap-1 items-center">
                  <IndianRupee size={15} />
                  {values.price && parseFloat(values.price).toLocaleString()}
                </div>

                <p>More Details</p>
              </Card>
            </div>
          </PreviewCommon>
        </div>
      </div>
      <CustomButton
        style={{
          ...CustomButtonStyle,
          float: "right",
          position: "absolute",
          right: 25,
          bottom: 30,
        }}
        onClick={handleContinue}
      >
        Save & continue
      </CustomButton>
    </>
  );
};

export default CreateDetail;
