import React, { useState } from "react";
import { HeaderWithNavigation } from "../../../../../../common/header";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../../../../styles/muiRoot";
import { ChevronRight, PlusCircle,XIcon } from "lucide-react";
import ModalComp from "../../../../../../common/modal";
import {
  IconButton,
  List,
  ListItemButton,
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
  setErrors,
  setView,
} from "../../../../../../../ducks/mockPackageSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddMockPackageMutation,
} from "../../../../../../../services/apis/exam/mock";
import { toast } from "react-toastify";
import { BackdropLoader } from "../../../../../../common/lineLoader";


function CreatePackage() {
  // const [view, setView] = useState(0); //0-import,1-details,2-description,3-topfeatures
  const { handleClose, handleOpen, ModalComponent } = ModalComp();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const {
    mockPackageList,
    mockDetails,
    mockDescription,
    topFeatures,
    activeView,
  } = useSelector((state) => state.mockPackage);

  const [featuresData, setFeaturesData] = useState();
  const [disable, setDisable] = useState(false);
  function getTopFeaturesData(value) {
    setFeaturesData(value);
  }

  function PublishModal() {
    const [addMockPackage, { isLoading: postLoading }] =
      useAddMockPackageMutation();

    const handleAllData = () => {
      const updateData = {
        mocklist: [...mockPackageList.map((e) => e._id)],
        ...mockDetails,
        description: mockDescription.description,
        topFeatures,
      };
      return updateData;
    };

    console.log(handleAllData(), "updqated data");

    const handleSubmit = async () => {
      try {
        // Call the addMockPackage mutation
        const response = await addMockPackage({
          endpoint: `exams/v1/mockPackage`,
          newPackage: await handleAllData(),
        });
        // Navigate to the desired path after successful deletion
        console.log("Response:", response);

        if (response && response?.data?.success) {
          // Navigate to the desired path after successful deletion

          toast.success("Package Added successfully!", {
            autoClose: 2000,
            onOpen: () => {
              navigate(`/main/exam/${params.examId}/mocks`);
              dispatch(resetState());
            },

            // Auto close the toast after 3 seconds
          });
        } else {
          toast.error("Some error occured to Add Package!", {
            autoClose: 2000,
          });
          console.error("Error add question. Response:", response);
        }
      } catch (error) {
        console.error("Error add Add package:", error);
      }
    };

    return (
      <ModalComponent>
        <BackdropLoader isOpen={postLoading} />
        <header className="ps-2 flex justify-between items-center">
          <h4 className="text-xl font-inter font-semibold text-gray-700">
            Publish Mocktest Package?
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
      </ModalComponent>
    );
  }

  console.log(
    "featues",
    featuresData?.some((item) => item.content === "")
  );
  const checkOverallValdations = () => {
    const errors = {};
    //Import list validation
    if (!mockPackageList || mockPackageList.length === 0) {
      errors.importQuestion = "Please Import the Mocktest List";
      dispatch(setView(0));
    }
    //Top features valdations
    else if (
      featuresData?.some((item) => item.content === "") 
    ) {
      errors.topFeatures = "Enter some content in Top Features";
    }

    //Mock description
    else if (mockDescription === ("<p><br></p>" || "")) {
      errors.description = "Please Enter the Mock Description";

      dispatch(setView(2));
    }
    //title  validation
    if (mockDetails.title.trim() === "") {
      errors.title = "Package Name is required";

      dispatch(setView(1));
    }

    //Price validation
    if (isNaN(mockDetails.price) || mockDetails.price < 0) {
      errors.price = "Package Price must be a non-negative number";
      dispatch(setView(1));
    } else if (mockDetails.price === "") {
      errors.price = "Price is required";
      dispatch(setView(1));
    }

    // Start Date validation
    if (mockDetails.startDate === null) {
      errors.startDate = "Start Date is required";
      dispatch(setView(1));
    }

    // End Date validation
    if (mockDetails.expiryDate === null) {
      errors.expiryDate = "End Date is required";
      dispatch(setView(1));
    }

    // Highlights validation
    if (mockDetails.highlights.trim() === ("<p><br></p>" || "")) {
      errors.highlights = "Highlights are required";
      dispatch(setView(1));
    }
    dispatch(setErrors(errors));
    return errors;
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Dispatch setTopFeatures  to  redux
    dispatch(setTopFeatures(featuresData));

    // After dispatching, proceed to check validations
    const res = checkOverallValdations();

    // If there are no errors, proceed with your logic
    if (Object.keys(res).length === 0) {
      handleOpen();
    } else {
      // dispatch(setErrors(res))
      if (
        res.title ||
        res.price ||
        res.startDate ||
        res.expiryDate ||
        res.highlights
      ) {
        return;
      }
      // If there are errors, display toast notifications for each error
      Object.values(res).forEach((errorMessage) => {
        toast.error(errorMessage, {
          onOpen: () => {
            setDisable(true);
          },
          onClose: () => {
            setDisable(false);
          },
        });
      });
    }
  };

  

  
  return (
    <>
      <div className="h-screen bg-lightGrey ">
        <HeaderWithNavigation cont="Create Mocktest Package" />
        <div className="mt-2 flex p-2 gap-5 h-5/6 overflow-scroll">
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
                      color:
                        activeView === item.value
                          ? "black"
                          : "var(--secondary)",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onClick={() => dispatch(setView(item.value))}
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

          <div className=" basis-[80%] rounded-md  p-2">
            {activeView === 0 ? (
              <ImportQuestion />
            ) : activeView === 1 ? (
              <MockDetails />
            ) : activeView === 2 ? (
              <MockDescription />
            ) : activeView === 3 ? (
              <TopFeatures setData={getTopFeaturesData} />
            ) : null}
          </div>
        </div>

        {activeView === 3 && (
          <CustomButton
            style={{
              ...CustomButtonStyle,
              float: "right",
              position: "absolute",
              right: 15,
              bottom: 30,
            }}
            disabled={disable}
            onClick={handleSave}
          >
            Save
          </CustomButton>
        )}
      </div>
      <PublishModal />
    </>
  );
}

export default CreatePackage;
