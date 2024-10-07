import { Divider, Stack, Button, Skeleton, Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { List } from "@mui/material";
import { ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderWithNavigation } from "../../../common/header";
import { pastPaperApi } from "../../../../services/Constant";
import { useGetPastPaperQuery } from "../../../../services/apis/pastPapersApi";
import PaginationTable from "../../../common/PaginationTable";
import { Avatar, Descriptions } from "antd";
import Icon from "../../../common/Icon";
import { setPastPaperDetail } from "../../../../ducks/pastPaperSlice";
import { useDispatch } from "react-redux";
import { dateFormatting } from "../../../../services/common";
import { questionBankHeader } from "../../../../services/constHeaders";

const PastPaperDetail = () => {
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
  } = useGetPastPaperQuery(
    `${pastPaperApi.endPoint}/detail/${params.paperId}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (getDetails) {
      setData(getDetails.data.mockData);
    }
  }, [getDetails, isFetching, isLoading, isSuccess]);

  console.log("🚀 ~ PastPaperDetail ~ data:", data);

  const handleClick = (val) => {
    console.log("🚀 ~ handleClick ~ val:", val);
    setSelectSection(val);
    // setSelectedQus(val);
  };

  const handleEdit = () => {
    const sectionsSelect = data?.sections?.map((e) => e.section._id);
    dispatch(
      setPastPaperDetail({
        ...data,
        sectionsSelect,
        entityType: data?.entityType._id,
        entity: data.entity?._id,
      })
    );
    navigate(`/main/exam/pastPapers/edit/${params.paperId}`);
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
      label: "Start Date",
      children: dateFormatting(data?.startDate).date,
    },

    {
      key: "9",
      label: "Price",
      children: data?.price,
    },
    {
      key: "10",
      label: "Marking Type",
      children: data?.markingType,
    },
    {
      key: "11",
      label: "Topper Rewards",
      children: (
        <ul>
          <li>
            <span className="w-[500px]">First :</span>{" "}
            {data?.toppersReward?.first}
          </li>
          <li>
            <span className="w-[500px]">Second :</span>
            {data?.toppersReward?.second}
          </li>
          <li>Third:{data?.toppersReward?.third}</li>
        </ul>
      ),
    },
    {
      key: "14",
      label: "Others Info",
      children: (
        <ul>
          <li>
            <span className="w-[500px]">First :</span>{" "}
            {data?.toppersReward?.first}
          </li>
          <li>
            <span className="w-[500px]">Second :</span>
            {data?.toppersReward?.second}
          </li>
          <li>Third:{data?.toppersReward?.third}</li>
        </ul>
      ),
    },
    {
      key: "15",
      label: " Reward Grant Chart",
      span: 3,
      children: (
        <ol className="list-decimal gap-2">
          {data.rewardGrantChart?.map((e, ind) => (
            <>
              <li>
                <div className="flex">
                  <span className="text-sm  basis-2/6">
                    Floor Value : {e.floorValue}
                  </span>
                  <span className="text-sm   ml-3">|</span>{" "}
                  <span className="text-sm   ml-3">
                    Multiplier : {e.multiplier}
                  </span>
                </div>
              </li>
            </>
          ))}
        </ol>
      ),
    },
  ];
  console.log("🚀 ~ PastPaperDetail ~ selectSection:", selectSection);

  return (
    <>
      <HeaderWithNavigation cont="Past-Paper Detail" />

      <div className="flex gap-2 h-[90vh]">
        <div className="basis-[25%] bg-white rounded-md overflow-scroll p-2 text-black">
          {isLoading || isFetching ? (
            <div className="h-full w-full">
              <Skeleton variant="rounded" width={"100%"} height={"100%"} />
            </div>
          ) : (
            <>
              <header className="p-2  sticky top-0 bg-white">
                <h5 className="font-inder font-semibold text-md mb-2">
                  Sections
                </h5>
              </header>
              <Divider />
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton
                  onClick={() => handleClick({ title: "basicDetail" })}
                  selected={selectSection?.title === "basicDetail"}
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
                    <ListItemButton
                      selected={selectSection === val}
                      onClick={() => handleClick(val)}
                    >
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
            </>
          )}
        </div>
        <div className="basis-[75%] info bg-white rounded-md overflow-scroll scrollbar-hide p-2">
          {isLoading || isFetching ? (
            <div className="h-full w-full pt-1">
              <Skeleton variant="rounded" width={"100%"} height={"100%"} />
            </div>
          ) : (
            <>
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
                    startIcon={
                      <Icon name="FileEdit" color="#336792" size={20} />
                    }
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
            </>
          )}
        </div>
        {/* Preview */}
      </div>
    </>
  );
};

export default PastPaperDetail;
