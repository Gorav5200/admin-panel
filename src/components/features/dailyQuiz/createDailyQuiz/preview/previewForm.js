import {
  Checkbox,
  TextField,
  Divider,
  Box,
  Card,
  Typography,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import IconlessRadio from "../../../../common/radioGroup";
import { HTMLConverter } from "../../../../../services/common";
import { Chip, List, ListItem } from "@mui/material";
import {
  GripVertical,
  PlusCircle,
} from "lucide-react";
import {
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { CustomButton ,CustomButtonStyle,ButtonStyle} from "../../../../../styles/muiRoot";
import PublishPaper from "./publishPaper";
import { useNavigate } from "react-router-dom";

const PreviewForm = () => {
  const navigate=useNavigate();
  const {sections} = useSelector((state) => state.dailyQuiz.dailyQuizDetail);
  const [selectedQus, setSelectedQus] = useState(sections[0]?.questions[0]);
  const[publishModal,setPublishModal]=useState(false);
  console.log("🚀 ~ PreviewForm ~ publishModal:", publishModal)

  const getQuestionDetail = (val) => {
    setSelectedQus(val);
  };

  return (
    <>
    <div className="flex gap-2 h-[70vh]">
      <div className="basis-[25%] bg-white rounded-md overflow-scroll p-2 text-black">
     
        <NestedList
          data={sections}
          getQuestionDetail={getQuestionDetail}
          activeSelect={selectedQus}
        />
        <CustomButton startIcon={<PlusCircle/>} sx={{float:"right", m:2}} onClick={()=>navigate(`/main/exam/dailyQuiz/create`)}>
          Add Import
        </CustomButton>
      </div>
      <div className="basis-[50%] info bg-white rounded-md overflow-scroll scrollbar-hide">
        <header className="p-2 pt-3 sticky top-0 bg-white">
          <h5 className="font-inder font-semibold text-md mb-3">
            Question Detail
          </h5>

          <Divider />
        </header>

        <div className=" flex flex-col gap-6 p-3 ">
          {selectedQus?.mock_tag && (
            <div>
              <label htmlFor="mock_tag" className="text-sm">
                Mock Tag
              </label>
              <div className="mt-2">
                <TextField
                  style={{ width: "300px" }}
                  size="medium"
                  placeholder="Mock Tag"
                  name="mock_tag"
                  value={selectedQus?.mock_tag}
                  id="mock_tag"
                  disabled={true}
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="questionStyle" className="text-sm">
              Question style
            </label>
            <br />
            <small className="text-secondary">Format of the question</small>
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
                id="questionStyle"
                value={selectedQus.question_type}
                disabled={true}
              />
            </div>
          </div>

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
                id="diffuculty level"
                value={selectedQus?.difficulty_level_manual}
              />
            </div>
          </div>

          {selectedQus.isPara && (
            <div>
              <Checkbox
                name="isPara"
                id="Check"
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
          )}

          {selectedQus.isPara && (
            <div>
              <label htmlFor="context" className="text-sm">
                Context
              </label>
              <br />
              <div className="mt-2 ">
                <ReactQuill
                  id="context"
                  className="quill-editor"
                  value={selectedQus?.context}
                  placeholder="Write explainations..."
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="question" className="text-sm">
              Question
            </label>
            <Box
              border="1px solid var(--med-grey)"
              maxheight="100px"
              p="10px"
              fontSize="14px"
              fontWeight="300"
              borderRadius="8px"
            >
              <HTMLConverter>{selectedQus.question}</HTMLConverter>
            </Box>
            <br />
            <div className="mt-2 ">
              <p htmlFor="Answer" className="text-sm mt-4 ">
                Answer
              </p>
              {selectedQus.question_type == 0 ? (
                <div className="flex items-center justify-between gap-3 w-4/5">
                  <TextField
                  aria-readonly
                  readOnly
                    type="text"
                    margin="dense"
                    size="small"
                    fullWidth
                    value={`${selectedQus.answer}`}
                  
                  />
                </div>
              ) : (
                selectedQus?.options?.map((item, index) => (
                  <Card
                    className="p-2 my-2"
                    sx={{
                      background: "var(--med-grey)",
                      border: selectedQus?.answer === item && "1px solid green",
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
          </div>

          <div>
            <label htmlFor="explanation" className="text-sm">
              Explanation
            </label>
            <br />
            <small className="text-secondary">
              Justification for the answer
            </small>
            <Box
              border="1px solid var(--med-grey)"
              height=""
              p="10px"
              fontSize="14px"
              fontWeight="300"
              borderRadius="8px"
            >
              <HTMLConverter>{selectedQus.explanations}</HTMLConverter>
            </Box>
          </div>
        </div>
      </div>
      {/* Preview */}
      <div className="basis-[25%]  bg-white rounded-md  overflow-scroll text-justify scrollbar-hide">
        <header className="sticky top-0 bg-white p-2">
          <div className="flex justify-between items-center mb-2 ">
            <p className="font-semibold text-md ">Practice Questions</p>
            <Chip
              label={`QUID:${selectedQus?.qid}`}
              sx={{
                backgroundColor: "#5146D6",
                color: "#ffff",
                borderRadius: "5px",
                border: "none",
                padding: "3px",
                ml: "8px",
              }}
              variant="outlined"
            />
          </div>
          <Divider />
        </header>

        <section className="p-2">
          <div className="mt-2">
            <HTMLConverter>{selectedQus?.explanations}</HTMLConverter>
          </div>

          <div className="mt-2">
            <HTMLConverter>{selectedQus?.question}</HTMLConverter>
          </div>

          <List>
            {selectedQus?.options?.map((e, i) => (
              <ListItem sx={{ pl: 0 }}>
                <Box
                  bgcolor="#F1F2F6"
                  borderRadius="5px "
                  width="100%"
                  border={selectedQus?.answer === e && "1px solid green"}
                >
                  <p className="p-3 text-black font-semibold">
                    {String.fromCharCode(65 + i)}:{" "}
                    <span className="font-normal pl-2">{e}</span>
                  </p>
                </Box>
              </ListItem>
            ))}
          </List>
        </section>
      </div>
    </div>
    <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
        <CustomButton
          style={{
            ...CustomButtonStyle,
            width: 150,
            height: 45,
            borderRadius: 6,
            position:"absolute",
            bottom:20,
            right:10,
            my:3,
          }}
           onClick={()=>setPublishModal(!publishModal)}
        >
          Save & Publish
        </CustomButton>
    </Stack>
    <PublishPaper open={publishModal} handleClose={()=>setPublishModal(false)}/>
    </>

  );
};

export default PreviewForm;

function NestedList({ data, getQuestionDetail, activeSelect }) {
  const [openSectionIndex, setOpenSectionIndex] = React.useState(0);

  const handleClick = (index) => {
    setOpenSectionIndex(openSectionIndex === index ? null : index);
  };

  console.log("check logic", Array(data.length).fill(false));
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Sections & Questions
        </ListSubheader>
      }
    >
      {data?.map((val, index) => (
        <React.Fragment key={index}>
          <ListItemButton onClick={() => handleClick(index)}>
            <ListItemIcon>
              <GripVertical />
            </ListItemIcon>
            <ListItemText
              primary={
                <span className="font-inter text-base font-medium">
                  {val.section.title}
                </span>
              }
            />
            {openSectionIndex === index ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Divider />
          <Collapse
            in={openSectionIndex === index}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {val?.questions.map((ques, ind) => (
                <React.Fragment key={ind}>
                  <ListItemButton
                    selected={ques?._id === activeSelect?._id}
                    sx={{ pl: 9 }}
                    onClick={() => getQuestionDetail(ques)}
                  >
                    <ListItemIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-notebook-text"
                      >
                        <path d="M2 6h4" />
                        <path d="M2 10h4" />
                        <path d="M2 14h4" />
                        <path d="M2 18h4" />
                        <rect width="16" height="20" x="4" y="2" rx="2" />
                        <path d="M9.5 8h5" />
                        <path d="M9.5 12H16" />
                        <path d="M9.5 16H14" />
                      </svg>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <span className="font-inter text-sm font-medium">
                          {ques.qid}
                        </span>
                      }
                    />
                    <ListItemText
                      primary={
                        <span className="font-inter text-sm  text-gray-700">
                          {ques?.question_type === 0
                            ? "Tita"
                            : ques?.question_type === 1
                            ? "Multiple Choice"
                            : ques?.question_type === 2
                            ? "Long Answer"
                            : ques?.question_type === 3
                            ? "Short Answer"
                            : "True & False"}
                        </span>
                      }
                    />
                  </ListItemButton>
                  {val.questions.length - 1 !== ind && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
}
