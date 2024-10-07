import React, { useEffect, useLayoutEffect, useState } from "react";
import { HeaderWithNavigation } from "../../../common/header";
import {
  CircularProgress,
  Divider,
  IconButton,
  InputLabel,
  Paper,
  TextField,
} from "@mui/material";
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
import Modal from "@mui/material/Modal";
import { XIcon } from "lucide-react";

export default function CreateReward({
  data,
  openModal,
  handleCloseModal,
  type,
  refetch,
}) {
  console.log("🚀 ~ CreateReward ~ type:", type);
  const params = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    rewards: [],
    days: null,
  });

  useLayoutEffect(() => {
    if (type === "edit" && Object.keys(data).length > 0) {
      setValues(data);
    } else {
      setValues({ rewards: [], days: null });
    }
  }, [data]);

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

  const handleCreate = async () => {
    try {
      const response = await create({
        endpoint: `${dailyStreakApi.endPoint}/streak`,
        data: values,
      });

      if (response.data && response.data.success) {
        message.success("Streak Reward Created!", 2.5);
        refetch();
        handleCloseModal();
      } else {
        toast.error("Some error occured to create reward!", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error add reward api:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await update({
        endpoint: `${dailyStreakApi.endPoint}/streak/${values._id}`,
        updatedData: values,
      });

      if (response.data && response.data.success) {
        message.success("Streak Reward Updated!", 2.5);
        refetch();
        handleCloseModal();
      } else {
        message.error("Some error occured to Edit Assignment!", 2.5);
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

  console.log("valuues", values);

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalRoot">
          <header className="ps-2 flex justify-between items-center bg-medGrey rounded-t-md">
            <h4 className="text-xl font-inter font-semibold text-gray-700">
              {type === "edit" ? "Edit" : "Create"} Daily Reward
            </h4>
            <IconButton onClick={handleCloseModal}>
              <XIcon className="text-gray-700" />
            </IconButton>
          </header>
          <Divider />
          <div className="w-[50vw] p-2">
            <TextField
              autoFocus={true}
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Days"
              variant="outlined"
              margin="normal"
              type="number"
              size="medium"
              name="days"
              value={values.days}
              onChange={handleChange}
            />
            <div className="mt-2">
              <MultiSelectOutlined
                name="rewards"
                label="Add Rewards"
                multiple
                data={rewardList?.offerList || []}
                isSuccess={rewardsSuccess}
                error={rewardsError}
                loading={rewardsLoad}
                value={values.rewards}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mx-2">
            <CustomButton
              size="small"
              disabled={postLoad || updateLoad}
              onClick={type === "edit" ? handleUpdate : handleCreate}
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
              {postLoad || updateLoad ? (
                <CircularProgress color="inherit" size={18} />
              ) : type === "edit" ? (
                "Save Changes"
              ) : (
                "+ Create Task"
              )}
            </CustomButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
