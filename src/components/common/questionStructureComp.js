import React, { useState, useEffect } from "react";
import "katex/dist/katex.min.css";
import {
  Typography,
  IconButton,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Checkbox,
  TextField,
  Divider,
  Card,
  Box,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconlessRadio from "../common/radioGroup";
import InputFileUpload from "../common/Upload";
import CloseIcon from "@mui/icons-material/Close";
import MultipleSelect from "../common/checkGroup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CustomButton } from "../../styles/muiRoot";
import { ButtonStyle } from "../../styles/staticStyle";
import { useDispatch, useSelector } from "react-redux";
import { setQuestionDetail } from "../../ducks/questionBankSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DropdownMenu from "../common/dropdown";
import { HeaderWithNavigation } from "../common/header";
import {
  useGetQuestionListQuery,
  useDeleteQuestionMutation,
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useGetListDataQuery,
  useGetEntityListQuery,
} from "../../services/apis/exam/questionBank";
import { questionApi } from "../../services/Constant";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { HTMLConverter } from "../../services/common";
import { BackdropLoader } from "../common/lineLoader";
import Skeleton from "@mui/material/Skeleton";
import SingleSelect from "../common/selectFields";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.core.css"; // Import Quill core CSS

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

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // Basic formatting options
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    [{ align: [] }], // Text alignment
    ["link"], // Link
    ["image"], // Image
    ["table"], // Table
    [{ size: ["small", false, "large", "huge"] }],
  ],
};

const initialState = {
  qid: "1234",
  uid: "",
  subject_id: "",
  topic_id: "",
  subtopic_id: "",
  difficulty_level_manual: "easy",
  question: "",
  answer: null,
  options: ["", "", "", ""],
  explanations: "",
  video_link: "",
  thumbnail: "",
  allowed_for: ["mock"],
  marks: 3,
  negativeMarks: 1,
  question_type: 1,
  isPara: true,
  context: "",
  isVideo: false,
  entity_type_id: "",
};

