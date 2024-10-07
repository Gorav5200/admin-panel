// question bank sample
import React, { useState } from "react";
import SubjectList from "./subjectList";
import { Button } from "@mui/material";
import Header from "../../../common/header";
import { useGetSubjectListQuery } from "../../../../services/apis/dataManagement/subject";
import { subjectApi } from "../../../../services/Constant";
import ModalComp from "../../../common/modal";
import CreateSubject from "./createSubject";
function Subject() {
  const { handleClose, handleOpen, ModalComponent } = ModalComp();
  const[data,setData]=useState(null);
  const [compType,setCompType]=useState(null)

  const {
    data: subjectList,
    isLoading,
    isError,
    refetch,
  } = useGetSubjectListQuery(subjectApi.endPoint, {
    refetchOnMountOrArgChange: true,
  });

  console.log("list data from subject", subjectList);

  const columns = [
    { dataKey: "_id", label: "Subject ID", minWidth: 170 },

    // { dataKey: "entity_type", label: "Entity", align: "left" },
    {
      dataKey: "title",
      label: "Title",
      align: "left",
    },
    {
      dataKey: "description",
      label: "Description",
      align: "left",
      type: "truncate",
      maxWidth: 300,
    },
    {
      dataKey: "isPublished",
      label: "Status",
      align: "left",
      showValue: { yes: "Publish", no: "Unpublish" },
    },
    { dataKey: "positiveMarks", label: "+ Marks", align: "left" },
    { dataKey: "negativeMarks", label: "- Marks", align: "left" },
    { dataKey: "timer", label: "Timer", align: "left" },
  ];

  return (
    <div className="h-screen">
      <Header content={"Manage Subjects"} />
      <div className="bg-white p-3 m-2 rounded-md ">
        {
          <>
            <SubjectList
              data={subjectList?.data || []}
              placeholder="Search by Entity, Subjects"
              comp={
                <Button
                  variant="contained"
                  onClick={() =>{
                setData(null)
                handleOpen()
                setCompType("create")
              }}
                  sx={{
                    backgroundColor: "var(--primary)",
                    width: 178,
                    height: 46,
                    fontFamily: "var(--font-inter)",
                    fontSize: 15,
                    borderRadius: 2,
                    textTransform: "none",
                    ml: 1,
                    ":hover": {
                      backgroundColor: "var(--primary)",
                    },
                  }}
                >
                  Create Subject
                </Button>
              }
              editFun={(val) =>{
                setCompType("edit")
                setData(val)
                handleOpen()
              }}
              columns={columns}
              path={"/main/data/subject"}
              loading={isLoading}
            />
            <CreateSubject
              ModalComponent={ModalComponent}
              close={handleClose}
              data={data}
              compType={compType}
            />
          </>
        }
      </div>
    </div>
  );
}

export default Subject;
