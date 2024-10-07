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
import OutlinedInput from "@mui/material/OutlinedInput";
import IconlessRadio from "../../../../common/radioGroup";
import InputFileUpload from "../../../../common/Upload";
import CloseIcon from "@mui/icons-material/Close";
import MultipleSelect from "../../../../common/checkGroup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import {
  useUpdateQuestionMutation,
  useGetListDataQuery,
} from "../../../../../services/apis/exam/questionBank";
import { questionApi } from "../../../../../services/Constant";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { HTMLConverter } from "../../../../../services/common";
import Skeleton from "@mui/material/Skeleton";
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

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
];

const modules = {
  toolbar: {
    container: toolbarOptions,
  },
};

export default function EditQuestion() {
  const { questionDetail } = useSelector((state) => state.questionBank);
  const params = useParams();
  const navigate = useNavigate();
  const [QID, setQid] = useState(null);
  const [values, setValues] = useState(questionDetail);
  const entity_type = params.examId;

  const {
    data: listsData,
    isLoading: listLoading,
    isError: listError,
  } = useGetListDataQuery(`exams/v1/entity/topic/subtopic/${params.examId}`, {
    refetchOnMountOrArgChange: true,
  });

  const [
    updateQuestion,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate },
  ] = useUpdateQuestionMutation();

  console.log("🚀 ~ EditQuestion ~ values:", values);



  const getHandleData = (name, val) => {
    if (name === "questionType") {
      setValues({ ...values, [name]: val, questionType: val });
    } else {
      setValues({ ...values, [name]: val });
    }
  };

  const handleChange = (event) => {
    //this function for  getting the data by name from event

    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    console.log(133, name, value);

    setValues({ ...values, [name]: value });
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

  const cancelEdit = () => {
    navigate(-1);
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
          console.log("186", values);
          // Call the deleteUser mutation
          const response = await updateQuestion({
            endpoint: `${questionApi.endPoint}/${params.qid}`,
            updateQuestion: values,
          });
          // Navigate to the desired path after successful deletion
          console.log("Response:", response);

          if (response && response?.data?.success) {
            // Navigate to the desired path after successful deletion
            toast.success("Question Edit Successfully!", {
              autoClose: 2000,
              onOpen: () => {
                navigate(`/main/exam/${params.examId}/qbank/${params.qid}`);
                setValues({});
                setQid("null");
              },
              // Auto close the toast after 3 seconds
            });
          } else {
            toast.error("Some error occured to submit form!", {
              autoClose: 2000,
            });
            // console.error("Error add question. Response:", response);
          }
        } catch (error) {
          console.error("Error add question api:", error);
        }
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
useEffect(() => {
  setValues((prevValues) => {
    let newValues = { ...prevValues };

    if (!prevValues.isPara) {
      newValues.context = "";
    }
    if (prevValues.questionType === "tita") {
      newValues.options = [];
    }

    if (prevValues.questionType !== "mcq") {
      newValues.answerMulti = [];
    }
    if (prevValues.questionType === "mcq") {
      newValues.answer = null;
    }

    return newValues;
  });
}, [values.isPara, values.questionType]);

  console.log("values", values);

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

    if (!values?.subject_id) {
      err.subject = "Please select the subject";
    } else if (!values.topic_id) {
      err.topic = "Please select the Topic";
    } else if (!values.subtopic_id) {
      err.topic = "Please select the Subtopic";
    } else if (!values.questionType) {
      err.questionType = "Please select the Question Style";
    } else if (values.allowed_for.length === 0) {
      err.allowed_for = "Please select the modules allowed";
    } else if (!values.difficulty_level_manual) {
      err.difficulty_level_manual = "Please select the Difficulty level";
    } else if (!values.marks) {
      err.marks = "Please select the Marks";
    } else if (!values.question) {
      err.question = "Enter the Question";
    } else if (values?.options?.length > 0) {
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

  const handleMultiSelectChange = (answer) => {
    const newAnswers = values.answerMulti?.includes(answer)
      ? values.answerMulti.filter((a) => a !== answer)
      : [...values.answerMulti, answer];
    setValues({ ...values, answerMulti: newAnswers });
  };

  function Form() {
    return (
      <div className="basis-[70%]  h-screen overflow-scroll  bg-white rounded-md">
        <div className="info">
          {QID !== null && (
            <h5 className="m-3 py-2 text-darkblue font-bold">
              QID {`: ${values?.qid}`}
            </h5>
          )}
          <hr />
          <div className="p-3 flex flex-col gap-6">
            {/* Mock Tag */}
            <div>
              <InputLabel htmlFor="entity_type" className="text-sm">
                Mock tags
              </InputLabel>

              <small className="text-secondary">Enter the mock tag</small>
              {/* Subject or topic field */}

              <div className="mt-2">
                <TextField
                  style={{ width: "300px" }}
                  size="medium"
                  placeholder="Mock Tag"
                  name="mock_tag"
                  onChange={handleChange}
                  value={values.mock_tag}
                  id="mock_tag"
                />
              </div>
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
                          multiple
                          value={   values?.subtopic_id  }
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
                    { title: "Single Choice", value: "scq" }, //1
                    { title: "Multiple Choice", value: "mcq" }, //1
                    { title: "Tita", value: "tita" }, //0
                    { title: "True & False", value: "tfq" }, //4
                    { title: "Short Answer", value: "saq" }, //3
                    { title: "Long Answer", value: "laq" },
                  ]}
                  style={{
                    width: 170,
                    height: 100,
                    borderRadius: 2,
                    rowGap: 2,
                    fontSize: 14,
                  }}
                  row={true}
                  setData={(val) => getHandleData("questionType", val)}
                  value={values.questionType}
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

                {values?.questionType !== "tita" &&
                  values.options?.map((answer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-3 w-3/5"
                    >
                      <TextField
                        type="text"
                        margin="dense"
                        size="small"
                        color="primary"
                        fullWidth
                        placeholder={`:: Enter answer here...`}
                        value={answer}
                        onChange={(e) =>
                          handleAnswerChange(index, e.target.value)
                        }
                      />
                      <Checkbox
                        checked={
                          values?.questionType === "mcq"
                            ? values?.answerMulti?.includes(answer)
                            : values.answer === answer
                        }
                        onChange={() =>
                          values?.questionType === "mcq"
                            ? handleMultiSelectChange(answer)
                            : handleRadioChange(answer)
                        }
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

                {values?.questionType === "tita" ? (
                  <TextField
                    multiline
                    maxRows={4}
                    id="answer"
                    fullWidth
                    name="answer"
                    value={values.answer}
                    onChange={handleChange}
                    placeholder="Write Anwer..."
                    margin="dense"
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
            <div className="flex gap-3 justify-end">
              <LoadingButton
                loading={isLoadingUpdate}
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
              <LoadingButton
                variant="outlined"
                onClick={cancelEdit}
                sx={{
                  width: 178,
                  height: 46,
                  fontFamily: "var(--font-inter)",
                  fontSize: 15,
                  borderRadius: 2,
                  textTransform: "none",
                  alignSelf: "end",

                  my: 2,
                }}
              >
                Cancel
              </LoadingButton>
            </div>
            ;
          </div>
        </div>
      </div>
    );
  }

  function Preview() {
    return (
      <div className="flex flex-col p-2 bg-white  h-screen overflow-scroll rounded-md basis-[30%] ">
        {QID !== null && (
          <h5 className="p-2 text-darkblue font-bold ">{`Qid:${values?.qid}`}</h5>
        )}
        {values?.context && <Divider />}
        <HTMLConverter>{values?.context}</HTMLConverter>

        <Divider />
        <p className="text-md font-bold text-darkBlue my-2">Question:</p>

        <HTMLConverter>{values?.question}</HTMLConverter>
        {values?.questionType === "tita" || null ? (
          <HTMLConverter>{values?.answer}</HTMLConverter>
        ) : (
          values?.options &&
          values?.options.map((item, index) => (
            <Card
              className="p-2 my-2"
              sx={{
                background: "var(--med-grey)",
                border:
                  values?.questionType === "mcq" &&
                  values.answerMulti?.includes(item)
                    ? "1px solid green"
                    : values?.answer === item && "1px solid green",
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
      </div>
    );
  }

  return (
    <div className="flex  gap-3">
      {Form()}
      {Preview()}
    </div>
  );
}
