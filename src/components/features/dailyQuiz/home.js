import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import PaginationTable from "../../common/PaginationTable";
import FullWidthTabs from "../../common/tabChanger";
import {
  CustomButton,
  ButtonStyle,
  CustomButtonStyle,
} from "../../../styles/muiRoot";
import { PlusCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetDailyQuizPackageQuery,
  useGetDailyQuizQuery,
} from "../../../services/apis/dailyQuizApi";
import { dailyQuiz } from "../../../services/Constant";
import { useDispatch } from "react-redux";
import { resetDailyQuiz, setDailyQuiz } from "../../../ducks/dailyQuizSlice";
import { dailyQuizHeader, packageHeader } from "../../../services/constHeaders";
import SearchField from "../../common/searchField";
import DebouncedInput from "../../common/searchApiField";
import DailyAnalyticMain from "./dailyAnalytics/dailyAnalyticMain";

  function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const location = useLocation();
  const [filterWrapper, setFilterWrapper] = useState([]);

  const query = new URLSearchParams(location.search);
  const pageNo = parseInt(query.get("page")) || 1;
  const count = parseInt(query.get("count")) || 20;
  const searchTerm = query.get("search") || "";
  const [activeTab, setActiveTab] = useState(null);
 const [page, setPage] = useState(pageNo);
 const [rowsPerPage, setRowsPerPage] = useState(count);
  const [packagePage, setPackagePage] = useState(pageNo);
  const [packageRowsPerPage, setPackageRowsPerPage] = useState(count);


  const { data, isLoading, isError, isFetching } = useGetDailyQuizQuery(
    `${dailyQuiz.endPoint}/list?page=${page}&count=${rowsPerPage}${
      searchTerm ? `&search=${searchTerm}` : ""
    }`,
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
      skip: activeTab !== 1,
    }
  );

  const {
    data: packageData,
    isLoading: packageLoading,
    isError: packageError,
    isFetching: packageFetching,
    isSuccess: packageSuccess,
  } = useGetDailyQuizPackageQuery(
    `${
      dailyQuiz.endPoint
    }/package/list?page=${packagePage}&limit=${packageRowsPerPage}${
      searchTerm ? `&search=${searchTerm}` : ""
    }`,
    {
      refetchOnMountOrArgChange: true,
      skip: activeTab !== 2,
    }
  );

  console.log("🚀 ~ Home ~ packageData:", packageData);
  useEffect(() => {
    dispatch(resetDailyQuiz());
    if (data) {
      dispatch(setDailyQuiz(data?.data.dailyQuiz));
    }
  }, [data]);



 const handlePageChange =  (data) => {
   if (activeTab === 1) {
     setPage(data.page);
     setRowsPerPage(data.rowsPerPage);
   } else if (activeTab === 2) {
     setPackagePage(data.page);
     setPackageRowsPerPage(data.rowsPerPage);
   }
  
  navigate(
   `/main/exam/dailyQuiz?page=${data.page}&count=${data.rowsPerPage}
     ${searchTerm ? `&search=${searchTerm}` : ""}`
 );
 };

  const handleSearch = (term) => {
 if (activeTab === 1) {
   setPage(1);
 } else if (activeTab === 2) {
   setPackagePage(1);
 }
    navigate(
      `/main/exam/dailyQuiz?page=1&count=${rowsPerPage}${
        term ? `&search=${term}` : ""
      }`
    );
  };


  const tabsData = [
    {
      id: 1,
      label: "Daily-Quiz Analytic",
      content: <DailyAnalyticMain />,
    },
    {
      id: 2,
      label: "Daily-Quiz",
      content: (
        <>
          <PaginationTable
            data={data?.data?.dailyQuiz || []}
            columns={dailyQuizHeader}
            pageChange={handlePageChange}
            count={data?.data.totalItems}
            isError={isError}
            searchBar={
              <DebouncedInput
                placeholder={"Search By Quiz name"}
                onSearch={handleSearch}
                loading={searchTerm && (isLoading || isFetching)}
                initialValue={searchTerm}
                disabled={isError}
              />
            }
            loading={isLoading || isFetching}
            path={`/main/exam/dailyQuiz`}
            comp={
              <CustomButton
                startIcon={<PlusCircle />}
                onClick={() => navigate(`/main/exam/dailyQuiz/create`)}
                style={{
                  ...CustomButtonStyle,
                  width: 180,
                  borderRadius: 5,
                  height: 45,
                }}
              >
                Create Daily-Quiz
              </CustomButton>
            }
          />
        </>
      ),
    },
    {
      id: 3,
      label: "Daily Quiz Packages",
      content:
        packageSuccess &&
        !searchTerm &&
        packageData?.data?.packageList.length === 0 ? (
          <div className="h-[93vh] flex justify-center items-center flex-col gap-3">
            <h5 className="text-gray-700 font-semibold font-inter text-base">
              No packages of Daily quiz available, create a new daily quiz
              package
            </h5>
            <CustomButton
              startIcon={<PlusCircle />}
              onClick={() => navigate(`package/create`)}
              style={{
                ...CustomButtonStyle,
                width: 240,
                borderRadius: 5,
                height: 45,
              }}
            >
              Add Daily-Quiz Packages
            </CustomButton>
          </div>
        ) : (
          <PaginationTable
            data={packageData?.data?.packageList || []}
            columns={packageHeader}
            loading={packageLoading || packageFetching}
            pageChange={handlePageChange}
            count={packageData?.data.totalItems}
            searchBar={
              <DebouncedInput
                placeholder="Search By Package Name"
                onSearch={handleSearch}
                loading={packageFetching || packageLoading}
                initialValue={searchTerm}
                disabled={packageError}
              />
            }
            path={"/main/exam/dailyQuiz/package"}
            comp={
              <CustomButton
                startIcon={<PlusCircle />}
                onClick={() => navigate(`package/create`)}
                style={{
                  ...CustomButtonStyle,
                  width: 240,
                  borderRadius: 5,
                  height: 45,
                }}
              >
                Add Daily-Quiz Packages
              </CustomButton>
            }
          />
        ),
    },
  ];

  console.log("🚀 ~ Home ~ data:", data);

  return (
    <div className="bg-red h-[70vh]">
      <FullWidthTabs data={tabsData} setHeading={setActiveTab} />
    </div>
  );
}

export default Home;
