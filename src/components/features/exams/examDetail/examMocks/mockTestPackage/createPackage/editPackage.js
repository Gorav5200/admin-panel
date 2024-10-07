import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import ImportQuestion from "./importQuestion";
import MockDescription from "./mockDescription";
import MockDetails from "./mockDetail";
import TopFeatures from "./topFeatures";
import { useDispatch, useSelector } from "react-redux";
import {
  setTopFeatures,
  resetState,
} from "../../../../../../../ducks/mockPackageSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditMockPackageMutation,
  usePostMockPackageMutation,
} from "../../../../../../../services/apis/exam/mock";
import { toast } from "react-toastify";
import { mocksApi } from "../../../../../../../services/Constant";
import { BackdropLoader } from "../../../../../../common/lineLoader";

function EditPackage() {
  const [view, setView] = useState(0); //0-import,1-details,2-description,3-topfeatures
  const { handleClose, handleOpen, ModalComponent } = ModalComp();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  
  const state = useSelector((state) => state.mockPackage);
  const [featuresData,setFeaturesData]=useState()
  function getTopFeaturesData(value){
    setFeaturesData(value)
  }

  console.log("params in edit", params)
  function PublishModal() {
    const [editMockPackage, { isLoading: loading, isError }] =useEditMockPackageMutation();
   

    const handleAllData=()=>{
      const {mockPackageList,mockDetails,mockDescription,topFeatures}=state;
      const updateData={mocklist:[...mockPackageList.map((e)=>e._id)],...mockDetails,description:mockDescription,topFeatures}
      return updateData
     }


     console.log("updated dtaa", handleAllData())
    const handleSubmit = async () => {
      try {
    
        const response = await editMockPackage({
          endpoint: `exams/v1/mockPackage/${params.packageId}`,
          newPackage:await handleAllData(),
        });
        // Navigate to the desired path after successful deletion
        console.log("Response:", response);

        if (response && response?.data?.success) {
          // Navigate to the desired path after successful deletion
          
          toast.success("Package edit successfully!", {
            autoClose: 2000,
            onOpen: () => {
              navigate(`/main/exam/${params.examId}/mocks`);
              dispatch(resetState());
            }

            // Auto close the toast after 3 seconds
          });
        } else {
          toast.error("Some error occured to edit Package!", {
            autoClose: 2000,
          });
          console.error("Error edit  package. Response:", response);
        }
      } catch (error) {
        console.error("Error edit package:", error);
      }
    };

    return (
      <ModalComponent>
       <BackdropLoader isOpen={loading}/>
        <header className="ps-2 flex justify-between items-center">
          <h4 className="text-xl font-inter font-semibold text-gray-700">
            Publish Mocktest Package Changes?
          </h4>
          <IconButton onClick={handleClose}>
            <XIcon className="text-gray-700" />
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
              onClick={() => {
                handleClose();
                dispatch(resetState());
                navigate(`/main/exam/${params.examId}/mocks`);
              }}
            >
              Discard
            </CustomButton>

            <CustomButton
              style={{
                ...CustomButtonStyle,
                width: 140,
                height: 39,
                borderRadius: 6,
              }}
              onClick={handleSubmit}
            >
              Publish Changes
            </CustomButton>
          </Stack>
        </div>
      </ModalComponent>
    );
  }

  return (
    <>
      <div className="h-screen bg-lightGrey">
        <HeaderWithNavigation cont="Edit Mocktest Package" />
        <div className="my-2 flex p-2 gap-5 h-5/6 ">
          <div className="basis-[20%]">
            <header className="header bg-medGrey">
              <h5 className="text-primary text-base font-bold font-inder p-2">
                Package Specifications
              </h5>
            </header>

            <div>
              <List>
                {[
                  { name: "Mocktest List", value: 0 },
                  { name: "Mock Details", value: 1 },
                  { name: "Mock Description", value: 2 },
                  { name: "Top Features", value: 3 },
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
          <div className=" basis-[80%] rounded-md  p-2 ">
            {view === 0 ? (
              <ImportQuestion />
            ) : view === 1 ? (
              <MockDetails />
            ) : view === 2 ? (
              <MockDescription />
            ) : view === 3 ? (
              <TopFeatures  setData={getTopFeaturesData}/>
            ) : null}
          </div>
        </div>
        <div className="p-2">
          {view === 3 &&  (
            <CustomButton
              style={{ ...CustomButtonStyle, float: "right" }}
              onClick={() => {
                handleOpen();
                 dispatch(setTopFeatures(featuresData));
              }}
            >
              Save Changes
            </CustomButton>
          ) }
        </div>
      </div>
      <PublishModal />
    </>
  );
}

export default EditPackage;
