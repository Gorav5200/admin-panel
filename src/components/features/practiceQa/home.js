import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import PaginationTable from "../../common/PaginationTable";
import FullWidthTabs from "../../common/tabChanger";
import { useSelector } from "react-redux";
import { CustomButton, CustomButtonStyle } from "../../../styles/muiRoot";
import { PlusCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetPracticeQaPackageQuery } from "../../../services/apis/practiceQaApi";
import { practiceQaApi } from "../../../services/Constant";
import {
  packageHeader,
  practiceQaHeader,
} from "../../../services/constHeaders";
import { useDispatch } from "react-redux";
import {
  resetPracticeQa,
  setPracticeQaList,
} from "../../../ducks/practiceQaSlice";
import DebouncedInput from "../../common/searchApiField";
import SearchField from "../../common/searchField";
import PanalyticMain from "./PracticeAnalytics/panalyticmain";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const pageNo = parseInt(query.get("page")) || 1;
  const count = parseInt(query.get("count")) || 20;
  const searchTerm = query.get("search") || "";
  const [activeTab, setActiveTab] = useState(null);

  const [page, setPage] = useState(pageNo);
  const [rowsPerPage, setRowsPerPage] = useState(count);
  const [packagePage, setPackagePage] = useState(pageNo);
  const [packageRowsPerPage, setPackageRowsPerPage] = useState(count);

  useEffect(() => {
    dispatch(resetPracticeQa());
  }, []);

  const { data, isLoading, isError, isFetching } = useGetPracticeQaPackageQuery(
    `${practiceQaApi.endPoint}/list?page=${page}&limit=${rowsPerPage}${
      searchTerm ? `&search=${searchTerm}` : ""
    }`,
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
      skip: activeTab !== 1,
    }
  );

  const {
    data: getPackages,
    isLoading: packageLoading,
    isError: packageError,
    isFetching: packageFetching,
    isSuccess: packageSuccess,
  } = useGetPracticeQaPackageQuery(
    `${
      practiceQaApi.endPoint
    }/package/list?page=${packagePage}&limit=${packageRowsPerPage}${
      searchTerm ? `&search=${searchTerm}` : ""
    }`,
    {
      refetchOnMountOrArgChange: true,
      skip: activeTab !== 2,
    }
  );

  console.log("🚀 ~ PracticeQaMain ~ getPackages:", getPackages);
  useEffect(() => {
    if (data?.data.practiceQa) {
      dispatch(setPracticeQaList(data?.data.practiceQa));
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
      `/main/exam/practiceQa?page=${data.page}&count=${data.rowsPerPage}
     ${searchTerm ? `&search=${searchTerm}` : ""}`
    );
    //  await setRefetchData(true);
  };

  const handleSearch = (term) => {
    if (activeTab === 1) {
      setPage(1);
    } else if (activeTab === 2) {
      setPackagePage(1);
    }
    navigate(
      `/main/exam/practiceQa?page=1&count=${rowsPerPage}${
        term ? `&search=${term}` : ""
      }`
    );
  };

  const tabsData = [
    {
      id: 1,
      label: "Practice-QA Analytic",
      content: <PanalyticMain />,
    },
    {
      id: 2,
      label: "Practice-QA",
      content: (
        <>
          <PaginationTable
            data={data?.data.practiceQa || []}
            columns={practiceQaHeader}
            pageChange={handlePageChange}
            count={data?.data.totalItems}
            searchBar={
              <DebouncedInput
                placeholder={"Search By Quiz name"}
                onSearch={handleSearch}
                loading={isLoading || isFetching}
                initialValue={searchTerm}
                disabled={isError}
              />
            }
            path={`/main/exam/practiceQa/detail`}
            comp={
              <CustomButton
                startIcon={<PlusCircle size={18} />}
                onClick={() => navigate(`create`)}
                style={{
                  ...CustomButtonStyle,
                  width: 220,
                  borderRadius: 5,
                  height: 45,
                }}
              >
                Add Practice-Qa
              </CustomButton>
            }
            loading={isLoading}
          />
        </>
      ),
    },
    {
      id: 3,
      label: "Practice-QA Packages",
      content:
        packageSuccess &&
        !searchTerm &&
        getPackages?.data.packageList.length === 0 ? (
          <div className=" h-[93vh] flex justify-center items-center flex-col gap-3">
            <h5 className="text-gray-700 font-semibold font-inter text-base">
              To create package of Classes, bring in classes created
            </h5>
            <CustomButton
              startIcon={<PlusCircle />}
              onClick={() => navigate(`package/create`)}
              style={{
                ...CustomButtonStyle,
                width: 250,
                borderRadius: 5,
                height: 45,
              }}
            >
              Add Practice-Q/A Packages
            </CustomButton>
          </div>
        ) : (
          <>
            <div className="float-right p-2">
              <CustomButton
                startIcon={<PlusCircle />}
                onClick={() => navigate(`package/create`)}
                style={{
                  ...CustomButtonStyle,
                  width: 250,
                  borderRadius: 5,
                  height: 45,
                }}
              >
                Add Practice-Q/A Packages
              </CustomButton>
            </div>
            <PaginationTable
              path={`/main/exam/practiceQa/package`}
              data={getPackages?.data.packageList || []}
              columns={packageHeader}
              loading={packageLoading || packageFetching}
              searchBar={
                <DebouncedInput
                  placeholder="Search By Package Name"
                  onSearch={handleSearch}
                  loading={packageFetching || packageLoading}
                  initialValue={searchTerm}
                  disabled={packageError}
                />
              }
              pageChange={handlePageChange}
              count={getPackages?.data.totalItems}
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
