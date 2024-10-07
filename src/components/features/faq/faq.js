import React, { useState, useEffect } from "react";
import Latex from "react-latex";
import {
  Typography,
  IconButton,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Checkbox,
  TextField,
  Button,
  Divider,
  Card,
  CardContent,
  Chip,
  Box,
  Skeleton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconlessRadio from "../../common/radioGroup";
import InputFileUpload from "../../common/Upload";
import CloseIcon from "@mui/icons-material/Close";

import MultipleSelect from "../../common/checkGroup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CustomButton } from "../../../styles/muiRoot";
import { ButtonStyle } from "../../../styles/staticStyle";
import { useDispatch, useSelector } from "react-redux";
import {

  createNewQuestion,
  setQuestionDetail,
  editQuestion,
} from "../../../ducks/questionBankSlice";
import SingleSelect from "../../common/selectFields";

import {
  useAddFaqMutation,
  useDeleteFaqMutation,
  useEditFaqMutation,
  useGetSingleFaqQuery,
  useGetFaqListQuery,
  useGetCategoriesQuery,
} from "../../../services/apis/faq";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DropdownMenu from "../../common/dropdown";
import { HeaderWithNavigation } from "../../common/header";
import CustomizedAccordions from "../../common/accordian";
import { deleteCase } from "../../../ducks/commonActions";
import { faqApi } from "../../../services/Constant";
import { truncateString, createHandleChange } from "../../../services/common";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { BackdropLoader } from "../../common/lineLoader";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const initialValues = {
  question: "",
  answer: "",
  category_id: "",
  type: "",
  series: 1,
};

function FAQ() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const [categoryTypes, setCategoryTypes] = useState([]);

  console.log(params);
  const {
    data: listData,
    isLoading,
    isError,
  } = useGetFaqListQuery(`${faqApi.endPoint}`);

  const {
    data: categories,
    isLoading: loadingCategoies,
    isErrorisLoadingCategories,
  } = useGetCategoriesQuery(`/admin/v1/faq_category`);

  console.log(categories, "categories");
  const [deleteFaq, { isLoading: loadingDel, isError: isErrorDel }] =
    useDeleteFaqMutation();
  const [addfaq, { isLoading: loadingAdd, isError: isErrorAdd }] =
    useAddFaqMutation();
  const [editFaq, { isLoading: loadingEdit, isError: isErrorEdit }] =
    useEditFaqMutation();

  const [values, setValues] = useState(initialValues);
  const handleChange = createHandleChange(values, setValues);

  // This all the function under below for Add answer row or getting the index of correct Answer

  const handleSubmit = (type) => async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (Object.keys(validationErrors).length === 0) {
      if (type === "edit") {
        try {
          const response = await editQuestion(values);
          if (response && response?.data?.success) {
            // Navigate to the desired path after successful deletion
            toast.success("Question Edit  successfully!", {
              autoClose: 2000,
              onOpen: () => {
                setValues(initialValues);
                navigate("/main/faq");
              },
              // Auto close the toast after 3 seconds
            });
          } else {
            toast.error("Some error occured to Edit form!", {
              autoClose: 2000,
            });
          }
        } catch (error) {
          toast.error("Error to edit question");
        }
      } else if (type === "create") {
        //  Handle add new question action here
        try {
          const response = await AddQuestionApi(values);
          if (response && response?.data?.success) {
            // Navigate to the desired path after successful deletion
            toast.success("User Added successfully!", {
              autoClose: 2000,
              onOpen: () => setValues(initialValues),
              // Auto close the toast after 3 seconds
            });
          } else {
            toast.error("Some error occured to submit form!", {
              autoClose: 2000,
            });
          }
        } catch (error) {
          toast.error("Error to create ");
        }
      }
    } else {
      // Display validation errors as toasts
      Object.values(validationErrors)?.forEach((error) => {
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000, //Adjust as needed
        });
      });
    }
  };

  useEffect(() => {
    if (location.state && location.state.handleEditTrigger) {
      handleEdit(params.id);
    }
  }, [location.pathname]);

  console.log(values, "valueeee");
  console.log("location i faq", location);

  const AddQuestionApi = async (values) => {
    const { category_id, ...valuesWithoutCategoryId } = values;
    const response = await addfaq({
      endpoint: `${faqApi.endPoint}/${category_id}`,
      newUser: valuesWithoutCategoryId,
    });
    // Navigate to the desired path after successful deletion
    console.log("Response:", response);
    return response;
  };

  const editQuestion = async (values) => {
    const response = await editFaq({
      endpoint: `${faqApi.endPoint}/${params.id}`,
      updateQuestion: values,
    });
    // Navigate to the desired path after successful deletion
    console.log("Response:", response);
    return response;
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = [...listData?.faq];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Now you have the updated order of items in the 'items' array.
    // You can dispatch an action to update the state with the new order if needed.

    // Example dispatch:
    // dispatch(updateQuestionOrder(items));
  };

  const handleDelete = async (id) => {
    const response = await deleteFaq(`${faqApi.endPoint}/${id}`);
    if (response && response?.data?.success) {
      toast.success("Question deleted succesfully", {
        onOpen: () => {
          setValues(initialValues);
          navigate("/main/faq/create");
        },
      });
    } else {
      toast.error("Some error occured to delete the question! pls try again");
    }
  };

  const handleDuplicate = (id) => {
    navigate(`/main/faq/create`);
    const data = getSingleQuestion(id);
    setValues({ ...values, question: data.question, answer: data.answer });
  };

  const handleEdit = (id) => {
    navigate(`/main/faq/edit/${id}`);
    const data = getSingleQuestion(id);
    setValues({ ...values, question: data.question, answer: data.answer });
  };

  const getSingleQuestion = (id) => {
    const singleQuestion = listData.faq.find((data) => data._id === id);
    return singleQuestion;
  };


  useEffect(() => {
    if (categories?.faqCategories.length > 0) {
      const result = categories.faqCategories.find(
        (item) => item._id === values.category_id
      );

      if (result) {
        setCategoryTypes(result.types);
      }
    }
  }, [values]);

  return (
    <>
      <BackdropLoader
        isOpen={isLoading || loadingAdd || loadingDel || loadingEdit}
      />
      {!isLoading && (
        <div className="h-screen bg-lightGrey">
          <HeaderWithNavigation cont="Edit FAQs" />
          <ToastContainer />

          <div className="grid grid-cols-12 gap-3 p-3 h-[92%]">
            {/* Left side div */}
            <div className="col-span-2 ">
              <header className="header bg-medGrey">
                <Typography className="text-primary text-2xl font-bold font-inder p-2">
                  FAQs
                </Typography>
              </header>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="question-list">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {listData?.faq.map((item, ind) => (
                        <Draggable
                          key={item._id}
                          draggableId={`question-${ind}`}
                          index={ind}
                        >
                          {(provided) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => dispatch(setQuestionDetail(ind))}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: 1,
                                p: 1,
                                border:
                                  item._id === params.id
                                    ? "2px solid black"
                                    : "1px solid #CFCFCF",
                              }}
                            >
                              <DragIndicatorIcon
                                fontSize="small"
                                className="text-secondary"
                              />
                              <h5 className="text-darkGrey font-medium text-xs">
                                {ind + 1}
                              </h5>
                              <p className="text-secondary text-xs font-light">
                                {truncateString(item.question, 4)}
                              </p>

                              <DropdownMenu
                                comp={<MoreVertIcon fontSize="medium" />}
                                del={() => handleDelete(item._id)}
                                edit={() => handleEdit(item._id)}
                                duplicate={() => handleDuplicate(item._id)}
                              />
                            </Box>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <div className="mt-3">
                <CustomButton
                  variant="outlined"
                  startIcon={<AddIcon />}
                  style={{
                    ...ButtonStyle,
                    color: "black",
                    background: "white",
                    width: 150,
                  }}
                  onClick={() => {
                    setValues(initialValues);
                    navigate("/main/faq/create");
                  }}
                >
                  Add Question
                </CustomButton>
              </div>
            </div>
            {/* Center div */}
            <div className="col-span-7   ">
              <div className="bg-[#ffffff] h-[98%]  ">
                <header className="header bg-medGrey">
                  <Typography className="text-primary text-2xl font-bold font-inder p-2">
                    Question Details
                  </Typography>
                </header>

                <div className="p-3 flex flex-col gap-6  h-[100%] ">
                  <div>
                    <label htmlFor="Question" className="text-sm">
                      Question
                    </label>
                    <br />
                    <div className="mt-2">
                      <TextField
                        id="outlined-multiline-static"
                        placeholder="What is iQuanta? "
                        multiline
                        name="question"
                        value={values.question}
                        onChange={handleChange}
                        rows={4} // You can adjust the number of rows as needed
                        variant="outlined"
                        fullWidth // Makes the text area take up the full width of its container
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="answer" className="text-sm">
                      Answer
                    </label>
                    <br />
                    <div className="mt-2">
                      <TextField
                        id="outlined-multiline-static"
                        placeholder="Enter Here ..."
                        multiline
                        name="answer"
                        maxRows={10}
                        value={values.answer}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth // Makes the text area take up the full width of its container
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="categories" className="text-sm  ms-1">
                      Categories
                    </label>
                    <br />
                    <div className="mt-2">
                      {isLoading ? (
                        <Skeleton
                          variant="rounded"
                          sx={{ width: 300, height: 50 }}
                        />
                      ) : (
                        <SingleSelect
                          style={{ width: "300px" }}
                          size="small"
                          placeholder="Select Category"
                          name="category_id"
                          value={values.category_id}
                          data={categories?.faqCategories}
                          setData={(val) =>
                            setValues({ ...values, category_id: val })
                          }
                        />
                      )}
                    </div>
                  </div>
                  {categoryTypes && categoryTypes.length > 0 && (
                    <div>
                      <label htmlFor="types" className="text-sm  ms-1">
                        Select Type
                      </label>
                      <br />
                      <div className="mt-2">
                        <IconlessRadio
                          data={categoryTypes}
                          style={{
                            width: 170,
                            height: 100,
                            borderRadius: 2,
                            rowGap: 2,
                            fontSize: 14,
                          }}
                          row={true}
                          setData={(val) => setValues({ ...values, type: val })}
                          value={values.type}
                        />
                      </div>
                    </div>
                  )}

                  <div className="bg-white ">
                    <Button
                      variant="contained"
                      onClick={(e) =>
                        handleSubmit(params.id ? "edit" : "create")(e)
                      }
                      sx={{
                        backgroundColor: "#171717",
                        width: 178,
                        height: 46,
                        fontFamily: "var(--font-inter)",
                        fontSize: 15,
                        borderRadius: 2,
                        textTransform: "none",
                        float: "right",
                        m: 2,
                        ":hover": {
                          backgroundColor: "#171717",
                        },
                      }}
                    >
                      {params.id ? "Save Changes" : "Save & Continue"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className=" col-span-3 bg-medGrey p-1 h-[90vh] ">
              <header className="header ">
                <h5 className="text-primary text-2xl font-bold font-inder p-2">
                  Preview
                </h5>
              </header>
              <div className="m-2 mt-0 p-2 pe-3  bg-[#ffffff] rounded-md text-justify h-[82vh] overflow-scroll ">
                <h5 className="text-primary text-base font-bold font-inter p-2">
                  FAQs
                </h5>
                <Divider />
                <h5 className="text-primary text-base font-normal font-inter p-2  my-2">
                  Frequently Asked Questions about Online CAT Preparation Course
                </h5>

                <div className="my-2">
                  {listData?.faq.map((data, ind) => (
                    <CustomizedAccordions
                      heading={`Q${ind + 1}.  ${data.question}`}
                      content={data.answer}
                      ind={ind}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FAQ;
