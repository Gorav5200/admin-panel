import React, { useState } from "react";
import {
  Divider,
  Stack,
  Avatar,
  IconButton,
  Modal,
  CircularProgress,
} from "@mui/material";
import {
  CustomButton,
  ButtonStyle,
  CustomButtonStyle,
} from "../../../../../../../styles/muiRoot";
import { Dot, SaveIcon, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useLinkGroupMutation } from "../../../../../../../services/apis/exam/group";
import { toast } from "react-toastify";
import { setGroupDetails } from "../../../../../../../ducks/mockGroupsSlice";

function LinkGroups() {
  const { groupsList, groupDetails } = useSelector((state) => state.mockGroups);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [status, setStatus] = useState({});
  const dispatch = useDispatch();

  const checkStatus = (id) => {
    const res = groupDetails.linkedGroups?.some((e) => e.groupId === id);
    return res;
  };

  const [linkGroup, { isLoading: updateLoading, isError: updateError }] =
    useLinkGroupMutation();

  const handleSave = async () => {
    try {
      const response = await linkGroup({
        endpoint: `/exams/v1/group/link/${
          groupDetails._id
        }/${status.value.toLowerCase()}`,
        updatedData: { groupId: status.id },
      });

      if (response && response?.data?.success) {
        dispatch(setGroupDetails(response.data.data));
        handleClose();
      } else {
        toast.error(`Some error occurred while updating Linked Group`, {
          autoClose: 2000,
        });
        console.error("Error updating field. Response:", response);
      }
    } catch (error) {
      console.error("Error updating field:", error);
      throw error; // Rethrow the error so that the calling code can handle it if needed
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalRoot">
          <header className="ps-2 flex justify-between items-center">
            <h4 className="text-xl font-inter font-semibold">
              {status.value || ""} Group
            </h4>
            <IconButton onClick={handleClose}>
              <X />
            </IconButton>
          </header>
          <div className="w-[627px]  p-2 flex flex-col gap-4">
            <p className="text-sm text-gray-700">
              By Linking CAT Exam 2021 to CAT quants, you will allow all 6
              teachers and 8 morderators from CAT Qunats to manage CAT EXAM 2021
            </p>

            <Stack direction="row" justifyContent="flex-end" spacing={2} my={2}>
              <CustomButton
                style={{
                  ...ButtonStyle,
                  width: 117,
                  height: 39,
                  borderRadius: 6,
                }}
                onClick={handleClose}
              >
                Cancel
              </CustomButton>
              <CustomButton
                sx={{
                  ...CustomButtonStyle,
                  width: 117,
                  height: 39,
                  borderRadius: 2,
                  color: "white",
                }}
                loadingPosition="start"
                disabled={updateLoading}
                onClick={handleSave}
              >
                {updateLoading ? (
                  <CircularProgress size={20} sx={{ color: "white" }} />
                ) : (
                  "Save"
                )}
              </CustomButton>
            </Stack>
          </div>
        </div>
      </Modal>

      <div className="w-5/6 p-2 pt-0">
        <h5 className="text-base text-gray-700 font-normal m-2">
          When you link group, all the teachers & moderators of those groups
          will be able to manage the group.
        </h5>
        <div className="cards h-[50vh] overflow-scroll p-3">
          {groupsList?.map((e) => (
            <>
              <div
                className="flex justify-between items-center my-5 "
                key={e._id}
              >
                <Stack direction="row" spacing={3} alignItems={"center"}>
                  <Avatar
                    sx={{ width: 40, height: 40, color: "transparent" }}
                  />
                  <h4 className="font-medium text-small text-gray-700 w-[150px]">
                    {e.title}
                  </h4>

                  <Dot className="text-gray-700" />
                  <small className="text-secondary text-xs ">
                    {e.groupType} Group
                  </small>
                </Stack>
                <CustomButton
                  style={{
                    ...ButtonStyle,
                    width: 72,
                    height: 31,
                    borderRadius: 5,
                  }}
                  value={checkStatus(e._id) === true ? "Unlink" : "Link"}
                  onClick={(event) => {
                    handleOpen();
                    setStatus({ value: event.target.value, id: e._id });
                  }}
                >
                  {checkStatus(e._id) === true ? "Unlink" : "Link"}
                </CustomButton>
              </div>
              <Divider />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default LinkGroups;
