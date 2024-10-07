import React from "react";
import { Divider, Stack, Avatar, IconButton, Modal } from "@mui/material";
import {
  CustomButton,
  ButtonStyle,
  CustomButtonStyle,
} from "../../../../../../../styles/muiRoot";
import { Dot, X } from "lucide-react";
import { useSelector } from "react-redux";

import { Empty } from "antd";
import { useHandleActionsMutation } from "../../../../../../../services/apis/exam/group";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { BackdropLoader } from "../../../../../../common/lineLoader";
import { toast } from "react-toastify";
import { groupApi } from "../../../../../../../services/Constant";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGroupDetails } from "../../../../../../../ducks/mockGroupsSlice";

function BlockedUser() {
  const { groupDetails } = useSelector((state) => state.mockGroups);

  return (
    <div className="w-5/6 p-2 pt-0">
      <h5 className="text-base text-gray-700 m-2 font-bold">
        Blocked Users ({groupDetails.blockList?.length || "N/A"})
      </h5>
      <div className="cards h-[50vh] overflow-scroll p-3">
        {groupDetails.blockList?.length > 0 ? (
          groupDetails?.blockList?.map((item) => (
            <>
              <div className="flex justify-between items-center my-5 ">
                <Stack
                  direction="row"
                  spacing={3}
                  alignItems={"center"}
                  className="basis-[30%] "
                >
                  <Avatar
                    sx={{ width: 40, height: 40, color: "transparent" }}
                    src={item.uid.profilePic}
                  />
                  <h4 className="font-medium text-small text-gray-700  ">
                    {item.uid.name}
                  </h4>
                </Stack>
                <small className="text-secondary text-sm">
                  ID: {item.uid._id}
                </small>
                {/* Publishing Modal */}
                <UnblockModal
                  id={item.uid._id}
                  name={item.uid.name}
                  type={item.uid.type}
                  groupDetails={groupDetails}
                />
              </div>
              <Divider />
            </>
          ))
        ) : (
          <div className="flex justify-center items-center h-5/6 ">
            <Empty description="No data Found" />
          </div>
        )}
      </div>
    </div>
  );
}

const UnblockModal = ({ id, name, groupDetails }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [handleActions, { isLoading, error: messageError }] =
    useHandleActionsMutation();
  const actionsHandler = async (uid) => {
    try {
      const response = await handleActions({
        endpoint: `${groupApi.endPoint}/unblock/member/${params.groupId}`,
        data: {
          uid: uid,
        },
      });

      console.log("response", response);
      if (response && response?.data && response?.data?.success) {
        dispatch(
          setGroupDetails({
            ...groupDetails,
            blockList: response.data.blockList,
          })
        );
        enqueueSnackbar(`Unblocked`, {
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
        handleClose();
      } else {
        enqueueSnackbar(`${response.message}`, {
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
      console.log("🚀 ~ handleActions ~ error:", messageError);
      toast.error(error);
    }
  };
  return (
    <>
      <CustomButton
        style={{
          ...ButtonStyle,
          width: 82,
          height: 31,
          borderRadius: 5,
        }}
        onClick={handleOpen}
      >
        Unblock
      </CustomButton>
      <BackdropLoader isOpen={isLoading} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalRoot">
          <header className="ps-2 flex justify-between items-center">
            <h4 className="text-xl font-inter font-semibold">Unblock User</h4>
            <IconButton onClick={handleClose}>
              <X />
            </IconButton>
          </header>
          <div className="w-[627px] mt-2 p-2 flex flex-col gap-2">
            <h4 className="text-base font-medium">
              Are you sure you want to Unblock {name}?
            </h4>
            <p className="text-secondary text-sm">
              By unblocking {name} will again be able to interact and
              participate in the activites of the group.
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
                style={{
                  ...CustomButtonStyle,
                  width: 117,
                  height: 39,
                  borderRadius: 6,
                }}
                onClick={() => actionsHandler(id)}
              >
                Save
              </CustomButton>
            </Stack>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BlockedUser;
