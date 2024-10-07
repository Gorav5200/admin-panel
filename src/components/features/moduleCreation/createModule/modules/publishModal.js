import React from "react";
import { XIcon } from "lucide-react";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../../styles/muiRoot";
import { useNavigate, useParams } from "react-router-dom";
import { BackdropLoader } from "../../../../common/lineLoader";
import { Box, IconButton, Modal, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useCreateClassMutation } from "../../../../../services/apis/exam/class";
import { useCreateModuleMutation } from "../../../../../services/apis/modulesApi";
import { message } from "antd";
import { moduleApi } from "../../../../../services/Constant";

export default function PublishModal({ handleClose, open }) {
  const navigate = useNavigate();
  const params = useParams();
  const [createModule, { isLoading: postLoading }] = useCreateModuleMutation();
  const state = useSelector((state) => state.addModule);
  const { moduleDetails,activeView, ...others } = state;

  const handleData = () => {
    const getId = Object.entries(others).reduce((acc, [key, value]) => {
      console.log("🚀 ~ getId ~ acc, [key, value]:", acc, [key, value])
      if(key === "mockPackages"){

        acc[key]= value?.flatMap((e) => ({...e,mockTests:e.mockTests.map((item)=>item._id)}) );
      }else{
        acc[key] = value?.map((e) => e._id || []) || [];
      }
    
      return acc;
    }, {});
  
    const data = { ...moduleDetails, ...getId };
    return data; 
  }
  
  
  console.log("🚀 ~ handleData ~ handleData:",handleData())
  const handleSubmit = async () => {
    try {
      // Call the addMockPackage mutation
      const response = await createModule({
        endpoint: `${moduleApi.endPoint}`,
        data: await handleData(),
      });
      // Navigate to the desired path after successful deletion
      console.log("Response:", response);
      if (response && response?.data?.success) {
        // Navigate to the desired path after successful deletion
        message.success("Module Added successfully!", 2.5);
        navigate(`/main/exam/module`);
      } else {
        message.error("Some error occured to Add Module!", 2.5);
        console.error("Error add Module. Response:", response);
      }
    } catch (error) {
      console.error("Error add Add Module:", error);
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
        <Box className="modalRoot">
          <BackdropLoader isOpen={postLoading} />
          <header className="ps-2 flex justify-between items-center">
            <h4 className="text-xl font-inter font-semibold text-gray-700">
              Publish Module?
            </h4>
            <IconButton
              onClick={() => {
                handleClose();
              }}
            >
              <XIcon className="text-gray-700" />
            </IconButton>
          </header>
          <div className="w-[627px] mt-7 p-2 flex flex-col gap-4">
            <p className="text-gray-600 text-sm">
              Would you like to publish Module created in CAT Exams, by
              publishing the students can see and purchase the following class
            </p>

            <Stack direction="row" justifyContent="flex-end" spacing={2} my={2}>
              <CustomButton
                style={{
                  ...ButtonStyle,
                  width: 117,
                  height: 39,
                  borderRadius: 6,
                }}
                onClick={() => {
                  handleClose();
                }}
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
                onClick={handleSubmit}
              >
                Publish
              </CustomButton>
            </Stack>
          </div>
        </Box>
      </Modal>
    </>
  );
}
