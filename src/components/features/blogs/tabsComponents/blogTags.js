import {
  Avatar,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";
import {
  useGetSelectListQuery,
  useGetTagsListQuery,
  useUseHandleDeleteMutation,
} from "../../../../services/apis/blogApi";
import { EditCategoryModal } from "../create/addCategoryModal";
import { blogApi } from "../../../../services/Constant";
import { Edit, MoreVerticalIcon, Trash2, X } from "lucide-react";
import { Popover } from "antd";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { ChildModal, EditTagModal } from "../create/addTagsModal";

function BlogTags() {
  const { tagsData, isLoading, isFetching, isError, refetch } =
    useGetTagsListQuery(`${blogApi.tagsEndPoint}/list`, {
      refetchOnMountOrArgChange: true,
      selectFromResult: (result) => {
        if (!result.isLoading && result.status === "fulfilled") {
          console.log("🚀 ~ AddTagsModal ~ data:", result);
          return { tagsData: result?.data.data.blogTag };
        } else {
          return { tagsData: undefined };
        }
      },
    });

  return (
    <div className="m-2">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-xl text-gray-700 font-semibold">Tags</h4>
          <small className="text-gray-500">Available Tags</small>
        </div>
        <div className="mr-2">
          <ChildModal refetchList={refetch} />
        </div>
      </div>
      <List sx={{ height: "75vh", overflow: "scroll" }}>
        {tagsData?.map((ele) => {
          return (
            <>
              <ListItem
                secondaryAction={
                  <MouseOverPopover {...ele} refetch={refetch} />
                }
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Profile"
                    src={ele?.thumbnail}
                    sx={{ color: "transparent" }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <h5 className="font-bold text-sm ">{ele?.name || "N/A"}</h5>
                  }
                  secondary={
                    <p className="text-xs text-secondary pt-1 ">
                      ID : {ele?._id || "N/a"}
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
  );
}

export default BlogTags;

function MouseOverPopover(props) {
  console.log("🚀 ~ MouseOverPopover ~ data:", props);
  const [handleDelete, { isLoading, isError }] = useUseHandleDeleteMutation();

  const actionsHandler = async (id) => {
    try {
      const response = await handleDelete(
        `${blogApi.tagsEndPoint}/delete/${id}`
      );
      if (response && response?.data && response?.data?.success) {
        enqueueSnackbar(`Category Deleted`, {
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

        props?.refetch();
      } else {
        enqueueSnackbar(`Some error occurred to Delete`, {
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
      <ListItemButton>
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        <ListItemText>
          <EditTagModal
            isVisible={true}
            tagToEdit={props}
            refetchList={props.refetch}
          />
        </ListItemText>
      </ListItemButton>
      <Divider />

      <ListItemButton onClick={() => actionsHandler(props._id)}>
        <ListItemIcon>
          <Trash2 />
        </ListItemIcon>
        <ListItemText>
          <h5 className="font-inter  text-base">Delete</h5>
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
