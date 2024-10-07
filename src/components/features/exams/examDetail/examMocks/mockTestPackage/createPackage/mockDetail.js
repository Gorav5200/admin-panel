import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  InputLabel,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Card,
  CardContent,
  Collapse,
  Chip,
  FormHelperText,
} from "@mui/material";

import BootstrapTextField from "../../../../../../common/bootstrapTextField";
import DatePickerComp from "../../../../../../common/datePicker";
import { useNavigate, useParams } from "react-router-dom";
import {
  setMockDetails,
  setErrors,
  setView,
} from "../../../../../../../ducks/mockPackageSlice";
import { IndianRupee, Percent } from "lucide-react";
import PreviewCommon from "./previewCommon";
import ImageUploader from "../../../../../../common/imageUploader";
import { useDispatch, useSelector } from "react-redux";
import QuillEditor from "../../../../../../common/textEditor";
import PaidEditor from "../../../../../../common/paidEditor";
import SingleImageUpload from "../../../../../../common/singleImageUpload";
import { CustomButton, CustomButtonStyle } from "../../../../../../../styles/muiRoot";
import { HTMLConverter } from "../../../../../../../services/common";
import { mocksApi } from "../../../../../../../services/Constant";

const MockDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { mockDetails, errorStatus,activeView } = useSelector(
    (state) => state.mockPackage
  );
  const [values, setValues] = useState(mockDetails);


  const latestValues = useRef(values);

  const validationSchema = () => {
    const errors = {};

    //title  validation
     if (values.title.trim() === "") {
      errors.title = "Package Name is required";
     
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
     if (values.expiryDate === (null || undefined)) {
      errors.expiryDate = "End Date is required";
        
    }

    // Highlights validation
     if (values.highlights === "<p><br></p>" || values.highlights === "") {
      errors.highlights = "Highlights are required";
        
    }

    dispatch(setErrors(errors))
    return errors;
  };


  console.log("uhijok", values)
  const handleContinue=async()=>{
   

    const res = await validationSchema()
    console.log("eeesss",res)
    if(Object.keys(res).length === 0){
      dispatch(setMockDetails(latestValues.current));
      dispatch(setView(activeView+1))
    }
    else{
      return
    }
  }


  const handleChange = (event) => {
    const { name, value } = event.target;
   
    setValues({
      ...values,
      [name]: value,
    });
    
  removeError([name])

  
  };

  const removeError=(name)=>{
    if(errorStatus.hasOwnProperty([name])){
      const { [name]: removedError, ...otherErrors } = errorStatus;
      dispatch(setErrors(otherErrors));
    }
  }

  // console.log("form erorr", errorStatus);

  useEffect(() => {
    latestValues.current = values;
  }, [values]);

  // Dispatch the values to your Redux store or check validations, when unmounting
  useEffect(() => {
    return () => {
      // validateForm();

      dispatch(setMockDetails(latestValues.current));
    };
  }, []);

  console.log("values========>54", values);
  return (
    <>
      <div className="flex gap-5 h-full">
        <div className="bg-white basis-[70%] p-2 flex scroll-smooth">
          <Box
            component="form"
            className="scrollbar-hide"
            sx={{
              width: "100%",
              flexBasis: "60%",
              "& > :not(style)": {
                my: 3,
                display: "flex",
                flexDirection: "column",
              },

              overflow: "scroll",
            }}
            noValidate
            autoComplete="off"
          >
            {/* package Name */}
            <div>
              <BootstrapTextField
                label="Package Name"
                placeholder="Enter here..."
                size="small"
                onChange={handleChange}
                name="title"
                value={values.title}
                error={errorStatus?.title && true}
              />
              <small className="text-red-700 ">{errorStatus?.title}</small>
            </div>

            {/* Package Price */}
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
                Package Price
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

            <div className="expiryDate">
              <InputLabel
                shrink
                htmlFor="expiryDate"
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
                data={values?.expiryDate}
                onChange={handleChange}
                setData={(val) => {
                  setValues({ ...values, expiryDate: val });
                  removeError("expiryDate");
                }}
                name="expiryDate"
              />
              <small className="text-red-700 mt-9">
                {errorStatus?.expiryDate}
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
              <small className="text-red-700">{errorStatus.highlights}</small>
            </div>
          </Box>

          <div className="flex justify-center basis-[40%] overflow-hidden ">
            <div className=" text-center p-3">
              <SingleImageUpload
                setData={(val) => setValues({ ...values, profile: val })}
                data={values.profile}
                endpoint={`${mocksApi.endPoint}/image`}
              />
            </div>
          </div>
        </div>
        <div className="bg-medGrey rounded-md basis-[30%] p-2 overflow-hidden ">
          <PreviewCommon>
            <div className="p-2 bg-[#336792] rounded-md text-white">
              <img
                src={values.profile || "/backgroundImages/previewHeader.png"}
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
          right: 15,
          bottom: 30,
        }}
        onClick={handleContinue}
      >
        Save & continue
      </CustomButton>
    </>
  );
};

export default MockDetails;
