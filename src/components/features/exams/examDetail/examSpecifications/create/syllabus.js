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
import FullFeaturedCrudGrid from "../../../../../common/CreateTable";
import { setActiveView, setSyllabus } from "../../../../../../ducks/exams/specificationSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Syllabus() {
  const dispatch = useDispatch();
  const {syllabus} = useSelector(state =>state.examSpecification.createSpecificaton);
  const [values, setValues] = useState({});
  const [rows, setRows] = React.useState(syllabus.details || []);
  const [description, setDescription] = useState(syllabus?.description || "");
  const columns = [
    { field: "subject", headerName: "Subject", width: 200, editable: true },
    {
      field: "topics",
      headerName: "Topics",
      width: 150,
      editable: true,
    },
    {
      field: "marks",
      headerName: "Marks Alloted",
      type: "number",
      width: 120,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "questions",
      headerName: "No. of questions ",
      type: "number",
      width: 120,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
  ];

  console.log("🚀 ~ Syllabus ~ description:", description);
  console.log("🚀 ~ Syllabus ~ rows:", rows);

  const handleContinue = async () => {
    const updatedData = { description, details: rows };

    try {
      await dispatch(setSyllabus(updatedData));
      dispatch(setActiveView(2))
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
            Scoring & Syllabus
          </h5>
          <Box
            component="form"
            sx={{
              p: 1,
              "& > :not(style)": {
                display: "flex",
                flexDirection: "column",
              },
              overflow: "scroll",
            }}
          >
            <QuillEditor
              setValue={(val) => setDescription(val)}
              value={description}
            />
          </Box>

          <div className="p-2">
            <FullFeaturedCrudGrid
              columns={columns}
              rows={rows}
              setRows={setRows}
            />
          </div>
        </div>

        <div className="bg-medGrey  basis-[30%] px-2">
          <PreviewCommon>
            <div className="rounded-md">
              <h5 className="font-bold my-1 text-base">Scoring & Syllabus</h5>
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

export default Syllabus;
