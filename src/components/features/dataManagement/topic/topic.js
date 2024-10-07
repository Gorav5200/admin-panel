// question bank sample
import React, { useEffect, useState } from "react";
import TopicList from "./topicList";
import CreateTopic from "./createTopic";
import { Button } from "@mui/material";
import useCustomRouter from "../../../../services/utilities/customRouter";
import Header from "../../../common/header";
import { useSelector } from "react-redux";
import { useGetTopicListQuery } from "../../../../services/apis/dataManagement/topic";
import { topicApi } from "../../../../services/Constant";
import { FadeLoader } from "react-spinners";
import { SkeletonTableRows } from "../../../common/skeloton";
import ModalComp from "../../../common/modal";

function Topic() {
  const { handleClose, handleOpen, ModalComponent } = ModalComp();
  const[data,setData]=useState(null);
  const [compType,setCompType]=useState(null);


  const {
    data: topicList,
    isLoading,
    isError,
    refetch,
  } = useGetTopicListQuery(topicApi.endPoint, {
    refetchOnMountOrArgChange: true,
  });

  //console.log("list data from topic", topicList);

  const columns = [
    { dataKey: "_id", label: "Topic ID", minWidth: 170 },
    {
      dataKey: "title",
      label: "Title",
      align: "left",
    },
    {
      dataKey: "description",
      label: "Description",
      align: "left",
      type:"truncate",
      maxWidth:300,
    },
    {
      dataKey: "isPublished",
      label: "Status",
      align: "left",
      showValue: { yes: "Publish", no: "Unpublish" },
    },
    { dataKey: "sub_topic", label: "Sub-Topics", align: "left" },
  

  ];

  return (
    <div className="h-screen">
      <Header content={"Manage Topics"} />
      <div className="bg-white p-3 m-2 rounded-md ">
        {
          <>
            <TopicList
              data={topicList?.data || []}
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
                  Create Topic
                </Button>
              }
              columns={columns}
              editFun={(val) =>{
                setData(val)
                handleOpen()
                setCompType("edit")
              }}
              path={"/main/data/topic"}
              loading={isLoading}
            />
            <CreateTopic ModalComponent={ModalComponent} close={handleClose}  
             data={data}
              compType={compType} />
          </>
        }
      </div>
    </div>
  );
}

export default Topic;
