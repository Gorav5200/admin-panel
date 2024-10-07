import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Collapse,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Descriptions, Empty, Statistic } from "antd";
import { CustomButton, CustomButtonStyle } from "../../../../styles/muiRoot";
import SingleImageUpload from "../../../common/singleImageUpload";
import { createLearn } from "../../../../ducks/learnSlice";
import { assignmentApi, subjectApi } from "../../../../services/Constant";
import { useGetSubjectListQuery } from "../../../../services/apis/dataManagement/subject";
import { HeaderWithNavigation } from "../../../common/header";
import { SmileOutlined } from "@ant-design/icons";
import {
  useCreateAssignmentPackageMutation,
  useGetAssignmentsQuery,
  useUpdateAssignmentMutation,
} from "../../../../services/apis/assignmentApi";
import { createAssignment } from "../../../../ducks/assignmentSlice";
import Icon from "../../../common/Icon";
import PaginationTable from "../../../common/PaginationTable";
import { BorderLessAccordion } from "../../../common/accordian";
import { Dot, DotIcon, IndianRupee, LineChart } from "lucide-react";
import moment from "moment";
import { questionBankHeader } from "../../../../services/constHeaders";
import CountUp from "react-countup";

const DetailMain = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.assignment);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({});
  const formatter = (value, duration) => (
    <CountUp end={value} separator="," duration={duration} />
  );
  const {
    data: getDetails,
    isLoading: getLoading,
    isError: getError,
    isFetching: getFetching,
  } = useGetAssignmentsQuery(
    `${assignmentApi.endPoint}/basic/detail/${params.assignmentId}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (getDetails?.data.assignmentDetail) {
      setData(getDetails.data.assignmentDetail);
    }
  }, [getDetails]);

  const handleEdit = () => {
    const { topic, subject, entity, entityType, ...others } = data;
    const manuplateData = {
      topic: topic[0]._id,
      subject: subject?._id,
      entity: entity?._id,
      entityType: entityType?._id,
      ...others,
    };
    dispatch(createAssignment(manuplateData));
    navigate(`/main/exam/assignment/edit/${params.assignmentId}`);
  };

  console.log("🚀 ~ DetailMain ~ getDetails:", data);

  return (
    <>
      <HeaderWithNavigation cont="Assignment Detail" />

      <div className=" rounded-md  mt-3 w-full flex gap-2 p-2 ">
        {/* left div */}
        {getLoading || getFetching ? (
          <Stack
            gap="0"
            spacing="0"
            direction={"column"}
            sx={{
              flexBasis: "25%",
              bgcolor: "white",
              p: 2,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div className="h-full w-full">
              <Skeleton variant="rounded" width={"100%"} height={"100%"} />
            </div>
          </Stack>
        ) : (
          <div className=" bg-white rounded-md basis-3/12 p-2 h-[90vh] overflow-scroll">
            <Card sx={{ p: 1, my: 1.5 }}>
              <section className="flex justify-between items-end w-full">
                <h6 className="text-darkblue font-medium font-inter text-base">
                  {data?.title}
                </h6>
                <div className="flex items-end   ">
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
                  <h6 className="font-medium font-inter text-sm">
                    Coins:{data.coin}
                  </h6>
                </div>
              </section>
            </Card>

            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              my={1}
              alignItems={"center"}
            >
              <h6 className=" text-base font-bold  text-[#383838] flex gap-1">
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
              <div className="flex items-center "></div>
              <Chip
                icon={
                  data.paid?.status && <IndianRupee color="white" size={18} />
                }
                label={
                  <h6 className="font-medium font-inter text-sm">
                    {data.paid?.status === true
                      ? formatter(data?.paid.charge, 1)
                      : "Free"}
                  </h6>
                }
                sx={{
                  bgcolor:
                    data.paid?.status === false ? "green" : "rgb(51, 103, 146)",
                  color: "white",
                  borderRadius: 2,
                  minWidth: "80px",
                  overflow: "hidden",
                }}
              />
            </Stack>
            <Divider />
            <Stack
              direction={"row"}
              justifyContent={"space-around"}
              my={1}
              alignItems={"center"}
            >
              <div className="text-center flex gap-1">
                <text className=" text-sm  font-medium  text-[#383838] flex gap-1">
                  Positive Marks:
                </text>
                <div className=" text-sm  font-light  text-[#383838] ">
                  {data?.positiveMarks}
                </div>
              </div>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ height: 22, color: "black" }}
              />
              <div className="text-center flex gap-1">
                <text className=" text-sm  font-medium  text-[#383838] flex gap-1">
                  Negative Marks:
                </text>
                <div className=" text-sm  font-light  text-[#383838] ">
                  {data?.negativeMarks}
                </div>
              </div>
            </Stack>

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
                    <div className="flex gap-1 items-center p-2">
                      <LineChart size={15} />
                      Reward Grant Chart
                    </div>
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
                    {data.rewardGrantChart.length !== ind && <Divider />}
                  </>
                ))}
              </List>
            </div>
          </div>
        )}
        {/* Right div */}
        <div className="bg-white rounded-md basis-9/12 p-2 h-[90vh] overflow-scroll">
          {getLoading || getFetching ? (
            <div className="h-full w-full p-2">
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
                sx={{
                  position: "sticky",
                  top: 0,
                  borderBottom: "1px solid #e6e6e6",
                }}
              >
                <Button
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                    fontWeight: edit && 800,
                    textDecoration: edit && "underline",
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

              <PaginationTable
                data={data?.questionList || []}
                columns={questionBankHeader && questionBankHeader?.slice(0, -1)}
                error={getError}
                loading={getLoading || getFetching}
                path={`/main/exam/${params.examId}/qbank`}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailMain;
