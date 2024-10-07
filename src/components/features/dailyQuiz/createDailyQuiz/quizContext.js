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
} from "@mui/material";
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../styles/muiRoot";
import { useSelector, useDispatch } from "react-redux";
import { dailyQuiz, pastPaperApi, questionApi } from "../../../../services/Constant";
import { useGetQuestionListQuery, useLazyGetQuestionListQuery } from "../../../../services/apis/exam/questionBank";
import { Check, SearchIcon } from "lucide-react";
import PracticeCardView from "../../learn/learnTopicsdetail/practiceCard";
import { setQuestionList } from "../../../../ducks/dailyQuizSlice";
import ModalComp from "../../../common/modal";
import { LoadingButton } from "@mui/lab";
import {  useNavigate, useParams } from "react-router-dom";
import { useUpdateDailyQuizMutation } from "../../../../services/apis/dailyQuizApi";
import { message, Badge, Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import DebouncedInput from "../../../common/searchApiField";

function QuizContext() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { dailyQuizDetail } = useSelector((state) => state.dailyQuiz);
  const [selectedSectionId, setSelectedSectionId] = useState(
    dailyQuizDetail?.sections[0]?.section._id
  );
   const scrollableDivRef = useRef(null);
  const [updateDailyQuiz, { isLoading: updateLoading }] =
    useUpdateDailyQuizMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
const [page, setPage] = useState(1);
 const [hasMore, setHasMore] = useState(true);

  const handleSelectAll = () => {
    const sectionIndex = findActiveSection;
    const newChecked = selectAllChecked[sectionIndex]
      ? []
      : data.map((item) => item);
    const updatedSection = {
      ...dailyQuizDetail.sections[sectionIndex],
      questions: newChecked,
    };
    const updatedList = [...dailyQuizDetail.sections];
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
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

 const [
   trigger,
   { data: questionList, isLoading, isFetching, isError: listError },
 ] = useLazyGetQuestionListQuery();


const fetchList = () => {
  const url =`${questionApi.endPoint}/subject/${selectedSectionId}`;

  const params = new URLSearchParams({
    page,
    size: "20",
    ...(searchQuery && { mock_tag: searchQuery }),
  });

  trigger(`${url}?${params.toString()}`);
};


 useEffect(() => {
   fetchList();
 }, [page, selectedSectionId, searchQuery]);


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
    const updatedQuestionsList = [...dailyQuizDetail.sections];
    console.log(
      "🚀 ~ findActiveSection ~ updatedQuestionsList:",
      updatedQuestionsList
    );

    const activeSectionIndex = updatedQuestionsList.findIndex(
      (item) => item.section._id === selectedSectionId
    );

    return activeSectionIndex;
  }, [selectedSectionId, dailyQuizDetail]);

  console.log(selectAllChecked, "2222");

  const handleToggle = (value) => () => {
    const sectionIndex = dailyQuizDetail.sections.findIndex(
      ({ section }) => section._id === selectedSectionId
    );

    if (sectionIndex !== -1) {
      const questions = [...dailyQuizDetail.sections[sectionIndex].questions];
      const questionIndex = questions.findIndex(
        (question) => question.qid === value.qid
      );

      if (questionIndex === -1) {
        // Question not found, add it
        const updatedQuestions = [...questions, value];
        const updatedSection = {
          ...dailyQuizDetail.sections[sectionIndex],
          questions: updatedQuestions,
        };

        const updatedList = [...dailyQuizDetail.sections];
        updatedList[sectionIndex] = updatedSection;
        dispatch(setQuestionList(updatedList));
      } else {
        // Question found, remove it
        const updatedQuestions = questions.filter(
          (question) => question.qid !== value.qid
        );
        const updatedSection = {
          ...dailyQuizDetail.sections[sectionIndex],
          questions: updatedQuestions,
        };

        const updatedList = [...dailyQuizDetail.sections];
        updatedList[sectionIndex] = updatedSection;
        dispatch(setQuestionList(updatedList));
      }
    }
  };

  const handleAllData = () => {
    let data = { ...dailyQuizDetail };
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
      .filter((section) => section !== null); // Filter out null sections

    data.sections = updatedData;

    return data;
  };

  const { handleOpen, handleClose, ModalComponent } = ModalComp();

  const handleNext = async () => {
    if (params.quizId) {
      try {
        // Call the addMockPackage mutation
        const response = await updateDailyQuiz({
          endpoint: `${dailyQuiz.endPoint}/${params.quizId}`,
          updatedData: await handleAllData(),
        });
        // Navigate to the desired path after successful deletion
        console.log("Response:", response);

        if (response && response?.data?.success) {
          // Navigate to the desired path after successful deletion

          message.success("Past-Paper Edit successfully!", 2.5);
          navigate(`/main/exam/dailyQuiz/${params.quizId}`);
        } else {
          message.error("Some error occured to Add Daily Quiz!", 2.5);
          console.error("Error add Daily Quiz. Response:", response);
        }
      } catch (error) {
        console.error("Error add Add Daily Quiz:", error);
      }
    } else {
      handleOpen();
    }
  };

  return (
    <div className="bg-white rounded-md mt-3 h-[80vh]  p-2 ">
      <div className="flex">
        {/* Left question list */}
        <section className="basis-[20%] question_list border-r-2 pr-2">
          <Box sx={{ "& > :not(style)": { my: 1 } }}>
            <div className="flex gap-1 items-start">
              <Box sx={{ width: "90%" }}>
                {/* <TextField
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
                /> */}

                <DebouncedInput
                  placeholder={"Enter mock Tag"}
                  onSearch={(term)=>{
                    setPage(1)
                    setSearchTerm(term)
                  }}
                  loading={isLoading || isFetching}
                  initialValue={searchTerm}
                  disabled={listError}
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
          {/* <div className="h-[65vh] overflow-scroll scrollbar-hide ">
            {isLoading || isFetching ? (
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
                {[...Array(40)].map(() => (
                  <Skeleton
                    sx={{ bgcolor: "grey.200" }}
                    variant="rounded"
                    width={"100%"}
                    height={48}
                  />
                ))}
              </Box>
            ) : (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {data?.map((value, ind) => {
                  const labelId = `checkbox-list-secondary-label-${value}`;
                  return (
                    <React.Fragment key={value}>
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <Checkbox
                            edge="end"
                            onChange={handleToggle(value)}
                            checked={dailyQuizDetail.sections[
                              findActiveSection
                            ].questions.some(
                              (question) => question.qid === value.qid
                            )}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        }
                      >
                        <ListItemButton sx={{ p: 0 }}>
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
                              <div className="p-1 gap-4 font-inter ">
                                {" "}
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
            )}
          </div> */}
          <div
            className="h-[65vh] overflow-scroll scrollbar-hide"
            id="scrollableDiv"
            ref={scrollableDivRef}
          >
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
                  <h4 className="font-inter text-center mx-auto">
                    <CircularProgress
                      color="inherit"
                      size={15}
                      className="mr-1"
                    />
                    Loading...
                  </h4>
                }
                scrollableTarget="scrollableDiv"
                endMessage={
                  <p
                    style={{ textAlign: "center" }}
                    className="text-sm font-inter flex justify-center items-center gap-1"
                  >
                    {data.length === 0 ? (
                      <Empty description="No Data Available" />
                    ) : (
                      <>
                        You have seen all <Check color="#2f931b" size={18} />
                      </>
                    )}
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
                              onChange={handleToggle(value)}
                              checked={dailyQuizDetail.sections[
                                findActiveSection
                              ].questions.some(
                                (question) => question.qid === value.qid
                              )}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          }
                        >
                          <ListItemButton sx={{ p: 0 }}>
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
            sx={{ overflowX: "scroll", p: 2, width: "max-content" }}
            direction={"row"}
            spacing={3}
          >
            {dailyQuizDetail?.sections?.map(({ questions, section }, ind) => (
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
                  }}
                >
                  {section.title}
                </CustomButton>
              </Badge>
            ))}
          </Stack>
          <Divider />

          <div className="h-[70vh] overflow-scroll scrollbar-hide flex flex-col gap-3 justify-start">
            {dailyQuizDetail.sections?.[findActiveSection]?.questions?.length >
              0 &&
              dailyQuizDetail.sections[findActiveSection]?.questions.map(
                (value, ind) => (
                  <>
                    <PracticeCardView data={value} key={ind} />
                  </>
                )
              )}
          </div>
        </section>
      </div>

      {dailyQuizDetail.sections.length - 1 === findActiveSection && (
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
          {params.quizId ? "Save Changes" : "Save & Continue"}
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
              onClick={() => navigate(`/main/exam/dailyQuiz/preview`)}
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
