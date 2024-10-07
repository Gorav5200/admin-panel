import React, { useEffect, useState } from "react";
import { Avatar, TextField } from "@mui/material";
import PaginationTable from "../../common/PaginationTable";
import FullWidthTabs from "../../common/tabChanger";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton, CustomButtonStyle } from "../../../styles/muiRoot";
import { PlusCircle } from "lucide-react";
import {
  useGetAssignmentPackageQuery,
  useGetAssignmentsQuery,
} from "../../../services/apis/assignmentApi";
import { assignmentApi } from "../../../services/Constant";
import {
  resetAssignment,
  setAssignmentList,
} from "../../../ducks/assignmentSlice";
import { useDispatch } from "react-redux";
import {
  assignmentHeader,
  packageHeader,
} from "../../../services/constHeaders";
import SearchField from "../../common/searchField";
import DebouncedInput from "../../common/searchApiField";
import { Empty } from "antd";
import AnalyticsMains from "./assignmentAnalytic/analyticsMains";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [filterWrapper, setFilterWrapper] = useState([]); //for filter the data through textfield
  const { assignmentList } = useSelector((state) => state.assignment);
  const query = new URLSearchParams(location.search);
  const pageNo = parseInt(query.get("page")) || 1;
  const count = parseInt(query.get("count")) || 20;
  const searchTerm = query.get("search") || "";

  const [page, setPage] = React.useState(pageNo);
  const [rowsPerPage, setRowsPerPage] = React.useState(count);
  const [activeTab, setActiveTab] = useState(null);
  const [packagePage, setPackagePage] = useState(pageNo);
  const [packageRowsPerPage, setPackageRowsPerPage] = useState(count);

  const { data, isLoading, isError, isFetching } = useGetAssignmentsQuery(
    `${assignmentApi.endPoint}/basic/list?page=${page}&limit=${rowsPerPage}${
      searchTerm ? `&search=${searchTerm}` : ""
    }`,
    {
      refetchOnMountOrArgChange: true,
      skip: activeTab !== 1,
    }
  );
  const {
    data: getPackages,
    isLoading: loadingPackage,
    isError: errorPackage,
    isFetching: fetchingPackage,
    isSuccess: packageSuccess,
  } = useGetAssignmentPackageQuery(
    `${
      assignmentApi.endPoint
    }/package/list?page=${packagePage}&limit=${packageRowsPerPage}${
      searchTerm ? `&search=${searchTerm}` : ""
    }`,
    {
      refetchOnMountOrArgChange: true,
      skip: activeTab !== 2,
    }
  );


  console.log("🚀 ~ Home assignment~ data:", data);
  console.log("🚀 ~ Home ~ getPackages:", getPackages);

  useEffect(() => {
    dispatch(resetAssignment());
  }, []);

  useEffect(() => {
    if (data?.data.assignments) {
      dispatch(setAssignmentList(data?.data.assignments));
    }
  }, [data]);

  const handlePageChange = async (data) => {
    if (activeTab === 1) {
      setPage(data.page);
      setRowsPerPage(data.rowsPerPage);
    } else if (activeTab === 2) {
      setPackagePage(data.page);
      setPackageRowsPerPage(data.rowsPerPage);
    }

    navigate(
      `/main/exam/?assignment=${data.page}&count=${data.rowsPerPage}
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
      `/main/exam/assignment?page=1&count=${rowsPerPage}${
        term ? `&search=${term}` : ""
      }`
    );
  };

  const renderError = (message) => (
    <div
      style={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Empty description={message} />
    </div>
  );

  const tabsData = [
    {
      id: 1,
      label: "Assignment Analytic",
      content: <AnalyticsMains />,
    },
    {
      id: 2,
      label: "Assignment",
      content: isError ? (
        renderError("Some error to fetch data")
      ) : (
        <>
          <PaginationTable
            data={assignmentList || []}
            columns={assignmentHeader}
            pageChange={handlePageChange}
            count={data?.data.totalItems}
            searchBar={
              <DebouncedInput
                placeholder="Search by Assignment"
                onSearch={handleSearch}
                loading={isLoading || isFetching}
                initialValue={searchTerm}
                disabled={isError}

              />
            }
            path={`/main/exam/assignment/detail`}
            comp={
              <CustomButton
                startIcon={<PlusCircle />}
                onClick={() => navigate(`/main/exam/assignment/create`)}
                style={{
                  ...CustomButtonStyle,
                  width: 186,
                  borderRadius: 5,
                  height: 45,
                }}
              >
                Add Assignment
              </CustomButton>
            }
            loading={isLoading}
          />
        </>
      ),
    },

    {
      id: 3,
      label: "Assignment Packages",
      content:

        packageSuccess &&
        !searchTerm &&
        getPackages?.data.packageList.length === 0 ? (
          <div className=" h-[93vh] flex justify-center items-center flex-col gap-3">
            <h5 className="text-gray-700 font-semibold font-inter text-base">
              To create package of Assignment, bring in Assignment created
            </h5>
            <CustomButton
              startIcon={<PlusCircle />}
              onClick={() => navigate(`package/create`)}
              style={{
                ...CustomButtonStyle,
                width: 220,
                borderRadius: 5,
                height: 45,
              }}
            >
              Add Assignment Packages
            </CustomButton>
          </div>
        ) : (

          <>
            <div className="float-right p-2"></div>
            <PaginationTable
              comp={
                <CustomButton
                  startIcon={<PlusCircle />}
                  onClick={() => navigate(`package/create`)}
                  style={{
                    ...CustomButtonStyle,
                    width: 220,
                    borderRadius: 5,
                    height: 45,
                  }}
                >
                  Add Assignment Packages
                </CustomButton>
              }
              searchBar={
                <DebouncedInput
                  placeholder="Search By Package Name"
                  onSearch={handleSearch}
                  loading={fetchingPackage || loadingPackage}
                  initialValue={searchTerm}
                  disabled={errorPackage}
                />
              }
              isError={errorPackage}
              pageChange={handlePageChange}
              count={getPackages?.data.totalItems}
              path={`/main/exam/assignment/package`}
              data={getPackages?.data.packageList || []}

              columns={packageHeader}
              loading={loadingPackage || fetchingPackage}
            />
          </>
        ),
    },
  ];

  return (
    <div className="bg-red h-[70vh]">
      <FullWidthTabs data={tabsData} setHeading={setActiveTab} />
    </div>
  );
}

export default Home;
