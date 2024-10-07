import React, { useEffect, useState } from "react";
import Header, { HeaderWithNavigation } from "../../../../../common/header";
import { Avatar, IconButton, Skeleton, Snackbar } from "@mui/material";
import { useParams } from "react-router-dom";
import FullWidthTabs from "../../../../../common/tabChanger";
import GroupSetting from "./groupSettings/groupSetting";
import GroupDetail from "./details/groupDetail";
import { useSelector } from "react-redux";
import { useUpdateFieldMutation } from "../../../../../../services/apis/exam/group";
import { setGroupDetails } from "../../../../../../ducks/mockGroupsSlice";
import { useDispatch } from "react-redux";
import Doubts from "./doubts/doubts";
import GroupAnalytics from "./groupAnalytics/groupAnalytics";
import { message } from "antd";
import { useSnackbar } from "notistack";
import { X } from "lucide-react";
import { groupApi } from "../../../../../../services/Constant";

export default function CreateGroupMain() {
  const dispatch = useDispatch();
  const params = useParams();
  const { groupDetails } = useSelector((state) => state.mockGroups);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [updateFields, { isLoading: updateLoading, isError: updateError }] =useUpdateFieldMutation();

  const handleUpdate = async (field, updatedData) => {
    try {
      const response = await updateFields({
        endpoint: `${groupApi.endPoint}/field/${params.groupId}`,
        updatedData: {
          fieldName: field,
          updatedData: updatedData,
        },
      });

      if (response && response?.data && response?.data?.success) {
        console.log("🚀 ~ handleUpdate ~ response?.data:", response?.data.data)
        await dispatch(setGroupDetails(response.data.data));
        enqueueSnackbar("Field Updated!", {
          variant: "success",
          action: (key) => (
            <IconButton
              aria-label="close"
              color="inherit"z
              onClick={() => closeSnackbar(key)}
            >
              <X size={15} />
            </IconButton>
          ),
        });

      } else {
        enqueueSnackbar(`Some error occurred while updating ${field}`, {
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

      return response.data;
    } catch (error) {
      console.error("Error updating field:", error);
      throw error;
    }
  };

  
  return (
    <div className="h-screen">
      <HeaderWithNavigation
        cont={
          updateLoading ? (
            <Skeleton width={"10ch"} />
          ) : (
            groupDetails?.title || "Undefined"
          )
        }
      />
      <div className="bg-white p-3 rounded-md ">
        <FullWidthTabs
          data={[
            
            {
              item: 1,
              label: "Group Details",
              content: <GroupDetail handleUpdate={handleUpdate} />,
            },
            {
              item: 2,
              label: (
                <p>
                  Doubts <sapn className="text-orange-500"> (08) </sapn>
                </p>
              ),

              content: <Doubts />,
            },
            {
              item: 3,
              label: "Group Settings",

              content: <GroupSetting handleUpdate={handleUpdate} />,
            },
            {
              item: 4,
              label: "Group Analytics",
              content: <GroupAnalytics />,
            },
          ]}
        />
      </div>
    </div>
  );
}
