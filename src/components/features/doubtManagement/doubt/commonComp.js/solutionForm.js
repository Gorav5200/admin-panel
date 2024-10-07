import { IconButton, TextField } from "@mui/material";
import { DoubtCard } from "./cards";
import UploadComponent from "../../../../common/uploadPdf";
import { doubtApi } from "../../../../../services/Constant";
import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../../styles/muiRoot";
import { useUploadDoubtSolutionMutation } from "../../../../../services/apis/doubtApi";
import { userDetail } from "../../../../../ducks/userSlice";
import { useSelector } from "react-redux";
import { message } from "antd";

export default function AddSolutionForm({
  handlePassQuestion,
  initialValue,
  doubtDetail,
  handleClose
}) {
  console.log("🚀 ~ doubtDetail:", doubtDetail)
  const userInfo = useSelector(userDetail);
  console.log("🚀 ~ AddSolutionForm ~ initialValue:", initialValue);

  const initialState = {
    title: "",
    description: "",
    media: "",
  };

  const [values, setValues] = useState(initialValue || initialState);

  useEffect(() => {
    if (initialValue) setValues(initialValue);
  }, [initialValue]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setValues({ ...values, [name]: newValue });
  };

  const [uploadDoubtMutation, { isLoading: postLoad, error: postError }] =
    useUploadDoubtSolutionMutation();

  const handleUpload = async (values) => {
    const GroupCredentials = {
      ...values,
      media: values.media.map((e) => e.data),
      doubtId: doubtDetail._id,
      uid: userInfo._id,
      commentType: "solution",
      entityType:doubtDetail.entityType,
      groupId: doubtDetail.groupId._id,
      solutionType: null,
    };

    const classCredentials = {
      ...values,
      media: values.media.map((e) => e.data),
      doubtId: doubtDetail._id,
      uid: userInfo._id,
      replyType: "solution",
      entityType: "",
      solutionType: "true",
    };

    try {
      const response = await uploadDoubtMutation({
        endpoint:
          doubtDetail?.type === "group"
            ? `${doubtApi.endPoint}/feed/solution`
            : `${doubtApi.endPoint}/class/solution`,
        data: GroupCredentials,
      });

      if (response.data && response.data.success) {
        message.success("Uploaded");
        handleClose();
      } else {
        message.error(response?.error.data.message);
      }
    } catch (error) {
      message.error("Error uploading solution");
    }
  };

  console.log("🚀 ~ values:", values);
  return (
    <div className="w-full p-2">
      <h4 className="text-xl font-inter font-semibold text-gray-700">
        Fill Solution Details :
      </h4>
      <TextField
        autoFocus
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
        label="Description"
        variant="outlined"
        multiline
        minRows={4}
        margin="normal"
        size="medium"
        name="description"
        value={values.description}
        onChange={handleChange}
      />

      <div className=" flex flex-col gap-2">
        <label
          id="upload"
          className="text-sm font-inter font-semibold text-gray-700 "
        >
          Upload Solution{" "}
          <small>(You can only upload image, PDF, PPT, or video medias)</small>
        </label>

        <UploadComponent
          id="upload"
          url={`${doubtApi.endPoint}/upload/file`}
          data={values.media}
          setData={(val) =>
            handleChange({
              target: {
                name: "media",
                value: val,
              },
            })
          }
        />

        <div className="flex justify-end items-baseline gap-5">
       {handlePassQuestion &&    <CustomButton
            onClick={() => handlePassQuestion()}
            style={{
              ...ButtonStyle,
              width: 150,
              borderRadius: 5,
              height: 40,
            }}
          >
            Pass
          </CustomButton>
}

          <LoadingButton
            color="primary"
            onClick={() => handleUpload(values)} //CALL POST API HANDLER FROM PARENT COMP//
            loading={postLoad}
            loadingPosition="end"
            sx={{
              ...CustomButtonStyle,
              width: "150px",
              height: "40px",
              borderRadius: 2,
            }}
            variant="contained"
          >
            Save
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
