import React, { Children, useState } from "react";
import { HeaderWithNavigation } from "../../common/header";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Collapse,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Icon from "../../common/Icon";
import { dateFormatting } from "../../../services/common";
import DatePickerComp from "../../common/datePicker";
import TimePickerComp from "../../common/timePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/lab";
import {
  CircleEllipsis,
  Divide,
  Link,
  MonitorPlay,
  Navigation,
  Repeat,
} from "lucide-react";
import { ExpandLess, ExpandMore, PublicOutlined } from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import ToggleSwitch from "../../common/toggleSwtch";
import { CustomButton, CustomButtonStyle } from "../../../styles/muiRoot";
import { useGetGroupListQuery } from "../../../services/apis/exam/group";
import { eventApi, groupApi, usersApi } from "../../../services/Constant";
import { Empty, message } from "antd";
import {
  useGetDataQuery,
  useGetTeachersQuery,
} from "../../../services/apis/commonApi";
import {
  useCreateEventMutation,
  useUpdateEventMutation,
} from "../../../services/apis/eventApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MultiSelectOutlined } from "../../common/selectFields";
import SingleImageUpload from "../../common/singleImageUpload";
function Create() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const { data } = useSelector((state) => state.events);
  const [values, setValues] = useState(data);
  const [createEvent, { isLoading: createLoading, isError: createError }] =
    useCreateEventMutation();
  const [updateEvent, { isLoading: updateLoading, isError: updateError }] =
    useUpdateEventMutation();

  //fetch groups
  const {
    groupsData,
    isError: groupError,
    isLoading: groupLoading,
    isSuccess: groupSuccess,
  } = useGetGroupListQuery(`${groupApi.endPoint}`, {
    selectFromResult: ({ data, isLoading, isError }) => {
      if (!isLoading && !isError && data) {
        return { groupsData: data?.data };
      }
      return { groupsData: [] };
    },
  });

  const checkType = location?.pathname.includes("edit") && params.eventId;
  //fetch teachers

  const {
    data: teacherData,
    isLoading: teacherLoading,
    isError: teacherError,
    isSuccess: teacherSuccess,
  } = useGetTeachersQuery(`${usersApi.endPoint}/list/teacher`, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const { hostData, isLoading, isError, isSuccess } = useGetDataQuery(
    `/admin/v1/host/list`,
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      // selectFromResult: ({ data, isLoading, isError }) => {
      //   if (!isLoading && !isError && data) {
      //     return { hostData: data?.data.hostList };
      //   }
      //   return [];
      // },
    }
  );
  console.log("🚀 ~ Create ~ data:", hostData);

  //handle create
  const handleCreate = async () => {
    try {
      const response = await createEvent({
        endpoint: `${eventApi.endPoint}/add`,
        data: {
          ...values,
          recordingType: values.eventType === "podcast" ? "audio" : "video",
        },
      });

      console.log("🚀 ~ handleSave ~ response:", response);

      if (response && response?.data?.success) {
        message.success("Event add successfully!", 2.5);
        navigate(`/main/events`);
      } else {
        message.error("Some error  to create event !", 2.5);
      }
    } catch (error) {
      console.error("Error create event:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await updateEvent({
        endpoint: `${eventApi.endPoint}/update/${params.eventId}`,
        updatedData: {
          ...values,
          recordingType: values.eventType === "podcast" ? "audio" : "video",
        },
      });

      console.log("🚀 ~ handleSave ~ response:", response);

      if (response && response?.data?.success) {
        message.success("Event add successfully!", 2.5);
        navigate(`/main/events`);
      } else {
        message.error("Some error  to create event !", 2.5);
      }
    } catch (error) {
      console.error("Error create event:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      value = checked;
    }
    setValues({ ...values, [name]: value });
  };

  console.log("🚀 ~ Create ~ values:", values);

  const Label = ({ children }) => {
    return (
      <InputLabel
        shrink
        htmlFor="sectionsSelect"
        sx={{
          fontSize: 20,
          fontFamily: "var(--font-inter)",
          fontWeight: 500,
          color: "#455564",
        }}
      >
        {children}
      </InputLabel>
    );
  };

  console.log("🚀 ~ Create ~ values:", values);

  return (
    <div className="h-screen bg-lightGrey">
      <HeaderWithNavigation cont={checkType ? "Edit Event" : "Create Event"} />
      <Paper sx={{ m: 1, p: 2, height: "90vh", overflow: "scroll" }}>
        {/* <header className="flex justify-between align-top  p-2 items-center">
          <div className="flex gap-2 items-start">
            <Avatar
              sx={{ width: 35, height: 35, color: "transparent" }}
              src={""}
            />
            <div className="text-darkblue italic  text-sm">
              <p className="font-bold">
                {" "}
                Host -
                <span className="font-normal underline underline-offset-1">
                  Gaurav
                </span>
              </p>
              <small className="font-inder text-secondar  underline-offset-1">
                Your profile
                (Last updated on {dateFormatting("jk").date})
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
              sx={{
                color: "#455564",
                fontFamily: "var(--inter)",
                fontSize: "14px",
              }}
              startIcon={<Icon name="Upload" color="#336792" size={20} />}
            >
              Unpublish
            </Button>
          </Stack>
        </header>
        <Divider /> */}

        <div className="flex justify-between items-start w-9/12 gap-8">
          <Box component="form">
            <TextField
              autoFocus={true}
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Event name"
              variant="outlined"
              margin="normal"
              size="medium"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
            {/*Time section */}
            <section>
              <div className="flex justify-between  items-start h-[9ch] my-2  gap-5">
                <div className="w-full">
                  <Label>Date</Label>
                  <DatePickerComp
                    data={values.date}
                    setData={(val) =>
                      handleChange({
                        target: {
                          name: "date",
                          value: val,
                        },
                      })
                    }
                    DynamicName={"Start Date"}
                    style={{ height: "1.4375em" }}
                  />
                </div>
                <div className="w-full">
                  <Label>Start Time</Label>
                  <TimePickerComp
                    value={values.startTime}
                    setValue={(val) =>
                      handleChange({
                        target: {
                          name: "startTime",
                          value: val,
                        },
                      })
                    }
                    label={"Start Time"}
                    style={{ height: "1.4375em" }}
                  />
                </div>
                <div className="w-full">
                  <Label>End Time</Label>
                  <TimePickerComp
                    value={values.endTime}
                    setValue={(val) =>
                      handleChange({
                        target: {
                          name: "endTime",
                          value: val,
                        },
                      })
                    }
                    label={"End Time"}
                    style={{ height: "1.4375em" }}
                  />
                </div>
              </div>
            </section>
            {/*mode  */}
            <FormControl sx={{ my: 1, width: "100%" }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Is it in Personal or Virtual?
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                name="mode"
                value={values.mode}
                onChange={handleChange}
                label={<span>Is it in Personal or Virtual?</span>}
              >
                <MenuItem value={"offline"}>
                  <div className="flex gap-2 items-center overflow-hidden">
                    <span className="bg-medGrey rounded-full p-1.5">
                      <Navigation size={18} />
                    </span>
                    Offline
                  </div>
                </MenuItem>

                <MenuItem value={"online"}>
                  <div className="flex gap-2 items-center overflow-hidden">
                    <span className="bg-medGrey rounded-full p-1.5">
                      <MonitorPlay size={18} />
                    </span>
                    online
                  </div>
                </MenuItem>
              </Select>
            </FormControl>

            {/* if--- online option content */}

            <Collapse in={values.mode === "online"}>
              <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
                {[
                  {
                    value: "internal",
                    primaryText: "Iverse Live",
                    secondaryText:
                      "Schedule a Facebook Live for your event so people can watch",
                    icon: <MonitorPlay color="black" />,
                  },
                  {
                    value: "external",
                    primaryText: "Exteral Link",
                    secondaryText:
                      "Add a link so people know where to go when your event start",
                    icon: <Link color="black" />,
                  },
                  {
                    value: "other",
                    primaryText: "Other",
                    secondaryText:
                      "Include clear instructions in your event details on how to paticipate",
                    icon: <CircleEllipsis fill="black" strokeWidth="3px" />,
                  },
                ].map(({ value, primaryText, secondaryText, icon }, ind) => {
                  const labelId = `radio-list-label-${value}`;

                  return (
                    <>
                      <ListItem key={value} disablePadding>
                        <ListItemButton
                          onClick={() =>
                            handleChange({
                              target: {
                                name: "modeType",
                                value: value,
                              },
                            })
                          }
                        >
                          <ListItemAvatar>
                            <Avatar
                              sx={{
                                color: "tranparent",
                                bgcolor: "var(--med-grey)",
                              }}
                              alt={`Avatar n°${value + 1}`}
                            >
                              {icon}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            id={labelId}
                            primary={
                              <h6 className="text-xl font-inder font-medium">
                                {primaryText}
                              </h6>
                            }
                            secondary={
                              <>
                                <p className="text-sm text-gray-600">
                                  {secondaryText}
                                </p>
                                <Collapse
                                  in={
                                    values.modeType === "external" && ind === 1
                                  }
                                >
                                  <TextField
                                    id="outlined-basic"
                                    label="Event link"
                                    variant="outlined"
                                    margin="normal"
                                    name="eventLink"
                                    onChange={handleChange}
                                    value={values.eventLink}
                                    size="medium"
                                    sx={{
                                      background: "white",
                                      width: "100%",
                                    }}
                                  />
                                </Collapse>
                              </>
                            }
                          />
                          <Radio
                            edge="end"
                            checked={values.modeType === value}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </>
                  );
                })}
              </List>
            </Collapse>
            {/* else--in person */}
            <Collapse in={values.mode === "offline"}>
              <TextField
                id="outlined-basic"
                label="Add Location"
                variant="outlined"
                margin="normal"
                size="medium"
                sx={{
                  background: "white",
                  width: "100%",
                }}
              />
            </Collapse>
            {/* Publishers */}

            <MultiSelectOutlined
              name="hostId"
              label="Add Host"
              error={teacherError}
              data={teacherData?.data?.data}
              isSuccess={teacherSuccess}
              loading={teacherLoading}
              value={values.hostId}
              onChange={handleChange}
            />
            {/* Event type */}
            <MultiSelectOutlined
              name="eventType"
              label="Event Type"
              data={[
                { value: "liveClass", name: "Live Class" },
                { value: "info", name: "Info" },
                { value: "general", name: "General" },
                { value: "challenge", name: "Challenge" },
                { value: "podcast", name: "Podcast" },
                { value: "guestLecture", name: "Lecture " },
              ]}
              value={values.eventType}
              onChange={handleChange}
            />

            {/* Host id */}
            <MultiSelectOutlined
              name="brandId"
              label="Brand"
              data={hostData?.data.hostList}
              value={values.brandId}
              onChange={handleChange}
            />

            {/* Groups */}

            <MultiSelectOutlined
              name="groups"
              label="Add Groups"
              multiple
              data={groupsData}
              isSuccess={groupSuccess}
              value={values?.groups || []}
              onChange={handleChange}
            />

            {/* Group event privacy */}
            <SelectFieldWithIcon
              onChange={handleChange}
              label={"Group Event Privacy"}
              name="privacy"
              options={[
                {
                  icon: <GroupsIcon fontSize="medium" color="primary" />,
                  value: "members",
                  label: "Members Only",
                },
                {
                  icon: <PublicOutlined fontSize="medium" color="primary" />,
                  value: "public",
                  label: "Public",
                },
              ]}
              value={values.privacy}
            />
            {/* Invite frends */}
            <div className="my-1 w-full">
              <ToggleSwitch
                handleChange={(val) =>
                  handleChange({
                    target: {
                      name: "invite",
                      value: val,
                    },
                  })
                }
                value={values.invite}
                name="invite"
                label={
                  <>
                    <h6 className="text-base font-inder font-medium">
                      Invite friends who are group members
                    </h6>
                    <p className="text-sm text-gray-600">
                      All friends who are also group members will be invited to
                      the event
                    </p>
                  </>
                }
              />
            </div>
            {/* description */}
            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Where are the details ?"
              variant="outlined"
              margin="normal"
              size="medium"
              value={values.description}
              name="description"
              onChange={handleChange}
              minRows={3}
              multiline
            />

            <Divider />
            {/*Repeat Event */}
            <List>
              <ListItemButton
                sx={{ transition: "transform all 1s ease-in-out" }}
                onClick={() =>
                  handleChange({
                    target: {
                      name: "repeatEvents",
                      value: !values.repeatEvents,
                    },
                  })
                }
              >
                <ListItemAvatar>
                  <Repeat className="text-gray-700" />
                </ListItemAvatar>
                <ListItemText className="text-xl font-inder font-medium ">
                  Repeat Event
                </ListItemText>
                <ListItemIcon />
                {values.repeatEvents ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={values.repeatEvents}>
                <Card
                  sx={{
                    border: "2px solid var(--med-grey)",
                    boxShadow: "none",
                  }}
                >
                  <CardContent disablePadding>
                    <SelectFieldWithIcon
                      name={"frequency"}
                      value={values?.repeatData?.frequency}
                      onChange={(e) =>
                        handleChange({
                          target: {
                            name: "repeatData",
                            value: {
                              ...values.repeatData,
                              frequency: e.target.value,
                            },
                          },
                        })
                      }
                      label={"Frequency"}
                      options={[
                        { value: "never", label: "Never", icon: null },
                        { value: "daily", label: "Daily", icon: null },
                        { value: "weekly", label: "Weekly", icon: null },
                        // { value: "", label: "Custom", icon: null },
                      ]}
                    />

                    <div className="flex justify-between  items-start h-[9ch] m-1  gap-5">
                      <div className="w-full">
                        <Label>End Date</Label>
                        <DatePickerComp
                          disabled={values?.repeatData?.frequency === "never"}
                          data={values?.repeatData?.endDate}
                          setData={(val) =>
                            handleChange({
                              target: {
                                name: "repeatData",
                                value: { ...values.repeatData, endDate: val },
                              },
                            })
                          }
                          DynamicName={"End Date"}
                          style={{ height: "1.4375em" }}
                        />
                      </div>
                      <div className="w-full">
                        <Label>End Time</Label>
                        <TimePickerComp
                          disabled={values?.repeatData?.frequency === "never"}
                          value={values.repeatData?.endTime}
                          setValue={(val) =>
                            handleChange({
                              target: {
                                name: "repeatData",
                                value: { ...values.repeatData, endTime: val },
                              },
                            })
                          }
                          label={"End Time"}
                          style={{ height: "1.4375em" }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Collapse>
            </List>
          </Box>

          <div>
            <SingleImageUpload
              endpoint={`${eventApi.endPoint}/upload/image`}
              setData={(val) => setValues({ ...values, thumbnail: val })}
              data={values.thumbnail}
            />
          </div>
        </div>
        <div className="absolute bottom-10 right-5">
          <CustomButton
            size="small"
            onClick={checkType ? handleUpdate : handleCreate}
            disabled={updateLoading || createLoading}
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
            {updateLoading || createLoading ? (
              <CircularProgress color="inherit" size={18} />
            ) : checkType ? (
              "Save Changes"
            ) : (
              "+ Create Event"
            )}
          </CustomButton>
        </div>
      </Paper>
    </div>
  );
}

export default Create;

const SelectFieldWithIcon = ({
  label,
  options,
  name,
  onChange,
  value,
  ...props
}) => {
  return (
    <FormControl sx={{ my: 1, width: "100%" }}>
      <InputLabel id={`demo-simple-select-autowidth-label ${value}`}>
        {label}
      </InputLabel>
      <Select
        labelId={`demo-simple-select-autowidth-label ${value}`}
        id="demo-simple-select-autowidth"
        value={value}
        name={name}
        onChange={onChange}
        {...props}
        label={<span>{label}</span>}
      >
        {options?.map(({ icon, value, label }, ind) => (
          <MenuItem key={ind} value={value}>
            {icon ? (
              <span className="flex gap-2 items-center overflow-hidden">
                <Avatar
                  sx={{
                    color: "tranparent",
                    bgcolor: "var(--med-grey)",
                    width: "max-content",
                    height: "max-content",
                    p: 0.3,
                  }}
                  alt={`No image`}
                >
                  {icon}
                </Avatar>

                {label}
              </span>
            ) : (
              label
            )}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
