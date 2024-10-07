import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Pagination,
  PaginationItem,
  Skeleton,
} from "@mui/material";
import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import InputWithIcon from "../../common/searchBox";
import { dateFormatting, filterData } from "../../../services/common";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { useGetCoursesQuery } from "../../../services/apis/exam/courses";
import { Empty, Result } from "antd";
import { resetCoursesState } from "../../../ducks/exams/courseSlice";
import { useDispatch } from "react-redux";
import { HeaderWithNavigation } from "../../common/header";
import { resetAddModule } from "../../../ducks/addModuleSlice";
import {
  modulesApi,
  useGetModulesQuery,
} from "../../../services/apis/modulesApi";
import { moduleApi } from "../../../services/Constant";
import TruncateText from "../../common/FunctionComponents/truncate";
import SearchField from "../../common/searchField";
import DebouncedInput from "../../common/searchApiField";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || 1);
  const count = parseInt(query.get("count") || 12);
  const searchTerm = query.get("search") || "";

  const { data, isLoading, isSuccess, isError, isFetching } =
    useGetModulesQuery(
      `${moduleApi.endPoint}/list?page=${page}&limit=${count}${
        searchTerm && `&search=${searchTerm}`
      }`,
      {
        refetchOnMountOrArgChange: true,
      }
    );

  useEffect(() => {
    dispatch(resetAddModule());
  }, []);
  console.log("🚀 ~ Home ~ data:", data);

  if (isError) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <Result
          status="404"
          title="404"
          subTitle={"Some error occured to fetch data"}
          extra={<Button type="primary">Back Home</Button>}
        />
      </div>
    );
  }

  const handleSearch = (term) => {
    navigate(
      `/main/exam/module?page=1&count=${count}${term && `&search=${term}`}`
    );
  };
  return (
    <div className="relative">
      <HeaderWithNavigation cont={"Modules"} />
      <div className="flex justify-between items-center gap-4 sticky top-0 p-2">
        <div className="basis-1/3">
          {isLoading || isFetching ? (
            <Skeleton />
          ) : (
            <DebouncedInput
              placeholder="Search by Title"
              onSearch={handleSearch}
              loading={isLoading || isFetching}
              initialValue={searchTerm}
            />
          )}
        </div>
        <div className="basis-2/12">
          <Button
            variant="contained"
            startIcon={<PlusCircle size={18} />}
            onClick={() => navigate(`/main/exam/module/create`)}
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
            Create Module
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4   sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 max-xl:grid-cols-4 gap-5 gap-y-8 overflow-auto h-[85vh] my-2 p-3 bg-white rounded-md m-2 relative">
        {isLoading || isFetching ? (
          // Render loading skeleton here
          Array.from({ length: 20 }).map((_, ind) => (
            <div key={ind} className="skeleton-card">
              <Skeleton variant="rounded" width={300} height={168} />
              <Skeleton />
              <Skeleton width="60%" />
            </div>
          ))
        ) : searchTerm && isSuccess && data?.data.moduleList?.length === 0 ? (
          <div className="h-[80vh] flex justify-center items-center w-full">
            <Empty description="No Matches Found" />
          </div>
        ) : isSuccess && !searchTerm && data?.data.moduleList?.length === 0 ? (
          <div className="h-[80vh] flex justify-center items-center w-full">
            <Empty description="No Data Found" />
          </div>
        ) : (
          data?.data.moduleList?.map((item) => (
            <Card
              key={item._id}
              sx={{
                maxWidth: 345,
                minWidth: 345,
                borderRadius: 2,
                height: "max-content",
              }}
              className="mx-auto"
            >
              <CardActionArea
                sx={{ display: "block" }}
                onClick={() => navigate(`/main/exam/module/${item._id}`)}
              >
                <CardContent
                  component="div"
                  alt="module background"
                  sx={{
                    height: "13em",
                    p: 0,
                    position: "relative",
                    backgroundImage: `url(${"/backgroundImages/bg.png"})`,
                    objectFit: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <h5 className="text-white text-xl font-semibold m-2 absolute bottom-2">
                    {item?.title || "N/A"}
                  </h5>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <h5 className="text-secondary text-sm">
                    Entity:
                    <span className="text-primary font-bold">
                      {item?.entity || "N/A"}
                    </span>
                  </h5>
                  <h5 className="text-secondary text-sm">
                    Entity Type:
                    <span className="text-primary font-bold">
                      {item?.entityType || "N/A"}
                    </span>
                  </h5>
                </CardActions>
                <div className="flex justify-start">
                  <h5 className="text-secondary text-sm ml-2 my-1 basis-[70%]">
                    <TruncateText text={item.description} maxLength={14} />
                  </h5>
                  <h5 className="text-secondary text-sm ml-0 mx-2 my-1 flex items-center basis-[32%] gap-2">
                    Subject: {item?.subject || "N/A"}
                  </h5>
                </div>
              </CardActionArea>
            </Card>
          ))
        )}
        <div className="absolute bottom-1 left-0 p-2 text-center w-full bg-lightGrey flex justify-center border-t">
          <Pagination
            page={page}
            count={Math.ceil(data?.data?.totalItems / count) || 1}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/main/exam/module?page=${item.page}&count=${count}${
                  searchTerm ? `&search=${searchTerm}` : ""
                }`}
                {...item}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
