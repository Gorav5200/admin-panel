import React, { useEffect, useRef, useState } from "react";

import { HTMLConverter } from "../../../../../services/common";

import PreviewCommon from "./previewCommon";
import QuillEditor from "../../../../common/textEditor";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { CustomButton, CustomButtonStyle } from "../../../../../styles/muiRoot";
import { toast } from "react-toastify";
import {
  setCourseDescription,
  setActiveView,
  setErrors,
} from "../../../../../ducks/exams/courseSlice";

const CreateDescription = () => {
  const { courseDescription, errorStatus, activeView } = useSelector(
    (state) => state.courses
  );
  const [value, setvalue] = useState(courseDescription);
  const latestValues = useRef(value);
  const dispatch = useDispatch();

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
      dispatch(setCourseDescription(latestValues.current));
    };
  }, []);

  useEffect(() => {
    latestValues.current = value;
  }, [value]);

  // Use useEffect with empty dependency array for cleanup

  return (
    <>
      <div className="flex gap-5  h-[88vh]">
        <div className="bg-white basis-[70%] p-2 flex  h-[calc(100%-5%)] overflow-scroll scrollbar-hide">
          <div className="w-full h-full">
            <QuillEditor setValue={setvalue} value={value} />
          </div>
        </div>
        <div className="bg-medGrey rounded-md basis-[30%] p-2  h-[calc(100%-5%)] ">
          <PreviewCommon>
            <HTMLConverter>{value}</HTMLConverter>
          </PreviewCommon>
        </div>
      </div>
      <CustomButton
        style={{
          ...CustomButtonStyle,
          float: "right",
          position: "absolute",
          right: 20,
          bottom: 30,
        }}
        onClick={() => {
          if (value === "<p><br></p>" || value === "") {
            toast.error("Please enter the description");
            return;
          }
          dispatch(setCourseDescription(value));
          dispatch(setActiveView("modules"));
        }}
      >
        Save & continue
      </CustomButton>
    </>
  );
};

export default CreateDescription;