export default function QuestionStructureComp({
  entity_type,
  endPoint: apiEndPoint,
}) {
  console.log(apiEndPoint, 99);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [QID, setQid] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(null);
  const [values, setValues] = useState(initialState);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    data: questionList,
    isLoading: listLoading,
    isError,
  } = useGetQuestionListQuery(questionApi.endPoint);
  console.log("api::", questionList);
  const { data: entityList, isLoading: entityLoading } =
    useGetEntityListQuery(`/exams/v1/entity`);

  const [deleteQuestion, { isLoading: isLoadingDel, isError: isErrorDel }] =
    useDeleteQuestionMutation();
  const [addQuestion, { isLoading: isLoadingAdd, isError: isErrorAdd }] =
    useAddQuestionMutation();
  const [
    updateQuestion,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate },
  ] = useUpdateQuestionMutation();

  // const formData = useSelector((state) => state.questionBank.questionDetail);

  // THIS IS FROM DETAIL PAGE---->>>> WHEN USER COME FROM DETAIL PAGE ,WE HAVE RECEIVE THE STATE FOR TRIGGERING THE ACTIONS TO KNOW THAT WHAT ACTION WAS CLICK IN PREVIOUS PAGE
  useEffect(() => {
    if (location.state !== null) {
      if (location.state.handleEditClick) {
        handleEdit(location?.state.id);
      } else if (location?.state.handleDuplicateClick) {
        handleDuplicate(location.state.id);
      }
    } else {
      return;
    }
  }, []);

  //Function's for getting thr data from components
  const getHandleData = (name, val) => {
    setValues({ ...values, [name]: val });
  };

  const handleChange = (event) => {
    //this function for  getting the data by name from event
    const name = event.target.name;
    const value =
      event.target.type === "check" ? event.target.checked : event.target.value;
    setValues({ ...values, [name]: value });
  };

  // Call api's
  const handleDelete = async (uid) => {
    try {
      // Call the deleteUser mutation
      const response = await deleteQuestion(`${questionApi.endPoint}/${uid}`);
      // Navigate to the desired path after successful deletion
      console.error("Response:", response);
      if (response && response.data.success) {
        // Navigate to the desired path after successful deletion

        toast.error("Question deleted successfully!", {
          autoClose: 2000,
          onOpen: () => {
            setValues(initialState);
            navigate(`/main/question/create`);
          }, // Auto close the toast after 3 seconds
        });
      } else {
        console.error("Error deleting user. Response:", response);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddQuestion = async (values) => {
    try {
      // Call the deleteUser mutation
      const response = await addQuestion({
        endpoint: `${questionApi.endPoint}`,
        newUser: values,
      });
      // Navigate to the desired path after successful deletion
      console.log("Response:", response);

      if (response && response?.data?.success) {
        // Navigate to the desired path after successful deletion
        toast.success("User Added successfully!", {
          autoClose: 2000,
          onOpen: () => setValues({ ...initialState, context: values.context }),
          // Auto close the toast after 3 seconds
        });
      } else {
        toast.error("Some error occured to submit form!", {
          autoClose: 2000,
        });
        console.error("Error add question. Response:", response);
      }
    } catch (error) {
      console.error("Error add question api:", error);
    }
  };

  const handleEdit = (qid, ind) => {
    navigate(`/main/question/edit/${qid}`);
    setQuestionIndex(ind + 1);
    const data = questionList?.data.filter((item) => item._id === qid);
    const particularObject = { ...data[0] };
    setValues({
      ...particularObject,
      subtopic_id: particularObject?.subtopic_id?.[0],
      subtopic_id: particularObject?.subtopic_id?.[0],
      topic_id: particularObject?.topic_id?.[0],
    });
    setQid(particularObject._id);

    console.log(particularObject, "particular object");
  };

  const handleDuplicate = (qid) => {
    navigate(`/main/question/create`);
    const data = questionList.data.filter((item) => item._id === qid);
    setValues(...data);
  };

  const handleSubmit = (type) => async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in values) {
      if (values[key] !== null && values[key] !== "") {
        if (key === "thumbnail") {
          formData.append(key, values[key], values[key]);
        } else if (Array.isArray(values[key])) {
          formData.append(key, JSON.stringify(values[key]));
        } else {
          formData.append(key, values[key]);
        }
      }
    }
    formData.append("entity_type_id", entity_type);

    for (const [key, value] of formData.entries()) {
      console.log("Key:", key, value);
    }
    const validationErrors = validationSchema();
    if (Object.keys(validationErrors).length === 0) {
      if (type === "edit") {
        try {
          // Call the deleteUser mutation
          const response = await updateQuestion({
            endpoint: `${questionApi.endPoint}/${params.qid}`,
            updateQuestion: { ...values, entity_type_id: entity_type },
          });
          // Navigate to the desired path after successful deletion
          console.log("Response:", response);

          if (response && response?.data?.success) {
            // Navigate to the desired path after successful deletion
            toast.success("Question Edit successfully!", {
              autoClose: 2000,
              onOpen: () => {
                navigate("/main/question/create");
                setValues(initialState);
                setQid("null");
              },
              // Auto close the toast after 3 seconds
            });
          } else {
            toast.error("Some error occured to submit form!", {
              autoClose: 2000,
            });
            console.error("Error add question. Response:", response);
          }
        } catch (error) {
          console.error("Error add question api:", error);
        }
      }
      if (type === "create") {
        handleAddQuestion({ ...values, entity_type_id: entity_type });
      }
    } else {
      Object.values(validationErrors)?.forEach((error) => {
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      });
    }
  };

  // This all the function under below for Add answer row or getting the index of correct Answer
  const handleDeleteAnswer = (index) => {
    const newAnswers = [...values.options];
    newAnswers.splice(index, 1);

    setValues({ ...values, options: newAnswers });

    if (values.options === index) {
      setValues({ ...values, answer: null });
    }
  };

  const addAnswer = () => {
    const newAnswers = [...values.options, ""];

    setValues({ ...values, options: newAnswers });
  };

  const handleAnswerChange = (index, text) => {
    const newAnswers = [...values.options];
    newAnswers[index] = text;

    setValues({ ...values, options: newAnswers });
  };

  const handleRadioChange = (index) => {
    setValues({ ...values, answer: index });
  };

  const validationSchema = () => {
    let err = {};
    if (!values) {
      // Handle the case where values is undefined or null
      return err;
    }

    if (!values.subject_id) {
      err.subject = "Please select the subject";
    } else if (!values.topic_id) {
      err.topic = "Please select the Topic";
    } else if (!values.subtopic_id) {
      err.topic = "Please select the Subtopic";
    } else if (!values.question_type.toString()) {
      err.question_type = "Please select the Question Style";
    } else if (values.allowed_for.length === 0) {
      err.allowed_for = "Please select the modules allowed";
    } else if (!values.difficulty_level_manual) {
      err.difficulty_level_manual = "Please select the Difficulty level";
    } else if (!values.marks) {
      err.marks = "Please select the Marks";
    } else if (!values.question) {
      err.question = "Enter the Question";
    } else if (values?.options.length > 0) {
      if (!values.options === Number) {
        err.answer = "Please select the Correct Answer";
      }
    } else if (values.isPara === true) {
      if (!values.context) {
        err.context =
          "Please enter some context otherwise you can disable the CheckBox";
      }
    } else if (!values.explanations) {
      err.explanations = "Enter the explanation";
    }

    return err;
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = [...questionList?.data];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    //  Now you have the updated order of items in the 'items' array.
    // You can dispatch an action to update the state with the new order if needed.

    // Example dispatch:
    // dispatch(updateQuestionOrder(items));
  };

  // console.log(
  //   "store data",
  //   useSelector((state) => state.questionApi.queries)
  // );

  useEffect(() => {
    if (!values.isPara) {
      setValues({ ...values, context: "" });
    }
  }, [values.isPara]);
  console.log("values", values);

  function List({ isLoading, questionList }) {
    return (
      <>
        {isLoading ? (
          <Box
            sx={{
              bgcolor: "white",
              p: 2,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {[...Array(20)].map(() => (
              <Skeleton
                sx={{ bgcolor: "grey.200" }}
                variant="rounded"
                width={"100%"}
                height={48}
              />
            ))}
          </Box>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="question-list">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {questionList?.data.map((item, ind) => (
                    <Draggable
                      key={ind}
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
                              item._id === QID
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
                            {item.question_type}
                          </p>

                          <DropdownMenu
                            comp={<MoreVertIcon fontSize="medium" />}
                            del={() => handleDelete(item._id)}
                            edit={() => handleEdit(item._id, ind)}
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
        )}

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
              setQid(null);
              navigate("/main/question/create");
              setValues(initialState);
            }}
          >
            Add Question
          </CustomButton>
        </div>
      </>
    );
  }

  function Form() {
    const listsData = [];
    return (
      <div>
        <div className="info bg-white">
          {QID !== null && (
            <>
              <h5 className="m-3 py-2 text-darkblue font-bold">
                QID {`: ${values?._id}`}
              </h5>
              <Divider />
            </>
          )}

          <div className=" flex flex-col gap-6 p-3">
            <div>
              <InputLabel htmlFor="entity_type" className="text-sm">
                Entity Type
              </InputLabel>

              <small className="text-secondary">
                Please select the Entity type
              </small>
              {/* Subject or topic field */}
              {entityLoading ? (
                <Skeleton
                  variant="rounded"
                  sx={{ width: "250px", height: "55px" }}
                />
              ) : (
                <div>
                  {/* <SingleSelect
                    style={{ width: "300px" }}
                    size="medium"
                    placeholder="Select Subject"
                    name="entity_type"
                    data={entityList?.data}
                    setData={(val) => setEntityType(val)}
                    value={entity_type}
                    id="entity_type"
                  /> */}
                </div>
              )}
            </div>

            {/* Subject,topic and subtopic */}
            {entity_type && (
              <div>
                {" "}
                <label htmlFor="subject" className="text-sm">
                  Subject
                </label>
                <br />
                <small className="text-secondary">
                  Please select the subject and topic of this question
                </small>
                {entity_type && listLoading ? (
                  <div className="flex gap-6 mt-3">
                    <Skeleton
                      variant="rounded"
                      sx={{ width: "100%", height: "55px" }}
                    />
                    <Skeleton
                      variant="rounded"
                      sx={{ width: "100%", height: "55px" }}
                    />
                    <Skeleton
                      variant="rounded"
                      sx={{ width: "100%", height: "55px" }}
                    />
                  </div>
                ) : (
                  <div>
                    {/* Subject or topic field */}

                    <div className="flex gap-5">
                      <FormControl sx={{ mt: 2, width: 300 }}>
                        <InputLabel id="demo-multiple-subject">
                          Subject
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-subject-label"
                          name="subject_id"
                          id="demo-multiple-subject"
                          value={
                            typeof values.subject_id === "object"
                              ? values.subject_id._id
                              : values.subject_id
                          }
                          required
                          onChange={handleChange}
                          input={<OutlinedInput label="Name" />}
                          MenuProps={MenuProps}
                        >
                          {listsData?.data.subject?.map((item) => (
                            <MenuItem key={item.name} value={item._id}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl sx={{ mt: 2, width: 300 }}>
                        <InputLabel id="demo-multiple-topic">Topic</InputLabel>
                        <Select
                          labelId="demo-multiple-topic-label"
                          value={
                            typeof values.topic_id === "object"
                              ? values.topic_id._id
                              : values.topic_id
                          }
                          name="topic_id"
                          id="demo-multiple-topic"
                          required
                          onChange={handleChange}
                          input={<OutlinedInput label="Name" />}
                          MenuProps={MenuProps}
                        >
                          {listsData?.data.topic?.map((item) => (
                            <MenuItem key={item.name} value={item._id}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl sx={{ mt: 2, width: 300 }}>
                        <InputLabel id="demo-multiple-subtopic">
                          Subtopic
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-subtopic-label"
                          id="demo-multiple-subtopic"
                          value={
                            typeof values.subtopic_id === "object"
                              ? values.subtopic_id._id
                              : values.subtopic_id
                          }
                          name="subtopic_id"
                          required
                          onChange={handleChange}
                          input={<OutlinedInput label="Name" />}
                          MenuProps={MenuProps}
                        >
                          {listsData?.data.subtopic?.map((item) => (
                            <MenuItem key={item.name} value={item._id}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Question style */}
            <div>
              <label htmlFor="questionStyle" className="text-sm">
                Question style
              </label>
              <br />
              <small className="text-secondary">
                Please select the format of the question
              </small>
              <div className="mt-2">
                <IconlessRadio
                  data={[
                    { title: "Multiple Choice", value: 1 },
                    { title: "Tita", value: 0 },
                    { title: "True & False", value: 4 },
                    { title: "Short Answer", value: 3 },
                    { title: "Long Answer", value: 2 },
                  ]}
                  style={{
                    width: 170,
                    height: 100,
                    borderRadius: 2,
                    rowGap: 2,
                    fontSize: 14,
                  }}
                  row={true}
                  setData={(val) => getHandleData("question_type", val)}
                  value={values.question_type}
                  id="questionStyle"
                />
              </div>
            </div>
            {/* Allow type*/}
            <div>
              <label htmlFor="modulesAllow" className="text-sm">
                Modules Allowed
              </label>
              <br />
              <small className="text-secondary">
                Please select the required modules
              </small>
              <div className="mt-2">
                <MultipleSelect
                  data={["Mock", "Time quiz", "Daily quiz"]}
                  style={{
                    width: 170,
                    height: 100,
                    borderRadius: 2,
                    rowGap: 2,
                    fontSize: 14,
                  }}
                  row={true}
                  setData={(val) => getHandleData("allowed_for", val)}
                  dataSet={values.allowed_for}
                  id="modulesAllow"
                />
              </div>
            </div>

            {/* Difficulty level */}
            <div>
              <label htmlFor="diffuculty level" className="text-sm">
                Difficulty Level
              </label>
              <br />
              <small className="text-secondary">
                Select the level of the question
              </small>
              <div className="mt-2">
                <IconlessRadio
                  data={[
                    { title: "Easy", value: "easy" },
                    { title: "Medium", value: "medium" },
                    { title: "Hard", value: "hard" },
                  ]}
                  style={{
                    width: 170,
                    height: 100,
                    borderRadius: 2,
                    rowGap: 2,
                    fontSize: 14,
                  }}
                  row={true}
                  setData={(val) =>
                    getHandleData("difficulty_level_manual", val)
                  }
                  value={values.difficulty_level_manual}
                  id="diffuculty level"
                />
              </div>

              {/* Add your question style elements here */}
            </div>
            {/* Assign positive marks */}
            <div>
              <label htmlFor="Allot marks" className="text-sm">
                Allot marks
              </label>
              <br />
              <small className="text-secondary">
                Assign number of marks to the question
              </small>
              <div className="mt-2">
                <IconlessRadio
                  data={[
                    { title: "+1", value: 1 },
                    { title: "+2", value: 2 },
                    { title: "+3", value: 3 },
                    { title: "+4", value: 4 },
                    { title: "05", value: 5 },
                  ]}
                  style={{
                    width: "auto",
                    height: 100,
                    borderRadius: 2,
                    rowGap: 2,
                    fontSize: 14,
                  }}
                  row={true}
                  setData={(val) => getHandleData("marks", val)}
                  value={values.marks}
                  id="Allot marks"
                />
              </div>
            </div>
            {/* Assisgn negative marks */}
            <div>
              <label htmlFor="Allot marks  negative" className="text-sm">
                Allot marks
              </label>
              <br />
              <small className="text-secondary">
                Assign number of negative marks to the question
              </small>
              <div className="mt-2">
                <IconlessRadio
                  data={[
                    { title: "0", value: 0 },
                    { title: "-1.5", value: 1.5 },
                    { title: "-1", value: 1 },
                    { title: "-0.25", value: 0.25 },
                  ]}
                  style={{
                    width: "auto",
                    height: 100,
                    borderRadius: 2,
                    rowGap: 2,
                    fontSize: 14,
                  }}
                  row={true}
                  setData={(val) => getHandleData("negativeMarks", val)}
                  value={values.negativeMarks}
                  id="Allot marks negative"
                />
              </div>
            </div>
            {/* Check */}
            <div>
              <Checkbox
                checked={values.isPara}
                name="isPara"
                id="Check"
                onChange={handleChange}
                sx={{
                  color: "var(--primary)",
                  ml: -1,
                  "&.Mui-checked": {
                    color: "var(--primary)",
                  },
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
              <label htmlFor="Check" className="text-sm">
                Add supporting context to the question such as ( comprehensions,
                images, videos)
              </label>
            </div>
            {/* Add context */}
            {values.isPara && (
              <div>
                <label htmlFor="context" className="text-sm">
                  Context
                </label>
                <br />
                <div className="mt-2 ">
                  <ReactQuill
                    id="context"
                    className="quill-editor"
                    value={values.context}
                    modules={modules}
                    onChange={(content) => {
                      setValues((prevValues) => ({
                        ...prevValues,
                        context: content,
                      }));
                    }}
                    placeholder="Write explainations..."
                  />
                </div>
              </div>
            )}
            {/*Add question answer */}

            <div>
              <label htmlFor="question" className="text-sm">
                Question
              </label>
              <br />
              <div className="mt-2 ">
                <ReactQuill
                  id="question"
                  className="quill-editor"
                  modules={modules}
                  value={values.question}
                  onChange={(content) => {
                    setValues((prevValues) => ({
                      ...prevValues,
                      question: content,
                    }));
                  }}
                  placeholder="Write question..."
                />
                <p htmlFor="Answer" className="text-sm mt-4 ">
                  Answer
                </p>

                {values?.question_type !== 0 &&
                  values.options?.map((answer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-3 w-3/5"
                    >
                      <TextField
                        type="text"
                        margin="dense"
                        size="small"
                        fullWidth
                        placeholder={`:: Enter answer here...`}
                        value={answer}
                        onChange={(e) =>
                          handleAnswerChange(index, e.target.value)
                        }
                      />
                      <Checkbox
                        checked={values.answer === answer}
                        onChange={() => handleRadioChange(answer)}
                        name="answer"
                        size="small"
                        sx={{
                          color: "var(--primary)",
                          p: 1,
                          border: "1px solid grey",
                          borderRadius: 1,

                          "&.Mui-checked": {
                            color: "green",
                          },
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                      />

                      <CloseIcon
                        className="cursor-pointer text-secondary text-4-xl"
                        onClick={() => handleDeleteAnswer(index)}
                      >
                        Delete
                      </CloseIcon>
                    </div>
                  ))}

                {values?.question_type === 0 ? (
                  <ReactQuill
                    className="quill-editor"
                    modules={modules}
                    id="answer"
                    value={values.answer}
                    onChange={(content) => {
                      setValues();
                    }}
                    placeholder="Write Anwer..."
                  />
                ) : (
                  <button
                    className="text-[#336792] text-sm font-inter font-[600] underline underline-offset-4"
                    onClick={() => addAnswer()}
                  >
                    + Add option
                  </button>
                )}
              </div>
            </div>
            {/* Add Explanation */}
            <div>
              <label htmlFor="explanation" className="text-sm">
                Explanation
              </label>
              <br />
              <small className="text-secondary">
                Justification for the answer
              </small>
              <div className="mt-2">
                <ReactQuill
                  className="quill-editor"
                  id="explanation"
                  modules={modules}
                  value={values.explanations}
                  onChange={(content) => {
                    setValues((prevValues) => ({
                      ...prevValues,
                      explanations: content,
                    }));
                  }}
                  placeholder="Write explainations..."
                />
              </div>
            </div>
            {/* Add Video solutions */}
            <div>
              <label htmlFor="isVideo" className="text-sm">
                Video solution
              </label>
              <br />
              <small className="text-secondary">
                <Checkbox
                  id="isVideo"
                  checked={values.isVideo}
                  name="isVideo"
                  onChange={(e) =>
                    handleChange({
                      target: { name: "isVideo", value: e.target.checked },
                    })
                  }
                  sx={{
                    color: "var(--primary)",
                    ml: -1,
                    "&.Mui-checked": {
                      color: "var(--primary)",
                    },
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />{" "}
                Justification for the answer in video format
              </small>

              {values?.isVideo && (
                <div className="mt-2 flex items-center justify-between w-4/6">
                  <InputFileUpload
                    setData={(val) => setValues({ ...values, thumbnail: val })}
                    data={values.thumbnail}
                  />

                  <Divider orientation="horizontal" sx={{ margin: "1rem 0" }}>
                    or
                  </Divider>

                  <TextField
                    placeholder="Enter Video Link..."
                    variant="outlined"
                    size="small"
                    type="url"
                    name="video_link"
                    margin="normal"
                    value={values.video_link}
                    onChange={handleChange}
                    sx={{ width: 165 }}
                  />
                </div>
              )}
            </div>

            <LoadingButton
              variant="contained"
              onClick={handleSubmit("edit")}
              sx={{
                backgroundColor: "#171717",
                width: 178,
                height: 46,
                fontFamily: "var(--font-inter)",
                fontSize: 15,
                borderRadius: 2,
                textTransform: "none",
                alignSelf: "end",

                my: 2,
                ":hover": {
                  backgroundColor: "#171717",
                },
              }}
            >
              Save Changes
            </LoadingButton>
          </div>
        </div>
      </div>
    );
  }

  function Preview() {
    return (
      <>
        {/* Add content */}
        {QID !== null && (
          <h5 className="text-base font-medium text-secondary font-inter ">
            {`${questionList?.data?.length}/`}{" "}
            <span className="text-primary">{`${questionIndex}`}</span>
          </h5>
        )}
        <HTMLConverter>{values.ex}</HTMLConverter>

        {values.context && <Divider />}

        {QID !== null && (
          <h5 className="text-base font-medium text-darkBlue mt-2">{`Qid:${QID}`}</h5>
        )}

        <p className="text-md font-bold text-darkBlue my-2">Question:</p>

        <HTMLConverter>{values.question}</HTMLConverter>
        {values?.question_type === 0 || null ? (
          <HTMLConverter>{values.answer}</HTMLConverter>
        ) : (
          values?.options &&
          values?.options.map((item, index) => (
            <Card
              className="p-2 my-2"
              sx={{
                background: "var(--med-grey)",
                border: values?.answer === item && "1px solid green",
              }}
              key={index} // Add a key prop for each mapped item
            >
              <span className="text-secondary font-medium">
                {String.fromCharCode(65 + index)}.
              </span>
              <Typography variant="text">{item}</Typography>
            </Card>
          ))
        )}
      </>
    );
  }

  return { List, Form, Preview };
}
