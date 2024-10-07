import React, { useEffect, useRef, useState } from "react";
import { HTMLConverter } from "../../../../../services/common";
import PreviewCommon from "./previewCommon";
import QuillEditor from "../../../../common/textEditor";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton, CustomButtonStyle } from "../../../../../styles/muiRoot";
import { toast } from "react-toastify";
import {
  setWhyIquanta,
  setErrors,
  setActiveView,
} from "../../../../../ducks/exams/courseSlice";

const WhyIquanta = () => {
  const { whyIquanta, errorStatus } = useSelector((state) => state.courses);
  const [value, setvalue] = useState(whyIquanta);
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
            whyIquata: "Please enter the some text i iquanta",
          })
        );
      }
      dispatch(setWhyIquanta(latestValues.current));
    };
  }, []);

  useEffect(() => {
    latestValues.current = value;
  }, [value]);

  return (
    <div className=" p-2 relative">
      <div className="flex gap-5  h-[calc(100vh-10vh)] ">
        <div className="bg-white basis-[70%] p-2 flex overflow-scroll h-[calc(100%-7%)] scrollbar-hide">
          <div className="w-full h-full">
            <QuillEditor setValue={setvalue} value={value} />
          </div>
        </div>
        <div className="bg-medGrey rounded-md basis-[30%] p-2  h-[calc(100%-7%)] scrollbar-hide">
          <PreviewCommon>
            <HTMLConverter>{value}</HTMLConverter>
          </PreviewCommon>
        </div>
      </div>
      <CustomButton
        style={{
          ...CustomButtonStyle,
          position: "absolute",
          right: 15,
          bottom: 10,
        }}
        onClick={() => {
          if (value === "<p><br></p>" || value === "") {
            toast.error("Please enter the Some text for why iquanta");
            return;
          }
          dispatch(setWhyIquanta(value));
          dispatch(setActiveView("structure"));
        }}
      >
        Save & continue
      </CustomButton>
    </div>
  );
};

export default WhyIquanta;
