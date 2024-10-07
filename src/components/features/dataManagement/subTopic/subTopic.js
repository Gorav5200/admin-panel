// question bank sample
import React, { useEffect, useState } from "react";
import SubTopicList from "./subTopicList";
import CreateSubTopic from "./createSubTopic";
import { Button } from "@mui/material";
import useCustomRouter from "../../../../services/utilities/customRouter";
import Header from "../../../common/header";
import { useSelector } from "react-redux";
import { useGetSubTopicListQuery } from "../../../../services/apis/dataManagement/subTopic";
import { subTopicApi } from "../../../../services/Constant";
import { FadeLoader } from "react-spinners";
import { SkeletonTableRows } from "../../../common/skeloton";
import ModalComp from "../../../common/modal";

function SubTopic() {
  const { handleClose, handleOpen, ModalComponent } = ModalComp();
  const [data, setData] = useState(null);
  const [compType, setCompType] = useState(null);

  const {
    data: subTopicList,
    isLoading,
    isError,
    refetch,
  } = useGetSubTopicListQuery(subTopicApi.endPoint, {
    refetchOnMountOrArgChange: true,
  });

  console.log("list data from sub", subTopicList);

  const columns = [
    { dataKey: "_id", label: "Sub-Topic ID", minWidth: 170 },

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
      showValue: { true: "Publish", false: "Unpublish" },
    },
    { dataKey: "topics", label: "Topics", align: "left" },
  ];



  return (
    <div className="h-screen">
      <Header content={"Manage SubTopics"} />
      <div className="bg-white p-3 m-2 rounded-md ">
        {
          <>
            {" "}
            <SubTopicList
              data={subTopicList?.data || []}
              placeholder="Search by Entity, Subjects"
              comp={
                <Button
                  variant="contained"
                  onClick={() => {
                    setData(null);
                    handleOpen();
                    setCompType("create");
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
                  + Create Sub-Topic
                </Button>
              }
              columns={columns}
              path={"/main/data/subtopic"}
              loading={isLoading}
              editFun={(val) => {
                setCompType("edit");
                setData(val);
                handleOpen();
              }}
            />
            <CreateSubTopic
              ModalComponent={ModalComponent}
              close={handleClose}
              compType={compType}
              data={data}
            />
          </>
        }
      </div>
    </div>
  );
}

export default SubTopic;
