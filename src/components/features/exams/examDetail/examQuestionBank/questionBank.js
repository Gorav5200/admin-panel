import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button, Box, Paper, Chip, Popover, Collapse } from "@mui/material";
import { Filter } from "lucide-react";
import InputWithIcon from "../../../../common/searchBox";
import useCustomRouter from "../../../../../services/utilities/customRouter";
import Header from "../../../../common/header";
import { useSelector, useDispatch } from "react-redux";
import { useGetQuestionListQuery } from "../../../../../services/apis/exam/questionBank";
import { questionApi } from "../../../../../services/Constant";
import {
  setSearchData,
  resetQuestionBank,
  resetQuestionList,
} from "../../../../../ducks/questionBankSlice";
import PaginationTable from "../../../../common/PaginationTable";
import { Result, Button as AntdButton } from "antd";
import { debounce } from "lodash";
import { questionBankHeader } from "../../../../../services/constHeaders";

function QuestionBank() {
  const { navigate, params } = useCustomRouter();
  const dispatch = useDispatch();
  const [resetPagination, setResetPagination] = useState(false);
  const { searchData } = useSelector((state) => state.questionBank);
  const { examDetails } = useSelector((state) => state.exam);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [queryParameters, setQueryParameters] = useState(
    searchData?.queryParams || ""
  );
  const inputRef = useRef(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedChips, setSelectedChips] = useState(
    searchData?.selectedChips || []
  );
  const [searchValue, setSearchValue] = useState(searchData?.searchValue || "");
  const [anchorEl, setAnchorEl] = useState(null);
  const examId = examDetails?.examId || params.examId;

  const {
    data: questionListRes,
    isLoading,
    isFetching,
    isError,
  } = useGetQuestionListQuery(
    `${questionApi.endPoint}/entity/${examId}?page=${page}&size=${rowsPerPage}${
      queryParameters && `&${queryParameters}`
    }`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (examId !== params.examId) {
      dispatch(resetQuestionBank({}));
      makeApiRequest();
    }
  }, [examId]);

  useEffect(() => {
    setSearchValue(searchData?.searchValue || "");
    setQueryParameters(searchData?.queryParams || "");
    setSelectedChips(searchData?.selectedChips || []);
  }, [searchData]);

  const handleInputClick = (event) => {
    if (searchValue) {
      return;
    }
    setAnchorEl(event.currentTarget);
    setIsPopoverOpen(true);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };

  const makeApiRequest = (searchTerm = "") => {
    const queryParameters = selectedChips
      .map((chip) => `${chip}=${searchTerm?.toLowerCase().replace(/\s+/g, "")}`)
      .join("&");
    setQueryParameters(queryParameters);
    setPage(1);
    navigate(
      `/main/exam/${examId}/qbank?${searchTerm && `${queryParameters}`}`
    );
    dispatch(
      setSearchData({
        searchValue: searchTerm,
        selectedChips: selectedChips,
        queryParams: queryParameters,
      })
    );
    dispatch(resetQuestionList({}));
    setResetPagination(true);
  };

  const handleChipClick = (value) => {
    const updatedChips = selectedChips.includes(value)
      ? selectedChips.filter((chip) => chip !== value)
      : [value];
    setSelectedChips(updatedChips);
  };

  const handlePageChange = (data) => {
    setPage(data.page);
    setRowsPerPage(data.rowsPerPage);
  };

  const handleSearchDebounced = useCallback(
    debounce((term) => {
      makeApiRequest(term);
    }, 800),
    [selectedChips]
  );

  if (isError) {
    return (
      <div className="h-screen">
        <Header content={"Question Bank"} />

        <div className="bg-white p-3 m-2 rounded-md h-5/6">
          <Result
            status="404"
            title="404"
            subTitle="Sorry,Some error to fetch data"
            extra={
              <AntdButton onClick={() => navigate(`/main/exam`)}>
                Back Home
              </AntdButton>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Header content={"Question Bank"} />

      <div className="bg-white p-3 m-2 rounded-md">
        <PaginationTable
          data={questionListRes?.question_banks}
          placeholder="Search by topics, subjects"
          loading={isLoading || isFetching}
          comp={
            <Button
              variant="contained"
              onClick={() => navigate(`/main/exam/${examId}/qbank/create`)}
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
              Create questions
            </Button>
          }
          searchBar={
            <Box sx={{ "& > :not(style)": { m: 0 } }}>
              <InputWithIcon
                placeholder="Search by  MockTag or Question Type"
                handleChange={(e) => {
                  const value = e.target.value;
                  setSearchValue(value);
                  handleSearchDebounced(value);
                }}
                loading={isLoading || isFetching}
                value={searchValue}
                onClick={handleInputClick}
                ref={inputRef}
              />

              <Collapse in={isPopoverOpen}>
                <Popover
                  open={isPopoverOpen}
                  anchorEl={anchorEl}
                  onClose={handleClosePopover}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <Paper sx={{ p: 2 }}>
                    <h5 className="font-inter font-medium text-gray-800 flex items-center">
                      Search By : <Filter size={18} />
                    </h5>
                    <div className="flex gap-3 mt-2">
                      {[
                        { name: "MockTag", value: "mock_tag" },

                        { name: "Question Type", value: "question_type" },
                      ].map((item) => (
                        <Chip
                          key={item.value}
                          label={item.name}
                          onClick={() => handleChipClick(item.value)}
                          color={
                            selectedChips.includes(item.value)
                              ? "primary"
                              : "default"
                          }
                        />
                      ))}
                    </div>
                  </Paper>
                </Popover>
              </Collapse>
            </Box>
          }
          columns={questionBankHeader}
          path={`/main/exam/${examId}/qbank`}
          pageChange={handlePageChange}
          count={questionListRes?.count || 0}
          resetPagination={resetPagination}
        />
      </div>
    </div>
  );
}

export default QuestionBank;
