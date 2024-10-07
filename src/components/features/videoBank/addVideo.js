import React, { useEffect, useLayoutEffect, useState } from "react";

import {
  Chip,
  Divider,
  Fade,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { MultiSelectOutlined } from "../../common/selectFields";
import { CustomButton, CustomButtonStyle } from "../../../styles/muiRoot";
import {
  useCreateMutation,
  useGetDailyStreakRewardQuery,
  useUpdateMutation,
} from "../../../services/apis/dailyStreakApi";
import {
  dailyStreakApi,
  rewardsApi,
  topicApi,
  videoBank,
} from "../../../services/Constant";
import { message } from "antd";
import Modal from "@mui/material/Modal";
import { XIcon } from "lucide-react";
import { useGetTopicListQuery } from "../../../services/apis/dataManagement/topic";
import VideoUpload from "../../common/videoUpload";
import { LoadingButton } from "@mui/lab";
import { truncateTitle } from "../../../services/common";

export default function AddVideoModal({
  openModal,
  handleCloseModal,
  refetch: listRefetch,
  data,
  type,
}) {
  console.log("🚀 ~ AddVideoModal ~ data:", data, type);

  const initialState = {
    topicId: null,
    title: null,
    media: null,
    description: null,
    thumbnail: null,
  };
  const [values, setValues] = useState(initialState);
  const [alignment, setAlignment] = React.useState("drag");

  const handleAlign = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useLayoutEffect(() => {
    if (type === "edit" && data) {
      setValues(data);
    } else {
      setValues(initialState);
    }
    return () => {
      setValues(initialState);
    };
  }, [openModal]);

  const [create, { isLoading: postLoad, isError: postError }] =
    useCreateMutation();
  const {
    data: topicList,
    isLoading,
    isError,
    isSuccess,

    refetch,
  } = useGetTopicListQuery(topicApi.endPoint, {
    refetchOnMountOrArgChange: true,
  });

  const handleCreate = async () => {
    try {
      const response = await create({
        endpoint: `${videoBank.endPoint}/add`,
        data: values,
      });

      if (response.data && response.data.success) {
        message.success("Added");
        await handleCloseModal();
        await listRefetch();
      } else {
        message.error("Some error occured to create video!");
      }
    } catch (error) {
      console.error("Error add reward api:", error);
    }
  };

  const [update, { isLoading: updateLoad, isError: updateError }] =
    useUpdateMutation();

  const handleUpdate = async () => {
    try {
      const response = await update({
        endpoint: `${videoBank.endPoint}/${values._id}`,
        updatedData: values,
      });

      if (response.data && response.data.success) {
        message.success("Video Updated!", 2.5);
        await handleCloseModal();
        await listRefetch();
      } else {
        message.error("Some error occured!", 2.5);
      }
    } catch (error) {
      console.error("Error update video :", error);
      throw error;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      value = checked;
    }
    if (name === "media") {
      setValues({
        ...values,
        [name]: value?.video ?? value,
        thumbnail: value?.thumbnail ?? null,
      });
    } else {
      setValues({ ...values, [name]: value });
    }
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
        <div className="modalRoot max-h-[70vh] overflow-scroll">
          <header className="ps-2 flex justify-between items-center bg-medGrey rounded-t-md">
            <h4 className="text-xl font-inter font-semibold text-gray-700">
              {type === "edit" ? "Edit Info" : " Add Video"}
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
              label="Title"
              variant="outlined"
              margin="normal"
              size="medium"
              name="title"
              value={values.title}
              onChange={handleChange}
            />

            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Descripton"
              variant="outlined"
              multiline
              minRows={4}
              margin="normal"
              size="medium"
              name="description"
              value={values.description}
              onChange={handleChange}
            />

            <MultiSelectOutlined
              name="topicId"
              label="Select Topic"
              data={topicList?.data || []}
              isSuccess={isSuccess}
              error={isError}
              loading={isLoading}
              value={values.topicId}
              onChange={handleChange}
            />

            {type === "edit" ? (
              <div className="flex gap-2 items-center  p-2">
                <p className="text-sm font-semibold">Video Link</p>
                <Chip
                  sx={{ borderRadius: 2, maxWidth: "30ch" }}
                  label={
                    <a
                      title={truncateTitle(values.media)}
                      target="_blank"
                      href={truncateTitle(values?.media || "#")}
                      rel="noopener noreferrer"
                    >
                      {truncateTitle(values?.media, 3)}
                    </a>
                  }
                />
              </div>
            ) : (
              <div className="my-2">
                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleAlign}
                  aria-label="Platform"
                  sx={{ my: 2 }}
                >
                  <ToggleButton sx={{ textTransform: "none" }} value="drag">
                    Drag and Drop
                  </ToggleButton>
                  <ToggleButton sx={{ textTransform: "none" }} value="link">
                    Add Link
                  </ToggleButton>
                </ToggleButtonGroup>

                {alignment === "drag" ? (
                  <VideoUpload
                    url={`${videoBank.endPoint}/upload/video`}
                    setValue={(val) => {
                      handleChange({
                        target: {
                          name: "media",
                          value: val,
                        },
                      });
                    }}
                    value={values.media}
                  />
                ) : (
                  <TextField
                    sx={{ width: "100%" }}
                    id="outlined-basic"
                    label="Add Link"
                    variant="outlined"
                    margin="normal"
                    size="medium"
                    name="media"
                    value={values.media}
                    onChange={handleChange}
                  />
                )}
              </div>
            )}
          </div>

          <LoadingButton
            color="primary"
            onClick={type === "edit" ? handleUpdate : handleCreate}
            loading={postLoad || updateLoad}
            loadingPosition="end"
            sx={{
              ...CustomButtonStyle,
              width: "150px",
              height: "40px",
              borderRadius: 2,
              float: "right",
            }}
            variant="contained"
          >
            <span>{type === "edit" ? "Save Changes" : "Save"}</span>
          </LoadingButton>
        </div>
      </Modal>
    </div>
  );
}
