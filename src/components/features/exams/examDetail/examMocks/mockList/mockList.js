import React, { useEffect, useMemo, useState } from "react";
import PaginationTable from "../../../../../common/PaginationTable";
import Header from "../../../../../common/header";
import { Avatar } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FullWidthTabs from "../../../../../common/tabChanger";
import PackageHome from "../mockTestPackage/packageHome";
import { Button, Empty, Result } from "antd";
import { useGetMockListQuery } from "../../../../../../services/apis/exam/mock";
import MockAnalysis from "../mockAnalysis/mockAnalysis";
import { resetState } from "../../../../../../ducks/mockSlice";
import { useDispatch } from "react-redux";
import { mockTestHeader } from "../../../../../../services/constHeaders";
import SearchField from "../../../../../common/searchField";
import {
  CustomButton,
  CustomButtonStyle,
} from "../../../../../../styles/muiRoot";
import { PlusCircle } from "lucide-react";
import DebouncedInput from "../../../../../common/searchApiField";
import { useSelector } from "react-redux";

function MockList() {
  const params = useParams();
  const navigate = useNavigate();
  const examId = params.examId;
  const location = useLocation();
  const dispatch = useDispatch();
const {activeEntityTitle} = useSelector(state => state.drawer)
  const query = new URLSearchParams(location.search);
  const pageNo = parseInt(query.get("page")) || 1;
  const count = parseInt(query.get("count")) || 20;
  const searchTerm = query.get("search") || "";
  const [page, setPage] = useState(pageNo);
  const [rowsPerPage, setRowsPerPage] = useState(count);
  const [resetPagination, setResetPagination] = useState(false);
  const [activeTab, setActiveTab] = useState(2);


  const {
    data: listData,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetMockListQuery(
    `/exams/v1/mockTest/entity/${examId}?page=${page}&limit=${rowsPerPage}&search=${searchTerm}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);



  const getMockData = useMemo(() => {
    const data = listData?.data.flatMap((e) => ({
      ...e,
      sections: e.sections?.map((e) => e.section.title)?.join(),
    }));

    return data || [];
  }, [listData]);

  const handlePageChange = (data) => {
    setPage(data.page);
    setRowsPerPage(data.rowsPerPage);
    navigate(
      `/main/exam/${params.examId}/mocks?page=${data.page}&count=${data.rowsPerPage}&search=${searchTerm}`
    );
  };

  const handleSearch = (term) => {
    setPage(1);
    navigate(
      `/main/exam/${params.examId}/mocks?page=1&count=${rowsPerPage}&search=${term}`
    );
  };

  if (isError) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <Result
          status="404"
          title="404"
          subTitle={"Some error occurred to fetch data"}
          extra={<Button type="primary">Back Home</Button>}
        />
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Header content={`${activeEntityTitle} Mock Test`} />
      <div className="bg-white p-3 m-2 rounded-md ">
        <FullWidthTabs
          data={[
            {
              item: 1,
              label: "Mock Analysis",
              content: <MockAnalysis />,
            },
            {
              item: 2,
              label: "Mock Test",
              content: (
                <PaginationTable
                  error={isError}
                  pageChange={handlePageChange}
                  count={listData?.totalItems}
                  resetPagination={resetPagination}
                  data={getMockData || []}
                  placeholder="Search by topics, subjects"
                  searchBar={
                    listData && (
                      <DebouncedInput
                        placeholder="Search by topics, subjects"
                        onSearch={handleSearch}
                        loading={isLoading || isFetching}
                        initialValue={searchTerm}
                        disabled={!listData?.data || isError}
                      />
                    )
                  }
                  comp={
                    <CustomButton
                      startIcon={<PlusCircle size={18} />}
                      onClick={() =>
                        navigate(`/main/exam/${params.examId}/mocks/create`)
                      }
                      style={{
                        ...CustomButtonStyle,
                        width: 220,
                        borderRadius: 5,
                        height: 45,
                      }}
                    >
                      Create Mock
                    </CustomButton>
                  }
                  columns={mockTestHeader}
                  path={`/main/exam/${examId}/mocks`}
                  loading={isLoading || isFetching}
                  success={isSuccess}
                />
              ),
            },
            {
              item: 3,
              label: "Mocktest Packages",
              content: <PackageHome />,
            },
          ]}
          setHeading={setActiveTab}
        />
      </div>
    </div>
  );
}

export default MockList;
