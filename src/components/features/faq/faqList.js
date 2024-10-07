import React from "react";
import Header from "../../common/header";
import {
  Button,
  Stack,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from "@mui/material";
import useCustomRouter from "../../../services/utilities/customRouter";
import { useSelector } from "react-redux";
import Icon from "../../common/Icon";
import InputWithIcon from "../../common/searchBox";
import { useGetFaqListQuery } from "../../../services/apis/faq";
import { faqApi } from "../../../services/Constant";
import { dateFormatting } from "../../../services/common";
function FaqList() {
  const { navigate } = useCustomRouter();
  const main = useSelector((state) => state);
  console.log("main", main);

  const {
    data: listData,
    isLoading,
    isError,
  } = useGetFaqListQuery(`${faqApi.endPoint}`, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      {!isLoading && (
        <div className="h-screen">
          <Header
            content="FAQ"
            subHeading="(Frequently Asked Questions for students)"
          />
          <div className="bg-white p-2 m-2 mt-3 rounded-md h-[90%] font-inter">
            <div className="flex justify-between border-b-2 p-2 items-center">
              <div className="w-3/6">
                <InputWithIcon placeholder={"Search for FAQs"} />
              </div>

              <Stack direction="row" spacing={3}>
                <Button
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                  }}
                  onClick={()=>navigate('/main/faq/create')}
                  startIcon={<Icon name="FilePlus" color="#336792" size={20} />}
                >
                  Create Question
                </Button>
                <Button
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                  }}
                  startIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#336792"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-messages-square"
                    >
                      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                    </svg>
                  }
                >
                  Comments
                </Button>
              </Stack>
            </div>

            <div className="mt-2 h-[88%] overflow-scroll">
              {listData?.faq.map((data, ind) => (
                <>
                  <Card
                    sx={{ width: "97%", boxShadow: "none", m: 1 }}
                    key={data._id}
                  >
                    <h4 className="text-base font-inter font-[500] ml-3 ">
                      {`Q${ind + 1}.`} {data.question}
                    </h4>
                    <CardContent className="text-sm text-secondary">
                      {data.answer}
                    </CardContent>
                   <div className="float-right flex justify-around items-center gap-4">
                   <Button
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                    textTransform:"none"
                  }}
                  startIcon={
                    <Icon name="FileEdit" color="#336792" size={17}/>
                  }
                  onClick={()=>{
                   const state={handleEditTrigger:true}
                    navigate(`/main/faq/edit/${data._id}`,{state})
                  }}
                >
                  Edit
                    </Button>
                    <p className="font-inter text-secondary  text-sm float-right">
                      (Last updated on {dateFormatting(data.updatedAt).date})
                    </p>
                   </div>
                  </Card>

                  <Divider />
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FaqList;

function List({ listData }) {
  return (
    <div className="mt-2 h-[88%] overflow-scroll">
      {[...Array(20)].map((data) => (
        <>
          <Card sx={{ width: "90%", boxShadow: "none", m: 1 }}>
            <h4 className="text-base font-inter font-[500] ml-3 ">
              {"Q1. What is iQuanta?"}
            </h4>
            <CardContent className="text-sm text-secondary">
              iQuanta is an organization for preparation of Competitive Exams
              specializing in MBA entrance exam and CAT entrance exam. It
              spurred arevolution in the industry by disrupting online learning
              with Facebook as a platform. iQuanta is associated with
              prestigious faculty and provides the USP of solving an aspirant’s
              queries 24*7. It was founded by Indrajeet Singh and today marks as
              the best online coaching for cat.
            </CardContent>
          </Card>
          <Divider />
        </>
      ))}
    </div>
  );
}
