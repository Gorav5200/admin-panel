import React, { useEffect, useState, useCallback } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Skeleton,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { useGetCoursesQuery } from "../../../../../services/apis/exam/courses";
import { Empty, Result } from "antd";
import { resetCoursesState } from "../../../../../ducks/exams/courseSlice";
import { useDispatch } from "react-redux";
import { dateFormatting } from "../../../../../services/common";
import DebouncedInput from "../../../../common/searchApiField";

function Courses() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const count = parseInt(query.get("count") || "12", 10);
  const searchTerm = query.get("search") || "";



  const { data, isLoading, isSuccess, isError, isFetching } =
    useGetCoursesQuery(
      `/exams/v1/course/basic?page=${page}&limit=${count}&search=${searchTerm}`,
      {
        refetchOnMountOrArgChange: true,
      }
    );

  useEffect(() => {
    dispatch(resetCoursesState());
  }, [dispatch]);

 


  const handleSearch = (term) => {
    navigate(
      `/main/entity/${params.entityId}/course?page=1&count=${count}&search=${term}`
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
    <div className="relative bg-white rounded-md h-[85vh] p-2">
      <div className="p-3 flex justify-between items-center gap-4 sticky top-0">
        <div className="basis-1/3">
          <DebouncedInput
            placeholder="Search by Title"
            onSearch={handleSearch}
            loading={isLoading || isFetching}
            initialValue={searchTerm}
          />
        </div>
        <div className="basis-2/12">
          <Button
            variant="contained"
            startIcon={<PlusCircle size={18} />}
            onClick={() =>
              navigate(`/main/entity/${params.entityId}/course/create`)
            }
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
            Create Course
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-5 gap-y-8 overflow-scroll h-[70vh] pb-10 scrollbar-hide">
        {isLoading || isFetching ? (
          Array.from({ length: 10 }).map((_, ind) => (
            <div key={ind} className="skeleton-card">
              <Skeleton variant="rounded" width={300} height={168} />
              <Skeleton />
              <Skeleton width="60%" />
            </div>
          ))
        ) : isSuccess && data.data.courseList.length === 0 ? (
          <div className="m-auto">
            <Empty description="No Data Found" />
          </div>
        ) : (
          data.data?.courseList?.map((item) => (
            <Card
              key={item._id}
              sx={{
                maxWidth: 375,
                minWidth: 345,
                borderRadius: 2,
                height: "max-content",
              }}
            >
              <CardActionArea
                sx={{ display: "block" }}
                onClick={() =>
                  navigate(
                    `/main/entity/${params.entityId}/course/${item._id}/view`
                  )
                }
              >
                <CardContent
                  component="div"
                  alt="green iguana"
                  sx={{
                    height: "13em",
                    p: 0,
                    position: "relative",
                    backgroundImage: `url(${
                      item.image || "/backgroundImages/bg.png"
                    })`,
                    objectFit: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <Chip
                    label={`₹ ${item?.price || "N/A"}`}
                    color="primary"
                    sx={{ borderRadius: "0 0 5px 0" }}
                  />
                  <h5 className="text-white text-xl font-semibold  m-2 absolute bottom-2">
                    {item?.title || "N/A"}
                  </h5>
                </CardContent>

                <Divider />
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <h5 className="text-secondary  text-sm ">
                    Start:
                    <span className="text-primary font-bold">
                      {item?.startDate
                        ? dateFormatting(item?.startDate).date
                        : "N/A"}
                    </span>
                  </h5>
                  <h5 className="text-secondary  text-sm ">
                    Total Users:
                    <span className="text-primary font-bold">
                      {item?.totalUsers || "N/A"}
                    </span>
                  </h5>
                </CardActions>
                <div className="flex justify-start">
                  <h5 className="text-secondary text-sm mx-2 my-1 basis-[70%]">
                    Created on {dateFormatting(item?.createdAt).date || "N/A"}
                  </h5>
                  <h5 className="text-secondary  text-sm mx-2 my-1 flex items-center basis-[30%] gap-3">
                    Status :
                    <Avatar
                      sx={{
                        backgroundColor: item?.isPublished ? "green" : "red",
                        width: 15,
                        height: 15,
                        color: item?.isPublished ? "green" : "red",
                      }}
                    ></Avatar>
                  </h5>
                </div>
              </CardActionArea>
            </Card>
          ))
        )}
      </div>

      <div className="absolute bottom-0 left-0 p-2 text-center w-full bg-lightGrey flex justify-center border-t">
        <Pagination
          page={page}
          count={Math.ceil(data?.data?.totalItems / count) || 1}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/main/entity/${params.entityId}/course?page=${item.page}&count=${count}&search=${searchTerm}`}
              {...item}
            />
          )}
        />
      </div>
    </div>
  );
}

export default Courses;
