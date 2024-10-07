import React, { useState } from "react";
import { HeaderWithNavigation } from "../../../common/header";
import { InputLabel, Paper, TextField } from "@mui/material";
import BootstrapTextField from "../../../common/bootstrapTextField";
import { MultipleSelect } from "../../../common/selectFields";
import { MultiSelectOutlined } from "../../../common/selectFields";
import { CustomButton, CustomButtonStyle } from "../../../../styles/muiRoot";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useCreateMutation,
  useGetDailyStreakRewardQuery,
  useUpdateMutation,
} from "../../../../services/apis/dailyStreakApi";
import { dailyStreakApi, rewardsApi } from "../../../../services/Constant";
import { toast } from "react-toastify";
import { message } from "antd";
import { useSelector } from "react-redux";
import DatePickerComp from "../../../common/datePicker";

export default function CreateDailyStreak() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const { dailyStreakTaskDetail } = useSelector((state) => state.dailyStreak);
  const { activityList, taskList } = useSelector((state) => state.dailyStreak);
  const [values, setValues] = useState(dailyStreakTaskDetail);

  const [create, { isLoading: postLoad, isError: postError }] =
    useCreateMutation();
  const [update, { isLoading: updateLoad, isError: updateError }] =
    useUpdateMutation();
  const {
    data: rewardList,
    isLoading: rewardsLoad,
    isError: rewardsError,
    isSuccess: rewardsSuccess,
  } = useGetDailyStreakRewardQuery(`${rewardsApi.rewardsEndPoint}/offer/list`, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const checkType = location?.pathname.includes("edit") && params.taskId;

  const handleCreate = async () => {
    try {
      const response = await create({
        endpoint: `${dailyStreakApi.endPoint}`,
        data: values,
      });

      if (response.data && response.data.success) {
        toast.success("Task Added successfully!", {
          autoClose: 2000,
          onOpen: () => {
            navigate(`/main/dailyStreak`);
          },
        });
      } else {
        toast.error("Some error occured to create task!", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error add task api:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await update({
        endpoint: `${dailyStreakApi.endPoint}/${params.taskId}`,
        updatedData: values,
      });

      if (response.data && response.data.success) {
        message.success(" Updated!", 2.5);
        navigate(`/main/dailyStreak`);
      } else {
        message.error("Some error occured to daily streak!", 2.5);
      }
    } catch (error) {
      console.error("Error update streak:", error);
      throw error;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      value = checked;
    }
    setValues({ ...values, [name]: value });
  };

  console.log("valuues", values);

  return (
    <div>
      <HeaderWithNavigation cont={"Create Daily Streak"} />
      <Paper
        sx={{
          m: 2,
          height: "90vh",
          p: 2,
          position: "relative",
          overflow: "scroll",
        }}
      >
        <div className="w-4/6">
          <div className="flex gap-3 items-start">
            <TextField
              autoFocus={true}
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Event name"
              variant="outlined"
              margin="normal"
              size="medium"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
            <DatePickerComp
              style={{ height: 23, width: "100%", mt: 2 }}
              // size="medium"
              data={values.date}
              setData={(val) =>
                handleChange({
                  target: {
                    name: "date",
                    value: val,
                  },
                })
              }
            />
          </div>
          <TextField
            multiline
            minRows={5}
            autoFocus={true}
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            margin="normal"
            size="medium"
            name="description"
            value={values.description}
            onChange={handleChange}
          />

          <MultiSelectOutlined
            name="rewardId"
            label="Add Rewards"
            multiple
            data={rewardList?.offerList || []}
            isSuccess={rewardsSuccess}
            error={rewardsError}
            loading={rewardsLoad}
            value={values.rewardId}
            onChange={handleChange}
          />

          <MultiSelectOutlined
            name="activities"
            label="Add Activity"
            multiple
            data={activityList || []}
            value={values.activities}
            onChange={handleChange}
          />

          <MultiSelectOutlined
            name="taskId"
            label="Add Task"
            data={taskList || []}
            value={values.taskId}
            onChange={handleChange}
          />
        </div>

        <div className="absolute bottom-10 right-5">
          <CustomButton
            size="small"
            onClick={checkType ? handleUpdate : handleCreate}
            sx={{
              ...CustomButtonStyle,
              width: "150px",
              height: "40px",
              borderRadius: 2,
              float: "right",
              my: 2,
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            {checkType ? "Save Changes" : "+ Create Task"}
          </CustomButton>
        </div>
      </Paper>
    </div>
  );
}
