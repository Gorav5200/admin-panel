import React, { useState } from "react";
import PreviewCommon from "./previewCommon";
import { HTMLConverter } from "../../../../../../services/common";
import {
  CustomButton,
  CustomButtonStyle,
} from "../../../../../../styles/muiRoot";
import QuillEditor from "../../../../../common/textEditor";
import { setActiveView, setExamTips } from "../../../../../../ducks/exams/specificationSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function ExamTips() {
  const dispatch = useDispatch();
  const {createSpecificaton} = useSelector(state =>state.examSpecification);
  const [description, setDescription] = useState(createSpecificaton?.examTips ||"");


  const handleContinue = async () => {

    try {
      await dispatch(setExamTips(description));
      dispatch(setActiveView(4))
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
          Exam Tips
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
              <h5 className="font-bold  text-base my-1">   Exam Tips</h5>
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

export default ExamTips;
