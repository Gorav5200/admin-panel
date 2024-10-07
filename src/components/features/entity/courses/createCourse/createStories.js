import React, { useEffect, useRef, useState } from "react";
import PreviewCommon from "./previewCommon";
import { Avatar, Card, CardContent, IconButton } from "@mui/material";
import ReactQuill from "react-quill";
import { PackageX } from "lucide-react";
import { HTMLConverter } from "../../../../../services/common";
import { useSelector, useDispatch } from "react-redux";
import SingleImageUpload from "../../../../common/singleImageUpload";
import BootstrapTextField from "../../../../common/bootstrapTextField";
import {
  resetCoursesState,
  setActiveView,
  setErrors,
  setSuccessStories,
} from "../../../../../ducks/exams/courseSlice";
import { CustomButton, CustomButtonStyle } from "../../../../../styles/muiRoot";
import { toast } from "react-toastify";
import PublishModal from "./publishModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUpdateCourseMutation } from "../../../../../services/apis/exam/courses";
import { courseApi } from "../../../../../services/Constant";

function CreateStories() {
  const {
    successStories,
    courseDetail,
    learn,
    courseStructure,
    whyIquanta,
    courseDescription,
    topFeatures,
    learnDetails,
    groups,
  } = useSelector((state) => state.courses);
  const [values, setValues] = useState(successStories);

  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [disable, setDisable] = useState(false);
  const [updateCourse, { isLoading: updateLoading }] =
    useUpdateCourseMutation();

  console.log("params", params);
  const addCard = () => {
    const newCard = { content: "", image: "" };
    setValues([...values, newCard]);
  };

  const removeCard = (ind) => {
    const newValues = [...values];
    newValues.splice(ind, 1); // Remove the card at index ind
    setValues(newValues);
  };

  useEffect(() => {
    setData(values);
  }, [values]);

  const checkOverallValdations = () => {
    const errors = {};
    if (!values) {
      errors.successStories = "Please add atleast one story";
    } else if (
      values.some(
        (item) =>
          item.content === "" ||
          item.content === "<p><br></p>" ||
          item.name === "" ||
          item.name === (null || undefined)
      )
    ) {
      errors.successStories = "Enter some content or name in Top Features";
    }

    //Top features valdations
    else if (
      topFeatures.some(
        (item) => item.content === "" || item.content === "<p><br></p>"
      )
    ) {
      errors.topFeatures = "Enter some content in Top Features";
      dispatch(setActiveView("features"));
    }

    //Mock description
    else if (courseDescription === "<p><br></p>" || courseDescription === "") {
      errors.description = "Please Enter the Course Description";

      dispatch(setActiveView("description"));
    } else if (whyIquanta === "<p><br></p>" || whyIquanta === "") {
      errors.whyIquanta = "Please Enter Why Iqunata";
      dispatch(setActiveView("why"));
    } else if (!courseStructure || courseStructure.length === 0) {
      errors.courseStructure = "Add record in course structure ";
      dispatch(setActiveView("structure"));
    }
    //title  validation

    if (!courseDetail.title || courseDetail.title === "") {
      errors.title = "Course Name is required";
      dispatch(setActiveView("details"));
    }

    //Price validation
    if (isNaN(courseDetail.price) || courseDetail.price < 0) {
      errors.price = "Package Price must be a non-negative number";
      dispatch(setActiveView("details"));
    } else if (courseDetail.price === "") {
      errors.price = "Price is required";
      dispatch(setActiveView("details"));
    }

    // Start Date validation
    if (courseDetail.startDate === null) {
      errors.startDate = "Start Date is required";
      dispatch(setActiveView("details"));
    }

    // End Date validation
    if (courseDetail.endDate === null) {
      errors.endDate = "End Date is required";
      dispatch(setActiveView("details"));
    }

    // Highlights validation
    if (
      courseDetail.highlights === "<p><br></p>" ||
      courseDetail.highlights === ""
    ) {
      errors.highlights = "Highlights are required";
      dispatch(setActiveView("details"));
    }
    dispatch(setErrors(errors));
    return errors;
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(setSuccessStories(values));
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

  const handleAllData = () => {
    const getLearnData = Object.entries(learn).reduce((acc, [key, value]) => {
      acc[key] = value.map((el) => el?._id);
      return acc;
    }, {});

    console.log(getLearnData);

    const updatedData = {
      description: courseDescription,
      ...getLearnData,
      successStories:values,
      topFeatures,
      whyUs: { data: whyIquanta },
      ...courseDetail,
      courseStructure,
      learnDetails,
      groups,
    };
    return updatedData;
  };

  const handleUpdate = async (e) => {
    dispatch(setSuccessStories(values));

    const res = checkOverallValdations();

    // If there are no errors, proceed with your logic
    if (Object.keys(res).length === 0) {
      try {
        const response = await updateCourse({
          endpoint: `/exams/v1/course/basic/${params.courseId}`,
          updatedData: await handleAllData(),
        });
        // Navigate to the desired path after successful deletion
        console.log("Response:", response);

        if (response && response?.data?.success) {
          // Navigate to the desired path after successful deletion

          toast.success("Course update successfully!", {
            autoClose: 2000,
            onOpen: () => {
              navigate(
                `/main/entity/${params.entityId}/course/${params.courseId}/view`
              );
              dispatch(resetCoursesState());
            },

            // Auto close the toast after 3 seconds
          });
        } else {
          toast.error("Some error occured to update Course!", {
            autoClose: 2000,
          });
          console.error("Error update course. Response:", response);
        }
      } catch (error) {
        console.error("Error update  course:", error);
      }
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

  // content, img, name


  const handleInputChange = (index, name,value) => {
    const newValues = [...values];
    newValues[index] = { ...newValues[index], [name]: value }; // Update both 'content' and 'image' properties
    setValues(newValues);
  };

  console.log("values", values);
  return (
    <div className="flex gap-5 h-[88vh] p-2 bg-red">
      <div className="bg-white basis-[65%] p-2 flex rounded-md">
        <div className="w-full h-full overflow-scroll flex flex-col gap-3 py-4 overflow-x-hidden">
          {values?.map((card, index) => (
            <>
              <DataCard
                key={index}
                content={card.content}
                img={card.image}
                name={card.name}
                onContentChange={(content) =>
                  handleInputChange(index,"content",content)
                }
                onImageChange={(image) =>
                  handleInputChange(index, "image", image, )
                }
                onNameChange={(name) =>
                  handleInputChange(index,"name",name)
                }
              />
              <button
                className="text-[#336792] text-sm font-inter font-[600] underline underline-offset-4 self-end p-3 flex gap-1 items-center "
                onClick={() => removeCard(index)}
              >
                <PackageX size={15} />
                Remove Card
              </button>
            </>
          ))}
          <button
            className="text-[#336792] text-sm font-inter font-[600] underline underline-offset-4 self-start p-3"
            onClick={addCard}
          >
            {values?.length > 0 ? "+ Add another card" : "+ Add Card"}
          </button>{" "}
        </div>
        {location.pathname.includes("edit") ? (
          <CustomButton
            style={{
              ...CustomButtonStyle,
              float: "right",
              position: "absolute",
              right: 15,
              bottom: 30,
            }}
            onClick={() => handleUpdate()}
          >
            Save Changes
          </CustomButton>
        ) : (
          <CustomButton
            style={{
              ...CustomButtonStyle,
              float: "right",
              position: "absolute",
              right: 15,
              bottom: 30,
            }}
            onClick={handleSave}
          >
            Save
          </CustomButton>
        )}
      </div>
      <div className="bg-medGrey rounded-md basis-[35%] p-3">
        <PreviewCommon>
          <div className="flex flex-col gap-3 pb-8 ">
            {values?.map((item) => (
              <Card
                sx={{
                  border: "1px solid var(--med-grey)",

                  boxShadow: "none",
                  minHeight: 100,
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 3,
                  display: "flex",
                  p: 2,
                }}
              >
                <Avatar
                  sx={{
                    borderRadius: 2,
                    width: "50px",
                    height: 50,
                    color: "var(--light-grey)",
                    background: "var(--light-grey)",
                    alignSelf: "flex-start",
                  }}
                  src={item.image}
                />
                <div>
                  <HTMLConverter>{item.content}</HTMLConverter>
                </div>
              </Card>
            ))}
          </div>
        </PreviewCommon>
      </div>
      <PublishModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
      />
    </div>
  );
}

function DataCard({
  content,
  img,
  name,
  onContentChange,
  onNameChange,
  onImageChange,
}) {
  return (
    <Card
      className="min-h-[230px] flex gap-3 border "
      sx={{ boxShadow: "none" }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
          height: "230px",
          overflow: "scroll",
        }}
      >
        <div className="basis-[75%]">
          <BootstrapTextField
            onChange={(e) => onNameChange(e.target.value)}
            placeholder={"Enter Name ::"}
            style={{ margin: "none", position: "relative", top: "-30px" }}
            size="medium"
            value={name}
          />
          <ReactQuill
            onChange={onContentChange}
            value={content}
            className="w-full"
          />
        </div>

        <div className="text-center">
          <SingleImageUpload circle={true} setData={onImageChange} data={img}   endpoint={`${courseApi.endPoint}/basic/upload/image`}/>
        </div>
      </CardContent>
    </Card>
  );
}

export default CreateStories;
