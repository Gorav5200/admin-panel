import React, { useEffect, useState } from "react";
import { Check, XIcon } from "lucide-react";

import {
  CustomButton,
  ButtonStyle,
  CustomButtonStyle,
} from "../../../../styles/muiRoot";

import {
  Box,
  IconButton,
  Modal,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Checkbox,
  ListItemButton,
  Button,
  Divider,
  ListItemIcon,
  LinearProgress,
  Backdrop,
} from "@mui/material";
import {
  useCreateTagMutation,
  useGetTagsListQuery,
  useUpdateBlogMutation  as useUpdateTagMutation,
} from "../../../../services/apis/blogApi";
import { blogApi } from "../../../../services/Constant";
import BootstrapTextField from "../../../common/bootstrapTextField";
import SingleImageUpload from "../../../common/singleImageUpload";
import { message } from "antd";

export default function AddTagsModal({ checked, setChecked }) {
  const { tagsData, isLoading, isFetching, isError } = useGetTagsListQuery(
    `${blogApi.tagsEndPoint}/list`,
    {
      refetchOnMountOrArgChange: true,
      selectFromResult: (result) => {
        if (!result.isLoading && result.status === "fulfilled") {
          console.log("🚀 ~ AddTagsModal ~ data:", result);
          return { tagsData: result?.data.data.blogTag };
        } else {
          return { tagsData: undefined };
        }
      },
    }
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleToggle = (value) => () => {
    console.log("🚀 ~ handleToggle ~ value:", value);
    const currentIndex = checked?.findIndex(item => item._id === value._id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  console.log("🚀 ~ AddTagsModal ~ checked:", checked);

  return (
    <>
      <CustomButton
        onClick={handleOpen}
        sx={{
          ...ButtonStyle,
          width: "max-content",
          height: "fit-content",
          borderRadius: 2,
          my: 2,
        }}
      >
        + Add Tags
      </CustomButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="modalRoot"
          sx={{ width: "40vw", height: "max-content" }}
        >
          <LinearProgress
            color="inherit"
            sx={{
              position: "sticky",
              top: 0,
              left: 0,
              right: 0,
              zIndex: (theme) => theme.zIndex.drawer + 2,
              opacity:isLoading || isFetching ? 1:0,
            }}
          />
          <Backdrop
            sx={{
              color: "white",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#fffdfd6e",
            }}
            open={isLoading || isFetching }
          />
          
          <header className="ps-2 flex justify-between items-center">
            <h4 className="text-xl font-inter font-semibold text-gray-700">
              Add Tag
            </h4>
            <IconButton
              onClick={() => {
                handleClose();
              }}
            >
              <XIcon className="text-gray-700" />
            </IconButton>
          </header>

          <div className="flex justify-between items-center px-1.5">
            <h6 className="text-sm fonnt-inter">Select Tags</h6>
            <ChildModal />
          </div>

          <List
            dense
            sx={{
              width: "100%",

              overflow: "scroll",
              height: "42vh",
            }}
            className="scrollbar-hide"
          >
            {tagsData?.map((item) => {
              const checkData = checked?.some((e) => e._id === item._id);
              return (
                <ListItem disableGutters key={item._id}>
                  <ListItemButton
                    onClick={handleToggle(item)}
                    sx={{
                      border: "1px solid #979797",
                      my: 1,
                      borderRadius: 1.5,
                      transition: "all 0.3s ease-in-out",
                      p: 1,
                      color: checkData ? "whiteSmoke" : "black",
                      background: checkData
                        ? " radial-gradient(590px at 8.2% 13.8%, rgb(18, 35, 60) 0%, rgb(187, 187, 187) 90%)"
                        : "inherit",
                      "&:hover": {
                        color: checkData ? "whitesmoke" : "black",
                        background: checkData
                          ? " radial-gradient(590px at 8.2% 13.8%, rgb(18, 35, 60) 0%, rgb(187, 187, 187) 90%)"
                          : "#f0f0f0", // Adjust background color on hover
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{ color: "transparent" }}
                        alt={`Avatar n`}
                        src={item.thumbnail}
                      />
                    </ListItemAvatar>
                    <ListItemText id={item._id} primary={item.name} />

                    <ListItemIcon>
                      <ListItemAvatar
                        sx={{
                          pl: 3,
                          opacity: checkData ? 1 : 0,
                          transition: "all 0.3s ease-in-out",
                        }}
                      >
                        <Check color="white" />
                      </ListItemAvatar>
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Modal>
    </>
  );
}

export function ChildModal({refetchList}) {
  const [open, setOpen] = React.useState(false);
  const[createTag,{isLoading,isError}]=useCreateTagMutation();

  const [values, setValues] = useState({
    name: "",
    thumbnail: null,
  });
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    try {
      const response = await createTag({
        endpoint: `${blogApi.tagsEndPoint}/add`,
        data: values,
      });

      console.log("🚀 ~ handleSave ~ response:", response);

      if (response && response?.data?.success) {
         handleClose()
         refetchList();
        message.success("Added!", 2.5);
        
      } else {
        message.error("Some error  to Add !", 2.5);
      }
    } catch (error) {
      console.error("Error add tag api:", error);
    }
  };
  return (
    <React.Fragment>
      <Button sx={{ fontWeight: "bold", fontSize: 13 }} onClick={handleOpen}>
        + Add New
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalRoot" sx={{ width: "35vw" }}>
          <header className="ps-2 flex justify-between items-center">
            <h4 className="text-xl font-inter font-semibold text-gray-700">
              Add New Tag
            </h4>
            <IconButton
              onClick={() => {
                handleClose();
              }}
            >
              <XIcon className="text-gray-700" />
            </IconButton>
          </header>
          <Divider />
          <br />
          <div className="flex justify-start items-center px-1.5 gap-2 ">
            <div className="pt-2 ">
              <SingleImageUpload
                circle
                endpoint={`/admin/v1/blogs/tag/upload/image`}
                setData={(val) => setValues({ ...values, thumbnail: val })}
                data={values.thumbnail}
              />
            </div>
            <Divider orientation="vertical" flexItem />
            <BootstrapTextField
              label="Tag Name"
              onChange={(e) =>
                setValues((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <CustomButton
            size="small"
            onClick={handleCreate}
            sx={{
              ...CustomButtonStyle,
              width: "auto",
              height: "40px",
              borderRadius: 2,
              float: "right",
              mt: 2,
            }}
          >
            Save
          </CustomButton>
        </Box>
      </Modal>
    </React.Fragment>
  );
}



export function EditTagModal({ tagToEdit, refetchList }) {
  const [open, setOpen] = useState(false);
  const [updateCategory, { isLoading, isError }] = useUpdateTagMutation();
  const [values, setValues] = useState({
    title: tagToEdit?.title || "",
    thumbnail: tagToEdit?.thumbnail || null,
  });

  useEffect(() => {
    setValues({
      name: tagToEdit?.name || "",
      thumbnail: tagToEdit?.thumbnail || null,
    });
  }, [tagToEdit]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdate = async () => {
    try {
      const response = await updateCategory({
        endpoint: `${blogApi.tagsEndPoint}/update/${tagToEdit._id}`,
        updatedData: values,
      });

      if (response && response?.data?.success) {
        handleClose();
        refetchList();
        message.success("Updated!", 2.5);
      } else {
        message.error("Some error to Update!", 2.5);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} sx={{ textTransform: "none" }}>
        Edit
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalRoot" sx={{ width: "35vw" }}>
          <LinearProgress
            color="inherit"
            sx={{
              position: "sticky",
              top: 0,
              left: 0,
              right: 0,
              zIndex: (theme) => theme.zIndex.drawer + 2,
              opacity: isLoading ? 1 : 0,
            }}
          />
          <header className="ps-2 flex justify-between items-center">
            <h4 className="text-xl font-inter font-semibold text-gray-700">
              Edit Tag
            </h4>
            <IconButton
              onClick={() => {
                handleClose();
              }}
            >
              <XIcon className="text-gray-700" />
            </IconButton>
          </header>
          <Divider />
          <br />
          <div className="flex justify-start items-center px-1.5 gap-2 ">
            <div className="pt-2 ">
              <SingleImageUpload
                circle
                endpoint={`admin/v1/tag/upload/image`}
                setData={(val) => setValues({ ...values, thumbnail: val })}
                data={values.thumbnail}
              />
            </div>
            <Divider orientation="vertical" flexItem />
            <BootstrapTextField
              label="Title"
              value={values.name}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <CustomButton
            size="small"
            onClick={handleUpdate}
            disable={isLoading}
            sx={{
              ...CustomButtonStyle,
              width: "auto",
              height: "40px",
              borderRadius: 2,
              float: "right",
              mt: 2,
            }}
          >
            Save
          </CustomButton>
        </Box>
      </Modal>
    </>
  );
}