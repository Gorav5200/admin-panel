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
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { useGetCoursesQuery } from "../../../../../../services/apis/exam/courses";
import { Empty, Result } from "antd";
import { resetCoursesState } from "../../../../../../ducks/exams/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getSectionsDetail,
  dateFormatting,
} from "../../../../../../services/common";
import DebouncedInput from "../../../../../common/searchApiField";
import { courseApi } from "../../../../../../services/Constant";

function Courses() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [filterCourses, setFilterCourses] = useState([]);
  const { entity } = useSelector((state) => state.entity);
  const entityId = getSectionsDetail(entity, params.examId)?._id;

  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const count = parseInt(query.get("count") || "12", 10);
  const searchTerm = query.get("search") || "";

  const { data, isLoading, isSuccess, isError, isFetching } =
    useGetCoursesQuery(
      `${courseApi.endPoint}/basic/entityType/${params.examId}?page=${page}&count=${count}&search=${searchTerm}`,
      {
        refetchOnMountOrArgChange: true,
      }
    );

  useEffect(() => {
    if (isSuccess && data?.data?.courseList) {
      setFilterCourses(data.data.courseList);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    dispatch(resetCoursesState());
  }, [dispatch]);

  if (isError) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <Result
          status="404"
          title="404"
          subTitle="Some error occurred to fetch data"
          extra={<Button type="primary">Back Home</Button>}
        />
      </div>
    );
  }



  const handleSearch = (term) => {
    navigate(
      `/main/exam/${params.examId}/courses?page=1&count=${count}&search=${term}`
    );
  };

  return (
    <div className="relative">
      <div className="p-3 flex justify-between items-center gap-4 sticky top-0">
        <div className="basis-1/3">
          <DebouncedInput
            placeholder="Search by Title"
            onSearch={handleSearch}
            loading={isLoading || isFetching}
            initialValue={searchTerm}
            disabled={!data?.data?.courseList}
          />
        </div>
        <div className="basis-2/12">
          <Button
            variant="contained"
            startIcon={<PlusCircle size={18} />}
            onClick={() => navigate(`/main/entity/${entityId}/course/create`)}
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

      <div className="flex flex-wrap justify-between gap-5 gap-y-8 overflow-scroll h-[75vh] pb-10 scrollbar-hide">
        {isLoading || isFetching ? (
          Array.from({ length: 20 }).map((_, ind) => (
            <div key={ind} className="skeleton-card">
              <Skeleton variant="rounded" width={300} height={168} />
              <Skeleton />
              <Skeleton width="60%" />
            </div>
          ))
        ) : filterCourses?.length === 0 ? (
          <div className="m-auto">
            <Empty description="No Data Found" />
          </div>
        ) : (
          filterCourses?.map((item) => (
            <Card
              key={item._id}
              sx={{
                maxWidth: 400,
                minWidth: 345,
                borderRadius: 2,
                height: "max-content",
              }}
            >
              <CardActionArea
                sx={{ display: "block" }}
                onClick={() =>
                  navigate(`/main/entity/${entityId}/course/${item._id}/view`)
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
                  <h5 className="text-secondary text-sm">
                    Start:
                    <span className="text-primary font-bold">
                      {item?.startDate
                        ? dateFormatting(item?.startDate).date
                        : "N/A"}
                    </span>
                  </h5>
                  <h5 className="text-secondary text-sm">
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
                  <h5 className="text-secondary text-sm mx-2 my-1 flex items-center basis-[30%] gap-3">
                    Status:
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
              to={`/main/exam/${params.examId}/courses?page=${item.page}&count=${count}&search=${searchTerm}`}
              {...item}
            />
          )}
        />
      </div>
    </div>
  );
}

export default Courses;
