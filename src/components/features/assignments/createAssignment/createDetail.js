import React, { useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Empty, message } from "antd";
import { CustomButton, CustomButtonStyle } from "../../../../styles/muiRoot";
import { subjectApi } from "../../../../services/Constant";
import { useGetSubjectListQuery } from "../../../../services/apis/dataManagement/subject";
import { SmileOutlined } from "@ant-design/icons";
import { createAssignment } from "../../../../ducks/assignmentSlice";
import DatePickerComp from "../../../common/datePicker";
import { RewardChart } from "../../../../services/common";
import { AssignmentSchema } from "../../../../services/utilities/formSchemas";

const CreateDetail = ({ handleNext }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { entity } = useSelector((state) => state.entity);
  const state = useSelector((state) => state.assignment);
  const [formDetail, setFormDetail] = useState(state.newAssignment);
  const [errors, setErrors] = useState({});

  const {
    data: subjectList,
    isLoading: subLoading,
    isError: subError,
  } = useGetSubjectListQuery(`${subjectApi.endPoint}/list`, {
    refetchOnMountOrArgChange: true,
  });

  const handleContinue = () => {
    const validateForm = AssignmentSchema(formDetail);
    if (Object.keys(validateForm).length === 0) {
      dispatch(createAssignment(formDetail));
      handleNext();
    }else{
          console.log("🚀 ~ handleContinue ~ validateForm:", validateForm);
    setErrors(validateForm);
    message.error("Please Fill Correct Form");
    }

  };
 

  // const handleChange = (event) => {
  //   const { name, value, type, checked } = event.target;
  //   console.log("target name", name, value);
  //   setFormDetail((prevFormDetail) => ({
  //     ...prevFormDetail,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));

    
  //   if (name === "backgroundImage") {
  //     setFormDetail((prev) => ({ ...prev, backgroundImage: value?.image }));
  //   }

  //   if (errors.hasOwnProperty([name])) {
  //     const { [name]: removed, ...others } = errors;
  //     setErrors(others);
  //   }
  // };

   const handleChange = (event) => {
     const { name, value, type, checked } = event.target;
     console.log("target name", name, checked);
     setFormDetail((prevFormDetail) => {
       let newFormDetail = {
         ...prevFormDetail,
         [name]: type === "checkbox" ? checked : value,
       };

    
       return newFormDetail;
     });

 
     if (errors.hasOwnProperty([name])) {
       const { [name]: removed, ...others } = errors;
       setErrors(others);
     }
   };


  const getTopics = useMemo(() => {
    if (formDetail?.subject) {
      const data = subjectList?.data;
      const findTopic = data?.find((e) => e._id === formDetail.subject);
      return findTopic;
    } else {
      return [];
    }
  }, [formDetail.subject, subjectList]);

  const getSubTopics = useMemo(() => {
    if (formDetail?.subject) {
      const data = getTopics?.topic_list;
      const findSubtopic = data?.find((e) => e._id === formDetail.topic);
      return findSubtopic?.subtopic_list;
    } else {
      return [];
    }
  }, [formDetail.topic, subjectList]);

  console.log("🚀 ~ CreateDetail ~ formDetail:", formDetail);

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormDetail((prevState) => ({
      ...prevState,
      isCommonTimer: value === "isCommonTimer",
      commonTimer: value === "timePerQuestion" && null,
      timePerQuestion:
        value === "isCommonTimer" ? null : prevState.timePerQuestion,
    }));
  };

  //   useEffect(() => {
  //     if (!formDetail.coinCheck) {
  //       setFormDetail((prevState) => ({ ...prevState, coin: "" }));
  //     }
  //     if (!formDetail.pointCheck) {
  //       setFormDetail((prevState) => ({ ...prevState, points: "" }));
  //     }
  //     if (!formDetail.rewards) {
  //       setFormDetail((prevState) => ({
  //         ...prevState,
  //         toppersReward: { first: "", second: "", third: "" },
  //       }));
  //     }
  //     if (!formDetail.paid.status) {
  //       setFormDetail((prevState) => ({
  //         ...prevState,
  //         paid: { status: false, charge: "" },
  //       }));
  //     }
  //   }, [
  //     formDetail.coinCheck,
  //     formDetail.pointCheck,
  //     formDetail.rewards,
  //     formDetail.paid,
  //   ]);

  console.log("🚀 ~ LearnDetails ~ formDetail:", formDetail);

  return (
    <>
      <div className=" bg-white rounded-md  mt-3 w-full">
        <section className="relative flex justify-center items-center"></section>

        <div className="flex w-5/6  justify-around p-2 ">
          {/* left side div of form */}
          <div className=" w-full   p-2  flex flex-col gap-4">
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

            <div>
              <h5 className="font-medium font-inter my-2">Topic</h5>
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
            </div>

            <div className="entity">
              <InputLabel
                shrink
                htmlFor="entity"
                sx={{
                  fontSize: 20,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  color: "#455564",
                }}
              >
                Select Entity
              </InputLabel>

              <FormControl sx={{ width: "100%" }}>
                <Select
                  labelId="demo-simple-select-label"
                  size="small"
                  id="demo-simple-select"
                  placeholder="Select Entity"
                  name="entity"
                  value={formDetail.entity}
                  error={errors.entity ? true : false}
                  // helperText={errors.teacher}
                  onChange={handleChange}
                >
                  {!entity ? (
                    <MenuItem value="" disabled>
                      Error loading Entity
                    </MenuItem>
                  ) : entity?.length === 0 ? (
                    <MenuItem value="" disabled>
                      <Empty className="mx-auto" />
                    </MenuItem>
                  ) : Array.isArray(entity) ? (
                    entity?.map((e, ind) => (
                      <MenuItem key={e._id} value={e._id}>
                        {e.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No Entity available
                    </MenuItem>
                  )}
                </Select>

                <FormHelperText>
                  <p className="text-red-700">{errors?.entity}</p>
                </FormHelperText>
              </FormControl>
            </div>

            <div>
              <h5 className="font-medium font-inter my-2">
                Submission Deadline
              </h5>
              <DatePickerComp
                style={{ height: 10, width: "100%" }}
                size="small"
                data={formDetail.submissionDeadline}
                setData={(val) =>
                  handleChange({
                    target: {
                      name: "submissionDeadline",
                      value: val,
                    },
                  })
                }
                name="submissionDeadline"
              />
            </div>
            <small className="text-red-700 ml-1 my-1">
              {errors?.submissionDeadline}
            </small>
            <div className="mt-8">
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
              <small className="text-red-700 ml-1 my-1">
                {errors?.toppersReward}
              </small>
            </div>
          </div>
          {/* right Div of form */}
          <div className="w-full   p-2  flex flex-col gap-2">
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

            <div>
              <h5 className="font-medium font-inter my-2">SubTopic</h5>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  labelId="demo-simple-select-label"
                  size="small"
                  id="aria-multiselectable"
                  multiple
                  error={errors.subTopics ? true : false}
                  helperText={errors.subTopics}
                  value={
                    formDetail.subTopics?.some(
                      (value) => typeof value === "object"
                    )
                      ? formDetail.subTopics.map((value) => value._id)
                      : formDetail.subTopics
                  }
                  placeholder="Select Subject"
                  name="subTopics"
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
                  ) : getSubTopics?.length === 0 ? (
                    <MenuItem value="" disabled>
                      <div style={{ textAlign: "center", width: "100%" }}>
                        <SmileOutlined style={{ fontSize: 20 }} />
                        <p>No Sub-topics available</p>
                      </div>
                    </MenuItem>
                  ) : formDetail?.topic && Array.isArray(getSubTopics) ? (
                    getSubTopics?.map((topic) => (
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
            </div>

            <div className="entityType w-full mt-2">
              <InputLabel
                shrink
                htmlFor="entityType"
                sx={{
                  fontSize: 20,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  color: "#455564",
                }}
              >
                Select Entity Type
              </InputLabel>

              {/* Subject or topic field */}

              <FormControl sx={{ width: "100%" }}>
                <Select
                  labelId="demo-simple-select-label"
                  size="small"
                  id="demo-simple-select"
                  placeholder="Select entityType"
                  name="entityType"
                  disabled={!formDetail.entity}
                  value={formDetail.entityType}
                  error={errors.entityType ? true : false}
                  // helperText={errors.teacher}
                  onChange={handleChange}
                >
                  {!entity ? (
                    <MenuItem value="" disabled>
                      Error loading entity
                    </MenuItem>
                  ) : entity.length === 0 ? (
                    <MenuItem value="" disabled>
                      <Empty className="mx-auto" />
                    </MenuItem>
                  ) : Array.isArray(entity) ? (
                    entity?.[
                      entity.findIndex((e) => e._id == formDetail?.entity)
                    ]?.entityType?.map((e) => (
                      <MenuItem key={e._id} value={e._id}>
                        {e.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No Subject available
                    </MenuItem>
                  )}
                </Select>
                <FormHelperText>
                  <p className="text-red-700"> {errors.entityType}</p>
                </FormHelperText>
              </FormControl>
            </div>
            <div className="mt-1.5">
              <RadioGroup
                aria-labelledby="demo-error-radios"
                name="quiz"
                value={
                  formDetail.isCommonTimer ? "isCommonTimer" : "timePerQuestion"
                }
                row
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="isCommonTimer"
                  control={<Radio />}
                  label={
                    <h5 className="font-medium font-inter my-2 text-black">
                      Is Common Timer
                    </h5>
                  }
                />
                <FormControlLabel
                  value="timePerQuestion"
                  control={<Radio />}
                  label={
                    <h5 className="font-medium font-inter my-2 text-black">
                      Time Per Question
                    </h5>
                  }
                />
              </RadioGroup>
              <TextField
                variant="outlined"
                size="small"
                type="number"
                placeholder="Enter Time "
                name={
                  formDetail.isCommonTimer ? "commonTimer" : "timePerQuestion"
                }
                value={
                  formDetail.isCommonTimer
                    ? formDetail.commonTimer
                    : formDetail.timePerQuestion
                }
                // error={errors.isCommonTimer || }
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

            <div className="flex  items-start gap-3 mt-5 pt-1">
              {/* <h5 className="font-medium font-inter my-2">Class Description</h5> */}
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
                    error={errors.coin}
                    value={formDetail.coin}
                    helperText={errors.coin}
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
                    error={errors.points}
                    helperText={errors.points}
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
                        value: {
                          ...formDetail.paid,
                          status: e.target.checked,
                          charge: "",
                        },
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
                    error={errors.paid}
                    helperText={errors.paid}
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

            <section className="flex items-start gap-3 mt-3 pt-1 w-full">
              <div>
                <h5 className="font-medium font-inter my-2">Positive Marks</h5>
                <TextField
                  variant="outlined"
                  type="number"
                  size="small"
                  placeholder="Enter  here"
                  name="positiveMarks"
                  value={formDetail.positiveMarks}
                  error={errors.positiveMarks ? true : false}
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
                <small className="text-red-700 ml-1 my-1">
                  {errors.positiveMarks}
                </small>
              </div>
              <div>
                <h5 className="font-medium font-inter my-2">Negative Marks</h5>
                <TextField
                  variant="outlined"
                  size="small"
                  type="number"
                  placeholder="Enter  here"
                  name="negativeMarks"
                  value={formDetail.negativeMarks}
                  error={errors.negativeMarks ? true : false}
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
                <small className="text-red-700 ml-1 my-1">
                  {errors.negativeMarks}
                </small>
              </div>
            </section>
          </div>
        </div>
        <div className="w-5/6">
          <RewardChart handleChange={handleChange} values={formDetail} />
          <small className="text-red-700 ml-1 ">
            {errors.rewardGrantChart}
          </small>
        </div>
      </div>
      <div>
        <CustomButton
          size="small"
          onClick={handleContinue}
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
          Save & Continue
        </CustomButton>
      </div>
    </>
  );
};

export default CreateDetail;
