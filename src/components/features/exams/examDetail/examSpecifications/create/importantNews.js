import React, { useEffect, useState, useRef } from "react";
import { HeaderWithNavigation } from "../../../../../common/header";
import {
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Collapse,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import SingleImageUpload from "../../../../../common/singleImageUpload";
import {
  CustomButton,
  CustomButtonStyle,
} from "../../../../../../styles/muiRoot";
import {
  useGetBlogListQuery,
  useGetSelectListQuery,
} from "../../../../../../services/apis/blogApi";
import { Descriptions, Empty, message } from "antd";
import { blogApi } from "../../../../../../services/Constant";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import PreviewCommon from "./previewCommon";
import {
  setActiveView,
  setImportantNews,
} from "../../../../../../ducks/exams/specificationSlice";
import { X } from "lucide-react";

function ImportantNews() {
  const initialState = {
    title: "",
    description: "",
    blogId: "",
    thumbnail: "",
    isPublised: Boolean,
  };

  const dispatch = useDispatch();
  const { importantNews } = useSelector(
    (state) => state.examSpecification.createSpecificaton
  );
  const [values, setValues] = useState(importantNews ?? [initialState]);
  const latestValues = useRef(values);

  useEffect(() => {
    return () => {
      dispatch(setImportantNews(latestValues.current));
    };
  }, []);

  useEffect(() => {
    latestValues.current = values;
  }, [values]);

  const handleRemove = (ind) => {
    let data = [...values];
    data?.splice(ind, 1);
    setValues(data);
  };

  const handleAdd = () => {
    const data = [...values];
    data.unshift(initialState);
    setValues(data);
  };

  // blogList fetch API
  const {
    blogList,
    isLoading: blogLoad,
    isError: authorError,
    isFetching: authorFetching,
  } = useGetBlogListQuery(`${blogApi.endPoint}/list`, {
    refetchOnMountOrArgChange: true,

    selectFromResult: ({ data, isLoading, isSuccess }) => {
      if (!isLoading && isSuccess && data) {
        return { blogList: data?.data.blogs };
      }
      return [];
    },
  });

 console.log("🚀 ~ ImportantNews ~ blogList:", blogList)

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = [...values];
    updatedData[index] = { ...updatedData[index], [name]: value }; // Update the corresponding item in the values array
    setValues(updatedData);
  };

  const handleContinue = () => {
    try {
      dispatch(setImportantNews(latestValues.current));
      dispatch(setActiveView(5));
      console.log("Dispatch successful");
    } catch (error) {

      console.error("Dispatch failed with error:", error);

    }
  };

  // console.log("🚀 ~ ImportantNews ~ values:", values);

  return (
    <>
      <div className="flex gap-5 h-auto  ">
        <div className="bg-white basis-[70%] py-2 pt-0 h-[90vh] overflow-scroll ">
          <h5 className="text-primary text-base font-bold font-inder p-3 bg-medGrey ">
            Fill News Details
            <button
              className="text-[#336792] text-sm font-inter font-[600] underline underline-offset-4 float-right"
              onClick={handleAdd}
            >
              + Add Card
            </button>{" "}
          </h5>

          <div className="flex flex-col gap-10 p-4 ">
            {values?.map(
              ({ title, description, blogId, isPublished, thumbnail }, ind) => (
                <div className="relative" key={ind}>
                  <IconButton
                    className="z-50"
                    sx={{
                      position: "absolute",
                      right: -10,
                      top: -10,
                      backgroundColor: "#ededed",
                    }}
                    onClick={() => handleRemove(ind)}
                  >
                    <X size={13} />
                  </IconButton>
                  <Card
                    className="scrollbar-hide "
                    sx={{
                      boxShadow: "none",
                      border: "2px solid var(--med-grey)",
                      borderRadius: 2,
                      maxHeight: "25ch",
                      minHeight: "15ch",
                      overflow: "scroll",
                    }}
                  >
                    <CardContent sx={{ p: 0, pb: "5px !important" }}>
                      <Descriptions
                        bordered
                        layout="vertical"
                        size={"small"}
                        items={[
                          {
                            key: "1",
                            label: "Title",
                            children: (
                              <TextField
                                label={null}
                                sx={{ width: 300 }}
                                placeholder={"Add Title here"}
                                value={title}
                                name="title"
                                onChange={(e) => handleChange(e, ind)}
                              />
                            ),
                          },
                          {
                            key: "2",
                            label: "Select Blog",
                            children: (
                              <FormControl sx={{width:300}}>
                                <InputLabel id="demo-simple-select-label">
                                  Select Blog
                                </InputLabel>
                                <Select
                                  value={blogId}
                                  label="Select Blog"
                                  name="blogId"
                                  onChange={(e) => handleChange(e, ind)}
                                >
                                  {authorError ? (
                                    <MenuItem value="" disabled>
                                      <Empty
                                        description="Some error occurred"
                                        className="mx-auto"
                                      />
                                    </MenuItem>
                                  ) : authorFetching || blogLoad ? (
                                    <MenuItem value="" disabled>
                                      <div className="text-center w-full">
                                        <CircularProgress
                                          color="inherit"
                                          size={18}
                                        />{" "}
                                        <p>Loading</p>
                                      </div>
                                    </MenuItem>
                                  ) : blogList && blogList.length === 0 ? (
                                    <MenuItem value="" disabled>
                                      <Empty className="mx-auto" />
                                    </MenuItem>
                                  ) : Array.isArray(blogList) ? (
                                    blogList.map((e, ind) => (
                                      <MenuItem key={e._id} value={e._id}>
                                        {e.title}
                                      </MenuItem>
                                    ))
                                  ) : null}
                                </Select>
                              </FormControl>
                            ),
                          },
                          {
                            key: "3",
                            label: "Thumbnail",
                            children: (
                              <SingleImageUpload
                                setData={(val) =>
                                  handleChange(
                                    {
                                      target: {
                                        name: "thumbnail",
                                        value: val,
                                        id: ind,
                                      },
                                    },
                                    ind
                                  )
                                }
                                data={thumbnail}
                              />
                            ),
                          },
                          {
                            key: "4",
                            label: "Add Description",

                            children: (
                              <TextField
                                multiline
                                minRows={2}
                                maxRows={5}
                                sx={{ width: "100%" }}
                                placeholder={"Add Description"}
                                name="description"
                                value={description}
                                onChange={(e) => handleChange(e, ind)}
                              />
                            ),
                          },
                        ]}
                      />
                    </CardContent>
                  </Card>
                </div>
              )
            )}
          </div>
        </div>
        {/* preview section */}
        <div className="bg-medGrey  basis-[30%] px-2">
          <PreviewCommon>
            <div className="rounded-md ">
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
            </div>
          </PreviewCommon>
        </div>
      </div>
      <CustomButton
        style={{
          ...CustomButtonStyle,
          float: "right",
          position: "absolute",
          right: 15,
          bottom: 30,
        }}
        onClick={handleContinue}
      >
        Save & continue
      </CustomButton>
    </>
  );
}

export default ImportantNews;
