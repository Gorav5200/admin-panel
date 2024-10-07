import React, { useEffect, useState } from "react";
import { rewardsApi } from "../../../../services/Constant";
import { useGetRewardListQuery } from "../../../../services/apis/rewardsApi";
import { Box, Divider, Paper, Stack } from "@mui/material";
import {
  CustomButton,
  ButtonStyle,
  CustomButtonStyle,
} from "../../../../styles/muiRoot";
import PaginationTable from "../../../common/PaginationTable";
import { RewardsHeader } from "../tableHeaders";
import { Award, PlusCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { randomColors, truncateTitle } from "../../../../services/common";
import DebouncedInput from "../../../common/searchApiField";
import InfiniteScroll from "react-infinite-scroll-component";
import { isError } from "lodash";

function RewardsHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("search") || "";
  const [data, setData] = useState([]);

  const [hasMore, setHasMore] = useState(false);

  const [scrollPage, setScrollPage] = useState(1);
  const [scrollRowsPerPage, setScrollRowsPerPage] = useState(20);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const {
    data: scrollGetData,
    isLoading: scrollIsLoading,
    isFetching: scrollIsFetching,
  } = useGetRewardListQuery(
    `${rewardsApi.rewardsEndPoint
    }/list/?page=${scrollPage}&limit=${scrollRowsPerPage}${searchTerm ? `&search=${searchTerm}` : ""
    }`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const {
    data: getData,
    isLoading,
    isFetching,
    isError,
  } = useGetRewardListQuery(
    `${rewardsApi.rewardsEndPoint}/list/?page=${page}&limit=${rowsPerPage}${searchTerm ? `&search=${searchTerm}` : ""
    }`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (scrollGetData?.data.rewards) {
      if (scrollPage === 1) {
        setData(scrollGetData.data.rewards);
      } else {
        setData((prev) => [...prev, ...scrollGetData.data.rewards]);
      }

      setHasMore(data?.length < scrollGetData.data.totalItems);
    }
  }, [scrollGetData, scrollPage]);

  const fetchMoreData = () => {
    setScrollPage((prev) => prev + 1);
  };

  const handlePageChange = (data) => {
    setPage(data.page);
    setRowsPerPage(data.rowsPerPage);
  };

  const handleSearch = (term) => {
    setPage(1);
    setScrollPage(1);
    navigate(
      `/main/rewards?page=1&count=${20}${term ? `&search=${term}` : ""}`
    );
  };


  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={1}
      >
        <div className="basis-1/6">
          <DebouncedInput
            placeholder="Search by Reward"
            onSearch={(term) => handleSearch(term)}
            loading={
              isLoading || isFetching || scrollIsLoading || scrollIsFetching
            }
            initialValue={searchTerm}
          />
        </div>
        <CustomButton
          startIcon={<PlusCircle />}
          onClick={() => navigate(`/main/rewards/create`)}
          style={{
            ...CustomButtonStyle,
            width: 186,
            borderRadius: 5,
            height: 45,
          }}
        >
          Create Rewards
        </CustomButton>
      </Stack>

      <InfiniteScroll
        dataLength={data?.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        <Stack
          spacing={3}
          direction={"row"}
          overflow={"scroll"}
          p={2}
          className="scrollbar-hide"
          id="scrollableDiv"
        >
          {data?.map(({ title, coins, thumbnail, _id }) => (
            <div key={_id}>
              <div
                className="w-60 h-[30ch] p-3 flex flex-col gap-1 rounded-2xl text-white relative group overflow-hidden"
                style={{ background: randomColors(["#339287", "#336792"]) }}
              >
                <Box
                  component="img"
                  sx={{ objectFit: "cover" }}
                  src={thumbnail}
                  alt="Thumbnail Image"
                  className="h-48 rounded-xl my-2"
                />

                <div className="flex flex-col gap-4">
                  <div className="flex flex-row justify-between mt-2">
                    <div className="flex flex-col ">
                      <span className="text-xl font-semibold font-inder pl-1 group-hover:opacity-100 z-50 title-overflow">
                        {truncateTitle(title,3)}
                      </span>
                      <p className="text-sm flex gap-1 items-center pt-1 group-hover:opacity-100 z-50">
                        <img src="/icons/WinnerStar.png" alt="Star"></img>{" "}
                        {coins}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Position the gradient overlay at the bottom */}
                <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-400"></div>

                {/* Button */}
                <div className="absolute inset-x-0 inset-y-0 flex justify-center items-center w-full opacity-0 group-hover:opacity-100 duration-400 hover:delay-75">
                  <CustomButton
                    onClick={() => navigate(`/main/rewards/detail/${_id}`)}
                    sx={{
                      ...ButtonStyle,
                      color: "white",
                      border: "none",
                      width: 130,
                      height: 40,
                      fontSize: "20px",
                    }}
                    endIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevrons-right animate-bounce-x"
                      >
                        <path d="m6 17 5-5-5-5" />
                        <path d="m13 17 5-5-5-5" />
                      </svg>
                    }
                  >
                    Details
                  </CustomButton>
                </div>
              </div>
            </div>
          ))}
        </Stack>
      </InfiniteScroll>

      <Divider />

      <Paper sx={{ mt: 2 }}>
        <PaginationTable
          data={getData?.data.rewards || []}
          columns={RewardsHeader}
          count={getData?.data.totalItems}
          pageChange={handlePageChange}
          searchBar={
            <h5 className="text-xl font-semibold font-inder text-darkblue flex gap-1">
              {" "}
              <Award /> Rewards List
            </h5>
          }
          path={`/main/rewards/detail`}
          loading={isLoading || isFetching}
          isError={isError}
        />
      </Paper>
    </>
  );
}

export default RewardsHome;
