import React, { useCallback, useEffect, useState } from "react";
import {
  Divider,
  Stack,
  Avatar,
  IconButton,
  Modal,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import {
  CustomButton,
  ButtonStyle,
  CustomButtonStyle,
} from "../../../../../styles/muiRoot";
import { Dot, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetGroupByEntityTypeMutation,
} from "../../../../../services/apis/exam/group";

import { groupApi } from "../../../../../services/Constant";

import {
  setActiveView,
  setLinkGroup,
} from "../../../../../ducks/exams/courseSlice";
import { RingLoader } from "react-spinners";
import { Empty, message } from "antd";

function LinkGroups() {
  const { groups, courseDetail } = useSelector((state) => state.courses);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [status, setStatus] = useState({});
  const dispatch = useDispatch();
  const [groupList, setGroupList] = useState([]);

  const [
    getGroupByEntityType,
    { isLoading: getGroupsLoading, isError: getGroupsError, isSuccess },
  ] = useGetGroupByEntityTypeMutation();

  const fetchGroups = async (value) => {
    try {
      const response = await getGroupByEntityType({
        endpoint: `${groupApi.endPoint}/entityTypes`,
        data: { entityType: courseDetail?.entityTypes },
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

  useEffect(() => {
    if (courseDetail?.entityTypes.length > 0) {
      fetchGroups();
    }
  }, [courseDetail.entityTypes]);

  const checkStatus = useCallback(
    (id) => {
      const res = groups?.some((e) => e === id);
      return res;
    },
    [groups]
  );

  const handleSave = async (id) => {
    console.log("🚀 ~ handleSave ~ id:", id);

    const findInd = groups.indexOf(id);

    console.log("🚀 ~ handleSave ~ findInd:", findInd);
    if (findInd === -1) {
      dispatch(setLinkGroup([...groups, id]));
      setStatus({});
      handleClose();
    } else {
      const updatedLinkGroups = [...groups];
      updatedLinkGroups.splice(findInd, 1);
      dispatch(setLinkGroup(updatedLinkGroups));
      setStatus({});
      handleClose();
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
              By {status.value} CAT Exam 2021 to CAT quants, you will allow all
              6 teachers and 8 morderators from CAT Qunats to manage CAT EXAM
              2021
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
                onClick={() => handleSave(status?.id)}
              >
                {false ? (
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
          When you link Group, all the courses of those groups will be able to
          manage the group.
        </h5>
        <div className="cards h-[80vh] p-3">
          {getGroupsLoading ? (
            <div className="h-[90%] relative left-[50%] right-[50%] top-[40%] ">
              <div className="mb-4">
                <RingLoader color="#030807" size={70} />
                <p className="tracking-[0.3rem] mt-3 text-gray-700 ml-[-10px]">
                  Loading...
                </p>
              </div>
            </div>
          ) : courseDetail && courseDetail?.entityTypes?.length === 0 ? (
            <div className=" flex items-center h-full  relative left-[10%]">
              <Empty
                description="Add Entities in details section first"
                className="m-auto"
              />
            </div>
          ) : groupList?.length === 0 ? (
            <div className=" flex items-center h-full  relative left-[10%]">
              <Empty description="No Groups Found" className="m-auto" />
            </div>
          ) : (
            isSuccess &&
            groupList?.map((e) => {
              let status = checkStatus(e._id) === true;
              return (
                <>
                  <div
                    className="flex justify-between items-center my-5 "
                    key={e._id}
                  >
                    <Stack direction="row" spacing={3} alignItems={"center"}>
                      <Avatar
                        src={e.displayPic?.[0]?.url}
                        sx={{ width: 40, height: 40, color: "transparent" }}
                      />
                      <h4 className="font-medium text-small text-gray-700 w-[150px]">
                        {e.title}
                      </h4>

                      <Dot className="text-gray-700" />
                      {e.groupType && (
                        <h3 className="text-secondary text-sm flex gap-1 items-center">
                          {e.groupType}
                        </h3>
                      )}
                    </Stack>
                    <CustomButton
                      style={{
                        ...(status ? CustomButtonStyle : ButtonStyle),
                        width: 72,
                        height: 31,
                        borderRadius: 5,
                      }}
                      value={status ? "Unlink" : "Link"}
                      onClick={(event) => {
                        handleOpen();
                        setStatus({ value: event.target.value, id: e._id });
                      }}
                    >
                      {status ? "Unlink" : "Link"}
                    </CustomButton>
                  </div>
                  <Divider />
                </>
              );
            })
          )}
        </div>

        <CustomButton
          style={{
            ...CustomButtonStyle,
            float: "right",
            position: "absolute",
            right: 15,
            bottom: 30,
          }}
          onClick={() => dispatch(setActiveView("features"))}
        >
          Save & continue
        </CustomButton>
      </div>
    </>
  );
}

export default LinkGroups;
