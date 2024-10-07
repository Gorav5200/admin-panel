import React, { useEffect } from "react";
import FullWidthTabs from "../../../../../common/tabChanger";
import ExamDetails from "../view/examDetails";
import ScoringSyllabus from "../view/ScoringSyllabus";
import Eligibility from "../view/examEligibility";
import ExamTips from "../view/ExamTips";
import Header from "../../../../../common/header";
import TopCollege from "../view/topCollege";
import { Avatar, Badge, Button, Stack } from "@mui/material";
import Icon from "../../../../../common/Icon";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  createSpecificaton,
  resetExamSpecification,
  setEligibility,
  setExamDetail,
  setExamTips,
  setImportantNews,
  setSyllabus,
  setTopColleges,
  viewSpecification,

} from "../../../../../../ducks/exams/specificationSlice";
import { useGetSpecificationByIdQuery } from "../../../../../../services/apis/exam/specification";
import { useNavigate, useParams } from "react-router-dom";
import { examSpecficaton } from "../../../../../../services/Constant";
import { Button as AntButton, Empty } from "antd";
import {
  CustomButton,
  CustomButtonStyle,
} from "../../../../../../styles/muiRoot";
import {PlusCircleIcon } from "lucide-react";
import ImportantNews from "../view/importantNews";


function Specifications() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const state = useSelector((state) => state.examSpecification);
  useEffect(() => {
   dispatch(resetExamSpecification())
    
  }, [])


  const idReplaceHandler = async (data) => {
    return {
      description: data?.description,
      details: data?.details.map(e => {
        const { _id, ...rest } = e;
        return { id: _id, ...rest };
      })
    };
  };
  
  const handleEdit = async () => {
    const actions = [
      { data: state.viewDetails.examDetail, actionCreator: setExamDetail },
      { data: await idReplaceHandler(state.viewDetails.syllabus), actionCreator: setSyllabus },
      { data: state.viewDetails.eligibility, actionCreator: setEligibility },
      { data: await idReplaceHandler( state.viewDetails.topColleges), actionCreator: setTopColleges },
      { data: state.viewDetails.examTips, actionCreator: setExamTips },
      { data: state.viewDetails.importantNews, actionCreator: setImportantNews },
    ];
  
    // Use Promise.all to dispatch actions asynchronously
    await Promise.all(
        actions.map(async (action) => {
          dispatch(action.actionCreator(action.data));
        })
    );
  
    // Navigate after all actions have been dispatched
    navigate(`/main/exam/${params.examId}/specification/edit`);
  };
  
  const { data, isLoading, isFetching, isError } = useGetSpecificationByIdQuery(
    `${examSpecficaton.endPoint}/entity/${params.examId}`,
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (data && !isLoading ) {
      const dataFind = data?.data.examSpecification;
      dispatch(viewSpecification(dataFind));
    }
  }, [data]);

  if (data && !data.data.dataExists) {
    return (
      <React.Fragment>
        <Header content={"Exam specification"} />

        <div className="bg-white p-1 m-2 rounded-md flex justify-center items-center overflow-hidden h-[88vh]">
          <Empty
            image={Empty.PRESENTED_IMAGE_DEFAULT}
            imageStyle={{
              height: 100,
              textAlign: "center",
            }}
            description={
              <span className="font-medium text-base font-inter text-primary">
                Add Specification
              </span>
            }
          >
            <CustomButton
              startIcon={<PlusCircleIcon size={15} />}
              onClick={() =>
                navigate(`/main/exam/${params.examId}/specification/create`)
              }
              variant="contained"
            >
              Create Now
            </CustomButton>
          </Empty>
        </div>
      </React.Fragment>
    );
  }

  console.log("🚀 ~ Specifications ~ data:", data);

  return (
    <React.Fragment>
      <Header content={"Exam specification"} />

      <div className="bg-white p-1 m-2 rounded-md ">
        <Stack
          direction="row"
          spacing={3}
          p={1}
          alignSelf={"flex-end"}
          justifyContent={"flex-end"}
        >
          <Button
            sx={{
              color: "#455564",
              fontFamily: "var(--inter)",
              fontSize: "13px",
            }}
            startIcon={<Icon name="FileEdit" color="#336792" size={18} />}
             onClick={handleEdit}
          >
            Edit
          </Button>

          <Button
            sx={{
              color: "#455564",
              fontFamily: "var(--inter)",
              fontSize: "13px",
            }}
            startIcon={
              <Badge
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                badgeContent={
                  <Avatar
                    sx={{
                      bgcolor: "orange",
                      width: 13,
                      height: 13,
                      p: 1,
                      fontSize: 14,
                    }}
                  >
                    0
                  </Avatar>
                }
                showZero
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-message-square-text"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <path d="M13 8H7" />
                  <path d="M17 12H7" />
                </svg>
              </Badge>
            }
            // onClick={handleDuplicate}
          >
            Comments
          </Button>
        </Stack>
        <FullWidthTabs
          data={[
            {
              item: 1,
              label: "CAT Exam Details",
              content: <ExamDetails />,
            },
            {
              item: 2,
              label: "Scoring Syllabus",
              content: <ScoringSyllabus />,
            },
            {
              item: 3,
              label: "Eligibility & Fees",
              content: <Eligibility />,
            },
            {
              item: 4,
              label: "Exam Tips",
              content: <ExamTips />,
            },
            {
              item: 5,
              label: "Top College",
              content: <TopCollege />,
            },
            {
              item: 6,
              label: "Important News",
              content: <ImportantNews />,
            },
          ]}
        ></FullWidthTabs>
      </div>
    </React.Fragment>
  );
}

export default Specifications;
