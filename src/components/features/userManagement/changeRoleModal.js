import React, { useState, useEffect } from "react";
import { PlusCircle, UserCog, X } from "lucide-react";
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  InputAdornment,
  Modal,
} from "@mui/material";
import { MultiSelectOutlined } from "../../common/selectFields"; // Correct the import if there's a typo
import { useSelector } from "react-redux";
import { createHandleChange } from "../../../services/common";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../styles/muiRoot";
import {
  useGetGroupByEntityTypeMutation,
  useHandleActionsMutation,
} from "../../../services/apis/exam/group"; // Corrected the typo in import
import { groupApi } from "../../../services/Constant";
import { Descriptions, message } from "antd";
import MultipleSelectTable from "../../common/tableMultipleSelect";
import { groupHeader } from "../../../services/constHeaders";
import { MultipleSelectChipComp } from "../../common/selectChipComp";
import { roleEnumArray } from "../../../services/utilities/enums";

export default function ChangeUserRoleModal({ users }) {
  const initialState = {
    roles: [],
    groups: [],
    entityTypes: [],
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setValues(initialState);
    setCollapse(false);
    setGroupsData([]);
  };
  const handleOpen = () => setOpen(true);
  const [collapse, setCollapse] = useState(false);
  const [values, setValues] = useState(initialState);
  const [groupsData, setGroupsData] = useState([]);
  const handleChange = createHandleChange(values, setValues);
  const { entity } = useSelector((state) => state.entity);
  const [getGroupByEntityType, { isLoading, isError, error }] =
    useGetGroupByEntityTypeMutation();
  const [handleAction, { isLoading: postLoad, isError: postError }] =
    useHandleActionsMutation();

  const fetchGroupList = async () => {
    setValues({ ...values, groups: [] });
    try {
      const response = await getGroupByEntityType({
        endpoint: `${groupApi.endPoint}/entityTypes`,
        data: { entityType: values.entityTypes },
      });

      console.log("🚀 ~ handleSave ~ response:", response);

      if (response && response?.data?.success) {
        message.success("Select the Groups");

        setGroupsData(
          response?.data.data.map((e) => ({
            ...e,
            displayPic: e?.displayPic[0]?.url,
            coverPic: e?.coverPic[0]?.url,
          }))
        );
        setCollapse(true);
      } else {
        message.error(response?.error.data.message, 2.5);
      }
    } catch (error) {
      console.error("Error fetch groups", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await getGroupByEntityType({
        endpoint: `${groupApi.endPoint}/update/user/role`,
        data: {
          ...values,
          users: users,
          groups: values.groups.map((e) => e._id),
        },
      });

      console.log("🚀 ~ handleSave ~ response:", response);

      if (response && response?.data?.success) {
        message.success("Success");

        handleClose();
      } else {
        message.error(response?.error.data.message, 2.5);
      }
    } catch (error) {
      console.error("Error fetch groups", error);
    }
  };

  const isEnable = values.roles.length > 0 && values.groups.length > 0;
  console.log("🚀 ~ ChangeUserRoleModal ~ values:", values);
  return (
    <>
      <Button onClick={handleOpen} key="two">
        <UserCog />
      </Button>

      <Modal
        open={open}
        onClose={handleClose}

        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="modalRoot"
          sx={{ width: "70vw", overflow: "scroll", maxHeight: "80vh" }}
        >
          <header className="flex justify-between items-center bg-medGrey rounded-md p-1 ps-2">
            <h4 className="text-xl font-inter font-semibold text-gray-700">
              User roles
            </h4>
            <IconButton onClick={handleClose}>
              <X className="text-gray-700" />
            </IconButton>
          </header>
          <section>
            <div>
              <MultiSelectOutlined
                name="entityTypes"
                label="Select Entity"
                multiple
                data={
                  entity
                    .flatMap((e) => e.entityType)
                    ?.filter((ele) => !ele.hasOwnProperty("accordian")) || []
                }
                size="medium"
                value={values.entityTypes}
                onChange={handleChange}
                onClose={() => {
                  if (values.entityTypes.length > 0) {
                    fetchGroupList();
                  } else {
                    return;
                  }
                }}
                endAdornment={
                  <InputAdornment
                    position="end"
                    sx={{ p: 0, background: "black" }}
                  >
                    {isLoading && (
                      <CircularProgress color="inherit" size={18} />
                    )}
                  </InputAdornment>
                }
              />
            </div>
          </section>
          <Collapse in={collapse}>
            <Descriptions
              size="small"
              contentStyle={{
                color: "#636262",
                fontFamily: "var(--font-inter)",
              }}
              labelStyle={{
                fontFamily: "var(--font-inter)",
                color: "var(--dark-blue)",
              }}
              bordered
            >
              <Descriptions.Item key="1" label={" Select Roles"} span={2}>
                <div className=" flex  w-full items-end justify-between">
                  <div>
                    <MultipleSelectChipComp
                      style={{ width: "700px", ml: "0px", minHeight: 56 }}
                      value={values.roles}
                      data={roleEnumArray}
                      loading={false}
                      error={false}
                      handleChange={(val) =>
                        handleChange({ target: { name: "roles", value: val } })
                      }
                    />
                  </div>
                  <div>
                    {isEnable && (
                      <CustomButton
                        disabled={isLoading || postLoad || !isEnable}
                        style={{
                          ...CustomButtonStyle,
                          width: "fit-content",
                          borderRadius: 6,
                        }}
                        onClick={handleSave}
                      >
                        {isLoading || postLoad ? (
                          <CircularProgress color="inherit" size={18} />
                        ) : (
                          "Save User Changes"
                        )}
                      </CustomButton>
                    )}
                  </div>
                </div>
              </Descriptions.Item>
            </Descriptions>

            <div>
              <MultipleSelectTable
                headCells={groupHeader}
                rows={groupsData || []}
                value={values.groups}
                setValue={(val) => setValues({ ...values, groups: val })}
                loading={isLoading}
              />
            </div>
          </Collapse>
        </Box>
      </Modal>
    </>
  );
}
