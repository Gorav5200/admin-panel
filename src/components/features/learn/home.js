import React, { useEffect, useState } from "react";
import PaginationTable from "../../common/PaginationTable";
import FullWidthTabs from "../../common/tabChanger";
import { useSelector, useDispatch } from "react-redux";
import { CustomButton, CustomButtonStyle } from "../../../styles/muiRoot";
import { PlusCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetLearnListQuery,
  useGetLearnPackageQuery,
} from "../../../services/apis/learnApi";
import { learnApi } from "../../../services/Constant";
import { resetLearn, setLearnList } from "../../../ducks/learnSlice";
import { Empty } from "antd";
import { learnHeader, packageHeader } from "../../../services/constHeaders";
import DebouncedInput from "../../common/searchApiField";
import { ChangePageHandler } from "../../../services/common";
import SearchField from "../../common/searchField";
import LearnAnalyticsMain from "./learnAnalytics/learnAnalyticsMain";
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [filterWrapper, setFilterWrapper] = useState([]);
  const query = new URLSearchParams(location.search);
  const pageNo = parseInt(query.get("page")) || 1;
  const count = parseInt(query.get("count")) || 20;
  const searchTerm = query.get("search") || "";

  const [page, setPage] = useState(pageNo);
  const [rowsPerPage, setRowsPerPage] = useState(count);
  const [activeTab, setActiveTab] = useState(null);
  const [packagePage, setPackagePage] = useState(pageNo);
  const [packageRowsPerPage, setPackageRowsPerPage] = useState(count);

  const { learnList } = useSelector((state) => state.learn);

  useEffect(() => {
    dispatch(resetLearn());
  }, [dispatch]);

  const learnQuery = useGetLearnListQuery(
    `${learnApi.endPoint}?page=${page}&limit=${rowsPerPage}${
      searchTerm ? `&search=${searchTerm}` : ""
    }`,
    { refetchOnMountOrArgChange: true, skip: activeTab !== 1 }
  );

  const packageQuery = useGetLearnPackageQuery(
    `${
      learnApi.endPoint
    }/package/list?page=${packagePage}&limit=${packageRowsPerPage}${
      searchTerm ? `&search=${searchTerm}` : ""
    }`,
    { refetchOnMountOrArgChange: true, skip: activeTab !== 2 }
  );

  const { data, isLoading, isError, isFetching } = learnQuery;
  const {
    data: packages,
    isLoading: loadingPackage,
    isError: errorPackage,
    isFetching: fetchingPackage,
    isSuccess: packageSuccess,
  } = packageQuery;

  useEffect(() => {
    if (data?.data) {
      dispatch(setLearnList(data.data.learn));
    }
  }, [data, dispatch]);

  const handlePageChange = (data) => {
    const { page, rowsPerPage } = data;

    if (activeTab === 1) {
      setPage(page);
      setRowsPerPage(rowsPerPage);
    } else if (activeTab === 2) {
      setPackagePage(page);
      setPackageRowsPerPage(rowsPerPage);
    }

    navigate(
      `/main/exam/learn?page=${page}&count=${rowsPerPage}${
        searchTerm ? `&search=${searchTerm}` : ""
      }`
    );
  };

  const handleSearch = (term) => {
    if (activeTab === 1) {
      setPage(1);
    } else if (activeTab === 2) {
      setPackagePage(1);
    }
    navigate(
      `/main/exam/learn?page=1&count=${rowsPerPage}${
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

  const renderPaginationTable = (
    isLoading,
    isFetching,
    error,
    data,
    columns,
    path,
    buttonLabel,
    buttonClickHandler
  ) => (
    <PaginationTable
      searchBar={
        <DebouncedInput
          placeholder="Search"
          onSearch={handleSearch}
          loading={isLoading || isFetching}
          initialValue={searchTerm}
          disabled={error}
        />
      }
      path={path}
      comp={
        <CustomButton
          startIcon={<PlusCircle />}
          onClick={buttonClickHandler}
          style={{
            ...CustomButtonStyle,
            width: 186,
            borderRadius: 5,
            height: 45,
          }}
        >
          {buttonLabel}
        </CustomButton>
      }
      data={data || []}
      columns={columns}
      loading={isLoading || isFetching}
      count={data?.totalItems}
      pageChange={handlePageChange}
    />
  );

  const tabsData = [
    {
      id: 1,
      label: "Learn Analytic",
      content:<LearnAnalyticsMain /> ,
    },
    {
      id: 2,
      label: "Learn Topics",
      content: isError
        ? renderError("Some error to fetch data")
        : renderPaginationTable(
            isLoading,
            isFetching,
            isError,
            learnList,
            learnHeader,
            `/main/exam/learn/detail`,
            "Create Learn",
            () => navigate(`/main/exam/learn/create`)
          ),
    },
    {
      id: 3,
      label: "Learn Packages",
      content: errorPackage
        ? renderError("Some error occurred while fetching data")
        : packages?.data
        ? renderPaginationTable(
            loadingPackage,
            fetchingPackage,
            errorPackage,
            packages.data.packageList,
            packageHeader,
            `/main/exam/learn/package`,
            "Add Learn Packages",
            () => navigate(`package/create`)
          )
        : !searchTerm &&
          packageSuccess &&
          packages?.data?.packageList?.length === 0 && (
            <div className="h-[93vh] flex justify-center items-center flex-col gap-3">
              <h5 className="text-gray-700 font-semibold font-inter text-base">
                To create a package of Learn, bring in a Learn Package created
              </h5>
              <CustomButton
                startIcon={<PlusCircle />}
                onClick={() => navigate(`package/create`)}
                style={{
                  ...CustomButtonStyle,
                  width: 186,
                  borderRadius: 5,
                  height: 45,
                }}
              >
                Add Learn Packages
              </CustomButton>
            </div>
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
