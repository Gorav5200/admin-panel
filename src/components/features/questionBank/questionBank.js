// question bank sample
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import useCustomRouter from "../../../services/utilities/customRouter";
import Header from "../../common/header";
import { useSelector } from "react-redux";
import { useGetQuestionListQuery } from "../../../services/apis/questionBank";
import { questionApi } from "../../../services/Constant";

import PaginationTable from "../../common/PaginationTable";
import { questionBankHeader } from "../../../services/constHeaders";
function QuestionBank() {
  const { navigate } = useCustomRouter();

  const {
    data: questionList,
    isLoading,
    isError,
    refetch,
  } = useGetQuestionListQuery(questionApi.endPoint, {
    refetchOnMountOrArgChange: true,
  });

  console.log("list data from question", questionList);

  const columns = [
    { dataKey: "_id", label: "Question ID", minWidth: 170 },
    // { dataKey: "subject_id", label: "Subject"},
    { dataKey: "topic_id", label: "Topic", align: "left" },
    {
      dataKey: "question_type",
      label: "Question Type",
      align: "left",
    },
    {
      dataKey: "isPublished",
      label: "Status",
      align: "left",
      showValue: { yes: "Publish", no: "Unpublish" },
    },
    {
      dataKey: "difficulty_level_manual",
      label: "Level",
      align: "left",
    },

    { dataKey: "marks", label: "Marks", align: "left" },
    { dataKey: "reported", label: "Reported Qs", align: "left" },
  ];

  return (
    <div className="h-screen">
      <Header content={"CAT Question Bank"} />
      <div className="bg-white p-3 m-2 rounded-md ">
        
     
        {
        <PaginationTable
          data={questionList?.data}
          placeholder="Search by topics, subjects"
          comp={
            <Button
              variant="contained"
              onClick={() => navigate("/main/question/create")}
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
              Create Questions
            </Button>
          }
          columns={columns}
          path={"/main/question/detail"}
          loading={isLoading}

        />
        
        
        }
      </div>
    </div>
  );
}

export default QuestionBank;
