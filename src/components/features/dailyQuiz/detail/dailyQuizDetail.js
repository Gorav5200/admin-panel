import { Divider, Stack, Button, ListItem, Chip, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { List } from "@mui/material";
import { ChevronRight, LineChart } from "lucide-react";
import { useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderWithNavigation } from "../../../common/header";
import { dailyQuiz, pastPaperApi } from "../../../../services/Constant";
import { useGetPastPaperQuery } from "../../../../services/apis/pastPapersApi";
import PaginationTable from "../../../common/PaginationTable";
import { Descriptions } from "antd";
import Icon from "../../../common/Icon";
import { useDispatch } from "react-redux";
import { useGetDailyQuizQuery as useGetDailyQuizQueryById } from "../../../../services/apis/dailyQuizApi";
import { setDailyQuizDetail } from "../../../../ducks/dailyQuizSlice";
import { questionBankHeader } from "../../../../services/constHeaders";

const DailyQuizDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [selectSection, setSelectSection] = useState({ title: "basicDetail" });
  const [data, setData] = useState({});
  const {
    data: getDetails,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetDailyQuizQueryById(
    `${dailyQuiz.endPoint}/detail/${params.quizId}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );
 

  useEffect(() => {
   if(getDetails){
    setData(getDetails.data.dailyQuizData);
   }
  }, [getDetails,isFetching,isLoading,isSuccess]);

  console.log("🚀 ~ PastPaperDetail ~ data:", data);

  const handleClick = (val) => {
    console.log("🚀 ~ handleClick ~ val:", val);
    setSelectSection(val);
    // setSelectedQus(val);
  };

  const handleEdit = () => {
    const sectionsSelect = data?.sections?.map((e) => e.section._id);
    dispatch(
      setDailyQuizDetail({
        ...data,
        sectionsSelect,
        entityType: data?.entityType?._id,
        entity: data.entity?._id,
      })
    );
    navigate(`/main/exam/dailyQuiz/edit/${params.quizId}`);
  };

  const items = [
    {
      key: "1",
      label: "Title",
      children: data?.title,
    },
    {
      key: "2",
      label: "Category",
      children: data?.category,
    },
    {
      key: "3",
      label: "Entity",
      children: data?.entity?.title,
    },
    {
      key: "4",
      label: "Entity Type",
      children: data?.entityType?.title,
    },
    {
      key: "5",
      label: "Subjects",
      children: data?.sections?.map((e) => (
        <span className="mx-1">{e.section.title},</span>
      )),
      span: 2,
    },
    {
      key: "6",
      label: "Date",
      children: data?.date,
    },
    {
      key: "7",
      label: "Unattempted Threshold",
      children: data?.unattemptedThreshold,
    },

    {
      key: "8",
      label: "Unattempted Negative Marks",
      children: data?.unattemptedNegativeMarks,
    },

    {
      key: "9",
      label: "Coins",
      children: data?.coin,
    },
    {
      key: "10",
      label: "Points",
      children: data?.points,
    },
    {
      key: "11",
      label: "Paid",
      children: data?.paid?.charge,
    },

    {
      key: "12",
      label: "Marking Type",
      children: data?.markingType,
    },
    {
      key: "13",
      label: "Common timer",
      children: data?.commonTimer,
    },

    {
      key: "14",
      label: "Topper Rewards",
      children: (
        <ul className="list-disc">
          <li className=" w-full items-center">
            <div className="text-black font-inter flex gap-4 items-center  text-base">
              <div className="w-[100px] basis-[20%]">First</div>:
              <span className="font-inter">{data?.toppersReward?.first}</span>
            </div>
          </li>
          <li className=" w-full items-center">
            <div className="text-black font-inter flex gap-4 items-center  text-base">
              <div className="w-[100px] basis-[20%]">Second</div>:
              <span className="font-inter">{data?.toppersReward?.second}</span>
            </div>
          </li>
          <li className=" w-full items-center">
            <div className="text-black font-inter flex gap-4 items-center  text-base">
              <div className="w-[100px] basis-[20%]">Third</div>:
              <span className="font-inter">{data?.toppersReward?.third}</span>
            </div>
          </li>
        </ul>
      ),
    },
    {
      key: "15",
      label: " Reward Grant Chart",

      children: (
        <Stack spacing={2} flexWrap={"wrap"} direction={"row"}>
          {data.rewardGrantChart?.map((e, ind) => (
            <>
              <Chip
                sx={{ width: 280, justifyContent: "start" }}
                avatar={<Avatar>{ind + 1}</Avatar>}
                label={
                  <div className="flex">
                    <span className="text-sm  basis-2/6">
                      Floor Value : {e.floorValue}
                    </span>
                    <span className="text-sm   ml-3">
                    |
                    </span>{" "}
                    <span className="text-sm   ml-3">
                      Multiplier : {e.multiplier}
                    </span>
                  </div>
                }
              />
            </>
          ))}
        </Stack>
      ),
    },
  ];
  console.log("🚀 ~ PastPaperDetail ~ selectSection:", selectSection);

  return (
    <>
      <HeaderWithNavigation cont="Daily Quiz Detail" />
      {!isLoading && (
        <div className="flex gap-2 h-[90vh]">
          <div className="basis-[25%] bg-white rounded-md overflow-scroll p-2 text-black">
            <header className="p-2  sticky top-0 bg-white">
              <h5 className="font-inder font-semibold text-md mb-2">
                Sections
              </h5>
            </header>
            <Divider />
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton
                onClick={() => handleClick({ title: "basicDetail" })}
                selected={selectSection?.title==="basicDetail"}
              >
                <ListItemText
                  primary={
                    <>
                      <span className="font-inter text-base font-medium text-gray-800 mr-3">
                        1.
                      </span>
                      <span className="font-inter text-base font-medium text-gray-800">
                        Basic Details
                      </span>
                    </>
                  }
                />
                <ListItemIcon
                  disablePadding
                  sx={{ minWidth: "max-content", color: "black" }}
                >
                  <ChevronRight size="22" />
                </ListItemIcon>
              </ListItemButton>
              <Divider />
              {data?.sections?.map((val, index) => (
                <React.Fragment key={index}>
                  <ListItemButton selected={selectSection === val} onClick={() => handleClick(val)}>
                    <ListItemText
                      primary={
                        <>
                          <span className="font-inter text-base font-medium text-gray-800 mr-3">
                            {index === 0 ? 2 : index + 2}.
                          </span>

                          <span className="font-inter text-base font-medium text-gray-800">
                            {val.section.title}
                          </span>
                        </>
                      }
                    />
                    <ListItemIcon
                      disablePadding
                      sx={{ minWidth: "max-content", color: "black" }}
                    >
                      <ChevronRight size="22" />
                    </ListItemIcon>
                  </ListItemButton>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </div>
          <div className="basis-[75%] info bg-white rounded-md overflow-scroll scrollbar-hide">
            <header className="p-1 px-2 sticky top-0 bg-white flex items-center justify-between">
              <h5 className="font-inder font-semibold text-md ">
                Question Detail
              </h5>

              <Stack
                direction="row"
                spacing={3}
                alignSelf={"flex-end"}
                justifyContent={"flex-end"}
                my={1}
              >
                <Button
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                  }}
                  startIcon={<Icon name="FileEdit" color="#336792" size={20} />}
                  onClick={handleEdit}
                >
                  Edit
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
            </header>
            <Divider />

            <div className="p-2">
              {selectSection?.title === "basicDetail" ? (
                <div>
                  <Descriptions
                    layout="vertical"
                    contentStyle={{
                      color: "#636262",
                      fontFamily: "var(--font-inter)",
                    }}
                    labelStyle={{
                      fontFamily: "var(--font-inter)",
                      color: "var(--dark-blue)",
                    }}
                    bordered
                    items={!isLoading && items}
                  />
                </div>
              ) : (
                <PaginationTable
                  data={selectSection?.questions || []}
                  placeholder="Search by topics, subjects"
                  columns={questionBankHeader}
                  path={`/main/exam/${selectSection.entity}/qbank`}
                  loading={isLoading}
                  fetching={isFetching}
                  resetPagination={false}
                  count={selectSection?.questions?.length}
                />
              )}
            </div>
          </div>
          {/* Preview */}
        </div>
      )}
    </>
  );
};

export default DailyQuizDetail;
