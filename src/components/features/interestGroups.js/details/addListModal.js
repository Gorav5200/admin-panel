import React, { useState, useEffect } from "react";
import { PlusCircle, X } from "lucide-react";
import MultipleSelectTable from "../../../common/tableMultipleSelect";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
} from "@mui/material";
import {
  useGetMembersQuery,
  useHandleActionsMutation,
  useLazyGetMembersQuery,
} from "../../../../services/apis/exam/group";
import {
  CustomButton,
  CustomButtonStyle,
} from "../../../../styles/muiRoot";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { groupApi } from "../../../../services/Constant";
import { BackdropLoader } from "../../../common/lineLoader";

export default function AddListModal({
  title,
  handleUpdate,
  values: getVal,
  type,
}) {
  const checkTypeArray =
    type === "teacher"
      ? "teachers"
      : type === "moderator"
      ? "moderators"
      : type === "member"
      ? "members"
      : type === "admin"
      ? "admin"
      : null;

  console.log("🚀 ~ checkTypeArray:", checkTypeArray);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [postLoading, setPostLoading] = useState(false);
  const [values, setValues] = useState([]);
  const params = useParams();

  //api for fetch the members - faculties , members ,admin and moderators
  const [trigger, { data, isLoading, isFetching }] = useLazyGetMembersQuery();
  const [handleActions, { isLoading: postMembersLoading, isError: postError }] =
    useHandleActionsMutation();
  const handleOpen = () => {
    setOpen(true);
    trigger(
      `${groupApi.endPoint}/users/list/${
        checkTypeArray === "admin" ? "members" : checkTypeArray
      }/${params.groupId}`
    );
  };

  const actionsHandler = async (data) => {
    try {
      const response = await handleActions({
        endpoint: `${groupApi.endPoint}/add/member/${params.groupId}`,
        data,
      });
      if (response && response?.data && response?.data?.success) {
        handleClose();
        console.log("🚀 ~ actionsHandler ~ response:", response);
        enqueueSnackbar(`Member Add Successfully`, {
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
        enqueueSnackbar(`Some error occurred to ${response.data.message}`, {
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

  console.log("56:", data);

  useEffect(() => {
    console.log("getVal:", getVal);
    setValues(getVal?.map((e) => e.uid));
  }, [open]);

  async function handleSave() {
    try {
      setPostLoading(true);
      console.log("values:", values);
      let updatedData;
      if (checkTypeArray === "members") {
        updatedData = values.map((e) => e._id);
      } else {
        updatedData = values.map((e) => ({ uid: e._id, status: true }));
      }
      console.log("updatedData:", updatedData);

      const res =
        checkTypeArray === "members"
          ? await actionsHandler({ members: updatedData })
          : await handleUpdate(checkTypeArray, updatedData);

      console.log("res:", res);

      if (res?.success) {
        handleClose();
      } else {
        console.error("Error:", res?.error); // Log error for debugging purposes
        // Handle error as needed
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setPostLoading(false);
    }
  }

  return (
    <>
      <Button
        startIcon={<PlusCircle size={15} />}
        onClick={handleOpen}
        disabled={isLoading || isFetching}
        sx={{
          width: 118,
          height: 36,
          fontFamily: "var(--font-inter)",
          fontSize: 14,
          borderRadius: 2,
          textTransform: "none",
          color: "#336792",
          ml: 1,
          ":hover": {},
        }}
      >
        {isLoading || isFetching ? (
          <CircularProgress color="inherit" size={18} />
        ) : (
          " Add"
        )}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalRoot">
          <div className="max-w-fit h-auto p-2 overflow-hidden">
            {/* header */}
            <header className="flex justify-between items-start bg-[#F4F3FE] rounded-md">
              {title && (
                <h5 className="p-2 text-base font-medium w-full">{title}</h5>
              )}

              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <X color="var(--primary)" />
              </IconButton>
            </header>

            {/* Content */}
            <div className="mt-4 h-full">
              <div>
                <div className="p-2  h-[50vh] w-[60vw] flex  flex-col justify-between overflow-scroll">
                  <MultipleSelectTable
                    headCells={[
                      {
                        disablePadding: false,
                        label: "Profile",
                        dataKey: "profilePic",
                        type: "avatar",
                      },

                      {
                        type: "string",
                        disablePadding: false,
                        label: "Name",
                        dataKey: "name",
                      },
                      {
                        type: "string",
                        disablePadding: false,
                        label: "Email",
                        dataKey: "email",
                      },
                      {
                        type: "string",
                        disablePadding: false,
                        label: "ID",
                        dataKey: "_id",
                      },
                    ]}
                    rows={data?.data.userList || []}
                    value={values}
                    setValue={setValues}
                    loading={isLoading || isFetching}
                  />
                </div>
                <div className="text-right">
                  <CustomButton
                    onClick={handleSave}
                    disabled={postLoading}
                    style={{
                      ...CustomButtonStyle,
                      width: 186,
                      borderRadius: 5,
                      height: 45,
                    }}
                  >
                    {postLoading || postMembersLoading ? (
                      <CircularProgress color="inherit" size={12} />
                    ) : (
                      " Save Changes"
                    )}
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
