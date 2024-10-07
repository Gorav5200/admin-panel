import React, { useState, useEffect, useMemo } from "react";
import {
  Typography,
  Stack,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useGetListDataQuery } from "../../../../../services/apis/exam/questionBank";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useGetGroupByEntityTypeMutation,
  useGetGroupListQuery,
} from "../../../../../services/apis/exam/group";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Empty, message } from "antd";
import TimePickerComp, { BasicValueProp } from "../../../../common/timePicker";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../../styles/muiRoot";
import {
  assignmentApi,
  blogApi,
  classApi,
  entityApi,
  groupApi,
} from "../../../../../services/Constant";
import { MultipleSelectChipComp } from "../../../../common/selectChipComp";
import { useGetTeachersQuery } from "../../../../../services/apis/commonApi";
import {
  useCreateClassMutation,
  useUpdateClassMutation,
} from "../../../../../services/apis/exam/class";
import { createClass as setCreateClass } from "../../../../../ducks/exams/classSlice";
import { notification, Space } from "antd";
import { useGetAssignmentsQuery } from "../../../../../services/apis/assignmentApi";

const ClassDetails = ({ handleStep }) => {
  const params = useParams();
  const location = useLocation();
  const entityList = useSelector((state) => state.entity.entity);
  const state = useSelector((state) => state.class);
  const [groupList, setGroupList] = useState([]);
  const [formDetail, setFormDetail] = useState(state.newClass);
  const [errors, setErrors] = useState({});
  const [
    createClass,
    { isLoading: postLoading, isError: postErrorStatus, error: postError },
  ] = useCreateClassMutation();
  const [api, contextHolder] = notification.useNotification();
  //Api fetch topic

  const {
    data: listsData,
    isLoading: listLoading,
    isError: listError,
  } = useGetListDataQuery(
    `${entityApi.endPoint}/topic/subtopic/${params.entityId}`,
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  //fetch teachers
  const {
    data: teacherData,
    isLoading: teacherLoading,
    isError: teacherError,
  } = useGetTeachersQuery(`/auth/v1/user/list/teacher`, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [
    getGroupByEntityType,
    { isLoading: getGroupsLoading, isError: getGroupsError },
  ] = useGetGroupByEntityTypeMutation();

  const fetchGroups = async (value) => {
    try {
      const response = await getGroupByEntityType({
        endpoint: `${groupApi.endPoint}/entityTypes`,
        data: { entityType: value },
      });

      console.log("🚀 ~ handleSave ~ response:", response);

      if (response && response?.data?.success) {
        console.log(
          "🚀 ~ fetchGroups ~ response?.data.data:",
          response?.data.data
        );
        setGroupList(response?.data.data);
      } else {
        message.error("Some error  to Add !", 2.5);
      }
    } catch (error) {
      console.error("Error add tag api:", error);
    }
  };

  // console.log("fetch groups",fetchGroups(formDetail.entityType))
  const {
    data: getAssignments,
    isLoading: assignmentLoad,
    isError: assignmentError,
  } = useGetAssignmentsQuery(
    `${assignmentApi.endPoint}/basic/list/${formDetail.topic}`,
    {
      refetchOnMountOrArgChange: true,
      skip: !formDetail.topic,
    }
  );

  const [updateClass, { isLoading: updateLoading }] = useUpdateClassMutation(); //Update class api
  console.log("🚀 ~ ClassDetails ~ getAssignments:", getAssignments);

  const dispatch = useDispatch();
  useEffect(() => {
    if (state.newClass) {
      setFormDetail(state.newClass);
      if (params.classId && state.newClass.groups) {
        fetchGroups(state.newClass?.entityType);
      }
    }
  }, [state.newClass]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formDetail.title?.trim()) {
      newErrors.title = "Class Name is required";
      isValid = false;
    }
    // if (!formDetail.teacher?.trim()) {
    //   newErrors.teacher = "Course Teacher is required";
    //   isValid = false;
    // }
    if (!formDetail.startTime) {
      newErrors.startTime = "Start ime is required";
      isValid = false;
    }
    if (!formDetail.endTime) {
      newErrors.endTime = "End Time is required";
      isValid = false;
    }

    if (!formDetail.topic) {
      newErrors.topic = "Topic is required";
      isValid = false;
    }
    if (!formDetail.subTopics?.length === 0) {
      newErrors.subTopics = "Sub-Topic is required";
      isValid = false;
    }
    if (!formDetail.startDate) {
      newErrors.startDate = "Date is required";
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
    const { name, value } = event.target;
    console.log("🚀 ~ handleChange ~  event.target:", event.target);

    setFormDetail((prevFormDetail) => ({
      ...prevFormDetail,
      [name]: value,
    }));

    if (name === "goLive") {
      setFormDetail((prev) => ({ ...prev, goLive: value === "true" }));
    }

    if (errors.hasOwnProperty([name])) {
      const { [name]: removed, ...others } = errors;
      setErrors(others);
    }
  };

  const handleDateChange = (date) => {
    // Get the current local time
    const currentTime = dayjs().format("HH:mm");

    const combinedDateTime = dayjs
      .utc(date.format("YYYY-MM-DD") + "T" + currentTime)
      .format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    console.log("Combined Date Time (UTC):", combinedDateTime);

    // Set the combined date and time in UTC format with timezone +00:00
    setFormDetail((prevFormDetail) => ({
      ...prevFormDetail,
      startDate: combinedDateTime,
    }));
  };

  const openNotification = () => {
    const key = `open${Date.now()}`;

    const btn = (
      <Space>
        <CustomButton
          sx={{ ...ButtonStyle, width: 110, borderRadius: 2, height: 35 }}
          onClick={() => api.destroy()}
        >
          Cancel
        </CustomButton>
        <CustomButton
          disabled={postLoading || updateLoading}
          sx={{ ...CustomButtonStyle, width: 110, borderRadius: 2, height: 35 }}
          onClick={() => {
            if (location.pathname.includes("edit") && params.classId) {
              handleUpdate();
            } else handleCreate();
          }}
        >
          {postLoading || updateLoading ? (
            <CircularProgress color="inherit" size={18} />
          ) : (
            "Confirm"
          )}
        </CustomButton>
      </Space>
    );
    api.open({
      message: (
        <span className="font-inder text-base font-semibold ">
          Are you sure to want to submit details
        </span>
      ),
      description: (
        <span className="font-inder text-sm ">
          Once You submit all the data , you can not return back on this page,so
          please read carefully before submitting
        </span>
      ),
      btn,
      key,
    });
  };

  const handleCreate = async () => {
    try {
      const res = true;
      if (res) {
        const response = await createClass({
          endpoint: `${classApi.endPoint}`,
          newClass: formDetail,
        });

        console.log("Response:", response);

        if (response && response?.data.success) {
          dispatch(setCreateClass(response?.data.class));
          handleStep(1);
        }
      }
    } catch (error) {
      console.error("Error add Add course:", error);
      message.error("error", 2.5);
    }
  };

  const handleUpdate = async (e) => {
    try {
      // Call the deleteUser mutation
      const response = await updateClass({
        endpoint: `${classApi.endPoint}/update/${params.classId}`,
        updatedData: await formDetail,
      });
      // Navigate to the desired path after successful deletion
      console.log("Response:", response);

      if (response && response?.data?.success) {
        dispatch(setCreateClass(response?.data.class));
        handleStep(1);
      } else {
        message.error("Some error  to edit class!", 2000);
      }
    } catch (error) {
      console.error("Error edit class: api:", error);
    }
  };

  // useEffect(() => {
  //   setFormDetail((prev) => ({ ...prev, groups: [] }));
  // }, [formDetail.entityType]);

  const entityInd = useMemo(() => {
    const selectedIndex = entityList?.findIndex(
      (entity) => entity._id === params.entityId
    );
    return selectedIndex;
  }, [params.entityId]);

  // console.log("🚀 ~ ClassDetails ~ listsData:", listsData);
  // console.log("🚀 ~ ClassDetails ~ postErrorStatus:", postErrorStatus);
  console.log("form details", formDetail);
  console.log("form start date", dayjs(formDetail?.startDate));
  // console.log("🚀 ~ ClassDetails ~ groupList:", groupList);
  // console.log("🚀 ~ ClassDetails ~ teacherData:", teacherData);

  return (
    <>
      {contextHolder}
      <div className=" bg-white justify-start rounded-md  mt-3 w-full flex flex-col sm:flex-row  py-10 px-10">
        {/* left side div of form */}
        <div className=" w-full sm:w-[30%] bg-[#ffff] p-2  mr-2 mt-2 sm:mt-0 flex flex-col gap-4">
          <div>
            <h5 className="font-medium font-inter my-2">Class Name</h5>
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

          <div className="entityType w-full">
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
                multiple
                id="demo-simple-select"
                placeholder="Select entityType"
                name="entityType"
                value={formDetail.entityType}
                onChange={handleChange}
              >
                {!entityList ? (
                  <MenuItem value="" disabled>
                    Error loading entity
                  </MenuItem>
                ) : entityList.length === 0 ? (
                  <MenuItem value="" disabled>
                    <Empty className="mx-auto" />
                  </MenuItem>
                ) : Array.isArray(entityList) ? (
                  entityList?.[entityInd]?.entityType?.map((e) => (
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
            </FormControl>
          </div>

          <div>
            <h5 className="font-medium font-inter my-2">Course teacher</h5>
            <FormControl sx={{ width: "100%" }}>
              <Select
                labelId="demo-simple-select-label"
                size="small"
                id="demo-simple-select"
                placeholder="Select Teacher"
                name="teacher"
                value={formDetail.teacher}
                error={errors.teacher ? true : false}
                helperText={errors.teacher}
                onChange={handleChange}
              >
                {teacherLoading ? (
                  <MenuItem value="" disabled>
                    Loading...
                  </MenuItem>
                ) : teacherError ? (
                  <MenuItem value="" disabled>
                    Error loading teachers
                  </MenuItem>
                ) : teacherData?.data?.data.length === 0 ? (
                  <MenuItem value="" disabled>
                    <Empty className="mx-auto" />
                  </MenuItem>
                ) : Array.isArray(teacherData?.data?.data) ? (
                  teacherData?.data?.data?.map((teacher) => (
                    <MenuItem key={teacher._id} value={teacher._id}>
                      {teacher.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    No Teachers available
                  </MenuItem>
                )}
              </Select>
              <small className="text-red-700 ml-1 my-1">{errors.teacher}</small>
            </FormControl>
          </div>
          <div>
            <h5 className="font-medium font-inter my-2">Class Timing</h5>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <TimePickerComp
                selectedDate={formDetail?.startDate}
                setValue={(val) =>
                  handleChange({
                    target: {
                      name: "startTime",
                      value: val,
                    },
                  })
                }
                value={
                  formDetail.startTime ? dayjs(formDetail.startTime) : null
                }
              />

              <Typography variant="body1">to</Typography>

              <TimePickerComp
                selectedDate={formDetail?.startDate}
                setValue={(val) =>
                  handleChange({
                    target: {
                      name: "endTime",
                      value: val,
                    },
                  })
                }
                value={formDetail.endTime ? dayjs(formDetail.endTime) : null}
              />
            </Stack>

            <small className="text-red-700 ml-1 my-1">{errors.startTime}</small>
            <small className="text-red-700  my-1 ml-auto float-right">
              {errors.endTime}
            </small>
          </div>
          {formDetail.entityType?.length > 0 && (
            <div>
              <h5 className="font-medium font-inter my-2 mt-3.5">Add Groups</h5>

              <MultipleSelectChipComp
                value={formDetail.groups || []}
                data={groupList}
                loading={getGroupsLoading}
                error={getGroupsError}
                onOpen={async () => {
                  if (
                    formDetail?.entityType?.length > 0 &&
                    groupList.length === 0
                  ) {
                    await fetchGroups(formDetail.entityType);
                  }
                }}
                handleChange={(val) =>
                  handleChange({ target: { name: "groups", value: val } })
                }
              />
            </div>
          )}

          {formDetail?.topic && (
            <div>
              <h5 className="font-medium font-inter my-2">Add Assignments</h5>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  labelId="demo-simple-select-label"
                  size="small"
                  id="aria-multiselectable"
                  error={errors.assignment ? true : false}
                  helperText={errors.subTopics}
                  value={formDetail.assignment}
                  placeholder="Select Assignment"
                  name="assignment"
                  onChange={handleChange}
                >
                  {assignmentLoad ? (
                    <MenuItem value="" disabled>
                      Loading...
                    </MenuItem>
                  ) : assignmentError ? (
                    <MenuItem value="" disabled>
                      Error loading SubTopics
                    </MenuItem>
                  ) : getAssignments.data.assignments.length === 0 ? (
                    <MenuItem value="" disabled>
                      <Empty className="mx-auto" />
                    </MenuItem>
                  ) : Array.isArray(getAssignments.data.assignments) ? (
                    getAssignments.data.assignments?.map((topic) => (
                      <MenuItem key={topic._id} value={topic._id}>
                        {topic.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No Assignment available
                    </MenuItem>
                  )}
                </Select>
                <small className="text-red-700 ml-1 my-1">
                  {errors.assignment}
                </small>
              </FormControl>
            </div>
          )}
        </div>
        {/* Center Div of form */}
        <div className=" w-full sm:w-[30%] bg-[#ffff] p-2 mr-2 mt-2 sm:mt-0 flex flex-col gap-2">
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
                {listLoading ? (
                  <MenuItem value="" disabled>
                    Loading...
                  </MenuItem>
                ) : listError ? (
                  <MenuItem value="" disabled>
                    Error loading topics
                  </MenuItem>
                ) : listsData?.data?.topic.length === 0 ? (
                  <MenuItem value="" disabled>
                    <Empty className="mx-auto" />
                  </MenuItem>
                ) : Array.isArray(listsData?.data?.topic) ? (
                  listsData?.data?.topic?.map((topic) => (
                    <MenuItem key={topic.id} value={topic._id}>
                      {topic.title}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    No topics available
                  </MenuItem>
                )}
              </Select>
              <small className="text-red-700 ml-1 my-1">{errors.topic}</small>
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
                  formDetail.subTopics.some(
                    (value) => typeof value === "object"
                  )
                    ? formDetail.subTopics.map((value) => value._id)
                    : formDetail.subTopics
                }
                placeholder="Select Subject"
                name="subTopics"
                onChange={handleChange}
              >
                {listLoading ? (
                  <MenuItem value="" disabled>
                    Loading...
                  </MenuItem>
                ) : listError ? (
                  <MenuItem value="" disabled>
                    Error loading SubTopics
                  </MenuItem>
                ) : listsData?.data?.subtopic.length === 0 ? (
                  <MenuItem value="" disabled>
                    <Empty className="mx-auto" />
                  </MenuItem>
                ) : Array.isArray(listsData?.data?.subtopic) ? (
                  listsData?.data?.subtopic?.map((topic) => (
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

          <div className=" flex gap-3 items-start justify-between">
            <section>
              <h5 className="font-medium font-inter my-2">Class Date</h5>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Select Date"
                    slotProps={{ textField: { size: "small" } }}
                    name="startDate"
                    value={
                      formDetail.startDate ? dayjs(formDetail.startDate) : null
                    }
                    error={errors.startDate ? true : false}
                    helperText={errors.startDate}
                    onChange={handleDateChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <small className="text-red-700 ml-1 my-1">
                {errors.startDate}
              </small>
            </section>
            <section>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  <h5 className="font-medium font-inter my-2">Allow Go live</h5>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={formDetail?.goLive?.toString()}
                  name="goLive"
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label={<h5 className="font-normal font-inter ">Yes</h5>}
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label={<h5 className="font-normal font-inter ">No</h5>}
                  />
                </RadioGroup>
              </FormControl>
            </section>
          </div>

          <div className="mt-3">
            <h5 className="font-medium font-inter my-2">Class Description</h5>

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
      </div>
      <div>
        <CustomButton
          size="small"
          onClick={openNotification}
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

export default ClassDetails;
