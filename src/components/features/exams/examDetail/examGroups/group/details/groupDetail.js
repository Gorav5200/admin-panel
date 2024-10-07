import React, { useEffect } from "react";
import {
  Avatar,
  Stack,
  Divider,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Fade,
  Slide,
  Grow,
  ListItemAvatar,
  CircularProgress,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import BootstrapTextField from "../../../../../../common/bootstrapTextField";
import {
  FolderIcon,
  InboxIcon,
  MoreVerticalIcon,
  PlusCircle,
  Trash2,
  X,
} from "lucide-react";
import {
  CustomButton,
  CustomButtonStyle,
} from "../../../../../../../styles/muiRoot";
import { useDispatch } from "react-redux";
import { Button, IconButton, Modal } from "@mui/material";
import { useSelector } from "react-redux";
import SingleImageUpload from "../../../../../../common/singleImageUpload";
import {
  useGetGroupByIdQuery,
  useHandleActionsMutation,
} from "../../../../../../../services/apis/exam/group";
import { useParams } from "react-router-dom";
import { setGroupDetails } from "../../../../../../../ducks/mockGroupsSlice";
import AddListModal from "./addListModal";

import { Popover } from "antd";
import { groupApi } from "../../../../../../../services/Constant";
import { closeSnackbar, enqueueSnackbar } from "notistack";

function GroupDetail({ handleUpdate }) {
  const params = useParams();
  const dispatch = useDispatch();
  // call this for setting the group detail in redux--->api for fetch the details
  const {
    details,
    isLoading: detailLoading,
    isError,
  } = useGetGroupByIdQuery(`exams/v1/group/detail/${params.groupId}`, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ isLoading, isError, data }) => {
      if (!isLoading && !isError && data) {
        return { details: data?.data };
      }
      return {};
    },
  });
  const { groupDetails } = useSelector((state) => state.mockGroups);
  const [tabValue, setTabValue] = useState("faculties");
  const [disable, setDisable] = useState(true);
  const [description, setDescrption] = useState(
    groupDetails?.description || ""
  );
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(groupDetails?.profilePic);

  console.log("🚀 ~ GroupDetail ~ details:", details);

  useEffect(() => {
    if (
      details !== undefined &&
      details !== null &&
      Object.keys(details).length > 0
    ) {
      dispatch(setGroupDetails(details));
      setDescrption(details?.description);
    }
  }, [details]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAbout = async () => {
    setLoading(true);
    const res = await handleUpdate("description", description);
    if (res.success) {
      setDisable(true);
      setLoading(false);
    } else {
      setLoading(false);
    }

    console.log("deee res", res);
  };

  return (
    <>
      {!detailLoading && (
        <div className="h-[83vh] overflow-scroll">
          <div className="flex gap-8 pt-5">
            <div className="basis-5/6 flex flex-col gap-3">
              <div className="bg-medGrey p-3 rounded-md h-auto ">
                <h3 className="font-medium text-xl font-inter ">About</h3>
                <BootstrapTextField
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescrption(e.target.value)}
                  onFocus={() => setDisable(false)}
                  placeholder="Add group description here..."
                  style={{
                    borderRadius: 3,
                    inputFieldBackground: "white",
                    position: "relative",
                    bottom: 26,
                  }}
                />
                {!disable && (
                  <CustomButton
                    disabled={loading}
                    style={{
                      ...CustomButtonStyle,
                      height: 40,
                      width: 110,
                      float: "right",
                      mb: 3,
                    }}
                    onClick={handleAbout}
                  >
                    {loading ? (
                      <CircularProgress color="inherit" size={12} />
                    ) : (
                      " Save Changes"
                    )}
                  </CustomButton>
                )}
              </div>
            </div>

            <div className="basis-1/6 justify-center">
              <div className="align-center h-full w-full">
                <div>
                  <h5 className="text-base font-bold">Profile Image</h5>
                  <SingleImageUpload
                    setData={(val) => {
                      setProfilePic(val);
                      handleUpdate("displayPic",[{ url: val, status: true }]);
                    }}
                    data={groupDetails?.displayPic?.[0]?.url}
                    endpoint={`${groupApi.endPoint}/upload/image`}
                    circle={true}
                  />
                </div>
                <div>
                  <h5 className="text-base font-bold">Cover Image</h5>
                  <SingleImageUpload
                    setData={(val) => {
                      setProfilePic(val);
                      handleUpdate("coverPic", [{ url: val, status: true }]);
                    }}
                    data={groupDetails?.coverPic?.[0]?.url}
                    endpoint={`${groupApi.endPoint}/upload/image`}
                    circle={false}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold p-2 pt-0">Group Managers</h2>
            <div className="bg-slate-100 mt-5 rounded-md  p-3">
              <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 0, borderColor: "divider", p: 0 }}>
                  <TabList onChange={handleChange}>
                    <Tab
                      label="Faculties"
                      value="faculties"
                      sx={{ textTransform: "none" }}
                    />
                    <Tab
                      label="Moderators"
                      value="moderators"
                      sx={{ textTransform: "none" }}
                    />
                    <Tab
                      label="Members"
                      value="members"
                      sx={{ textTransform: "none" }}
                    />
                    <Tab
                      label="Admin"
                      value="admin"
                      sx={{ textTransform: "none" }}
                    />
                  </TabList>
                </Box>

                {/* Tab panel of faculties */}
                <Grow
                  key={"faculties"}
                  in={tabValue === "faculties" ? true : false}
                  {...(tabValue === "faculties" ? { timeout: 400 } : {})}
                >
                  <TabPanel value="faculties" sx={{ padding: 1 }}>
                    <div className=" flex p-2 justify-between items-center ">
                      <div className="text-right w-full">
                        {groupDetails?.teachers?.length > 0 ? (
                          <>
                            <div className=" flex p-2 justify-between items-center ">
                              <div className="text-right w-full">
                                <AddListModal
                                  values={groupDetails.teachers}
                                  type="teacher"
                                  title="Add teachers"
                                  handleUpdate={handleUpdate}
                                  groupTitle={groupDetails.title}
                                />
                              </div>
                            </div>
                            <div className=" bg-white p-4 shadow-lg rounded-md overflow-scroll h-[59vh] ">
                              <List>
                                {groupDetails.teachers?.map((ele) => {
                                  return (
                                    <>
                                      <ListItem
                                        secondaryAction={
                                          <MouseOverPopover
                                            data={ele.uid}
                                            type={"teacher"}
                                          />
                                        }
                                      >
                                        <ListItemAvatar>
                                          <Avatar
                                            alt="Profile"
                                            src={ele.uid?.profilePic}
                                            sx={{ color: "transparent" }}
                                          />
                                        </ListItemAvatar>
                                        <ListItemText
                                          primary={
                                            <h5 className="font-bold text-sm ">
                                              {ele.uid?.name || "N/A"}
                                            </h5>
                                          }
                                          secondary={
                                            <p className="text-xs text-secondary pt-1 ">
                                              ID : {ele.uid?._id || "N/a"}
                                            </p>
                                          }
                                        />
                                      </ListItem>
                                      <Divider />
                                    </>
                                  );
                                })}
                              </List>
                            </div>
                          </>
                        ) : (
                          <div className="bg-white  h-[34vh] flex flex-col justify-center items-center gap-4 text-center">
                            <p className="text-sm text-secondary my-2">
                              Add Faculties to the groups, to help manage <br />
                              activties of the group
                            </p>
                            <AddListModal
                              values={groupDetails?.teachers}
                              handleUpdate={handleUpdate}
                              type="teacher"
                              title="Add faculties"
                              groupTitle={groupDetails?.title}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </TabPanel>
                </Grow>
                {/* Tab panel of moderators */}
                <Grow
                  key={"moderators"}
                  in={tabValue === "moderators" ? true : false}
                  {...(tabValue === "moderators" ? { timeout: 400 } : {})}
                >
                  <TabPanel value="moderators" sx={{ padding: 2 }}>
                    {groupDetails?.moderators?.length > 0 ? (
                      <>
                        <div className=" flex p-2 justify-between items-center">
                          <div className="text-right w-full">
                            <AddListModal
                              handleUpdate={handleUpdate}
                              values={groupDetails.moderators}
                              type="moderator"
                              title="Add moderators"
                            />
                          </div>
                        </div>
                        <div className=" bg-white p-4 shadow-lg rounded-md overflow-scroll h-[59vh] ">
                          <List>
                            {groupDetails?.moderators.map((ele) => {
                              return (
                                <>
                                  <ListItem
                                    secondaryAction={
                                      <MouseOverPopover
                                        data={ele.uid}
                                        type={"moderator"}
                                      />
                                    }
                                  >
                                    <ListItemAvatar>
                                      <Avatar
                                        alt="Profile"
                                        src={ele.uid?.profilePic}
                                        sx={{ color: "transparent" }}
                                      />
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={
                                        <h5 className="font-bold text-sm ">
                                          {ele.uid?.name || "N/A"}
                                        </h5>
                                      }
                                      secondary={
                                        <p className="text-xs text-secondary pt-1 ">
                                          ID : {ele.uid?._id || "N/a"}
                                        </p>
                                      }
                                    />
                                  </ListItem>
                                  <Divider />
                                </>
                              );
                            })}
                          </List>
                        </div>
                      </>
                    ) : (
                      <div className="bg-white  h-[34vh] flex flex-col justify-center items-center gap-4 text-center">
                        <p className="text-sm text-secondary my-2">
                          Add Moderators to the groups, to help manage <br />
                          activties of the group
                        </p>
                        <AddListModal
                          handleUpdate={handleUpdate}
                          values={groupDetails?.moderators}
                          type="moderator"
                          title="Add moderators"
                        />
                      </div>
                    )}
                  </TabPanel>
                </Grow>

                {/* Tab panel for members */}
                <Grow
                  key={"members"}
                  in={tabValue === "members" ? true : false}
                >
                  <TabPanel value="members" sx={{ padding: 2 }}>
                    {groupDetails?.members?.length > 0 ? (
                      <>
                        <div className=" flex p-2 justify-between items-center">
                          <div className="text-right w-full">
                            <AddListModal
                              handleUpdate={handleUpdate}
                              values={groupDetails?.members}
                              type="member"
                              title="Add Member"
                            />
                          </div>
                        </div>
                        <div className=" bg-white p-4 shadow-lg rounded-md overflow-scroll h-[59vh] ">
                          <List>
                            {groupDetails?.members.map((ele) => {
                              return (
                                <>
                                  <ListItem
                                    secondaryAction={
                                      <MouseOverPopover
                                        data={ele.uid}
                                        type={"member"}
                                      />
                                    }
                                  >
                                    <ListItemAvatar>
                                      <Avatar
                                        alt="Profile"
                                        src={ele.uid?.profilePic}
                                        sx={{ color: "transparent" }}
                                      />
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={
                                        <h5 className="font-bold text-sm ">
                                          {ele.uid?.name || "N/A"}
                                        </h5>
                                      }
                                      secondary={
                                        <p className="text-xs text-secondary pt-1 ">
                                          ID : {ele.uid?._id || "N/a"}
                                        </p>
                                      }
                                    />
                                  </ListItem>
                                  <Divider />
                                </>
                              );
                            })}
                          </List>
                        </div>
                      </>
                    ) : (
                      <div className="bg-white  h-[34vh] flex flex-col justify-center items-center gap-4 text-center">
                        <p className="text-sm text-secondary my-2">
                          Add Members to the groups, to help manage <br />
                          activties of the group
                        </p>
                        <AddListModal
                          handleUpdate={handleUpdate}
                          values={groupDetails?.members}
                          type="member"
                          title="Add Members"
                        />
                      </div>
                    )}
                  </TabPanel>
                </Grow>

                {/* Tab panel for admin */}
                <Grow
                  key={"admin"}
                  in={tabValue === "admin" ? true : false}
                >
                  <TabPanel value="admin" sx={{ padding: 2 }}>
                    {groupDetails?.admin?.length > 0 ? (
                      <>
                        <div className=" flex p-2 justify-between items-center">
                          <div className="text-right w-full">
                            <AddListModal
                              handleUpdate={handleUpdate}
                              values={groupDetails?.admin}
                              type="admin"
                              title="Add Admin"
                            />
                          </div>
                        </div>
                        <div className=" bg-white p-4 shadow-lg rounded-md overflow-scroll h-[59vh] ">
                          <List>
                            {groupDetails?.admin.map((ele) => {
                              return (
                                <>
                                  <ListItem
                                    secondaryAction={
                                      <MouseOverPopover
                                        data={ele.uid}
                                        type={"admin"}
                                      />
                                    }
                                  >
                                    <ListItemAvatar>
                                      <Avatar
                                        alt="Profile"
                                        src={ele.uid?.profilePic}
                                        sx={{ color: "transparent" }}
                                      />
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={
                                        <h5 className="font-bold text-sm ">
                                          {ele.uid?.name || "N/A"}
                                        </h5>
                                      }
                                      secondary={
                                        <p className="text-xs text-secondary pt-1 ">
                                          ID : {ele.uid?._id || "N/a"}
                                        </p>
                                      }
                                    />
                                  </ListItem>
                                  <Divider />
                                </>
                              );
                            })}
                          </List>
                        </div>
                      </>
                    ) : (
                      <div className="bg-white  h-[34vh] flex flex-col justify-center items-center gap-4 text-center">
                        <p className="text-sm text-secondary my-2">
                          Add Admin to the groups, to help manage <br />
                          activties of the group
                        </p>
                        <AddListModal
                          handleUpdate={handleUpdate}
                          values={groupDetails?.admin}
                          type="admin"
                          title="Add admin"
                        />
                      </div>
                    )}
                  </TabPanel>
                </Grow>

              
              </TabContext>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MouseOverPopover({ data, type }) {
  console.log("🚀 ~ MouseOverPopover ~ data:", data);
  const params = useParams();

  const [handleActions, { isLoading, isError }] = useHandleActionsMutation();

  const actionsHandler = async (id, action) => {
    try {
      const response = await handleActions({
        endpoint: `${groupApi.endPoint}/${action}/member/${params.groupId}`,
        data: {
          type: type,
          uid: id,
        },
      });
      if (response && response?.data && response?.data?.success) {
        enqueueSnackbar(`${type} ${action}`, {
          variant: "success",
          action: (key) => (
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={() => closeSnackbar(key)}
            >
              <X size={15} />
            </IconButton>
          ),
        });
      } else {
        enqueueSnackbar(`Some error occurred to ${type}`, {
          variant: "error",
          action: (key) => (
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={() => closeSnackbar(key)}
            >
              <X size={15} />
            </IconButton>
          ),
        }); // Display error Snackbar
      }
    } catch (error) {
      console.log("🚀 ~ handleActions ~ error:", error);
    }
  };

  const content = (
    <List>
      <ListItemButton onClick={() => actionsHandler(data?._id, "block")}>
        <ListItemIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-ban"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m4.9 4.9 14.2 14.2" />
          </svg>
        </ListItemIcon>
        <ListItemText>
          <h5 className="font-inter  text-base">Block</h5>
        </ListItemText>
      </ListItemButton>
      <Divider />
      <ListItemButton onClick={() => actionsHandler(data._id, "remove")}>
        <ListItemIcon>
          <Trash2 />
        </ListItemIcon>
        <ListItemText>
          <h5 className="font-inter  text-base">Remove</h5>
        </ListItemText>
      </ListItemButton>
    </List>
  );

  return (
    <Popover placement="leftTop" content={content}>
      <IconButton>
        <MoreVerticalIcon />
      </IconButton>
    </Popover>
  );
}

export default GroupDetail;
