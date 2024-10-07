import React, { useEffect, useState } from "react";
import PaginationTable from "../../common/PaginationTable";
import FullWidthTabs from "../../common/tabChanger";
import { useSelector } from "react-redux";
import { CustomButton, CustomButtonStyle } from "../../../styles/muiRoot";
import { PlusCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetPastPaperPackageQuery,
  useGetPastPaperQuery,
} from "../../../services/apis/pastPapersApi";
import { pastPaperApi } from "../../../services/Constant";
import { packageHeader, pastPaperHeader } from "../../../services/constHeaders";
import {
  resetPastPaper,
  setPastPaperList,
} from "../../../ducks/pastPaperSlice";
import { useDispatch } from "react-redux";
import SearchField from "../../common/searchField";
import DebouncedInput from "../../common/searchApiField";
import AnalyticMain from "./Past_Paper_Analytic/analyticMain";


function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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


 

  const { data, isLoading, isFetching, isError } = useGetPastPaperQuery(
    `${pastPaperApi.endPoint}/list?page=${page}&limit=${rowsPerPage}${
     searchTerm ? `&search=${searchTerm}` : ""
   }`,
    { refetchOnMountOrArgChange: true ,
      skip: activeTab !== 1,
    }
  );

  const {
    data: packageData,
    isLoading: packageLoading,
    isError: packageError,
    isFetching: packageFetching,
    isSuccess: packageSuccess,
  } = useGetPastPaperPackageQuery(
    `${
      pastPaperApi.endPoint
    }/package/list?page=${packagePage}&limit=${packageRowsPerPage}${
      searchTerm ? `&search=${searchTerm}` : ""
    }`,
    {
      refetchOnMountOrArgChange: true,
      skip: activeTab !== 2,
    }
  );

  useEffect(() => {
    if (data?.data) {
      dispatch(resetPastPaper());
      dispatch(setPastPaperList(data?.data.pastPapers));
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
       `/main/exam/pastPapers?page=${data.page}&count=${data.rowsPerPage}
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
       `/main/exam/pastPapers?page=1&count=${rowsPerPage}${
         term ? `&search=${term}` : ""
       }`
     );
   };


  console.log("🚀 ~ Home ~ data:", data);

  const tabsData = [
    {
      id: 1,
      label: "Past-Paper Analytic",
      content: <AnalyticMain />,
    },
    {
      id: 2,
      label: "Past-Paper",
      content: (
        <>
          <PaginationTable
            data={data?.data.pastPapers || []}
            columns={pastPaperHeader}
            pageChange={handlePageChange}
            count={data?.data.totalItems}
            searchBar={
              <DebouncedInput
                placeholder="Search by Paper Name"
                onSearch={handleSearch}
                loading={isLoading || isFetching}
                initialValue={searchTerm}
                disabled={isError}
              />
            }
            path={`/main/exam/pastPapers`}
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
                Add Past-Paper Packages
              </CustomButton>
            }
            loading={isLoading || isFetching}
          />
        </>
      ),
    },
    {
      id: 3,
      label: "Past-Paper Packages",
      content:
        packageSuccess &&
        !searchTerm &&
        packageData?.data.packageList.length === 0 ? (
          <div className=" h-[93vh] flex justify-center items-center flex-col gap-3">
            <h5 className="text-gray-700 font-semibold font-inter text-base">
              To create package of Past-Papers , bring in Past-Paper created
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
              Add Past-Paper Packages
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
                  width: 220,
                  borderRadius: 5,
                  height: 45,
                }}
              >
                Add Past-Paper Packages
              </CustomButton>
            </div>
            <PaginationTable
              data={packageData?.data.packageList || []}
              columns={packageHeader}
              loading={packageLoading || packageFetching}
              error={packageError}
              path={`/main/exam/pastPapers/package`}
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
              count={packageData?.data.totalItems}
            />
          </>
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
