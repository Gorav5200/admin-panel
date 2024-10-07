import React, { useState } from "react";
import PreviewCommon from "./previewCommon";
import { Box, Card } from "@mui/material";
import SingleImageUpload from "../../../../../common/singleImageUpload";
import { HTMLConverter } from "../../../../../../services/common";
import {
  CustomButton,
  CustomButtonStyle,
} from "../../../../../../styles/muiRoot";
import QuillEditor from "../../../../../common/textEditor";
import { setActiveView, setEligibility } from "../../../../../../ducks/exams/specificationSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Eligibility() {
  const dispatch = useDispatch();
  const {createSpecificaton} = useSelector(state =>state.examSpecification);
  const [description, setDescription] = useState(createSpecificaton.eligibility|| "");
  const handleContinue = async () => {

    try {
      await dispatch(setEligibility(description));
      dispatch(setActiveView(3))
      console.log("Dispatch successful");

      // Perform additional actions here
    } catch (error) {
      // Code to execute if dispatch fails
      console.error("Dispatch failed with error:", error);

      // Handle the error if needed
    }
  };
  return (
    <>
      <div className="flex gap-5 h-full ">
        <div className="bg-white basis-[70%]">
          <h5 className="text-primary text-base font-bold font-inder p-2 bg-medGrey">
          Eligibility & Fees
          </h5>
          <div className="p-2">
          <QuillEditor
              setValue={(val) => setDescription(val)}
              value={description}
            />
          </div>
        </div>
        <div className="bg-medGrey  basis-[30%] px-2">
          <PreviewCommon>
            <div className="rounded-md ">
              
              <h5 className="font-bold  text-base my-1">Eligibility & Fees</h5>
              <HTMLConverter>{description}</HTMLConverter>


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
}

export default Eligibility;
