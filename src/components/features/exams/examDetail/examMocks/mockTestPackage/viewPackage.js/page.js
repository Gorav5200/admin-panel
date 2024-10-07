import React, { useState } from "react";
import { HeaderWithNavigation } from "../../../../../../common/header";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../../../../styles/muiRoot";
import { ChevronRight, PlusCircle, X, XIcon } from "lucide-react";
import ModalComp from "../../../../../../common/modal";
import {
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Button,
} from "@mui/material";
import MockListView from "./mockListView";
import MockDescriptionView from "./mockDescriptionView";
import MockDetailsView from "./mockDetailView";
import TopFeaturesView from "./topFeaturesView";
import Icon from "../../../../../../common/Icon";
import { useNavigate ,useParams} from "react-router-dom";
import { setMockPackageList ,setMockDetails,setMockDescription,setTopFeatures} from "../../../../../../../ducks/mockPackageSlice";
import { useDispatch,useSelector } from "react-redux";



function ViewPackage() {
  const [view, setView] = useState("list");
  const { handleClose, handleOpen, ModalComponent } = ModalComp();
  const navigate  = useNavigate();
  const params =useParams();
  const dispatch = useDispatch();
  const {viewMockDetails}=useSelector((state)=>state.mockPackage)
  
  function PublishModal() {
    return (
      <ModalComponent>
        <header className="ps-2 flex justify-between items-center">
          <h4 className="text-xl font-inter font-semibold text-gray-700">
            Publish Mocktest Package?
          </h4>
          <IconButton onClick={handleClose}>
            <XIcon className="text-gray-700"/>
          </IconButton>
        </header>
        <div className="w-[627px] mt-7 p-2 flex flex-col gap-4">
          <p className="text-gray-600 text-sm">
            Would you like to publish mocktest package created in CAT Exams, by
            publishing the students can see and purchase the following mocktest
            package
          </p>

          <Stack direction="row" justifyContent="flex-end" spacing={2} my={2}>
            <CustomButton
              style={{
                ...ButtonStyle,
                width: 117,
                height: 39,
                borderRadius: 6,
              }}
              onClick={handleClose}
            >
              Save
            </CustomButton>

            <CustomButton
              style={{
                ...CustomButtonStyle,
                width: 117,
                height: 39,
                borderRadius: 6,
              }}
              onClick={() => alert()}
            >
              Publish
            </CustomButton>
          </Stack>
        </div>
      </ModalComponent>
    );
  }



  const handleEdit=()=>{
    const { mocklist,description,topFeatures ,...rest } = viewMockDetails;
  dispatch(setMockPackageList(mocklist)); // Sending mockList data
  dispatch(setMockDetails({...rest})); // Sending the rest of the data
  dispatch(setMockDescription(description)); // Sending the rest with isPublished set to false
  dispatch(setTopFeatures(topFeatures)); // Sending the topFeatures
    navigate(`/main/exam/${params.examId}/mocks/package/edit/${params.packageId}`)
  }
  const handleDuplicate=()=>{
    const { mocklist,description,topFeatures ,...rest } = viewMockDetails;
  dispatch(setMockPackageList(mocklist)); // Sending mockList data
  dispatch(setMockDetails({...rest,isPublished:false})); // Sending the rest of the data
  dispatch(setMockDescription(description)); // Sending the rest with isPublished set to false
  dispatch(setTopFeatures(topFeatures)); // Sending the topFeatures
  navigate(`/main/exam/${params.examId}/mocks/package/create`);
  }
  return (
    <>
      <div className="h-screen bg-lightGrey">
        <HeaderWithNavigation cont="CAT Mocktest series 2021" />
        <div className="my-2 flex p-2 gap-5 h-full">
          <div className="basis-[20%]">
            <header className="header bg-medGrey">
              <h5 className="text-primary text-base font-bold font-inder p-2">
                Package Specifications
              </h5>
            </header>

            <div>
              <List>
                {[
                  { name: "Mocktest List", value: "list" },
                  { name: "Mock Details", value: "details" },
                  { name: "Mock Description", value: "description" },
                  { name: "Top Features", value: "features" },
                ]?.map((item, _) => (
                  <ListItemButton
                    key={item.name}
                    sx={{
                      border: "1px solid gray",
                      color: view === item.value ? "black" : "var(--secondary)",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onClick={() => setView(item.value)}
                  >
                    <ListItemText>
                      <h5>{item.name}</h5>
                    </ListItemText>

                    <ChevronRight />
                  </ListItemButton>
                ))}
              </List>
              <CustomButton
                startIcon={<PlusCircle size={15} />}
                style={{
                  ...ButtonStyle,
                  width: 140,
                  borderRadius: 5,
                  height: 40,
                  fontSize: 16,
                  margin: "10px 0px",
                }}
              >
                Add new tab
              </CustomButton>
            </div>
          </div>
          <div className=" basis-[80%] rounded-md  p-2  h-[93%] overflow-scroll bg-white  ">
          <div className="flex justify-end align-top border-b-2 p-2 ">
            <Stack direction="row" spacing={3} alignSelf={"flex-start"}>
                <Button
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                  }}
                  startIcon={<Icon name="FileEdit" color="#336792" size={20} />}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                  }}
                  startIcon={<Icon name="Files" color="#336792" size={20} />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Button>
                <Button
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                  }}
                  startIcon={<Icon name="Upload" color="#336792" size={20} />}
                >
                  Unpublish
                </Button>
              </Stack>
            </div>
            {view === "list" ? (
              <MockListView />
            ) : view === "details" ? (
              <MockDetailsView />
            ) : view === "description" ? (
              <MockDescriptionView />
            ) : view === "features" ? (
              <TopFeaturesView />
            ) : null}

            
          </div>
        </div>
       
      </div>
      <PublishModal />
    </>
  );
}

export default ViewPackage;
