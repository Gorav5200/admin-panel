import { Card, CardContent, Chip, Divider, Stack } from '@mui/material';
import React from 'react'
import { HTMLConverter, truncateString } from '../../../../services/common';
import Icon from '../../../common/Icon';
import TruncateText from '../../../common/FunctionComponents/truncate';

function PracticeCardView({data}) {
    console.log("🚀 ~ PracticeCardView ~ data:", data)
    return (
      <div>
        <Card
          key={""}
          elevation={0}
          sx={{
            backgroundColor: "white",
            border: "1px solid #D9DBDD",

            width: "100%",
            minHeight: "242px",
            overflow: "scroll",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              backgroundColor: "var(--med-grey)",
            }}
            justifyContent={"space-between"}
          >
            <h5 className="text-base font-bold p-2 bg-medGrey ">Practice</h5>
            <h5 className="text-sm p-2  ">
              <Chip
                sx={{
                  borderRadius: 2,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                }}
                label={data.qid}
              ></Chip>
              {/* {data.difficulty_level_manual.toUpperCase()} */}
            </h5>
          </Stack>
          <CardContent>
            <section className="text-left">
              <h5 className="font-medium font-inter text-base ">Question</h5>

              {
                <HTMLConverter className="text-justify">
                  {data.question}
                </HTMLConverter>
              }
             
            
                <HTMLConverter className="text-justify">
                  {data.isPara && data.context}
                </HTMLConverter>
            
            </section>
            <Divider />
            <div className="answer-section mt-2 text-left">
              <h5 className="font-medium font-inter text-base ">Answer:</h5>

              {data.options === null ? (
                <div className="my-2">
                  <p className="text-sm text-black">{data.answer}</p>
                </div>
              ) : (
                data.options?.map((ans, index) => (
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
                          ans === data.answer
                            ? "1px solid #24B670"
                            : "1px solid #D6D7D9",
                        minWidth: "60%",
                        alignItems: "center",
                        p: 1.5,
                        boxShadow: "none",
                      }}
                    >
                      <p variant="text">
                        <TruncateText text={ans} maxLength={30} />
                      </p>
                    </Card>
                    <Card
                      sx={{
                        width: "max-content",
                        border: "1px solid #D6D7D9",
                        p: 1.5,
                        background: ans === data.answer && "#24B670",

                        boxShadow: "none",
                      }}
                    >
                      <Icon name="Check" color="white" />
                    </Card>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
}

export default PracticeCardView;
