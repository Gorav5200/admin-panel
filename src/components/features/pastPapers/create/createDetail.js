import React, { useEffect, useMemo, useState } from "react";
import {
  FormControl,
  Checkbox,
  ListItem,
  Fade,
  Select,
  MenuItem,
  Collapse,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { IndianRupee } from "lucide-react";
import {
  InputLabel,
  Stack,
  TextField,
  Box,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import BootstrapTextField from "../../../common/bootstrapTextField";
import { MultipleSelect } from "../../../common/selectFields";
import List from "@mui/material/List";
import { CustomButton, CustomButtonStyle } from "../../../../styles/muiRoot";
import { PartialMarks, createHandleChange } from "../../../../services/common";
import DatePickerComp from "../../../common/datePicker";
import IconlessRadio from "../../../common/radioGroup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { instructionsApi, subjectApi } from "../../../../services/Constant";
import { termsApi } from "../../../../services/Constant";
import { percentileApi } from "../../../../services/Constant";
import { useGetInstructionsListQuery } from "../../../../services/apis/dataManagement/instructions";
import { useGetTermsListQuery } from "../../../../services/apis/dataManagement/terms";
import { useGetPercentileListQuery } from "../../../../services/apis/dataManagement/percentile";
import { useGetSubjectListQuery } from "../../../../services/apis/dataManagement/subject";
import { useSelector } from "react-redux";
import { setPastPaperDetail } from "../../../../ducks/pastPaperSlice";
import { Empty } from "antd";
import { RewardChart } from "../../../../services/common";

const CreateDetail = ({ handleStep }) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const { pastPaperDetail } = useSelector((state) => state.pastPapers);
  const { entity: entityList } = useSelector((state) => state.entity);

  const dispatch = useDispatch();
  const params = useParams();
  const [values, setValues] = useState(pastPaperDetail);
  const [entityInd, setEntityInd] = useState(null);
  const handleChange = createHandleChange(values, setValues);

  useEffect(() => {
    if (params.examId) {
      setValues({ ...values, entityType: params.examId });
    }
  }, [params]);

  useEffect(() => {
    if (pastPaperDetail) {
      setValues(pastPaperDetail);
    }
  }, []);

  const {
    data: instructionList,
    isLoading,
    isError,
  } = useGetInstructionsListQuery(instructionsApi.endPoint, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const { data: termsList, isLoading: termsLoad } = useGetTermsListQuery(
    termsApi.endPoint,
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const { data: percentileList, isLoading: percentileLoad } =
    useGetPercentileListQuery(percentileApi.endPoint, {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });

  const {
    data: sectionData,
    isloading: sectionLoad,
    isError: sectionErr,
    isSuccess: sectionSuccess,
  } = useGetSubjectListQuery(
    `${subjectApi.endPoint}/entity/${values?.entityType}`,
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  console.log("🚀 ~ CreateDetail ~ sectionData:", sectionData);
  const validationSchema = () => {
    let err = {};
    if (!values) {
      // Handle the case where values is undefined or null
      return err;
    }
    if (!values.title) {
      err.subject = "Please enter the test name";
    } else if (values.sections.length === 0) {
      err.sections = "At least one section must be selected.";
    } else if (values.price !== "" && isNaN(values.price)) {
      err.price = "Price must be a number.";
    } else if (values.price < 0) {
      err.price = "Price must be a positive number.";
    } else if (values.isAllowed === true) {
      err.isAllowed = "Please select the modules allowed";
    }
    //else if (!values.sections[0].timer || isNaN(values.sections[0].timer) || values.sections[0].timer === 0) {
    //   err.commonTimer = "Timer must be a non-zero number.";
    // }
    else if (
      isNaN(values.sections[0]?.positiveMarks) ||
      !/^[+-]?\d+(\.\d+)?$/.test(values.sections[0].positiveMarks)
    ) {
      err.positiveMarks =
        "Positive marks must be a valid number (positive or negative).";
    } else if (
      isNaN(values.sections[0].negativeMarks) ||
      !/^[+-]?\d+(\.\d+)?$/.test(values.sections[0].negativeMarks)
    ) {
      err.negativeMarks =
        "Negative marks must be a valid number (positive or negative).";
    } else if (!values.startDate) {
      err.startDate = "Test date is required.";
    } else {
      const currentDate = Date();
      const selectedDate = new Date(values.startDate);
      if (selectedDate < currentDate) {
        err.startDate = "Test date must be in the future or today.";
      }
    }

    return err;
  };

  const getListData = (val) => {
    const allData = sectionData?.data;
    const pastPaperSections = pastPaperDetail?.sections;
    if (!val || val.length === 0) {
      console.log("No sections selected, executing else condition...");
      setValues({ ...values, sections: [] });
      return;
    }

    const res = val?.map((id) => {
      if (pastPaperSections?.some((e) => e.section._id === id)) {
        const data = pastPaperSections?.find((e) => e.section._id === id);

        return data;
      } else {
        const data = allData.find((e) => e._id === id);

        return {
          section: { title: data.title, _id: data._id },
          positiveMarks: "",
          negativeMarks: "",
          questions: [],
          partialMarks: [],
        };
      }
    });

    // const filteredRes = val.map((id) => {
    //   return res.find((item) => item && item.section._id === id);
    // });
    console.log("🚀 ~ getListData ~ res:", res);

    setValues({ ...values, sections: res });
  };

  // const handleSectionsValue = (index, value, name) => {
  //   const updatedSectionsData = [...values.sections];
  //   updatedSectionsData[index][name] = Number(value);
  //   setValues({ ...values, sections: updatedSectionsData });
  // };

  // const handleOverallSection = (value, name) => {
  //   const updatedSectionsData = values.sections.map((obj) => ({
  //     ...obj,
  //     [name]: Number(value),
  //   }));
  //   console.log(115, updatedSectionsData);
  //   setValues({ ...values, sections: updatedSectionsData });
  // };

  const handleOverallSection = (value, name, index) => {
    const updatedSectionsData = values.sections.map((obj, idx) => {
      // if (name === "partialMarks") {
      //   return {
      //     ...obj,
      //     partialMarks: value, // Directly set the new partialMarks array
      //   };
      // }
      return {
        ...obj,
        [name]: name === "partialMarks" ? value : Number(value),
      };
    });

    setValues({ ...values, sections: updatedSectionsData });
  };

  const handleSectionsValue = (index, value, name) => {
    const updatedSectionsData = [...values.sections];
    updatedSectionsData[index] = {
      ...updatedSectionsData[index],
      [name]: name === "partialMarks" ? value : Number(value),
    };
    setValues({ ...values, sections: updatedSectionsData });
  };

  const handleSave = (e) => {
    const validationErrors = validationSchema();

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, you can proceed with form submission or other actions
      dispatch(setPastPaperDetail(values));
      handleStep(1);
    } else {
      // Form has errors, display them to the user
      Object.values(validationErrors).forEach((error) => {
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      });
    }
  };
  useMemo(() => {
    const selectedIndex = entityList?.findIndex(
      (entity) => entity._id === values.entity
    );
    setEntityInd(selectedIndex);
  }, [values.entity]);

  console.log("🚀 ~ CreateDetail ~ values:", values);
  console.log(
    "🚀 ~ CreateDetail ~ dddvalues:",
    values?.sections?.map((e) => e.section._id)
  );

  return (
    <div className="p-2 bg-white rounded-md mt-3">
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            width: "100%",
            mt: 3,
            pr: 2,
            p: 1,
          },
          height: "70vh",
          overflow: "scroll",
          mb: 3,
        }}
        noValidate
        autoComplete="off"
      >
        {/* test Name, select section */}
        <div className="flex justify-between gap-5">
          <BootstrapTextField
            label="Test name"
            placeholder="Enter here..."
            error={false}
            size="small"
            onChange={handleChange}
            name="title"
            value={values.title}
          />
          {/* Entity */}
          <div className="entity basis-2/6">
            <InputLabel
              shrink
              htmlFor="entity"
              sx={{
                fontSize: 20,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                color: "#455564",
              }}
            >
              Select Entity
            </InputLabel>

            <FormControl sx={{ width: "100%" }}>
              <Select
                labelId="demo-simple-select-label"
                size="small"
                id="demo-simple-select"
                placeholder="Select Entity"
                name="entity"
                value={values.entity}
                // error={errors.teacher ? true : false}
                // helperText={errors.teacher}
                onChange={handleChange}
              >
                {!entityList ? (
                  <MenuItem value="" disabled>
                    Error loading Entity
                  </MenuItem>
                ) : entityList?.length === 0 ? (
                  <MenuItem value="" disabled>
                    <Empty className="mx-auto" />
                  </MenuItem>
                ) : Array.isArray(entityList) ? (
                  entityList?.map((e, ind) => (
                    <MenuItem key={e._id} value={e._id}>
                      {e.title}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    No Entity available
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </div>
        </div>
        {/* entity type or subjects */}
        <Collapse in={values.entity !== undefined ? true : false}>
          <div className="flex justify-between gap-5">
            <div className="entityType w-full">
              <InputLabel
                shrink
                htmlFor="entityType"
                sx={{
                  fontSize: 20,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  color: "#455564",
                }}
              >
                Select Entity Type
              </InputLabel>

              {/* Subject or topic field */}

              <FormControl sx={{ width: "100%" }}>
                <Select
                  labelId="demo-simple-select-label"
                  size="small"
                  id="demo-simple-select"
                  placeholder="Select entityType"
                  name="entityType"
                  value={values.entityType}
                  // error={errors.teacher ? true : false}
                  // helperText={errors.teacher}
                  onChange={handleChange}
                >
                  {!entityList ? (
                    <MenuItem value="" disabled>
                      Error loading entity
                    </MenuItem>
                  ) : entityList.length === 0 ? (
                    <MenuItem value="" disabled>
                      <Empty className="mx-auto" />
                    </MenuItem>
                  ) : Array.isArray(entityList) ? (
                    entityList?.[entityInd]?.entityType
                      .filter((item) => !item.hasOwnProperty("accordian"))
                      ?.map((e) => (
                        <MenuItem key={e._id} value={e._id}>
                          {e.title}
                        </MenuItem>
                      ))
                  ) : (
                    <MenuItem value="" disabled>
                      No Subject available
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            {/* Sections or subject */}
            <div className="select_subject w-full">
              <InputLabel
                shrink
                htmlFor="sectionsSelect"
                sx={{
                  fontSize: 20,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  color: "#455564",
                }}
              >
                Select Section
              </InputLabel>

              {/* Subject or topic field */}

              <MultipleSelect
                size="small"
                disabled={!values.entityType}
                data={sectionData?.data || []}
                loading={sectionLoad}
                error={sectionErr}
                isSuccess={sectionSuccess}
                style={{ width: "50em", ml: 0 }}
                placeholder="Select section"
                value={values?.sections?.map((e) => e.section._id)}
                setValue={(val) => getListData(val)}
              />
            </div>
          </div>
        </Collapse>
        {/* Allow sectional toggle */}
        <label htmlFor="isToggleAllowed" className="text-sm">
          <Checkbox
            checked={values.isToggleAllowed}
            name="isToggleAllowed"
            id="isToggleAllowed"
            onChange={handleChange}
            sx={{
              color: "var(--primary)",
              ml: -1,
              "&.Mui-checked": {
                color: "var(--primary)",
              },
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
          Allow Sectional toggle
        </label>
        {/* <label htmlFor="isRewardGrantAward" className="text-sm">
          <Checkbox
            checked={values.isRewardGrantAward}
            name="isRewardGrantAward"
            id="isRewardGrantAward"
            onChange={handleChange}
            sx={{
              color: "var(--primary)",
              ml: -1,
              "&.Mui-checked": {
                color: "var(--primary)",
              },
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
          Reward Grant Chart
        </label> */}
        <Collapse in={values.isToggleAllowed}>
          {values.isToggleAllowed ? (
            <BootstrapTextField
              label="Common Timer"
              placeholder="Time in Sec"
              size="small"
              type="number"
              name="timer"
              value={values?.commonTimer}
              onChange={(e) =>
                setValues({ ...values, commonTimer: e.target.value })
              }
              sx={{ my: 2 }}
            />
          ) : (
            values?.sectionsSelect?.length > 0 && (
              <Fade in={!values.isAllowed}>
                <List disablePadding disableGutter>
                  <ListItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      px: 0,
                    }}
                  >
                    <h6 className="pt-2   text-sm font-inter font-medium underline">
                      Sections
                    </h6>
                    <h6 className="pt-2   text-sm font-inter font-medium underline">
                      Time
                    </h6>
                  </ListItem>
                  {values.sections.map((e, ind) => {
                    return (
                      <ListItem
                        key={ind}
                        sx={{
                          display: "flex",
                          // justifyContent: "space-between",
                          alignItems: "center",
                          gap: 2,
                          alignContent: "center",
                          px: 0,
                        }}
                      >
                        <h6 className="pt-2 basis-[32%]">{e.title}</h6>

                        <TextField
                          placeholder="Time in Sec"
                          size="small"
                          type="text"
                          name="timer"
                          value={values.sections[ind].timer}
                          onChange={(e) => {
                            const input = e.target.value;
                            // Use regular expression to validate the input as a number
                            if (/^\d+$/.test(input) || input === "") {
                              handleSectionsValue(ind, input, e.target.name);
                            }
                          }}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Fade>
            )
          )}
        </Collapse>
        {/* reward grant check */}
        {/* <Collapse
            in={values.isRewardGrantAward}
            className={
              values.isRewardGrantAward && "p-2 border rounded-md  flex w-2/4"
            }
          >
            <div className="flex gap-5">
              <Box
                sx={{
                  mt: !values?.isRewardGrantAward && `0!important`,
                  width: "100%",
                }}
              >
                <BootstrapTextField
                  label="Floor Value"
                  placeholder="Enter Number"
                  size="small"
                  type="number"
                  name="rewardGrantChart"
                  value={values?.rewardGrantChart}
                  onChange={(e) =>
                    setValues({ ...values, rewardGrantChart: e.target.value })
                  }
                  sx={{ my: 2 }}
                />
              </Box>

              <Box
                sx={{
                  mt: !values?.isRewardGrantAward && `0!important`,
                  width: "100%",
                }}
              >
                <BootstrapTextField
                  label="Multiplier"
                  placeholder="Enter Number"
                  size="small"
                  type="number"
                  name="rewardGrantChart"
                  value={values?.rewardGrantChart}
                  onChange={(e) =>
                    setValues({ ...values, rewardGrantChart: e.target.value })
                  }
                  sx={{ my: 2 }}
                />
              </Box>
            </div>
          </Collapse> */}
        <RewardChart handleChange={handleChange} values={values} />

        <div className="flex justify-start gap-x-5 mt-0">
          <div className="startDate w-full">
            <InputLabel
              shrink
              htmlFor="testdate"
              sx={{
                fontSize: 20,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                color: "#455564",
              }}
            >
              Start Date
            </InputLabel>

            {/* Subject or topic field */}

            <DatePickerComp
              style={{ height: 10, width: "100%" }}
              size="small"
              data={values.startDate}
              onChange={handleChange}
              setData={(val) => setValues({ ...values, startDate: val })}
              name="startDate"
            />
          </div>

          <div className="price w-full">
            <InputLabel
              htmlFor="outlined-adornment-amount"
              sx={{
                fontSize: "16px",
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                color: "#455564",
                mb: 1,
              }}
            >
              Price
            </InputLabel>
            <FormControl fullWidth sx={{ width: "100%" }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-amount"
                size="small"
                name="price"
                value={values.price}
                type="number"
                startAdornment={
                  <InputAdornment position="start">
                    <IndianRupee size={15} />
                  </InputAdornment>
                }
                onChange={handleChange}
              />
            </FormControl>
          </div>
        </div>
        {/* Markng type */}
        {/* is unattempeted marks */}
        <div>
          <label htmlFor="isUnattemptedMarks" className="text-sm mt-3">
            <Checkbox
              checked={values.isUnattemptedMarks}
              name="isUnattemptedMarks"
              id="isUnattemptedMarks"
              onChange={handleChange}
              sx={{
                color: "var(--primary)",
                ml: -1,
                "&.Mui-checked": {
                  color: "var(--primary)",
                },
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            Allow unattempted Marks
          </label>

          {values?.isUnattemptedMarks && (
            <div className="flex justify-between gap-8">
              <BootstrapTextField
                label="Unattempted NegativeMarks"
                placeholder="Enter here..."
                type="number"
                error={false}
                size="small"
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setValues({ ...values, unattemptedNegativeMarks: value });
                }}
                name="unattemptedNegativeMarks"
                value={values.unattemptedNegativeMarks}
              />

              <BootstrapTextField
                label="Unattempted Threshold"
                placeholder="Enter here..."
                error={false}
                type="number"
                size="small"
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setValues({ ...values, unattemptedThreshold: value });
                }}
                name="unattemptedThreshold"
                value={values.unattemptedThreshold}
              />
            </div>
          )}
        </div>
        <div className="flex justify-between border-y-2 rounded-md ">
          <div className="basis-2/4 p-2">
            <InputLabel
              shrink
              htmlFor="marking"
              sx={{
                fontSize: 20,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,

                color: "#455564",
              }}
            >
              Marking Type
            </InputLabel>
            <div className="mt-2">
              <IconlessRadio
                data={[
                  { title: "Overall", value: "overall" },
                  { title: "Sectional", value: "sectional" },
                ]}
                style={{
                  width: 170,
                  height: 100,
                  borderRadius: 2,
                  rowGap: 2,
                  fontSize: 14,
                }}
                row={true}
                setData={(val) => setValues({ ...values, markingType: val })}
                value={values.markingType}
              />
              {/* Sections,Positive Marks,Negative Marks */}

              {values?.sections?.length > 0 &&
                (values.markingType === "overall" ? (
                  <Fade in={values.markingType === "overall" ? true : false}>
                    <Box
                      className="markingtype_overall"
                      sx={{
                        mt: 2,
                        display: "flex",

                        flexDirection: "column",

                        gap: 2,
                        px: 0,
                      }}
                    >
                      <div className="flex justify-between w-full gap-6">
                        <h6 className="pt-2 basis-[22%] text-sm font-inter font-medium underline">
                          Sections
                        </h6>

                        <h6 className="pt-2 basis-[39%] text-sm font-inter font-medium underline">
                          Positive Marks
                        </h6>

                        <h6 className="pt-2 basis-[39%]  text-sm font-inter font-medium underline">
                          Negative Marks
                        </h6>
                      </div>
                      {values.sections.map((section, ind) => {
                        return (
                          <div className="border-4 rounded-md p-2">
                            <Box
                              key={ind}
                              sx={{
                                display: "flex",
                                gap: 3,
                                width: "100%",
                                px: 0,
                              }}
                            >
                              <div className="pt-2 basis-[22%] ">
                                {section?.section.title}
                              </div>

                              <div className="basis-[39%] ">
                                <TextField
                                  placeholder="positiveMarks"
                                  size="small"
                                  type="number"
                                  name="positiveMarks"
                                  value={section.positiveMarks}
                                  onChange={(e) =>
                                    handleOverallSection(
                                      e.target.value,
                                      e.target.name,
                                      ind
                                    )
                                  }
                                />
                              </div>
                              <div className="basis-[39%]">
                                <TextField
                                  placeholder="negativeMarks"
                                  size="small"
                                  type="number"
                                  name="negativeMarks"
                                  value={section.negativeMarks}
                                  onChange={(e) =>
                                    handleOverallSection(
                                      e.target.value,
                                      e.target.name,
                                      ind
                                    )
                                  }
                                />
                              </div>
                            </Box>
                            <div className="basis-full">
                              <PartialMarks
                                values={section}
                                handleChange={(val) =>
                                  handleOverallSection(val, "partialMarks", ind)
                                }
                              />
                            </div>
                          </div>
                        );
                      })}
                    </Box>
                  </Fade>
                ) : (
                  <Fade
                    in={values.markingType === "sectional" ? true : false}
                    key={values.markingType}
                  >
                    <Box
                      className="markingtype_overall transition duration-300 ease-in-out   w-full gap-6"
                      sx={{
                        mt: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        px: 0,
                      }}
                    >
                      <div className="flex justify-between w-full gap-6">
                        <h6 className="pt-2 basis-[22%]   text-sm font-inter font-medium underline">
                          Sections
                        </h6>

                        <h6 className="pt-2 basis-[39%] text-sm font-inter font-medium underline">
                          Positive Marks
                        </h6>

                        <h6 className="pt-2 basis-[39%]  text-sm font-inter font-medium underline">
                          Negative Marks
                        </h6>
                      </div>

                      {values.sections.map((e, ind) => {
                        return (
                          <div className="border-4 rounded-md p-2">
                            <Box
                              key={ind}
                              sx={{
                                display: "flex",
                                gap: 2,
                                alignContent: "center",
                                px: 0,
                              }}
                            >
                              <h6 className="pt-2 basis-[22%]">
                                {e.section.title}
                              </h6>

                              <div className="basis-[39%]">
                                <TextField
                                  placeholder="positiveMarks"
                                  size="small"
                                  type="number"
                                  name="positiveMarks"
                                  value={e.positiveMarks}
                                  onChange={(e) =>
                                    handleSectionsValue(
                                      ind,
                                      e.target.value,
                                      e.target.name
                                    )
                                  }
                                />
                              </div>
                              <div className="basis-[39%]">
                                <TextField
                                  placeholder="negativeMarks"
                                  size="small"
                                  type="number"
                                  name="negativeMarks"
                                  value={e.negativeMarks}
                                  onChange={(e) =>
                                    handleSectionsValue(
                                      ind,
                                      e.target.value,
                                      e.target.name
                                    )
                                  }
                                />
                              </div>
                            </Box>

                            <div className="basis-full">
                              <PartialMarks
                                values={e}
                                handleChange={(val) =>
                                  handleSectionsValue(ind, val, "partialMarks")
                                }
                              />
                            </div>
                          </div>
                        );
                      })}
                    </Box>
                  </Fade>
                ))}
            </div>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          {/* check box section */}

          <div className=" basis-2/4 p-2">
            <div className="flex flex-wrap">
              <label htmlFor="goalTracker" className="text-sm basis-3/6 h-fit">
                <Checkbox
                  checked={values.isGoalTracker}
                  name="isGoalTracker"
                  id="goalTracker"
                  onChange={handleChange}
                  sx={{
                    color: "var(--primary)",
                    ml: -1,
                    "&.Mui-checked": {
                      color: "var(--primary)",
                    },
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
                Goal Tracker
              </label>
              <label
                htmlFor="scorePercetile"
                className="text-sm basis-3/6 h-fit"
              >
                <Checkbox
                  checked={values.isScorePercentile}
                  name="isScorePercentile"
                  id="isScorePercentile"
                  onChange={handleChange}
                  sx={{
                    color: "var(--primary)",
                    ml: -1,
                    "&.Mui-checked": {
                      color: "var(--primary)",
                    },
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
                isScorePercentile
              </label>
              <label
                htmlFor="calculatorAllowed"
                className="text-sm basis-3/6 h-fit"
              >
                <Checkbox
                  checked={values.isCalculatorAllowed}
                  name="isCalculatorAllowed"
                  id="isCalculatorAllowed"
                  onChange={handleChange}
                  sx={{
                    color: "var(--primary)",
                    ml: -1,
                    "&.Mui-checked": {
                      color: "var(--primary)",
                    },
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
                isCalculatorAllowed
              </label>
              <label htmlFor="isOnboarding" className="text-sm basis-3/6 h-fit">
                <Checkbox
                  checked={values.isOnboarding}
                  name="isOnboarding"
                  id="isOnboarding"
                  onChange={handleChange}
                  sx={{
                    color: "var(--primary)",
                    ml: -1,
                    "&.Mui-checked": {
                      color: "var(--primary)",
                    },
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
                Allow Onboarding
              </label>
              <label htmlFor="isPercentile" className="text-sm basis-3/6 h-fit">
                <Checkbox
                  checked={values.isPercentile}
                  name="isPercentile"
                  id="isPercentile"
                  onChange={handleChange}
                  sx={{
                    color: "var(--primary)",
                    ml: -1,
                    "&.Mui-checked": {
                      color: "var(--primary)",
                    },
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
                Allow Percentile
              </label>
              <label htmlFor="isWindowPeriod" className="text-sm basis-3/6">
                <Checkbox
                  checked={values.isWindowPeriod}
                  name="isWindowPeriod"
                  id="isWindowPeriod"
                  onChange={handleChange}
                  sx={{
                    color: "var(--primary)",
                    ml: -1,
                    "&.Mui-checked": {
                      color: "var(--primary)",
                    },
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
                Window Period
              </label>
            </div>
          </div>
        </div>
        {/* Instructions Tag */}
        <div className="flex justify-start gap-3">
          <div className="instructions text-sm w-full">
            <InputLabel
              shrink
              htmlFor="instructions"
              sx={{
                fontSize: 20,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,

                color: "#455564",
              }}
            >
              Select Instructions
            </InputLabel>

            {/* Subject or topic field */}

            <FormControl
              variant="outlined"
              sx={{ minWidth: 120, width: "100%" }}
            >
              <Select
                value={values.instruction_id}
                onChange={(e) =>
                  setValues({ ...values, instruction_id: e.target.value })
                }
                size="small"
              >
                {instructionList?.data.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* Terms Tag */}
          <div className="terms text-sm w-full">
            <InputLabel
              shrink
              htmlFor="terms"
              sx={{
                fontSize: 20,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,

                color: "#455564",
              }}
            >
              Select Terms
            </InputLabel>

            {/* Subject or topic field */}

            <FormControl
              variant="outlined"
              sx={{ minWidth: 120, width: "100%" }}
            >
              <Select
                value={values.terms_id}
                onChange={(e) =>
                  setValues({ ...values, terms_id: e.target.value })
                }
                size="small"
              >
                {termsList?.data.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* Percentile Tag */}
          <div className="percentile text-s w-full ">
            <InputLabel
              shrink
              htmlFor="percentile"
              sx={{
                fontSize: 20,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,

                color: "#455564",
              }}
            >
              Select Percentile
            </InputLabel>

            {/* Subject or topic field */}

            <FormControl
              variant="outlined"
              sx={{ minWidth: 120, width: "100%" }}
            >
              <Select
                value={values.percentileId}
                onChange={(e) =>
                  setValues({ ...values, percentileId: e.target.value })
                }
                size="small"
              >
                {percentileList?.data.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <BootstrapTextField
            label="Attempts Allowed"
            placeholder="Enter here..."
            error={false}
            size="small"
            onChange={handleChange}
            name="attemptAllowed"
            value={values.attemptAllowed}
          />
        </div>
      </Box>

      <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
        <CustomButton
          style={{
            ...CustomButtonStyle,
            width: 117,
            height: 39,
            borderRadius: 6,
          }}
          onClick={handleSave}
        >
          Save & continue
        </CustomButton>
      </Stack>
    </div>
  );
};

export default CreateDetail;
