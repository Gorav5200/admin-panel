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
import { setTopColleges } from "../../../../../../ducks/exams/specificationSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import PublishModal from "./publishModal";

function TopColleges() {
  const dispatch = useDispatch();
  const {topColleges} = useSelector(state =>state.examSpecification.createSpecificaton);
  const [rows, setRows] = React.useState(topColleges.details || []);
  const [description, setDescription] = useState(topColleges?.description || "");
  const[open,setOpen]=useState(false)
  const columns = [
    { field: "college", headerName: "College", width: 400, editable: true },
   
    {
      field: "percentile",
      headerName: "Percentile",
      type: "number",
      width: 200,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    
  ];

  console.log("🚀 ~ Syllabus ~ description:", description);
  console.log("🚀 ~ Syllabus ~ rows:", rows);

  const handleContinue = async () => {
    const updatedData = {description, details: rows };

    try {
      await dispatch(setTopColleges(updatedData));
       setOpen(true);
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
           Top Colleges
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
              <h5 className="font-bold my-1 text-base">Top Colleges</h5>
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
      <PublishModal open={open} handleClose={()=>setOpen(false)} handleOpen={()=>setOpen(true)}/>
    </>
  );
}

export default TopColleges;
