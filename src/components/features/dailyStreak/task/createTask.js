import React, { useEffect, useState } from "react";
import { HeaderWithNavigation } from "../../../common/header";
import { Paper, TextField } from "@mui/material";
import { MultiSelectOutlined } from "../../../common/selectFields";
import { CustomButton, CustomButtonStyle } from "../../../../styles/muiRoot";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useCreateMutation,
  useUpdateMutation,
} from "../../../../services/apis/dailyStreakApi";
import { dailyStreakApi } from "../../../../services/Constant";
import { toast } from "react-toastify";
import { message } from "antd";
import { setActivityList } from "../../../../ducks/dailyStreakSlice";
import { useDispatch } from "react-redux";
import { useGetListQuery as useFetchActivityList } from "../../../../services/apis/dailyStreakApi";
import { useSelector } from "react-redux";

export default function CreateTask() {
  const { taskDetail } = useSelector((state) => state.dailyStreak);

  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState(taskDetail);
  const checkType = location?.pathname.includes("edit") && params.taskId;
  const [create, { isLoading: postLoad, isError: postError }] =
    useCreateMutation();
  const [update, { isLoading: updateLoad, isError: updateError }] =
    useUpdateMutation();
  const { data, isLoading, isError, isSuccess } = useFetchActivityList(
    `${dailyStreakApi.endPoint}/task/activity`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (data?.data?.activityList) {
      dispatch(setActivityList(data.data.activityList));
    }
  }, [data]);

  const handleCreate = async () => {
    try {
      const response = await create({
        endpoint: `${dailyStreakApi.endPoint}/task`,
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
        endpoint: `${dailyStreakApi.endPoint}/task/${params.taskId}`,
        updatedData: values,
      });

      if (response.data && response.data.success) {
        message.success("Task Updated!", 2.5);
        navigate(`/main/dailyStreak`);
      } else {
        message.error("Some error occured to Edit task!", 2.5);
      }
    } catch (error) {
      console.error("Error add Assignment api:", error);
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

  console.log("values", values);
  return (
    <div>
      <HeaderWithNavigation cont={"Create Task"} />
      <Paper sx={{ m: 2, height: "90vh", p: 2, position: "relative" }}>
        <div className="w-4/6">
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

          <MultiSelectOutlined
            name="activities"
            label="Add Activity"
            multiple
            data={data?.data.activityList ?? []}
            isSuccess={isSuccess}
            value={values.activities}
            loading={isLoading}
            error={isError}
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
