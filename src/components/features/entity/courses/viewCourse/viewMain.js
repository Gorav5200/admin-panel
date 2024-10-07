import React, { useEffect, useState } from "react";
import { HeaderWithNavigation } from "../../../../common/header";
import { ChevronRight, PlusCircle, XIcon } from "lucide-react";
import ModalComp from "../../../../common/modal";
import {
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Button,
} from "@mui/material";
import Icon from "../../../../common/Icon";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setViewDetail,
  setCourseDescription,
  setWhyIquanta,
  setSuccessStories,
  setCourseDetail,
  setMockTest,
  setAssignments,
  setClasses,
  setPastPapers,
  setPractice,
  setTimeQuiz,
  setTopFeatures,
  setcourseStructure,
  setActiveView,
  setLinkGroup,
  setModules,
  setLearnDetails,
} from "../../../../../ducks/exams/courseSlice";
import CourseDetail from "./courseDetail";
import WhyIquanta from "./whyIquanta";
import Structure from "./structure";
import Feature from "./feature";
import Stories from "./stories";
import { useGetCoursesByIdQuery } from "../../../../../services/apis/exam/courses";
import { Empty, Result } from "antd";
import { RingLoader } from "react-spinners";
import Learn from "./learn";
import LinkGroup from "./linkGroup";
import Modules from "./modules";

function ViewMain() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const { activeView, viewDetail } = useSelector((state) => state.courses);
  const { data, isLoading, isError, isSuccess, isFetching } =
    useGetCoursesByIdQuery(`/exams/v1/course/basic/detail/${params.courseId}`, {
      refetchOnMountOrArgChange: true,
    });

  useEffect(() => {
    if (data?.data) {
      dispatch(setViewDetail({ ...data.data.course }));
    }
  }, [data]);

  console.log("detaiks", data);

  if (isError) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <Result
          status="404"
          title="404"
          subTitle={"Some error occured to fetch data"}
          extra={<Button type="primary">Back Home</Button>}
        />
      </div>
    );
  }

  if (isSuccess && Object.keys(data.data).length === 0) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <Empty description="No data Found" />
      </div>
    );
  }

  const handleEdit = async () => {
    const dispatchAction = async (data, actionCreator) => {
      const payload = data;
      dispatch(actionCreator(payload));
    };

    const dispatchActions = async () => {
      const { startDate, endDate, price, title, highlights ,image,entityTypes,entityId} = viewDetail;
      const actions = [
        {
          data: {
            startDate,
            endDate,
            price,
            title,
            highlights,
            entityId: entityId._id,
            image,
            entityTypes: entityTypes.map((e) => e?._id),
          },
          actionCreator: setCourseDetail,
        },
        { data: viewDetail?.whyUs.data, actionCreator: setWhyIquanta },
        { data: viewDetail?.successStories, actionCreator: setSuccessStories },
        { data: viewDetail?.topFeatures, actionCreator: setTopFeatures },
        {
          data: viewDetail?.courseStructure,
          actionCreator: setcourseStructure,
        },
        { data: viewDetail?.description, actionCreator: setCourseDescription },
        {
          data: viewDetail?.groups.map((e) => e._id),
          actionCreator: setLinkGroup,
        },
        {
          data: viewDetail?.modules,
          actionCreator: setModules,
        },
        {
          data: viewDetail?.learnDetails,
          actionCreator: setLearnDetails,
        },
      ];

      const dispatchPromises = actions.map(({ data, actionCreator }) =>
        dispatchAction(data, actionCreator)
      );

      await Promise.all(dispatchPromises);
    };

    await dispatchActions();

    navigate(`/main/entity/${params.entityId}/course/${params.courseId}/edit`);
  };

  return (
    <>
      <div className="h-screen bg-lightGrey">
        <HeaderWithNavigation
          cont={
            location.pathname.includes("edit")
              ? "Edit Course"
              : viewDetail?.title
          }
        />
        <div className="my-2 flex p-2 gap-5 h-full">
          <div className="basis-[20%]">
            <header className="header bg-medGrey">
              <h5 className="text-primary text-base font-bold font-inder p-2">
                Package Specifications
              </h5>
            </header>

            <div>
              <List>
                {[
                  { name: "Course Details", value: "details" },
                  { name: "Course Modules", value: "modules" },
                  { name: "What Will You Learn", value: "learn" },
                  { name: "Why iQuanta", value: "why" },
                  { name: "Course Structure", value: "structure" },
                  { name: "Top Features", value: "features" },
                  { name: "Link Groups", value: "linkGroups" },
                  { name: "Success stories ", value: "stories" },
                ]?.map((item, _) => (
                  <ListItemButton
                    key={item.name}
                    sx={{
                      border: "1px solid gray",
                      color:
                        activeView === item.value
                          ? "black"
                          : "var(--secondary)",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onClick={() => dispatch(setActiveView(item.value))}
                  >
                    <ListItemText>
                      <h5>{item.name}</h5>
                    </ListItemText>

                    <ChevronRight />
                  </ListItemButton>
                ))}
              </List>
            </div>
          </div>
          <div className=" basis-[80%] rounded-md  p-2  h-[93%] overflow-scroll bg-white  ">
            <div className="flex justify-end align-top border-b-2 p-2 ">
              <Stack direction="row" spacing={3} alignSelf={"flex-start"}>
                <Button
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                  }}
                  startIcon={<Icon name="FileEdit" color="#336792" size={20} />}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                  }}
                  startIcon={<Icon name="Files" color="#336792" size={20} />}
                  // onClick={handleDuplicate}
                >
                  Duplicate
                </Button>
                <Button
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                  }}
                  startIcon={<Icon name="Upload" color="#336792" size={20} />}
                >
                  Unpublish
                </Button>
              </Stack>
            </div>
            {isLoading || isFetching ? (
              <div className="flex justify-center items-center h-[90%]">
                <div className="mb-4">
                  <RingLoader color="#030807" size={70} />
                  <p className="tracking-[0.3rem] mt-3 text-gray-700 ml-[-10px]">
                    Loading...
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {activeView === "details" ? (
                  <CourseDetail />
                ) : activeView === "learn" ? (
                  <Learn />
                ) :
                    activeView === "modules" ? (
                      <Modules />
                    ) :
                    
                activeView === "why" ? (
                  <WhyIquanta />
                ) : activeView === "structure" ? (
                  <Structure />
                ) : activeView === "features" ? (
                  <Feature />
                ) : activeView === "stories" ? (
                  <Stories />
                ) : activeView === "linkGroups" ? (
                  <LinkGroup />
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewMain;
