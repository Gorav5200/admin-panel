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
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Info } from "lucide-react";
import { InputLabel, Stack, TextField, Box } from "@mui/material";
import BootstrapTextField from "../../../common/bootstrapTextField";
import { MultipleSelect } from "../../../common/selectFields";
import List from "@mui/material/List";
import { CustomButton, CustomButtonStyle } from "../../../../styles/muiRoot";
import { RewardChart } from "../../../../services/common";
import DatePickerComp from "../../../common/datePicker";
import IconlessRadio from "../../../common/radioGroup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { subjectApi } from "../../../../services/Constant";
import { useGetSubjectListQuery } from "../../../../services/apis/dataManagement/subject";
import { useSelector } from "react-redux";
import { setDailyQuizDetail } from "../../../../ducks/dailyQuizSlice";
import { Empty } from "antd";

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

  const { dailyQuizDetail } = useSelector((state) => state.dailyQuiz);
  const entityList = useSelector((state) => state.entity.entity);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [values, setValues] = useState(dailyQuizDetail);
  const [entityInd, setEntityInd] = useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    if (name === "entityType") {
      setValues({ ...values, entityType: value, sections: [] });
    } else {
      // Handle other changes
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    setValues({ ...values, sections: [] });
  }, [values.entity]);

  useEffect(() => {
    if (params.examId) {
      setValues({ ...values, entityType: params.examId });
    }
  }, [params]);

  useEffect(() => {
    if (dailyQuizDetail) {
      setValues(dailyQuizDetail);
    }
  }, []);

  const {
    data: sectionData,
    loading: sectionLoad,
    isError: sectionErr,
    isSuccess: sectionSuccess,
  } = useGetSubjectListQuery(
    `${subjectApi.endPoint}/entity/${values?.entityType}`,
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

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
    } else if (!values.date) {
      err.date = "Test date is required.";
    } else {
      const currentDate = Date();
      const selectedDate = new Date(values.date);
      if (selectedDate < currentDate) {
        err.date = "Test date must be in the future or today.";
      }
    }

    return err;
  };

  const getListData = (val) => {
    const allData = sectionData?.data;
    const pastPaperSections = dailyQuizDetail?.sections;
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
        };
      }
    });

    // const filteredRes = val.map((id) => {
    //   return res.find((item) => item && item.section._id === id);
    // });
    console.log("🚀 ~ getListData ~ res:", res);

    setValues({ ...values, sections: res });
  };

  const handleSectionsValue = (index, value, name) => {
    const updatedSectionsData = [...values.sections];
    updatedSectionsData[index][name] = Number(value);
    setValues({ ...values, sections: updatedSectionsData });
  };

  const handleOverallSection = (value, name) => {
    const updatedSectionsData = values.sections.map((obj) => ({
      ...obj,
      [name]: Number(value),
    }));
    console.log(115, updatedSectionsData);
    setValues({ ...values, sections: updatedSectionsData });
  };

  const handleSave = (e) => {
    const validationErrors = validationSchema();

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, you can proceed with form submission or other actions
      dispatch(setDailyQuizDetail(values));
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
        {values.entity !== undefined && (
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
                      entityList?.[entityInd]?.entityType?.map((e) => (
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
                  isSuccess={sectionSuccess}
                  loading={sectionLoad}
                  error={sectionErr}
                  style={{ width: "50em", ml: 0 }}
                  placeholder="Select section"
                  value={values?.sections?.map((e) => e.section._id)}
                  setValue={(val) => getListData(val)}
                />
              </div>
            </div>
          </Collapse>
        )}

        {/* Allow sectional toggle */}
        <Collapse in={values?.sectionsSelect ? true : false}>
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

          <Box
            className="timer  basis-2/6"
            sx={{ mt: !values?.isToggleAllowed && `0!important` }}
          >
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
          </Box>
        </Collapse>

        <div className="flex justify-start gap-x-5 mt-0">
          <div className="date w-full">
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
              Date
            </InputLabel>

            {/* Subject or topic field */}

            <DatePickerComp
              style={{ height: 10, width: "100%" }}
              size="small"
              data={values.date}
              onChange={handleChange}
              setData={(val) => setValues({ ...values, date: val })}
              name="date"
            />
          </div>
        </div>
        {/* Markng type */}

        {/* is unattempeted marks */}

        <div>
          <div className="mb-1">
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

            <label htmlFor="calculatorAllowed" className="text-sm ml-7 h-fit">
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
          </div>
          <Collapse in={values?.isUnattemptedMarks}>
            <div className="flex justify-between gap-8 ">
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
          </Collapse>
        </div>
        <div className="flex justify-between border rounded-md ">
          <div className="basis-2/4 p-2  ">
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

            {values.sections?.length > 0 && (
              <FormHelperText className="flex gap-2">
                <Info size={15} /> If remove the sections deselect from section
              </FormHelperText>
            )}
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
                  <Fade
                    in={values.markingType === "overall" ? true : false}
                    key={values.markingType}
                  >
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
                        <h6 className="pt-2 basis-[40%] text-sm font-inter font-medium underline">
                          Sections
                        </h6>

                        <h6 className="pt-2 basis-[30%] text-sm font-inter font-medium underline">
                          Positive Marks
                        </h6>

                        <h6 className="pt-2 basis-[30%]  text-sm font-inter font-medium underline">
                          Negative Marks
                        </h6>
                      </div>
                      {values.sections.map((e, ind) => {
                        return (
                          <Box
                            key={ind}
                            sx={{
                              display: "flex",
                              gap: 3,
                              width: "100%",
                              px: 0,
                            }}
                          >
                            <h6 className="pt-2 basis-[40%] ">
                              {e.section.title}
                            </h6>

                            <div className="basis-[30%] ">
                              <TextField
                                placeholder="positiveMarks"
                                size="small"
                                type="number"
                                name="positiveMarks"
                                value={values.sections[ind].positiveMarks}
                                onChange={(e) =>
                                  handleOverallSection(
                                    e.target.value,
                                    e.target.name
                                  )
                                }
                              />
                            </div>
                            <div className="basis-[30%]">
                              <TextField
                                placeholder="negativeMarks"
                                size="small"
                                type="number"
                                name="negativeMarks"
                                value={values.sections[ind].negativeMarks}
                                onChange={(e) =>
                                  handleOverallSection(
                                    e.target.value,
                                    e.target.name
                                  )
                                }
                              />
                            </div>
                          </Box>
                        );
                      })}
                    </Box>
                  </Fade>
                ) : (
                  <Fade
                    key={values.markingType}
                    in={values.markingType === "sectional" ? true : false}
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
                        <h6 className="pt-2 basis-[40%]   text-sm font-inter font-medium underline">
                          Sections
                        </h6>

                        <h6 className="pt-2 basis-[30%] text-sm font-inter font-medium underline">
                          Positive Marks
                        </h6>

                        <h6 className="pt-2 basis-[30%]  text-sm font-inter font-medium underline">
                          Negative Marks
                        </h6>
                      </div>

                      {values.sections.map((e, ind) => {
                        return (
                          <Box
                            key={ind}
                            sx={{
                              display: "flex",
                              gap: 2,
                              alignContent: "center",
                              px: 0,
                            }}
                          >
                            <h6 className="pt-2 basis-[40%]">
                              {e.section.title}
                            </h6>

                            <div className="basis-[30%]">
                              <TextField
                                placeholder="positiveMarks"
                                size="small"
                                type="number"
                                name="positiveMarks"
                                value={values.sections[ind].positiveMarks}
                                onChange={(e) =>
                                  handleSectionsValue(
                                    ind,
                                    e.target.value,
                                    e.target.name
                                  )
                                }
                              />
                            </div>
                            <div className="basis-[30%]">
                              <TextField
                                placeholder="negativeMarks"
                                size="small"
                                type="number"
                                name="negativeMarks"
                                value={values.sections[ind].negativeMarks}
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
                        );
                      })}
                    </Box>
                  </Fade>
                ))}
            </div>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />

          {/*topper reward*/}

          <div className="basis-2/4 ml-2 p-2">
            {/* Coin, point ,paid */}
            <div className="flex  items-start gap-3 ">
              <div>
                <FormControlLabel
                  value="coinCheck"
                  name="coinCheck"
                  checked={values.coinCheck}
                  control={<Checkbox />}
                  label={<span className="font-medium font-inter ">Coin</span>}
                  labelPlacement="end"
                  onChange={handleChange}
                />

                <Collapse in={values?.coinCheck}>
                  <TextField
                    variant="filled"
                    size="small"
                    label="Enter value"
                    name="coin"
                    value={values.coin}
                    type="number"
                    sx={{
                      width: "100%",
                      "&:hover": {
                        borderColor: "transparent",
                        outline: "none",
                        border: "none",
                      },
                    }}
                    onChange={handleChange}
                  />
                </Collapse>
              </div>

              <div>
                <FormControlLabel
                  value="points"
                  name="pointCheck"
                  checked={values.pointCheck}
                  control={<Checkbox />}
                  label={
                    <span className="font-medium font-inter ">Points</span>
                  }
                  labelPlacement="end"
                  onChange={handleChange}
                />
                <Collapse in={values?.pointCheck}>
                  <TextField
                    variant="filled"
                    size="small"
                    label="Enter Points"
                    name="points"
                    value={values.points}
                    type="number"
                    sx={{
                      width: "100%",
                      "&:hover": {
                        borderColor: "transparent",
                        outline: "none",
                        border: "none",
                      },
                    }}
                    onChange={handleChange}
                  />
                </Collapse>
              </div>

              <div>
                <FormControlLabel
                  value="paid"
                  name="paid"
                  checked={values?.paid?.status}
                  control={<Checkbox />}
                  label={<span className="font-medium font-inter ">Paid</span>}
                  labelPlacement="end"
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "paid",
                        value: { ...values.paid, status: e.target.checked },
                      },
                    })
                  }
                />
                <Collapse in={values?.paid?.status}>
                  <TextField
                    variant="filled"
                    size="small"
                    label="Enter charges"
                    name="charges"
                    value={values.paid?.charge}
                    type="number"
                    sx={{
                      width: "100%",
                      "&:hover": {
                        borderColor: "transparent",
                        outline: "none",
                        border: "none",
                      },
                    }}
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "paid",
                          value: { ...values.paid, charge: e.target.value },
                        },
                      })
                    }
                  />
                </Collapse>
              </div>
            </div>

            <FormControlLabel
              value="rewardCheck"
              name="rewardCheck"
              checked={values.rewardCheck}
              control={<Checkbox />}
              label={
                <span className="font-medium font-inter ">
                  Add Topper Rewards
                </span>
              }
              labelPlacement="end"
              onChange={handleChange}
            />
            <Collapse in={values?.rewardCheck}>
              <Stack spacing={2}>
                <TextField
                  variant="filled"
                  size="small"
                  label="1st Reward"
                  value={values.toppersReward.first}
                  type="number"
                  name="toppersReward"
                  sx={{
                    width: "100%",
                    "&:hover": {
                      borderColor: "transparent",
                      outline: "none",
                      border: "none",
                    },
                  }}
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: "toppersReward",
                        value: {
                          ...values.toppersReward,
                          first: e.target.value,
                        },
                      },
                    });
                  }}
                />
                <TextField
                  variant="filled"
                  size="small"
                  label="2nd Reward"
                  name="toppersReward"
                  value={values.toppersReward.second}
                  type="number"
                  sx={{
                    width: "100%",
                    "&:hover": {
                      borderColor: "transparent",
                      outline: "none",
                      border: "none",
                    },
                  }}
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: "toppersReward",
                        value: {
                          ...values.toppersReward,
                          second: e.target.value,
                        },
                      },
                    });
                  }}
                />
                <TextField
                  variant="filled"
                  size="small"
                  label="3rd Reward"
                  name="toppersReward"
                  value={values.toppersReward.third}
                  type="number"
                  sx={{
                    width: "100%",
                    "&:hover": {
                      borderColor: "transparent",
                      outline: "none",
                      border: "none",
                    },
                  }}
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: "toppersReward",
                        value: {
                          ...values.toppersReward,
                          third: e.target.value,
                        },
                      },
                    });
                  }}
                />
              </Stack>
            </Collapse>

            <div className="mt-5 ">
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
          </div>
        </div>

        {/* Instructions Tag */}

        <div>
          <RewardChart values={values} handleChange={handleChange} />
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
