import React, { useEffect, useMemo, useState } from "react";
import { Button, Divider, Stack, Chip, Skeleton, List, ListItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { practiceQaApi } from "../../../../services/Constant";
import { HeaderWithNavigation } from "../../../common/header";
import Icon from "../../../common/Icon";
import PaginationTable from "../../../common/PaginationTable";
import { BorderLessAccordion } from "../../../common/accordian";
import { Dot, LineChart } from "lucide-react";
import { questionBankHeader } from "../../../../services/constHeaders";
import { useGetPracticeQaPackageQuery } from "../../../../services/apis/practiceQaApi";
import { createPracticeQa } from "../../../../ducks/practiceQaSlice";
import { Descriptions } from "antd";

const DetailMain = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const {
    data: getDetails,
    isLoading: getLoading,
    isError: getError,
    isFetching: getFetching,
  } = useGetPracticeQaPackageQuery(
    `${practiceQaApi.endPoint}/detail/${params.practiceId}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (getDetails?.data.practiceQaList) {
      setData(getDetails.data.practiceQaList);
    }
  }, [getDetails]);

  console.log("🚀 ~ handleEdit ~ ", data);

  const handleEdit = () => {
    const { topic, subject, subTopics, entity, entityType, ...others } = data;
    const manuplateData = {
      topic: topic?.[0]._id,
      subject: subject?._id,
      subTopics: subTopics.flatMap((e) => e._id),
      entity: entity._id,
      entityType: entityType?._id,
      ...others,
    };
    dispatch(createPracticeQa(manuplateData));
    navigate(`/main/exam/practiceQa/edit/${params.practiceId}`);
  };

  console.log("🚀 ~ DetailMain ~ data:", data);

  return (
    <>
      <HeaderWithNavigation cont="Practice Q/A Detail" />

      <div className=" rounded-md  mt-3 w-full flex gap-2 p-2 h-[90vh] ">
        <div className=" bg-white rounded-md basis-3/12 p-2 overflow-scroll h-[88vh]  ">
          {getLoading || getFetching ? (
            <div className="h-full w-full">
              <Skeleton variant="rounded" width={"100%"} height={"100%"} />
            </div>
          ) : (
            <>
              <Stack
                direction={"row"}
                spacing={2}
                alignItems={"center"}
                justifyContent={"space-between"}
                mb={1.5}
                p={1}
                bgcolor={"var(--med-grey)"}
                borderRadius={1}
              >
                <h6 className="text-[#1e1e1e] font-medium font-inter text-base">
                  {data?.title}
                </h6>

                {data.paid?.status === true && (
                  <div className="p-2 flex items-end  mt-3 float-right text-[#2b601b]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-hand-coins"
                    >
                      <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
                      <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
                      <path d="m2 16 6 6" />
                      <circle cx="16" cy="9" r="2.9" />
                      <circle cx="6" cy="5" r="3" />
                    </svg>
                    <h6 className="text-[#2b601b] font-medium font-inter text-sm">
                      Coins:{data.coin}
                    </h6>
                  </div>
                )}
              </Stack>
              <div className="justify-between flex items-center">
                <h6 className=" text-base font-bold  text-[#383838] my-2 flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-notebook-tabs"
                  >
                    <path d="M2 6h4" />
                    <path d="M2 10h4" />
                    <path d="M2 14h4" />
                    <path d="M2 18h4" />
                    <rect width="16" height="20" x="4" y="2" rx="2" />
                    <path d="M15 2v20" />
                    <path d="M15 7h5" />
                    <path d="M15 12h5" />
                    <path d="M15 17h5" />
                  </svg>
                  {data?.subject?.title}
                </h6>
                <Chip
                  sx={{
                    borderRadius: 1,
                    bgcolor: "var(--dark-blue)",
                    color: "#fff",
                    fontWeight: "500",
                    lineHeight: 24,
                  }}
                  label={
                    <h6 className=" font-medium font-inter text-sm">
                      {data.paid?.status === true
                        ? ` Charges:${data?.paid.charge}`
                        : "Free"}
                    </h6>
                  }
                />
              </div>
              <div className="my-1">
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
                  items={[
                    {
                      key: "1",
                      label: "Entity",
                      children: data?.entity?.title || "N/A",
                    },
                    {
                      key: "2",
                      label: "Entity Type",
                      children: data?.entityType?.title || "N/A",
                    },
                  ]}
                />
              </div>

              <h6 className=" text-base font-bold  text-[#383838] my-2">
                Topic and Sub-Topics ::
              </h6>
              <div className="flex justify-between items-end">
                {data?.topic?.map((e) => (
                  <BorderLessAccordion
                    header={
                      <h6 className=" text-sm font-medium text-gray-800">
                        {e.title}
                      </h6>
                    }
                    content={
                      <ul className="list-disc">
                        {data?.subTopics?.map((e, index) => (
                          <li key={index} className="text-gray-700 text-xs ">
                            {e.title}
                          </li>
                        ))}
                      </ul>
                    }
                    id={data?.topic?._id}
                  />
                ))}
              </div>

              <div className="reward-grant-chart">
                <Divider>
                  <Chip
                    label={
                      <p className="flex gap-1 items-center p-2">
                        <LineChart size={15} />
                        Reward Grant Chart
                      </p>
                    }
                    size="small"
                  />
                </Divider>

                <List className="h-full overflow-scroll max-h-[200px]  scroll-smooth scrollbar-hide">
                  {data.rewardGrantChart?.map((e, ind) => (
                    <>
                      <ListItem
                        disableGutters
                        key={e._id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          p: 1,
                        }}
                      >
                        {ind + 1} .
                        <span className="text-sm ">
                          Floor Value : {e.floorValue}
                        </span>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />
                        <span className="text-sm  pr-2">
                          Multiplier : {e.multiplier}
                        </span>
                      </ListItem>
                      {data.rewardGrantChart.length !== ind+1 && <Divider />}
                    </>
                  ))}
                </List>
              </div>
            </>
          )}
        </div>

        <div className="bg-white rounded-md basis-9/12 p-2  overflow-scroll h-[88vh]">
          {getLoading || getFetching ? (
            <div className="h-[80px] w-full">
              <Skeleton variant="rounded" width={"100%"} height={"100%"} />
            </div>
          ) : (
            <>
              <Stack
                direction="row"
                spacing={3}
                alignItems={"flex-end"}
                justifyContent={"flex-end"}
                p={1}
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
                  startIcon={<Icon name="Files" color="#336792" size={20} />}
                  // onClick={handleDuplicate}
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
              <Divider />
            </>
          )}

          <PaginationTable
            data={data?.questionList || []}
            columns={questionBankHeader}
            path={`/main/exam/detail/qbank`}
            error={getError}
            loading={getLoading || getFetching}
          />
        </div>
      </div>
    </>
  );
};

export default DetailMain;
