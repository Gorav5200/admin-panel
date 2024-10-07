import React, { useState, useEffect } from "react";
import { HeaderWithNavigation } from "../../../../../../common/header";
import { Button, Chip, Card, Box, Backdrop } from "@mui/material";
import Stack from "@mui/material/Stack";
import Icon from "../../../../../../common/Icon";
import UseCustomRouter from "../../../../../../../services/utilities/customRouter";
import { useDispatch, useSelector } from "react-redux";
import { useGetSingleQuestionQuery } from "../../../../../../../services/apis/exam/questionBank";
import { questionApi } from "../../../../../../../services/Constant";
import { HTMLConverter, dateFormatting } from "../../../../../../../services/common";
import { BackdropLoader } from "../../../../../../common/lineLoader";


function QuestionDetailView() {
  const { params, navigate } = UseCustomRouter();
  console.log("p", params.qid);
  const [question, setQuestion] = useState(null);
  const { data, isLoading, refetch } = useGetSingleQuestionQuery(
    `${questionApi.endPoint}/${params.qid}`
  );

  console.log("get single user data", data);
 

  useEffect(() => {
    // Find the question when listData is available

    refetch();
    setQuestion(data?.question_banks[0]);
  }, [data, params]);




  return (
    <>
  
      {isLoading? <BackdropLoader isOpen={isLoading}/> : (
        <div className="h-screen">
   
          <HeaderWithNavigation
            cont={`${question?.entity_type_id?.title || "Unknown Entity"}/${
              question?.topic_id[0]?.title || "Unknown Topic"
            }/${question?.subtopic_id[0]?.title || "Unknown Subtopic"}`}
          />
   
          <div className="h-[93%] bg-white mx-3 rounded-md p-2 overflow-scroll">
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
                    label={`Quid: ${question?._id}`}
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
                    {question?.question_type},{" "}
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
                  onClick={()=>{
                    const state={id:params.qid, handleEditClick:true}
                    navigate(`/main/question/edit/${params.qid}`,{state})
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
                  onClick={()=>{
                    const state={id:params.qid, handleDuplicateClick:true}
                    navigate("/main/question/create",{state})
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
                          index === question?.answer
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
                        background:
                          index === parseInt(question?.answer) && "#24B670",

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

              {
                <div className="mt-2">
                  <h5 className="font-bold text-base">Video solution</h5>
                  <Box
                    sx={{
                      borderRadius: "10px",
                      overflow: "hidden",
                      width: "343px",
                      height: "250px",
                      boxShadow: 2,
                      mt: 2,
                    }}
                  >
                    {/* <video width="100%" height="100%" controls>
                      <source src="https://youtu.be/LDS1ll93P-s?si=opqnzh4wlx-QaFQH" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video> */}
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/LDS1ll93P-s"
                      frameborder="0"
                      allowfullscreen
                    ></iframe>
                  </Box>
                </div>
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuestionDetailView;
