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
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Empty, Result } from "antd";
import { useDispatch } from "react-redux";
import SearchField from "../../../common/searchField";
import { CustomButton, CustomButtonStyle } from "../../../../styles/muiRoot";
import {
  HTMLConverter,
  dateFormatting,
  truncateTitle,
} from "../../../../services/common";
import { resetBlogs } from "../../../../ducks/blogSlice";
import withQueryParams from "../../../common/FunctionComponents/withQueryParams";
import DebouncedInput from "../../../common/searchApiField";

function DraftedBlogs({ isLoading, isFetching, blogs, isError,queryParams,totalItems }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const  location=useLocation();
  const count = queryParams.count || 20;

  useEffect(() => {
    dispatch(resetBlogs());
  }, []);
  console.log("🚀 ~ Home ~ data:", blogs);

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
      `${location.pathname}?type=unPublish&page=1&count=${count}&search=${term}`
    );
  };
  return (
    <div>
      <div className=" p-2 bg-white rounded-md  flex flex-col gap-4 sticky top-0">
        {/* Search header section */}
        {!queryParams.search && blogs?.length === 0 ? (
          <div className="h-[80vh] flex justify-center items-center">
            <Empty
              description="No Data Found"
              children={
                <CustomButton
                  variant="contained"
                  startIcon={<PlusCircle size={18} />}
                  onClick={() => navigate(`/main/blogs/create`)}
                  sx={{
                    ...CustomButtonStyle,
                    borderRadius: 2,
                    width: 178,
                    height: 40,
                  }}
                >
                  Create Blog
                </CustomButton>
              }
            />
          </div>
        ) : (
          <>
            <section className="flex justify-between items-baseline px-2 ">
              <div className="w-1/3 self-end ">
                {isLoading || isFetching ? (
                  <Skeleton />
                ) : (
                  <DebouncedInput
                    placeholder="Search by Title"
                    onSearch={handleSearch}
                    loading={isLoading || isFetching}
                    initialValue={queryParams.search}
                  />
                )}
              </div>

              <div className="self-end pb-2">
                <CustomButton
                  variant="contained"
                  startIcon={<PlusCircle size={18} />}
                  onClick={() => navigate(`/main/blogs/create`)}
                  sx={{
                    ...CustomButtonStyle,
                    borderRadius: 2,
                    width: 178,
                    height: 40,
                  }}
                >
                  Create Blog
                </CustomButton>
              </div>
            </section>
            <Divider />
            {/* Card Section */}
            {queryParams.search && blogs?.length === 0 ? (
              <div className="  h-[calc(100vh-25vh)]  flex justify-center items-center">
                <Empty description="No Data Found" />
              </div>
            ) : (
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-3 gap-5 overflow-scroll h-[calc(100vh-20vh)] ">
                {isLoading || isFetching
                  ? // Render loading skeleton here
                    Array.from({ length: 20 }).map((_, ind) => (
                      <div key={ind} className="skeleton-card">
                        <Skeleton variant="rounded" width={300} height={168} />
                        <Skeleton />
                        <Skeleton width="60%" />
                      </div>
                    ))
                  : blogs?.map(
                      ({
                        tags,
                        description,
                        _id,
                        createdAt,
                        title,
                        thumbnail,
                      }) => (
                        <Card
                          key={_id}
                          sx={{
                            maxWidth: 345,
                            minWidth: 345,
                            height: "max-content",
                          }}
                        >
                          <CardActionArea
                            sx={{ display: "block" }}
                            onClick={() =>
                              navigate(`/main/blogs/detail/${_id}`)
                            }
                          >
                            <CardContent
                              component="div"
                              alt="green iguana"
                              sx={{
                                height: "13em",
                                p: 0,
                                position: "relative",
                                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${`${thumbnail?.[0]}`})`,
                                objectFit: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                              }}
                            >
                              <Stack
                                className="absolute bottom-2 w-full overflow-scroll scrollbar-hide scrroll-smooth"
                                spacing={2}
                                direction="row"
                                mx={1}
                              >
                                {tags?.map(({ _id, name }) => (
                                  <Chip
                                    label={name}
                                    key={_id}
                                    size="small"
                                    variant="filled"
                                    sx={{
                                      bgcolor: "#000000BF",
                                      color: "whitesmoke",
                                    }}
                                  />
                                ))}
                              </Stack>
                            </CardContent>

                            <Divider />
                            <CardContent sx={{ p: 1 }}>
                              <h5 className="font-semibold text-xl mb-1">
                                {" "}
                                {truncateTitle(title, 3)}
                              </h5>
                              <p className="font-inder text-left text-sm h-14">
                                <HTMLConverter>
                                  {truncateTitle(description, 14)}
                                </HTMLConverter>
                              </p>
                            </CardContent>
                            <br />
                            <small className="text-gray-400 absolute bottom-0 right-0 m-3  ">
                              Created on {dateFormatting(createdAt)?.date}
                            </small>
                          </CardActionArea>
                        </Card>
                      )
                    )}
              </section>
            )}
          </>
        )}
      </div>
      <div className="absolute bottom-0 left-0 p-2 text-center w-full bg-lightGrey flex justify-center border-t">
        <Pagination
          page={queryParams.page}
          count={Math.ceil(queryParams / count) || 1}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`${location.pathname}?page=${item.page}&count=${count}&search=${queryParams.search}`}
              {...item}
            />
          )}
        />
      </div>
    </div>
  );
}

export default withQueryParams(DraftedBlogs);
