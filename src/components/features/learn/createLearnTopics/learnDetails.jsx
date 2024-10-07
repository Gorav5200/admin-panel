import React, { useState, useEffect, useMemo } from "react";
import { Checkbox, Collapse, FormControlLabel, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Empty } from "antd";
import { CustomButton, CustomButtonStyle } from "../../../../styles/muiRoot";
import { createLearn } from "../../../../ducks/learnSlice";
import { subjectApi } from "../../../../services/Constant";
import { useGetSubjectListQuery } from "../../../../services/apis/dataManagement/subject";
import { SmileOutlined } from "@ant-design/icons";

const LearnDetails = ({ handleStep }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.learn);
  const [formDetail, setFormDetail] = useState(state.newLearn);
  const [errors, setErrors] = useState({});

  const {
    data: subjectList,
    isLoading: subLoading,
    isError: subError,
  } = useGetSubjectListQuery(`${subjectApi.endPoint}/list`, {
    refetchOnMountOrArgChange: true,
  });

  const getTopics = useMemo(() => {
    if (formDetail?.subject) {
      const data = subjectList?.data;
      const findTopic = data?.find((e) => e._id === formDetail.subject);
      return findTopic;
    } else {
      return [];
    }
  }, [formDetail.subject,subjectList]);

  const getSubTopic = useMemo(() => {
    if (formDetail?.subject) {
      const data = getTopics?.topic_list;
      const findSubtopic = data?.find((e) => e._id === formDetail.topic);
      return findSubtopic?.subtopic_list;
    } else {
      return [];
    }
  }, [formDetail.topic,subjectList]);



  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formDetail.title?.trim()) {
      newErrors.title = "Class Name is required";
      isValid = false;
    }

    if (!formDetail.topic) {
      newErrors.topic = "Topic is required";
      isValid = false;
    }
    if (!formDetail.subTopic?.length === 0) {
      newErrors.subTopic = "Sub-Topic is required";
      isValid = false;
    }

    if (!formDetail.description?.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const { name, value,type, checked } = event.target;
    console.log("target name", name, value);
    setFormDetail((prevFormDetail) => ({
      ...prevFormDetail,
      [name]: type === "checkbox" ? checked : value,
    }));


    if (errors.hasOwnProperty([name])) {
      const { [name]: removed, ...others } = errors;
      setErrors(others);
    }
  };

  const handleSubmit = () => {
    // const res = validateForm();
    const res = true;
    if (res) {
      console.log(formDetail);
      dispatch(createLearn(formDetail));
      handleStep(1);
    }
  };



  return (
    <>
      <div className=" bg-white  rounded-md  mt-3 w-full p-3">
      
        <div className="flex w-5/6 gap-5">
          <div className="w-full  flex flex-col gap-3 ">
            <div>
              <h5 className="font-medium font-inter my-2">Title</h5>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Enter name here"
                name="title"
                value={formDetail.title}
                error={errors.title ? true : false}
                sx={{
                  width: "100%",
                  "&:hover": {
                    borderColor: "transparent",
                    outline: "none",
                    border: "none",
                  },
                }}
                onChange={handleChange}
              />
              <small className="text-red-700 ml-1 my-1">{errors.title}</small>
            </div>

            <Collapse in={formDetail.subject ? true : false}>
              <h5 className="font-medium font-inter my-2 ">Topic</h5>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  labelId="demo-simple-select-label"
                  size="small"
                  id="demo-simple-select"
                  error={errors.topic ? true : false}
                  helperText={errors.topic}
                  value={
                    typeof formDetail.topic === "object"
                      ? formDetail.topic._id
                      : formDetail.topic
                  }
                  placeholder="Select Subject"
                  name="topic"
                  onChange={handleChange}
                >
                  {subLoading ? (
                    <MenuItem value="" disabled>
                      Loading...
                    </MenuItem>
                  ) : subError ? (
                    <MenuItem value="" disabled>
                      Error loading topics
                    </MenuItem>
                  ) : getTopics?.topic_list?.length === 0 ? (
                    <MenuItem value="" disabled>
                      <Empty className="mx-auto" />
                    </MenuItem>
                  ) : Array.isArray(getTopics?.topic_list) ? (
                    getTopics.topic_list.map((topic) => (
                      <MenuItem key={topic.id} value={topic._id}>
                        {topic.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      <div style={{ textAlign: "center", width: "100%" }}>
                        <SmileOutlined style={{ fontSize: 20 }} />
                        <p>No Topics available</p>
                      </div>
                    </MenuItem>
                  )}
                </Select>
                <small className="text-red-700 ml-1 my-1">{errors.topic}</small>
              </FormControl>
            </Collapse>

            <div className="flex  items-start gap-3 ">
              <div>
                <FormControlLabel
                  value="coinCheck"
                  name="coinCheck"
                  checked={formDetail.coinCheck}
                  control={<Checkbox />}
                  label={<span className="font-medium font-inter ">Coin</span>}
                  labelPlacement="end"
                  onChange={handleChange}
                />

                <Collapse in={formDetail?.coinCheck}>
                  <TextField
                    variant="filled"
                    size="small"
                    label="Enter value"
                    name="coin"
                    value={formDetail.coin}
                    type="number"
                    sx={{
                      width: "100%",
                      "&:hover": {
                        borderColor: "transparent",
                        outline: "none",
                        border: "none",
                      },
                    }}
                    onChange={handleChange}
                  />
                </Collapse>
              </div>

              <div>
                <FormControlLabel
                  value="points"
                  name="pointCheck"
                  checked={formDetail.pointCheck}
                  control={<Checkbox />}
                  label={
                    <span className="font-medium font-inter ">Points</span>
                  }
                  labelPlacement="end"
                  onChange={handleChange}
                />
                <Collapse in={formDetail?.pointCheck}>
                  <TextField
                    variant="filled"
                    size="small"
                    label="Enter Points"
                    name="points"
                    value={formDetail.points}
                    type="number"
                    sx={{
                      width: "100%",
                      "&:hover": {
                        borderColor: "transparent",
                        outline: "none",
                        border: "none",
                      },
                    }}
                    onChange={handleChange}
                  />
                </Collapse>
              </div>

              <div>
                <FormControlLabel
                  value="paid"
                  name="paid"
                  checked={formDetail.paid.status}
                  control={<Checkbox />}
                  label={<span className="font-medium font-inter ">Paid</span>}
                  labelPlacement="end"
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "paid",
                        value: { ...formDetail.paid, status: e.target.checked },
                      },
                    })
                  }
                />
                <Collapse in={formDetail?.paid?.status}>
                  <TextField
                    variant="filled"
                    size="small"
                    label="Enter charges"
                    name="charges"
                    value={formDetail.paid?.charge}
                    type="number"
                    sx={{
                      width: "100%",
                      "&:hover": {
                        borderColor: "transparent",
                        outline: "none",
                        border: "none",
                      },
                    }}
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "paid",
                          value: { ...formDetail.paid, charge: e.target.value },
                        },
                      })
                    }
                  />
                </Collapse>
              </div>
            </div>

            <div >
          <h5 className="font-medium font-inter mb-2">Learn Description</h5>

          <TextField
            sx={{ width: "100%" }}
            id="outlined-multiline-static"
            placeholder="Enter package higlights here..."
            multiline
            rows={4}
            name="description"
            value={formDetail.description}
            error={errors.description ? true : false}
            helperText={errors.description}
            onChange={handleChange}
          />
            </div>


         
          </div>

           {/* Right side div */}
          <div className=" w-full flex flex-col gap-3 ">
            <div>
              <h5 className="font-medium font-inter my-2">Subject</h5>

              <FormControl sx={{ width: "100%" }}>
                <Select
                  labelId="demo-simple-select-label"
                  size="small"
                  id="demo-simple-select"
                  value={
                    typeof formDetail.subject === "object"
                      ? formDetail.subject._id
                      : formDetail.subject
                  }
                  placeholder="Select Subject"
                  name="subject"
                  error={errors.subject ? true : false}
                  helperText={errors.subject}
                  onChange={handleChange}
                >
                  {subLoading ? (
                    <MenuItem value="" disabled>
                      Loading...
                    </MenuItem>
                  ) : subError ? (
                    <MenuItem value="" disabled>
                      Error loading subjects
                    </MenuItem>
                  ) : subjectList?.data.length === 0 ? (
                    <MenuItem value="" disabled>
                      <Empty className="mx-auto" />
                    </MenuItem>
                  ) : Array.isArray(subjectList?.data) ? (
                    subjectList?.data.map((topic) => (
                      <MenuItem key={topic._id} value={topic._id}>
                        {topic.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No subjects available
                    </MenuItem>
                  )}
                </Select>
                <small className="text-red-700 ml-1 my-1">
                  {errors.subject}
                </small>
              </FormControl>
            </div>

            <Collapse in={formDetail.subject ? true : false}>
              <h5 className="font-medium font-inter mb-2">SubTopic</h5>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  labelId="demo-simple-select-label"
                  size="small"
                  id="aria-multiselectable"
                  error={errors.subTopic ? true : false}
                  helperText={errors.subTopic}
                  value={formDetail.subTopic}
                  placeholder="Select Subject"
                  name="subTopic"
                  onChange={handleChange}
                >
                  {subLoading ? (
                    <MenuItem value="" disabled>
                      Loading...
                    </MenuItem>
                  ) : subError ? (
                    <MenuItem value="" disabled>
                      Error loading SubTopics
                    </MenuItem>
                  ) : getSubTopic?.length === 0 ? (
                    <MenuItem value="" disabled>
                      <div style={{ textAlign: "center", width: "100%" }}>
                        <SmileOutlined style={{ fontSize: 20 }} />
                        <p>No Sub-topics available</p>
                      </div>
                    </MenuItem>
                  ) : formDetail?.topic && Array.isArray(getSubTopic) ? (
                    getSubTopic?.map((topic) => (
                      <MenuItem key={topic._id} value={topic._id}>
                        {topic.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No subTopics available
                    </MenuItem>
                  )}
                </Select>
                <small className="text-red-700 ml-1 my-1">
                  {errors.subTopics}
                </small>
              </FormControl>
            </Collapse>

            <div>
              <FormControlLabel
                value="rewardCheck"
                name="rewardCheck"
                checked={formDetail.rewardCheck}
                control={<Checkbox />}
                label={
                  <span className="font-medium font-inter ">
                    Add Topper Rewards
                  </span>
                }
                labelPlacement="end"
                onChange={handleChange}
              />
              <Collapse in={formDetail?.rewardCheck}>
                <Stack spacing={2}>
                  <TextField
                    variant="filled"
                    size="small"
                    label="1st Reward"
                    value={formDetail.toppersReward.first}
                    type="number"
                    name="toppersReward"
                    sx={{
                      width: "100%",
                      "&:hover": {
                        borderColor: "transparent",
                        outline: "none",
                        border: "none",
                      },
                    }}
                    onChange={(e) => {
                      handleChange({
                        target: {
                          name: "toppersReward",
                          value: {
                            ...formDetail.toppersReward,
                            first: e.target.value,
                          },
                        },
                      });
                    }}
                  />
                  <TextField
                    variant="filled"
                    size="small"
                    label="2nd Reward"
                    name="toppersReward"
                    value={formDetail.toppersReward.second}
                    type="number"
                    sx={{
                      width: "100%",
                      "&:hover": {
                        borderColor: "transparent",
                        outline: "none",
                        border: "none",
                      },
                    }}
                    onChange={(e) => {
                      handleChange({
                        target: {
                          name: "toppersReward",
                          value: {
                            ...formDetail.toppersReward,
                            second: e.target.value,
                          },
                        },
                      });
                    }}
                  />
                  <TextField
                    variant="filled"
                    size="small"
                    label="3rd Reward"
                    name="toppersReward"
                    value={formDetail.toppersReward.third}
                    type="number"
                    sx={{
                      width: "100%",
                      "&:hover": {
                        borderColor: "transparent",
                        outline: "none",
                        border: "none",
                      },
                    }}
                    onChange={(e) => {
                      handleChange({
                        target: {
                          name: "toppersReward",
                          value: {
                            ...formDetail.toppersReward,
                            third: e.target.value,
                          },
                        },
                      });
                    }}
                  />
                </Stack>
              </Collapse>
            </div>
          </div>
        </div>

    
       
      </div>
      <div>
        <CustomButton
          size="small"
          onClick={handleSubmit}
          sx={{
            ...CustomButtonStyle,
            width: "150px",
            height: "40px",
            borderRadius: 2,
            float: "right",
            my: 2,
            "&:hover": {
              backgroundColor: "black",
            },
          }}
        >
          Save & continue
        </CustomButton>
      </div>
    </>
  );
};

export default LearnDetails;
