import React, { useState, useEffect } from "react";
import { HeaderWithNavigation } from "../../../../common/header";
import { Button, Chip, Card, Box, Backdrop } from "@mui/material";
import Stack from "@mui/material/Stack";
import Icon from "../../../../common/Icon";
import UseCustomRouter from "../../../../../services/utilities/customRouter";
import { useDispatch, useSelector } from "react-redux";
import { useGetSingleQuestionQuery } from "../../../../../services/apis/exam/questionBank";
import { questionApi } from "../../../../../services/Constant";
import {
  HTMLConverter,
  checkQuestionType,
  dateFormatting,
} from "../../../../../services/common";
import { BackdropLoader } from "../../../../common/lineLoader";
import ReactVideoPlayer from "../../../../common/reactVideo";
import { addQuestion } from "../../../../../ducks/questionBankSlice";

function QuestionDetail() {
  const { params, navigate } = UseCustomRouter();
  const [question, setQuestion] = useState(null);
  const dispatch = useDispatch();
  const { data, isLoading,isFetching } = useGetSingleQuestionQuery(
    `${questionApi.endPoint}/detail/${params.qid}`
  );

  useEffect(() => {

    setQuestion(data?.data.questionDetail);
  }, [data]);



  
  return (
    <>
      {isLoading || isFetching ? (
        <BackdropLoader isOpen={isLoading || isFetching} />
      ) : (
        <div className="h-screen">
          <HeaderWithNavigation
            cont={`${question?.entity_type_id?.title || "Unknown Entity"}/${
              question?.topic_id[0]?.title || "Unknown Topic"
            }/${question?.subtopic_id[0]?.title || "Unknown Subtopic"}`}
          />

          <div className="h-[93vh] bg-white mx-3 rounded-md p-2 overflow-scroll">
            <div className="flex justify-between align-top border-b-2 p-2 ">
              <div>
                <span className="text-base font-inter font-bold">
                  <Chip
                    sx={{
                      color: "white",
                      background: "#5146D6",
                      borderRadius: 4,
                      fontSize: 12,
                      width: "max-content",
                    }}
                    label={`Quid: ${question?.qid}`}
                  />{" "}
                  {question?.difficulty_level_manual}{" "}
                </span>
                <small className="font-inter text-secondary">
                  (Last updated on {dateFormatting(question?.updatedAt).date})
                </small>

                <Stack
                  justifyContent={"space-between"}
                  direction="row"
                  alignItems="baseline"
                  spacing={3}
                  pt={2}
                >
                  <p className="text-sm font-inter text-darkblue ">
                    Question Type : {checkQuestionType(question?.question_type)}{" "}
                    <HTMLConverter>
                      {!question?.context && "No context"}
                    </HTMLConverter>
                  </p>
                  <p className="font-inter text-sm text-darkblue">
                    Marks allocated: {question?.marks}
                  </p>
                </Stack>
              </div>

              <Stack direction="row" spacing={3} alignSelf={"flex-start"}>
                <Button
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                  }}
                  startIcon={<Icon name="FileEdit" color="#336792" size={20} />}
                  onClick={() => {
                    const data = {
                      ...question,
                      topic_id: question.topic_id[0]._id,
                      subtopic_id: question.subtopic_id.map((e) => e._id),
                      subject_id: question?.subject_id._id,
                    };
                    dispatch(addQuestion(data));
                    navigate(
                      `/main/exam/${params.examId}/qbank/${params.qid}/edit`
                     
                    );
                  }}
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
                  onClick={() => {
                    const state = {
                      id: params.qid,
                      handleDuplicateClick: true,
                    };
                    navigate(`/main/exam/${params.examId}/qbank/create`, {
                      state,
                    });
                  }}
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
            <div className="text-sm font-inter text-darkblue flex flex-col gap-3 mt-3 p-2">
              <p>
                <HTMLConverter>{question?.context}</HTMLConverter>
              </p>
              <section className="flex flex-col gap-2">
                <h5 className="text-base font-bold">Question</h5>

                <HTMLConverter className=" mt-2">
                  {question?.question}
                </HTMLConverter>
              </section>

              <div className="answer-section mt-2">
                <h5 className="font-bold text-base">Answer</h5>

                {question?.options?.map((item, index) => (
                  <div className="flex gap-2 w-5/6 mt-2" key={index}>
                    <Card
                      sx={{
                        width: "max-content",
                        border: "1px solid #D6D7D9",
                        p: 1.5,
                        boxShadow: "none",
                      }}
                      // Add a key prop for each mapped item
                    >
                      <text variant="text">
                        {
                          <span className="text-primary font-medium px-1">
                            {String.fromCharCode(65 + index)}
                          </span>
                        }
                      </text>
                    </Card>
                    <Card
                      sx={{
                        border:
                          item == question?.answer
                            ? "1px solid #24B670"
                            : "1px solid #D6D7D9",
                        minWidth: "60%",
                        alignItems: "center",
                        p: 1.5,
                        boxShadow: "none",
                      }}
                    >
                      <p variant="text">{item}</p>
                    </Card>
                    <Card
                      sx={{
                        width: "max-content",
                        border: "1px solid #D6D7D9",
                        p: 1.5,
                        background: item == question?.answer && "#24B670",

                        boxShadow: "none",
                      }}
                    >
                      <Icon name="Check" color="white" />
                    </Card>
                  </div>
                ))}
              </div>

              <content className="mt-2">
                <h5 className="font-bold text-base">Explanation</h5>
                <HTMLConverter className="mt-2">
                  {question?.explanations}
                </HTMLConverter>
              </content>

              <div className="mt-2 h-[300px] width-[300px] ">
                <h5 className="font-bold text-base">Video solution</h5>
                <Box
                  sx={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    width: "343px",
                    height: "fit-content",

                    boxShadow: 2,
                    mt: 2,
                  }}
                >
                  {question?.isVideo && (
                    <ReactVideoPlayer videoUrl={question.video_link} />
                  )}
                </Box>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuestionDetail;
