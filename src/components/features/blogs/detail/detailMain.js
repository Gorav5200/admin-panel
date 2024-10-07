import React, { useState, useEffect } from "react";
import { HeaderWithNavigation } from "../../../common/header";
import { Button, Chip, Divider, Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import Icon from "../../../common/Icon";

import { blogApi } from "../../../../services/Constant";

import { useGetBlogByIdQuery } from "../../../../services/apis/blogApi";
import { useNavigate, useParams } from "react-router-dom";
import { BackdropLoader } from "../../../common/lineLoader";
import {
  HTMLConverter,
  capitalizeFirstLetter,
  checkQuestionType,
  dateFormatting,
  truncateTitle,
} from "../../../../services/common";
import { Image, Result, message } from "antd";
import { useDispatch } from "react-redux";
import { setBlogData } from "../../../../ducks/blogSlice";
import { useHandlePatchRequestMutation as useUpdateStatusMutation } from "../../../../services/apis/commonApi";

function DetailMain() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, isError, isFetching, refetch } = useGetBlogByIdQuery(
    `${blogApi.endPoint}/detail/${params.blogId}`,
    {
      refetchOnMountOrArgChange: true,
      selectFromResult: ({ data, isLoading }) => {
        if (!isLoading && data) {
          console.log("🚀 ~ DetailMain ~ result:", data);
          return { data: data?.data.blog };
        }
        return { data: {} }; // Ensure a default return value if conditions aren't met
      },
    }
  );
  const [
    updateStatus,
    {
      isLoading: statusLoading,
      isError: statusError,
      isSuccess: statusSuccess,
      error,
    },
  ] = useUpdateStatusMutation();

  const getStatusLabel = (status) => {
    if (!status) return;
    const lowerCaseStatus = status.toLowerCase();
    if (lowerCaseStatus === "publish") return "Un-Publish";
    if (lowerCaseStatus === "unpublish") return "Publish";
    return "Unknown"; // default case, you can handle other statuses if needed
  };

  const handleEdit = () => {
    try {
      const {
        title,
        tags,
        description,
        thumbnail,
        content,
        authorId,
        categoryId,
      } = data;
      const res = dispatch(
        setBlogData({
          title,
          tags,
          description,
          thumbnail: thumbnail?.[0],
          content,
          authorId: authorId?._id,
          categoryId: categoryId,
        })
      );
      navigate(`/main/blogs/edit/${params.blogId}`);
      console.log("🚀 ~ handleEdit ~ res:", res);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log("🚀 ~ DetailMain ~ data:", data);

  if (isError || statusError) {
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

  return (
    <>
      {isLoading || isFetching || statusLoading ? (
        <BackdropLoader isOpen={isLoading || isFetching} />
      ) : (
        <div className="h-screen">
          <HeaderWithNavigation
            cont={`Blogs/${
              data?.title ? truncateTitle(data?.title, 4) : "N/A"
            }`}
          />

          <div className="h-[93%] bg-white mx-3 rounded-md p-2 overflow-scroll">
            <header className="flex justify-between align-top  p-2 items-center">
              <div className="flex gap-2 items-start">
                <Avatar
                  sx={{ width: 35, height: 35, color: "transparent" }}
                  src={data?.authorId?.profilePic}
                />
                <div className="text-darkblue italic  text-sm">
                  <p className="font-bold">
                    {" "}
                    Author :{" "}
                    <span className="font-normal underline underline-offset-1">
                      {data?.authorId?.name}
                    </span>
                  </p>
                  <small className="font-inder text-secondar  underline-offset-1">
                    (Last updated on {dateFormatting(data?.updatedAt).date})
                  </small>
                </div>
              </div>

              <Stack direction="row" spacing={3}>
                <Button
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                  }}
                  startIcon={<Icon name="FileEdit" color="#336792" size={20} />}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                  }}
                  startIcon={<Icon name="Files" color="#336792" size={20} />}
                  //   onClick={()=>{
                  //     const state={id:params.qid, handleDuplicateClick:true}
                  //     navigate(`/main/exam/${params.examId}/qbank/create`,{state})
                  //   }}
                >
                  Duplicate
                </Button>

                <Button
                  onClick={async (e) => {
                    console.log("e", e.target.id);
                    const res = await updateStatus({
                      endpoint: `${blogApi.endPoint}/status/${params.blogId}/${e.target.id}`,
                    });

                    console.log("🚀 ~ onClick={async ~ res:", error);
                    if (res?.data?.success) {
                      message.success(
                        `Blog ${capitalizeFirstLetter(e.target.id)}`
                      );
                      refetch(); //call detail api on success
                    } else message.error(`${error?.error}`);
                  }}
                  id={data?.status === "publish" ? "unPublish" : "publish"}
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                  }}
                  startIcon={<Icon name="BookKey" size={20} color="#336792" />}
                >
                  {getStatusLabel(data?.status)}
                </Button>
              </Stack>
            </header>

            <Divider />

            <div className="overflow-hidden p-2 ">
              <span className="float-right m-4">
                <Image
                  src={data?.thumbnail?.[0] ?? ""}
                  alt="No image"
                  preview={false}
                  height={273}
                  width={455}
                  className="rounded-lg"
                />{" "}
              </span>

              <h5 className="text-xl font-bold ">{data.title}</h5>
              <p className="text-sm text-gray-600 ">{data?.description}</p>

              <Stack spacing={2} direction="row" flexWrap={"wrap"} my={2}>
                {data?.tags?.map(({ _id, name }) => (
                  <Chip
                    key={_id}
                    label={name}
                    size="medium"
                    variant="filled"
                    sx={{
                      background: `#d7d7d7 linear-gradient(147deg, #d7d7d7 0%, #353535 64%)`,
                      color: "whitesmoke",
                    }}
                  />
                ))}
              </Stack>
              <p className="text-left">
                <HTMLConverter>{data?.content}</HTMLConverter>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailMain;
