import React, { useEffect, useState } from "react";
import { Check, Edit, FileCog, XIcon } from "lucide-react";

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
  FormControlLabel,
} from "@mui/material";
import {
  useCreateTagMutation,
  useGetSelectListQuery,
  useUpdateBlogMutation as useUpdateCategoryMutation,
} from "../../../../services/apis/blogApi";
import { blogApi } from "../../../../services/Constant";
import BootstrapTextField from "../../../common/bootstrapTextField";
import SingleImageUpload from "../../../common/singleImageUpload";
import { message } from "antd";
import SearchField from "../../../common/searchField";

export default function AddCategoryModal({ checked, setChecked }) {
  const { category, isLoading, isError, isFetching, refetch } =
    useGetSelectListQuery(`${blogApi.categoryEndPoint}/list`, {
      refetchOnMountOrArgChange: true,

      selectFromResult: ({ data, isLoading, isSuccess }) => {
        if (!isLoading && isSuccess && data) {
          return { category: data?.data?.blogCategories };
        }
        return [];
      },
    });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleToggle = (value) => () => {
    console.log("🚀 ~ handleToggle ~ value:", value);
    const currentIndex = checked?.findIndex((item) => item._id === value._id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const [filterCategory, setFilterCategory] = useState([]);
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
        + Add Categories
      </CustomButton>
      {/* =====================MAIN MODAL========================== */}
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
              opacity: isLoading || isFetching ? 1 : 0,
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
            open={isLoading || isFetching}
          />

          <header className="ps-2 flex justify-between items-center">
            <h4 className="text-xl font-inter font-semibold text-gray-700">
              Add Categories
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
            <SearchField
              data={category || []}
              onFilter={(val) => setFilterCategory(val)}
              searchBy={"title"}
              disabled={isLoading || isFetching}
              placeholder={"Search By title"}
            />
            <ChildModal refetchList={refetch} />
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
            {filterCategory?.map((item) => {
              const checkData = checked?.some((e) => e._id === item._id);
              return (
                <ListItem
                  secondaryAction={
                    <EditCategoryModal
                      categoryToEdit={item}
                      refetchList={refetch}
                    />
                  }
                  disableGutters
                  key={item._id}
                  sx={{
                    border: "1px solid #979797",
                    my: 1,
                    borderRadius: 1.5,
                    transition: "all 0.3s ease-in-out",
                    p: 1,
                    color: checkData ? "whiteSmoke" : "black",
                    background: checkData
                      ? "radial-gradient(590px at 8.2% 13.8%, rgb(18, 35, 60) 0%, rgb(187, 187, 187) 90%)"
                      : "inherit",
                  }}
                >
                  <ListItemButton onClick={handleToggle(item)}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{ color: "transparent" }}
                        alt={`Avatar n`}
                        src={item.thumbnail}
                      />
                    </ListItemAvatar>
                    <ListItemText id={item._id} primary={item.title} />

                    <Box
                      className="secondary-action"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: "-50px",
                        transform: "translateY(-50%) translateX(50%)",
                        opacity: 0,
                        transition: "all 0.3s ease-in-out",
                      }}
                    ></Box>
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

//====================================CREATE CATEGORY MODAL========================================== //
export function ChildModal({ refetchList }) {
  const [open, setOpen] = React.useState(false);
  const [createTag, { isLoading, isError }] = useCreateTagMutation();
  const [values, setValues] = useState({
    title: "",
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
        endpoint: `${blogApi.categoryEndPoint}/add`,
        data: values,
      });

      console.log("🚀 ~ handleSave ~ response:", response);

      if (response && response?.data?.success) {
        handleClose();
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
              Add Category
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
                endpoint={`admin/v1/blogCategory/upload/image`}
                setData={(val) => setValues({ ...values, thumbnail: val })}
                data={values.thumbnail}
              />
            </div>
            <Divider orientation="vertical" flexItem />
            <BootstrapTextField
              label="Title"
              onChange={(e) =>
                setValues((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <CustomButton
            size="small"
            onClick={handleCreate}
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
    </React.Fragment>
  );
}

export function EditCategoryModal({ categoryToEdit, refetchList,isVisible }) {
  const [open, setOpen] = useState(false);
  const [updateCategory, { isLoading, isError }] = useUpdateCategoryMutation();
  const [values, setValues] = useState({
    title: categoryToEdit?.title || "",
    thumbnail: categoryToEdit?.thumbnail || null,
  });

  useEffect(() => {
    setValues({
      title: categoryToEdit?.title || "",
      thumbnail: categoryToEdit?.thumbnail || null,
    });
  }, [categoryToEdit]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdate = async () => {
    try {
      const response = await updateCategory({
        endpoint: `${blogApi.categoryEndPoint}/update/${categoryToEdit._id}`,
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
      {isVisible ? (
        <Button onClick={handleOpen} sx={{textTransform:"none"}}>Edit</Button>
      ) : (
        <IconButton onClick={handleOpen} sx={{ ml: 2 }}>
          <FileCog size={20} />
        </IconButton>
      )}
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
              Edit Category
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
                endpoint={`admin/v1/blogCategory/upload/image`}
                setData={(val) => setValues({ ...values, thumbnail: val })}
                data={values.thumbnail}
              />
            </div>
            <Divider orientation="vertical" flexItem />
            <BootstrapTextField
              label="Title"
              value={values.title}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <CustomButton
            size="small"
            onClick={handleUpdate}
            // disable={isLoading}
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
