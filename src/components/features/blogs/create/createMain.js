import React, { useState } from "react";
import { HeaderWithNavigation } from "../../../common/header";
import {
  Avatar,
  Chip,
  CircularProgress,
  Collapse,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import SingleImageUpload from "../../../common/singleImageUpload";
import AddTagsModal from "./addTagsModal";
//import QuillEditor from "../../../common/textEditor";
import QuillEditor from "../../../common/FunctionComponents/QuillEditor";
import { CustomButton, CustomButtonStyle } from "../../../../styles/muiRoot";
import {
  useCreateBlogMutation,
  useGetSelectListQuery,
  useUpdateBlogMutation,
} from "../../../../services/apis/blogApi";
import { Empty, message } from "antd";
import { blogApi } from "../../../../services/Constant";
import { HTMLConverter } from "../../../../services/common";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { resetBlogs } from "../../../../ducks/blogSlice";
import { useDispatch } from "react-redux";
import AddCategoryModal from "./addCategoryModal";

function CreateMain() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkType = location.pathname.includes("edit") && params.blogId;
  const [createBlog, { isLoading: createLoading, isError: createError }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: postLoading, isError: postError }] = useUpdateBlogMutation();

  // Authors fetch API
  const {
    authors,
    isLoading: authorLoad,
    isError: authorError,
    isFetching: authorFetching,
  } = useGetSelectListQuery(`auth/v1/user/all/list/blogger`, {
    refetchOnMountOrArgChange: true,

    selectFromResult: ({ data, isLoading, isSuccess }) => {
      if (!isLoading && isSuccess && data) {
        console.log("🚀 ~ CreateMain ~ data:", data);

        return {
          authors: data.data?.users.map((e) => ({ ...e, title: e.name })),
        };
      }
      return [];
    },
  });

  const blogData = useSelector((state) => state.blogs);
  const [values, setValues] = useState(blogData);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleDelete = (id) => {
    setValues((prevValues) => ({
      ...prevValues,
      tags: prevValues.tags.filter((item) => item._id !== id),
    }));
  };

  

  const handleDeleteCategory = (id) => {
    setValues((prevValues) => ({
      ...prevValues,
      categoryId: prevValues.categoryId.filter((item) => item._id !== id),
    }));
  };

  const handleData = () => {
    const modifiedData = {
      ...values,
      tags: values.tags?.map((tag) => tag._id), // Extracting _id values from tags array
    };
    return modifiedData;
  };

  const handleSave = async () => {
    try {
      const response = await createBlog({
        endpoint: `${blogApi.endPoint}/add`,
        data: await handleData(),
      });
      console.log("🚀 ~ handleSave ~ response:", response);

      if (response && response?.data?.success) {
        message.success("Added!", 2.5);
        navigate("/main/blogs");
        // setValues(initialState);
      } else {
        message.error("Some error  to Add !", 2.5);
      }
    } catch (error) {
      console.error("Error add tag api:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await updateBlog({
        endpoint: `${blogApi.endPoint}/update/${params.blogId}`,
        updatedData: await handleData(),
      });
      console.log("🚀 ~ handleSave ~ response:", response);

      if (response && response?.data?.success) {
        message.success("Updated!", 2.5);
        navigate(`/main/blogs/detail/${params.blogId}`);

        dispatch(resetBlogs());
      } else {
        message.error("Some error  to update !", 2.5);
      }
    } catch (error) {
      console.error("Error add to update:", error);
    }
  };
  console.log("🚀 ~ CreateMain ~ values:", values);

  return (
    <div className="h-screen bg-lightGrey">
      <HeaderWithNavigation cont={checkType ? "Edit Blog" : `Create Blog`} />
      <section className="flex gap-5 p-3 ">
        <div className="basis-[75%] bg-white rounded-md h-[calc(100vh-10vh)] overflow-scroll w-full p-5 ">
          <div className="flex justify-between items-start gap-20">
            {/* ========================================left side title=================================== */}
            <div className="w-full">
              <TextField
                label={null}
                sx={{ width: "100%" }}
                placeholder={"Add Title here"}
                value={values.title}
                name="title"
                onChange={handleChange}
              />
              <div className="flex gap-5">
                <FormControl fullWidth margin="normal">
                  <InputLabel id="demo-simple-select-label">
                    Select Author
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.authorId}
                    label="Select Author"
                    name="authorId"
                    onChange={handleChange}
                  >
                    {authorError ? (
                      <MenuItem value="" disabled>
                        <Empty
                          description="Some error occurred"
                          className="mx-auto"
                        />
                      </MenuItem>
                    ) : authorFetching || authorLoad ? (
                      <MenuItem value="" disabled>
                        <div className="text-center w-full">
                          <CircularProgress color="inherit" size={18} />{" "}
                          <p>Loading</p>
                        </div>
                      </MenuItem>
                    ) : authors && authors.length === 0 ? (
                      <MenuItem value="" disabled>
                        <Empty className="mx-auto" />
                      </MenuItem>
                    ) : Array.isArray(authors) ? (
                      authors.map((e, ind) => (
                        <MenuItem key={e._id} value={e._id}>
                          {e.title}
                        </MenuItem>
                      ))
                    ) : null}
                  </Select>
                </FormControl>
              </div>
              {/* description */}
              <TextField
                margin="normal"
                label={null}
                multiline
                rows={5}
                sx={{ width: "100%" }}
                placeholder={"Add Description"}
                name="description"
                value={values.description}
                onChange={handleChange}
              />

              <div className="flex justify-between gap-2 rounded  ">
                <div className="m-2 basis-[50%]">
                  <br />
                  <h4 className="text-xl text-gray-700 font-semibold">
                    Add Categories
                  </h4>
                  <small className="text-gray-500">
                    Your Selected Categories
                  </small>

                  <Collapse in={values?.categoryId?.length > 0}>
                    <Stack
                      direction={"row"}
                      flexWrap={"wrap"}
                      justifyContent="flex-start"
                      gap={2}
                      mt={2}
                    >
                      {values.categoryId?.map(
                        ({ title, _id, thumbnail }, ind) => (
                          <Chip
                            avatar={
                              <Avatar
                                alt="profile"
                                src={thumbnail}
                                // sx={{ borderRadius:1 }}
                              />
                            }
                            key={ind}
                            label={
                              <span className="font-inder text-black text-xs">
                                {title}
                              </span>
                            }
                            variant="outlined"
                            sx={{
                              width: "fit-content",
                              // borderRadius: 2,
                              borderColor: "#336792",
                            }}
                            size="large"
                            onDelete={() => handleDeleteCategory(_id)}
                          />
                        )
                      )}
                    </Stack>
                  </Collapse>
                  {/* ====================================ADD CATEGORIES MODAL================================== */}
                  <AddCategoryModal
                    checked={values.categoryId || []}
                    setChecked={(val) =>
                      setValues((prev) => ({ ...prev, categoryId: val }))
                    }
                  />
                </div>
                <Divider orientation="vertical" variant="middle" flexItem />
                {/* =====================================ADD TAGS MODAL======================================== */}
                <div className="m-2 basis-[50%]">
                  <br />
                  <h4 className="text-xl text-gray-700 font-semibold">
                    Add Tags
                  </h4>
                  <small className="text-gray-500">
                    Associate blogs to tags, and help user search better{" "}
                  </small>

                  <Collapse in={values?.tags?.length > 0}>
                    <Stack
                      direction={"row"}
                      flexWrap={"wrap"}
                      justifyContent="flex-start"
                      gap={2}
                      mt={2}
                    >
                      {values.tags?.map(({ name, _id }, ind) => (
                        <Chip
                          key={ind}
                          label={
                            <span className="font-inder text-black text-xs">
                              {name}
                            </span>
                          }
                          variant="outlined"
                          sx={{
                            width: "fit-content",
                            // borderRadius: 2,
                            borderColor: "#336792",
                          }}
                          size="large"
                          onDelete={() => handleDelete(_id)} // Call handleDelete function passing the index
                        />
                      ))}
                    </Stack>
                  </Collapse>

                  <AddTagsModal
                    checked={values.tags || []}
                    setChecked={(val) =>
                      setValues((prev) => ({ ...prev, tags: val }))
                    }
                  />
                </div>
              </div>
            </div>
            {/* Image div */}
            <div>
              <SingleImageUpload
                endpoint={"admin/v1/blogs/basic/upload/image"}
                setData={(val) => setValues({ ...values, thumbnail: val })}
                data={values.thumbnail}
              />
            </div>
          </div>

          
          {/*------------------------------------------ Editor bottom --------------------------------------*/}
          <div className="my-3">
            <QuillEditor
              setValue={(val) => setValues((pre) => ({ ...pre, content: val }))}
              value={values.content}
              placeholder="Write explainations..."
            />
          </div>
          <CustomButton
            style={{
              ...CustomButtonStyle,
              width: 117,
              height: 39,
              borderRadius: 6,

              float: "right",
              m: 2,
            }}
            onClick={checkType ? handleUpdate : handleSave}
          >
            {checkType ? "Save Changes" : `Save & continue`}
          </CustomButton>
        </div>
        <div className="basis-[25%] bg-medGrey rounded-md h-[calc(100vh-10vh)] p-2">
          <h5 className="text-primary text-base font-bold font-inder p-2">
            Preview
          </h5>
          <div className="h-[94%] bg-white rounded-md overflow-scroll text-justify p-2  scrollbar-hide">
            <h5 className="font-bold text-xl mt-1 ">{values.title}</h5>
            <p className="text-sm text-gray-600 font-inder my-2">
              {values.description}
            </p>
            <Divider />
            <div className="m-1">
              <img
                className="bg-cover object-fill"
                src={values?.thumbnail}
                width={"100%"}
                height={"auto"}
              />
            </div>
            <div className=" flex gap-2 justify-start flex-wrap my-2 content-center">
              {values.tags?.map((item) => (
                <Chip
                  label={item.name}
                  size="medium"
                  variant="filled"
                  sx={{
                    background: `#d7d7d7 linear-gradient(147deg, #d7d7d7 0%, #353535 64%)`,
                    color: "whitesmoke",
                  }}
                />
              ))}
            </div>
            <HTMLConverter>{values?.content}</HTMLConverter>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CreateMain;




