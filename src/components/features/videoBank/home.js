import React, { useState, useEffect } from "react";
import Header from "../../common/header";
import { MediaModalCard } from "../../common/cards";
import { Divider, Grid, Paper, Skeleton } from "@mui/material";
import {
  Link,
  MemoryRouter,
  Route,
  Routes,
  useLocation,

} from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useGetVideoQuery } from "../../../services/apis/commonApi";
import { videoBank } from "../../../services/Constant";
import { Empty } from "antd";
import { PlusCircle } from "lucide-react";
import { CustomButton, CustomButtonStyle } from "../../../styles/muiRoot";
import InputWithIcon from "../../common/searchBox";
import AddVideoModal from "./addVideo";
import { debounce } from "lodash";

function Home() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 16);
  const count = parseInt(query.get("count") || "16", 16);
  const [values, setValues] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalType, setModalType] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearchDebounced = debounce((term) => {
    setSearchTerm(term);
    setLoading(false);
  }, 1500);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchQuery(term);
    setLoading(true);
    handleSearchDebounced(term);
  };

  const { data, isLoading, isFetching, isSuccess, refetch,isError } = useGetVideoQuery(
    `${videoBank.endPoint}/list?${
      searchTerm && `search=${searchTerm}&`
    }page=${page}&limit=${count}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Update API query with the new search query
      // Refetch data automatically due to refetchOnMountOrArgChange: true
    }, 500); // Adjust debounce time as needed
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);



  return (
    <div>
      <Header content="Video Bank" />
      <Paper
        sx={{
          p: 2,
          m: 1,
          borderRadius: 4,
          position: "relative",
        }}
      >
        <section className="flex justify-between items-baseline mb-2 ">
          <div className="w-1/3 self-end ">
            {false ? (
              <Skeleton />
            ) : (
              <InputWithIcon
                disabled={false}
                placeholder={"Search By Topic"}
                onChange={handleSearch}
                value={searchQuery}
                loading={loading}
              />
            )}
          </div>

          <div className="self-end ">
            <CustomButton
              variant="contained"
              startIcon={<PlusCircle size={18} />}
              onClick={() => {
                setModalData({});
                setModalType("create");
                setOpen(true);
              }}
              sx={{
                ...CustomButtonStyle,
                borderRadius: 2,
                width: 178,
                height: 40,
              }}
            >
              Add Video
            </CustomButton>
          </div>
        </section>
        <Divider className="my-2" />

        {isSuccess && data?.data?.videoBank.length === 0 ? (
          <div className="flex justify-center items-center h-[80vh]">
            <Empty
              description={
                <h5 className="font-inter text-sm font-medium">
                  No data Found
                </h5>
              }
            />
          </div>
        ) : isError ?
        <div className="flex justify-center items-center h-[80vh]">
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Some error occured"/>
  </div>
       :(
          <Grid
            container
            spacing={2}
            sx={{
              mt: 1,
              alignItems: "flex-start",
              height: "80vh",
              overflow: "scroll",
              position: "relative",
              pb: 10,
            }}
          >
            {isLoading || isFetching
              ? Array.from({ length: 20 }).map((_, ind) => (
                  <Grid item key={ind} xs={12} sm={6} md={4} lg={3}>
                    <div key={ind} className="skeleton-card ">
                      <Skeleton variant="rounded" width={"100%"} height={168} />
                      <Skeleton />
                      <Skeleton width="60%" />
                    </div>
                  </Grid>
                ))
              : data?.data?.videoBank.map((item, ind) => (
                  <Grid item key={ind} xs={12} sm={6} md={4} lg={3}>
                    <MediaModalCard
                      data={item}
                      key={ind}
                      setValues={setValues}
                      values={values}
                      navigate={false}
                      openModal={open}
                      handleCloseModal={() => setOpen(false)}
                      handleOpenModal={() => {
                        setModalData({ ...item, topicId: item.topicId?._id });
                        setModalType("edit");
                        setOpen(true);
                      }}
                    />
                  </Grid>
                ))}
          </Grid>
        )}
        <div className="absolute bottom-0 left-0 p-2 text-center w-full bg-lightGrey flex justify-center border-t rounded-b-2xl">
          <Pagination
            page={page}
            count={Math.ceil(data?.data?.totalCount / 20) || 1}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/main/video/bank${
                  item.page === 1 ? "" : `?page=${item.page}&count=${count}`
                }`}
                {...item}
              />
            )}
          />
        </div>
        <AddVideoModal
          type={modalType}
          data={modalData}
          refetch={refetch}
          openModal={open}
          handleCloseModal={() => {
            setModalData({});
            setOpen(false);
          }}
          modalType={modalType}
        />
      </Paper>
    </div>
  );
}

export default Home;

export function PaginationLink() {
  return (
    <MemoryRouter initialEntries={["/main/video/bank"]} initialIndex={0}>
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </MemoryRouter>
  );
}
