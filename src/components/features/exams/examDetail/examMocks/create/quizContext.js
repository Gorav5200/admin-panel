import {
  Box,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  Skeleton,
  Stack,
  InputAdornment,
  TextField,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Collapse,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../../../styles/muiRoot";
import { useSelector, useDispatch } from "react-redux";
import {
  mocksApi,
  questionApi,
  topicApi,
} from "../../../../../../services/Constant";
import { useLazyGetQuestionListQuery } from "../../../../../../services/apis/exam/questionBank";
import {
  Check,
  DeleteIcon,
  FilterX,
  PackageX,
  SearchIcon,
  XIcon,
} from "lucide-react";
import PracticeCardView from "../../../../learn/learnTopicsdetail/practiceCard";
import { setQuestionList } from "../../../../../../ducks/mockSlice";
import ModalComp from "../../../../../common/modal";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { message, Badge, Empty } from "antd";
import { useUpdateMockMutation } from "../../../../../../services/apis/exam/mock";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { MultipleSelect } from "../../../../../common/selectFields";
import { useGetTopicListQuery } from "../../../../../../services/apis/dataManagement/topic";
import {
  GetTopicByEntity,
  GetTopicOrSubtopicByEntity,
  GetTopicOrSubtopicBySubject,
} from "../../../../../../services/selectFieldCommon";
import { capitalizeFirstLetter } from "../../../../../../services/common";

function QuizContext() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("🚀 ~ QuizContext ~ location:", location);
  const params = useParams();
  const scrollableDivRef = useRef(null);

  const { mockDetail } = useSelector((state) => state.mock);
  const [selectedSectionId, setSelectedSectionId] = useState(
    mockDetail?.sections[0]?.section._id
  );
  const [updateMock, { isLoading: updateLoading, isError }] =
    useUpdateMockMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchType, setSearchType] = useState(null);
  const [entityTypeData, setEntityTypeData] = useState([]);

  const handleSelectAll = () => {
    const sectionIndex = findActiveSection;
    const newChecked = selectAllChecked[sectionIndex]
      ? []
      : data.map((item) => item);
    const updatedSection = {
      ...mockDetail.sections[sectionIndex],
      questions: newChecked,
    };
    const updatedList = [...mockDetail.sections];
    updatedList[sectionIndex] = updatedSection;
    dispatch(setQuestionList(updatedList));

    setSelectAllChecked((prevState) => ({
      ...prevState,
      [sectionIndex]: !prevState[sectionIndex],
    }));
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchQuery(searchTerm);
      if (searchTerm) {
        setPage(1);
        setData([]);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const [
    trigger,
    { data: questionList, isLoading, isFetching, isError: listError },
  ] = useLazyGetQuestionListQuery();

  useEffect(() => {
    if (questionList?.data) {
      setData((prevData) => {
        const newData =
          page === 1
            ? questionList.data.question_banks
            : [...prevData, ...questionList.data.question_banks];
        setHasMore(newData.length < questionList.data.count);
        return newData;
      });
    }
  }, [questionList]);

  const findActiveSection = useMemo(() => {
    const updatedQuestionsList = [...mockDetail.sections];
    const activeSectionIndex = updatedQuestionsList.findIndex(
      (item) => item.section._id === selectedSectionId
    );
    return activeSectionIndex;
  }, [selectedSectionId, mockDetail]);

  const handleToggle = (value) => () => {
    const sectionIndex = mockDetail.sections.findIndex(
      ({ section }) => section._id === selectedSectionId
    );

    if (sectionIndex !== -1) {
      const questions = [...mockDetail.sections[sectionIndex].questions];
      const questionIndex = questions.findIndex(
        (question) => question.qid === value.qid
      );

      if (questionIndex === -1) {
        const updatedQuestions = [...questions, value];
        const updatedSection = {
          ...mockDetail.sections[sectionIndex],
          questions: updatedQuestions,
        };

        const updatedList = [...mockDetail.sections];
        updatedList[sectionIndex] = updatedSection;
        dispatch(setQuestionList(updatedList));
      } else {
        const updatedQuestions = questions.filter(
          (question) => question.qid !== value.qid
        );
        const updatedSection = {
          ...mockDetail.sections[sectionIndex],
          questions: updatedQuestions,
        };

        const updatedList = [...mockDetail.sections];
        updatedList[sectionIndex] = updatedSection;
        dispatch(setQuestionList(updatedList));
      }
    }
  };

  const handleAllData = () => {
    alert("handledata");
    let data = { ...mockDetail };
    console.log("data::", data);
    const updatedData = data.sections
      .map((item) => {
        if (data.commonTimer == null) {
          return {
            section: item.section,
            positiveMarks: item.positiveMarks,
            negativeMarks: item.negativeMarks,
            timer: item.timer,
            questions: item.questions.map((q) => q._id),
          };
        } else {
          return {
            section: item.section,
            positiveMarks: item.positiveMarks,
            negativeMarks: item.negativeMarks,
            questions: item.questions.map((q) => q._id),
          };
        }
      })
      .filter((section) => section !== null);

    data.sections = updatedData;

    return data;
  };

  const { handleOpen, handleClose, ModalComponent } = ModalComp();

  const handleNext = async () => {
    if (params.mockId) {
      try {
        const response = await updateMock({
          endpoint: `${mocksApi.endPoint}/${params.mockId}`,
          updatedData: await handleAllData(),
        });
        if (response && response?.data?.success) {
          message.success("Mock Edit successfully!", 2.5);
          navigate(`/main/exam/${params.examId}/mocks/${params.mockId}`);
        } else {
          message.error("Some error occurred while adding Mock!", 2.5);
        }
      } catch (error) {
        console.error("Error adding Mock:", error);
      }
    } else {
      handleOpen();
    }
  };

  useEffect(() => {
    fetchList();
  }, [selectedSectionId, searchQuery, page, searchType]);

  useEffect(() => {
    setData([]);
    setPage(1);
    scrollableDivRef.current.scrollTop = 0;
  }, [searchType]);

  const handleTypes = (e) => {
    setSearchType(e.target.value);
    setEntityTypeData([]);
  };

  const fetchList = () => {
    const params = new URLSearchParams({
      type: searchType,
      page,
      size: 20,
      ...(searchQuery && { mock_tag: searchQuery }), // Conditionally add mock_tag if searchQuery exists
    });
    if (searchType === null) {
      params.delete("type");
    } else if (searchType === "topic" && entityTypeData?.length) {
      params.set("topics", entityTypeData.map((e) => e).join(","))?.sort();
    } else if (searchType === "subtopic" && entityTypeData?.length) {
      params.set("subTopics", entityTypeData.map((e) => e).join(","))?.sort();
    }
    navigate(`${location.pathname}?${params}`);

    const url = `${questionApi.endPoint}/subject/${selectedSectionId}?${params}`;
    if (searchType === "topic" && entityTypeData.length === 0) {
      return;
    } else if (searchType === "subtopic" && entityTypeData.length === 0) {
      return;
    }
    trigger(url);
  };

  console.log("questions", mockDetail.sections[findActiveSection]?.question);
  return (
    <div className="bg-white rounded-md mt-3 h-[80vh]  p-2 ">
      <div className="flex">
        {/* Left question list */}
        <section
          className="basis-[20%] question_list border-r-2 pr-2 overflow-scroll h-[78vh] relative"
          id="scrollableDiv"
          ref={scrollableDivRef}
        >
          <div className="sticky top-0 z-50 bg-white">
            <Box sx={{ "& > :not(style)": { my: 1 } }}>
              <div className="flex gap-1 items-start">
                <Box sx={{ width: "100%" }}>
                  <FormControl sx={{ width: "100%" }}>
                    <FormLabel
                      id="searchType"
                      className="flex justify-between items-top"
                    >
                      <p className="font-inter">
                        Search By : <FilterAltIcon />
                      </p>

                      {searchType !== null && (
                        <button
                          className="text-[#336792] text-sm font-inter font-[600] underline underline-offset-4 flex gap-1 items-center ml-auto"
                          onClick={() => setSearchType(null)}
                        >
                          <FilterX size={15} />
                          Clear
                        </button>
                      )}
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="searchType"
                      aria-checked
                      defaultValue={"subject"}
                      name="searchType"
                      row
                      value={searchType}
                      onChange={handleTypes}
                    >
                      <FormControlLabel
                        value="topic"
                        control={<Radio />}
                        label={<p className="font-inter  text-sm">Topic</p>}
                      />
                      <FormControlLabel
                        value="subtopic"
                        control={<Radio />}
                        label={<p className="font-inter  text-sm">Subtopic</p>}
                      />
                    </RadioGroup>
                  </FormControl>

                  <Collapse in={searchType !== null}>
                    <label id="entityTypeData" className="text-sm font-inter">
                      {`Select ${capitalizeFirstLetter(searchType)}`}
                    </label>

                    <GetTopicOrSubtopicBySubject
                      size="small"
                      sx={{ maxWidth: "17vw", mt: "-10px" }}
                      onChange={(e) =>setEntityTypeData(e.target.value)}
                      subject={selectedSectionId}
                      multiple
                      value={entityTypeData}
                      getType={  searchType === "topic"
                          ? "topicList"
                          :searchType === "subtopic"? "subTopicList":null}
                      onClose={() => {
                        setPage(1);
                        setData([]);
                        if (
                          searchType === "topic" &&
                          entityTypeData.length === 0

                        ) {
                          return;
                        }
                        if (
                          searchType === "subtopic" &&
                          entityTypeData.length === 0
                        ) {
                          return;
                        } else {
                          fetchList();
                        }
                      }}
                    />
                  </Collapse>

                  <TextField
                    id="input-with-icon-textfield"
                    fullWidth
                    size="small"
                    placeholder={"Enter mock Tag"}
                    autoComplete="off"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </Box>
              </div>
            </Box>
            <div className="bg-medGrey   flex justify-between  items-center pl-3">
              <h5 className="text-primary text-base font-bold font-inder ">
                Questions
              </h5>

              <FormControlLabel
                sx={{ position: "relative", right: "-11px" }}
                control={
                  <Checkbox
                    disabled={!data?.length || isLoading || isFetching}
                    checked={selectAllChecked[findActiveSection]}
                    onChange={handleSelectAll}
                  />
                }
              />
            </div>
          </div>
          <div className="h-auto ">
            {(isLoading || isFetching) && page === 1 ? (
              <Box
                sx={{
                  bgcolor: "white",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 2,
                  mt: 2,
                }}
              >
                {[...Array(40)].map((_, index) => (
                  <Skeleton
                    key={index}
                    sx={{ bgcolor: "grey.200" }}
                    variant="rounded"
                    width={"100%"}
                    height={48}
                  />
                ))}
              </Box>
            ) : (
              <InfiniteScroll
                dataLength={data.length}
                next={() => setPage((prevPage) => prevPage + 1)}
                hasMore={hasMore}
                loader={
                  searchType !== null && entityTypeData.length === 0 ? (
                    <>
                      <Empty
                        description={`Select ${capitalizeFirstLetter(
                          searchType
                        )}`}
                      />
                    </>
                  ) : (
                    <h4 className="font-inter text-center mx-auto">
                      <CircularProgress
                        color="inherit"
                        size={15}
                        className="mr-1"
                      />
                      Loading...
                    </h4>
                  )
                }
                scrollableTarget="scrollableDiv"
                endMessage={
                  <p
                    style={{ textAlign: "center" }}
                    className="text-sm font-inter flex justify-center items-center gap-1"
                  >
                    You have seen all <Check color="#2f931b" size={18} />
                  </p>
                }
                className="!overflow-hidden"
              >
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {data?.map((value, ind) => {
                    const labelId = `checkbox-list-secondary-label-${value.qid}`;
                    return (
                      <React.Fragment key={value.qid}>
                        <ListItem
                          disablePadding
                          secondaryAction={
                            <Checkbox
                              edge="end"
                              // onChange={handleToggle(value)}
                              checked={mockDetail.sections[
                                findActiveSection
                              ].questions.some(
                                (question) => question.qid === value.qid
                              )}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          }
                        >
                          <ListItemButton
                            sx={{ p: 0 }}
                            onClick={handleToggle(value)}
                          >
                            <ListItemAvatar sx={{ minWidth: 32 }}>
                              {ind + 1}.
                            </ListItemAvatar>
                            <ListItemText
                              id={labelId}
                              primary={
                                <p className="font-inter text-sm p-1">
                                  {value.qid}
                                </p>
                              }
                              secondary={
                                <div className="p-1 gap-4 font-inter">
                                  <Chip
                                    size="small"
                                    label={`${value.mock_tag}`}
                                    sx={{ borderRadius: 1, fontWeight: "700" }}
                                  />
                                </div>
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    );
                  })}
                </List>
              </InfiniteScroll>
            )}
          </div>
        </section>
        {/* Right detail view*/}
        <section className="basis-[80%] p-2  ">
          <Stack
            sx={{ overflowX: "scroll", pb: 2, width: "max-content" }}
            direction={"row"}
            spacing={3}
          >
            {mockDetail?.sections?.map(({ questions, section }, ind) => (
              <Badge
                size="large"
                style={{
                  border: "2px solid white",
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                placement={"bottom"}
                center
                offset={[-10, 25]}
                count={questions?.length}
                color={selectedSectionId === section._id ? "green" : "black"}
              >
                <CustomButton
                  key={section}
                  sx={{
                    ...CustomButtonStyle,
                    background:
                      selectedSectionId === section._id
                        ? "var(--primary)"
                        : "transparent",
                    color:
                      selectedSectionId === section._id ? "white" : "black",
                    borderRadius: 10,
                    width: "fit-content",
                    minWidth: 120,
                    height: 40,
                    p: 2,
                    "&:hover": {
                      boxShadow: "none",
                      background:
                        selectedSectionId === section._id
                          ? "var(--primary)"
                          : "transparent",
                    },
                  }}
                  variant="outlined"
                  label={section.title}
                  onClick={() => {
                    setPage(1);
                    setSelectedSectionId(section._id);
                    scrollableDivRef.current.scrollTop = 0;
                    if (entityTypeData?.length) setEntityTypeData([]);
                  }}
                >
                  {section.title}
                </CustomButton>
              </Badge>
            ))}
          </Stack>
          <Divider />

          <div className="h-[70vh] overflow-scroll scrollbar-hide flex flex-col gap-3 justify-start my-2">
            {mockDetail.sections?.[findActiveSection]?.questions?.length > 0 &&
              mockDetail.sections[findActiveSection]?.questions.map(
                (value, ind) => (
                  <>
                    <PracticeCardView data={value} key={ind} />
                  </>
                )
              )}
          </div>
        </section>
      </div>

      {mockDetail.sections.length - 1 === findActiveSection && (
        <CustomButton
          size="small"
          onClick={handleNext}
          sx={{
            ...CustomButtonStyle,
            width: "150px",
            position: "relative",
            bottom: 35,
            height: "40px",
            borderRadius: 2,
            float: "right",
            my: 2,
            "&:hover": {
              backgroundColor: "black",
            },
          }}
        >
          {params.mockId ? "Save Changes" : "Save & Continue"}
        </CustomButton>
      )}
      {/* Confirmation modal start */}
      <ModalComponent>
        <div className="w-[627px] p-1 flex flex-col gap-2">
          <header className="flex justify-between items-center">
            <h4 className="text-xl font-inter font-semibold">
              Confirm Import Question
            </h4>
          </header>
          <p className="text-gray-600 text-base">
            Do you to want to import the question.
          </p>
          <Stack direction="row" justifyContent="flex-end" spacing={2} my={2}>
            <CustomButton
              style={{
                ...ButtonStyle,
                width: 117,
                height: 39,
                borderRadius: 6,
              }}
              onClick={handleClose}
            >
              Discard
            </CustomButton>
            <LoadingButton
              sx={{
                ...CustomButtonStyle,
                width: 117,
                height: 39,
                borderRadius: 2,
              }}
              onClick={() =>
                navigate(`/main/exam/${params.examId}/mocks/preview`)
              }
              loadingIndicator={
                <CircularProgress style={{ color: "white" }} size={24} /> // Change the color here
              }
            >
              Confirm
            </LoadingButton>
          </Stack>
        </div>
      </ModalComponent>
      {/* Confirmation modal end */}
    </div>
  );
}

export default QuizContext;
