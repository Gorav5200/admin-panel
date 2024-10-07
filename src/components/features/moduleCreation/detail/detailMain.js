import React, { useEffect, useMemo, useState } from "react";
import FullWidthTabs from "../../../common/tabChanger";
import ModuleDetails from "./moduleDetails";
import { useGetModulesbyIdQuery } from "../../../../services/apis/modulesApi";
import { useNavigate, useParams } from "react-router-dom";
import { moduleApi } from "../../../../services/Constant";
import {
  assignmentHeader,
  dailyQuizHeader,
  learnHeader,
  mockTestHeader,
  pastPaperHeader,
  practiceQaHeader,
} from "../../../../services/constHeaders";
import PaginationTable from "../../../common/PaginationTable";
import { HeaderWithNavigation } from "../../../common/header";
import Icon from "../../../common/Icon";
import { Button, Divider, Skeleton, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  setModuleDetails,
  setAssignments,
  setMockTests,
  setPastPapers,
  setPracticeQa,
  setActiveView,
  setDailyQuiz,
  setLearn,
} from "../../../../ducks/addModuleSlice";
import { message } from "antd";

function DetailMain() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: getDetails,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetModulesbyIdQuery(
    `${moduleApi.endPoint}/details/${params.moduleId}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [data, setData] = useState(getDetails);


  useEffect(() => {
    setData(getDetails?.data.module);
  }, [getDetails]);


const[mockTestData,setMockTest]=useState([])

useEffect(() => {
  const fetchData = async () => {
    if (data) {
      const myData = await data.mockPackages?.flatMap((e) => e.mockTests);
      const changeData = myData.map((e) => ({
        ...e,
        sections: e.sections.map((e) => e.section.title)?.join(),
      }));
      setMockTest(changeData); 
    }
  };

  fetchData();
}, [data]);

console.log("🚀 ~ DetailMain ~ mockTestData:", mockTestData)

  
  const tabsData = [
    {
      name: "Module Details",
      value: "details",
      comp: <ModuleDetails isLoading={isLoading} data={data} />,
    },
    {
      name: "Mock Test",
      value: "mocktest",
      comp: (
        <PaginationTable
          data={mockTestData || []}
          columns={mockTestHeader}
          searchBar={""}
          comp={null}
          loading={isLoading}
        />
      ),
    },
    {
      name: "Assignments",
      value: "assignments",
      comp: (
        <PaginationTable
          data={data?.assignments || []}
          columns={assignmentHeader}
          searchBar={""}
          comp={null}
          loading={isLoading}
        />
      ),
    },
    {
      name: "Past-papers",
      value: "pastPapers",
      comp: (
        <PaginationTable
          data={data?.pastPapers || []}
          columns={pastPaperHeader}
          searchBar={""}
          comp={null}
          loading={isLoading}
        />
      ),
    },
    {
      name: "practice Q/A",
      value: "practiceQa",
      comp: (
        <PaginationTable
          data={data?.practiceQa || []}
          columns={practiceQaHeader}
          searchBar={""}
          comp={null}
          loading={isLoading}
        />
      ),
    },
    {
      name: "Daily Quiz ",
      value: "dailyQuiz",
      comp: (
        <PaginationTable
          data={data?.dailyQuiz || []}
          columns={dailyQuizHeader}
          searchBar={""}
          comp={null}
          loading={isLoading}
        />
      ),
    },
    {
      name: "Learn",
      value: "learn",
      comp: (
        <PaginationTable
          data={data?.learn || []}
          columns={learnHeader}
          searchBar={""}
          comp={null}
          loading={isLoading}
        />
      ),
    },
  ];

  const transformedTabsData = tabsData?.map(({ name, value, comp }, ind) => ({
    id: ind,
    label: name,
    content: comp,
  }));

  const handleEdit = async () => {
    const {
      assignments,
      mockPackages,
      pastPapers,
      practiceQa,
      dailyQuiz,
      entity,
      learn,
      entityType,
      subject,
      ...others
    } = data;
    try {
      await Promise.all([
        dispatch(setModuleDetails({ 
          entity:entity._id,
          entityType:entityType._id,
          subject:subject._id,
          ...others
        })),
        dispatch(setAssignments(assignments)),
        dispatch(
          setMockTests(
            mockPackages.map((e) => {
              const updatedObject = { ...e };

              delete updatedObject._id;

              updatedObject.packageId = e.packageId._id;
              return updatedObject;
            })
          )
        ),
        dispatch(setPastPapers(pastPapers)),
        dispatch(setLearn(learn)),
        dispatch(setPracticeQa(practiceQa)),
        dispatch(setDailyQuiz(dailyQuiz)),
        dispatch(setActiveView("details"))

        ,
      ]);
      navigate(`/main/exam/module/${params.moduleId}/edit`);
    } catch (error) {
      message.error(error);
    }
  };
 
  
  return (
    <div>
      <HeaderWithNavigation
        cont={isLoading ? <Skeleton /> : data?.title || "N/A"}
        className="mb-2"
      />
      <Stack
        direction="row"
        spacing={3}
        justifyContent={"flex-end"}
        bgcolor={"white"}
        p={1}
        borderRadius={"5px 5px 0 0"}
      >
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

      <FullWidthTabs data={transformedTabsData} />
    </div>
  );
}

export default DetailMain;
