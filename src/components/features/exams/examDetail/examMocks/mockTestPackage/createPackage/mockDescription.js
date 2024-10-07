import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  InputLabel,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

import {
  HTMLConverter,
  createHandleChange,
} from "../../../../../../../services/common";
import BootstrapTextField from "../../../../../../common/bootstrapTextField";
import DatePickerComp from "../../../../../../common/datePicker";
import { useNavigate, useParams } from "react-router-dom";

import { IndianRupee } from "lucide-react";
import PreviewCommon from "./previewCommon";
import QuillEditor from "../../../../../../common/textEditor";
import { useDispatch } from "react-redux";
import {
  setErrors,
  setMockDescription,
  setView,
} from "../../../../../../../ducks/mockPackageSlice";
import { useSelector } from "react-redux";
import { CustomButton, CustomButtonStyle } from "../../../../../../../styles/muiRoot";
import { toast } from "react-toastify";
const MockDescription = () => {
  const { mockDescription, mockDetails, errorStatus,activeView } = useSelector(
    (state) => state.mockPackage
  );
  const [value, setvalue] = useState(mockDescription);
  const latestValues = useRef(value);
  const dispatch = useDispatch();


  console.log("date", new Date("2023-11-16T18:30:00.000Z"));

  useEffect(() => {
    return () => {
      console.log("dispatchval", latestValues.current);
      // Dispatch the values to your Redux store when unmounting
      if (latestValues.current === "") {
        dispatch(
          setErrors({
            ...errorStatus,
            description: "Please enter the description",
          })
        );
      }
      dispatch(setMockDescription(latestValues.current));
    };
  }, []);

  useEffect(() => {
    latestValues.current = value;
  }, [value]);

  // Use useEffect with empty dependency array for cleanup

  return (
    <>
    <div className="flex gap-5 h-full">
      <div className="bg-white basis-[70%] p-2 flex ">
        <div className="w-full h-full">
          <QuillEditor setValue={setvalue} value={value} />
          
        </div>
      </div>
      <div className="bg-medGrey rounded-md basis-[30%] p-2 ">
        <PreviewCommon>
          <HTMLConverter>{value}</HTMLConverter>
        </PreviewCommon>
      </div>
    
    </div>
    <CustomButton
        style={{ ...CustomButtonStyle, float: "right" ,position:"absolute", right:15, bottom:30}}
          onClick={()=>{
            if(value ==="<p><br></p>" || value === ""){
              toast.error("Please enter the description")
              return
            }
            dispatch(setMockDescription(value));
            dispatch(setView(activeView+1))
          }}
      >
        Save & continue
      </CustomButton>
      </>
  );
};

export default MockDescription;
