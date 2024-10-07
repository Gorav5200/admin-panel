import React, { useState } from "react";
import NestedTable from "../../../../common/nestedTable";
import {
  assignmentHeader,
  dailyQuizHeader,
  packageHeader,
} from "../../../../../services/constHeaders";
import { useGetDailyQuizPackageQuery } from "../../../../../services/apis/dailyQuizApi";
import { dailyQuiz, moduleApi } from "../../../../../services/Constant";
import { AppBar, CircularProgress, Container, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setDailyQuiz } from "../../../../../ducks/addModuleSlice";
import { CustomButton, CustomButtonStyle } from "../../../../../styles/muiRoot";
import PublishModal from "./publishModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUpdateModuleMutation } from "../../../../../services/apis/modulesApi";
import { message } from "antd";

function DailyQuiz() {
  const {
    data: packageData,
    isLoading,
    isError: packageError,
    isFetching
  } = useGetDailyQuizPackageQuery(`${dailyQuiz.endPoint}/package/list`, {
    refetchOnMountOrArgChange: true,
  });
  const[open,setOpen]=useState(false);
  const params=useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const state = useSelector((state) => state.addModule);
   const location=useLocation();
 

  const [updateModule, {isLoading:postLoading }] = useUpdateModuleMutation();

  const handleData = () => {
    const { moduleDetails,activeView, ...others } = state;
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

  const handleSave = async() => {
    if (location.pathname.indexOf(params.moduleId) !== -1) {//This is for update
      try {
        // Call the addMockPackage mutation
        const response = await updateModule({
          endpoint: `${moduleApi.endPoint}/${params.moduleId}`,
          updatedData: await handleData() ,
        });
        // Navigate to the desired path after successful deletion
        console.log("Response:", response);
        if (response && response?.data?.success) {
          // Navigate to the desired path after successful deletion
          message.success("Module update successfully!", 2.5);
          navigate(`/main/exam/module/${params.moduleId}`);
        } else {
          message.error("Some error occured to Edit Module!", 2.5);
          console.error("Error Edit Module. Response:", response);
        }
      } catch (error) {
        console.error("Error edit Module:", error);
      }
    } else {
     setOpen(true)
    }
  };
  console.log("🚀 ~ DailyQuiz ~ location:", location.pathname.split())
  return (
    <div>
      <AppBar
        position="static"
        color="secondary"
        sx={{ boxShadow: "none", borderRadius: 1, mb: 1 }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <h5 className="font-inter text-xl font-semibold">Add Daily Quiz</h5>
          </Toolbar>
        </Container>
      </AppBar>

      <NestedTable
        upperHeader={packageHeader}
        nestedHeader={dailyQuizHeader}
        nestedTitle={"Select Assignments"}
        data={packageData?.data.packageList || []}
        loading={isLoading || isFetching}
        setValue={(val) => dispatch(setDailyQuiz(val))}
        value={state.dailyQuiz}
      />
   <PublishModal handleClose={()=>setOpen(false)} open={open}/>
      <CustomButton
        disabled={isLoading}
        style={{
          ...CustomButtonStyle,
          width: 117,
          height: 39,
          position: "absolute",
          right: 15,
          bottom: 20,
    
          borderRadius: 6,
        }}
        onClick={handleSave}
      >
       {
        postLoading ? <CircularProgress sx={{bgColor:"white", color:"white"}} size={18}/>:
        location.pathname.indexOf(params.moduleId)!==-1?"Save Changes": "Save"
       }
      
      </CustomButton>
    </div>
  );
}

export default DailyQuiz;
