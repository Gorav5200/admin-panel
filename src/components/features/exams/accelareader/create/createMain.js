import React, { useMemo, useRef, useState } from "react";
import { HeaderWithNavigation } from "../../../../common/header";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { createHandleChange } from "../../../../../services/common";
import { useSelector } from "react-redux";
import { Empty, message } from "antd";
import QuillEditor from "../../../../common/textEditor";
import { CustomButton, CustomButtonStyle } from "../../../../../styles/muiRoot";
import { useGetTopicListQuery } from "../../../../../services/apis/dataManagement/topic";
import { accelareaderApi, topicApi } from "../../../../../services/Constant";
import { useCreateAccelareaderMutation, useUpdateAccelareaderMutation } from "../../../../../services/apis/accelareader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BackdropLoader } from "../../../../common/lineLoader";
import { SmileOutlined } from "@ant-design/icons";
  

function CreateMain() {
  const navigate = useNavigate();
  const location = useLocation();
  const params=useParams();
  const state = useSelector((state) => state.accelareader);
  const [formDetail, setFormDetail] = useState(state);
  const [errors, setErrors] = useState({});

  const handleChange = createHandleChange(formDetail, setFormDetail);

  const {
    data: topicList,
    isLoading,
    isError,
  } = useGetTopicListQuery(topicApi.endPoint, {
    refetchOnMountOrArgChange: true,
  });

  const [createAccelareader, { isLoading: postLoad, isError: postError }] = useCreateAccelareaderMutation(`${accelareaderApi.endPoint}`);
  const [updateAccelereader, { isLoading: updateLoad, isError: updateError }] = useUpdateAccelareaderMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call the addMockPackage mutation
      const response = await createAccelareader({
        endpoint: `${accelareaderApi.endPoint}`,
        data: formDetail,
      });
      // Navigate to the desired path after successful deletion
      console.log("Response:", response);
      if (response && response?.data?.success) {
        // Navigate to the desired path after successful deletion
        message.success("Accelareader Create successfully!", 2.5);
        navigate(`/main/exam/accelareader`);
      } else {
        message.error("Some error occured to create accelareader!", 2.5);
      }
    } catch (error) {
      console.error("Error create Module:", error);
    }
  };
  
  const handleUpate = async (event) => {
    event.preventDefault();
    try {
      // Call the addMockPackage mutation
      const response = await updateAccelereader({
        endpoint: `${accelareaderApi.endPoint}/${params.accelareaderId}`,
        updatedData: formDetail,
      });
      // Navigate to the desired path after successful deletion
      console.log("Response:", response);
      if (response && response?.data?.success) {
        // Navigate to the desired path after successful deletion
        message.success("Accelareader Edit successfully!", 2.5);
        navigate(`/main/exam/accelareader/${params.accelareaderId}`);
      } else {
        message.error("Some error occured to Edit accelareader!", 2.5);
      }
    } catch (error) {
      console.error("Error edit Module:", error);
    }
  };

  const checkComp = useMemo(() => {
    return location.pathname.includes("edit");
  }, [location.pathname]);


  return (
    <div>
    <BackdropLoader isOpen={isLoading || postLoad || updateLoad}/>
      <HeaderWithNavigation cont={checkComp ? "Edit Topic" : "Create Topic"} />
      <Paper
        sx={{
          p: 2,
          width: "100%",
          height: "auto",
        }}
      >
        <Box
          component={"form"}
          noValidate
          autoComplete="off"
          onSubmit={checkComp?handleUpate:handleSubmit}
        >
          <section className="flex justify-around w-full gap-6">
            <div className="w-full">
              <h5 className="font-medium font-inter my-2">Topic</h5>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  labelId="demo-simple-select-label"
                  size="small"
                  id="demo-simple-select"
                  value={formDetail.topicId}
                  placeholder="Select Topic"
                  name="topicId"
                  error={errors.topicId ? true : false}
                  helperText={errors.topicId}
                  onChange={handleChange}
                >
                  {isError ? (
                    <MenuItem value="" disabled>
                      <div style={{ textAlign: "center", width: "100%" }}>
                        <SmileOutlined style={{ fontSize: 20 }} />
                        <p>Some Error Occured</p>
                      </div>
                    </MenuItem>
                  ) : topicList?.data?.length === 0 ? (
                    <div style={{ textAlign: "center", width: "100%" }}>
                        <SmileOutlined style={{ fontSize: 20 }} />
                        <p>No Topics available</p>
                      </div>
                  ) : Array.isArray(topicList?.data) ? (
                    topicList?.data?.map((e, ind) => (
                      <MenuItem key={e._id} value={e._id}>
                        {e.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No Topic available
                    </MenuItem>
                  )}
                </Select>
                <small className="text-red-700 ml-1 my-1">
                  {errors.topicId}
                </small>
              </FormControl>
            </div>
          </section>
          <br />
          <Divider />
          <div>
            <h5 className="font-medium font-inter my-2">Add Content</h5>
            <QuillEditor
              setValue={(val) =>
                handleChange({
                  target: {
                    name: "content",
                    value: val,
                  },
                })
              }
              value={formDetail.content}
            />
          </div>

          <div className="text-right">
            <CustomButton
              sx={{
                ...CustomButtonStyle,
                mt: 2,
                borderRadius: 2,
              }}
              type="submit"
            >
              {checkComp ? "Save Changes" : "Create"}
            </CustomButton>
          </div>
        </Box>
      </Paper>
    </div>
  );
}

export default CreateMain;
