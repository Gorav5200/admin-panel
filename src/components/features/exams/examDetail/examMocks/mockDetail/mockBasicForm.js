import React, { useEffect, useState } from "react";
import {
  FormControl,
  Checkbox,
  Divider,
  ListItem,
  Fade,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { IndianRupee } from "lucide-react";
import CreateIcon from "@mui/icons-material/Create";
import {
  IconButton,
  InputLabel,
  Stack,
  TextField,
  Box,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import Icon from "../../../../../common/Icon";
import BootstrapTextField from "../../../../../common/bootstrapTextField";
import { MultipleSelect } from "../../../../../common/selectFieldsEdit";
import List from "@mui/material/List";
import {
  CustomButton,
  CustomButtonStyle,
} from "../../../../../../styles/muiRoot";
import { createHandleChange } from "../../../../../../services/common";
import DatePickerComp from "../../../../../common/datePicker";
import IconlessRadio from "../../../../../common/radioGroup";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { instructionsApi } from "../../../../../../services/Constant";
import { termsApi } from "../../../../../../services/Constant";
import { percentileApi } from "../../../../../../services/Constant";
import { useGetInstructionsListQuery } from "../../../../../../services/apis/dataManagement/instructions";
import { useGetTermsListQuery } from "../../../../../../services/apis/dataManagement/terms";
import { useGetPercentileListQuery } from "../../../../../../services/apis/dataManagement/percentile";
import { useUpdateMockMutation } from "../../../../../../services/apis/exam/mock";
import { mocksApi } from "../../../../../../services/Constant";
const MockBasicForm = ({ mockDetails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [values, setValues] = useState(mockDetails);
  const [editForm, setEditForm] = useState(false);
  const handleChange = createHandleChange(values, setValues);
  const [updateMock, { isLoading: isLoadingUpdate, isError: isErrorUpdate }] =
    useUpdateMockMutation();
  const { examDetails } = useSelector((state) => state.exam);

  useEffect(() => {
    if (params.examId) {
      setValues({ ...values, entityType: params.examId });
    }
  }, [params]);

  const {
    data: instructionList,
    isLoading,
    isError,
  } = useGetInstructionsListQuery(instructionsApi.endPoint, {
    refetchOnMountOrArgChange: false,
  });

  const { data: termsList, isLoading: termsLoad } = useGetTermsListQuery(
    termsApi.endPoint,
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const { data: percentileList, isLoading: percentileLoad } =
    useGetPercentileListQuery(percentileApi.endPoint, {
      refetchOnMountOrArgChange: false,
    });

  useEffect(() => {
    setValues(mockDetails);
  }, [mockDetails]);
  useEffect(() => {}, [
    percentileList?.data,
    termsList?.data,
    instructionList?.data,
  ]);
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
      isNaN(values.sections[0].positiveMarks) ||
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

  const handleSectionsValue = (index, value, name) => {
    let data = values.sections.map((item, ind) => {
      if ([name] in values.sections[index]) {
        if (ind == index) {
          return { ...item, [name]: Number(value) };
        } else {
          return item;
        }
      } else {
        if (ind == index) {
          return { ...item, [name]: Number(value) };
        } else {
          return { ...item, [name]: null };
        }
      }
    });
    setValues({ ...values, sections: data });
  };

  const handleOverallSection = (value, name) => {
    const updatedSectionsData = values.sections.map((obj) => ({
      ...obj,
      [name]: Number(value),
    }));
    //console.log(115, updatedSectionsData);
    setValues({ ...values, sections: updatedSectionsData });
  };

  const handleMockBasicEdit = async (e) => {
    const validationErrors = validationSchema();

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, you can proceed with form submission or other actions

      if (values.isToggleAllowed == false) {
        values.commonTimer = null;
      }

      //formatting section data

      let formattedSectionData = values?.sections?.map((item) => {
        if (values.isToggleAllowed == true) {
          //delete item.timer;
          //delete item._id;

          return {
            ...item,
            section: item.section._id,
            questions: item.questions.map((q) => {
              return q._id;
            }),
          };
        } else {
          //delete item._id;
          //item._id = undefined;
          return {
            ...item,
            section: item.section._id,
            questions: item.questions.map((q) => {
              return q._id;
            }),
          };
        }
      });

      let data = { ...values, sections: formattedSectionData };
      console.log("xx",data);
      const response = await updateMock({
        endpoint: `${mocksApi.endPoint}/${mockDetails._id}`,
        updateMock: data,
      });

      if (response && response?.data?.success == true) {
        // Navigate to the desired path after successful deletion

        toast.success("Mock Updated Successfully!", {
          autoClose: 2000,
          onOpen: () => {
            navigate(`/main/exam/${params.examId}/mocks/${mockDetails._id}`);
            setEditForm(false);
          },

          // Auto close the toast after 3 seconds
        });
        //
      } else {
        toast.error("Mock Update Failed", {
          autoClose: 2000,
        });
      }
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

  console.log(
    "mockDetails263",
    mockDetails,
    percentileList?.data,
    termsList?.data
  );

  return (
    <div className="p-1 w-[900px]">
      <header className="flex justify-between items-center">
        <h4 className="text-xl font-inter font-semibold">Basic Mock Details</h4>
        {!editForm && (
          <IconButton onClick={() => setEditForm(true)}>
            <CreateIcon />
          </IconButton>
        )}
        {editForm && (
          <IconButton onClick={() => setEditForm(false)}>
            <Icon name="X" size="25" />
          </IconButton>
        )}
      </header>
      <Divider />
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            width: "100%",
            mt: 3,
            display: "flex",
            columnGap: 3,
            flexDirection: "column",
            pr: 2,
          },
          height: "40em",

          overflow: "scroll",
          mb: 3,
        }}
        noValidate
        autoComplete="off"
      >
        {/* test Name */}
        <BootstrapTextField
          label="Test name"
          placeholder="Enter here..."
          error={false}
          size="small"
          onChange={handleChange}
          name="title"
          value={values?.title}
          disabled={!editForm}
        />
        {/* Sections or subject */}
        <div className="select_subject">
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
            Selected Sections
          </InputLabel>

          {/* Subject or topic field */}

          {values?.sections?.length > 0 && (
            <MultipleSelect
              size="small"
              data={values?.sections}
              style={{ width: "100% ", ml: 0 }}
              placeholder="Select section"
              value={values?.sections?.map((itm) => itm?.section?._id)}
              disabled={true}
              //setValue={(val) => handleAddSection(val)}
            />
          )}

          {values?.sections?.length > 0 && (
            <label htmlFor="isToggleAllowed" className="text-sm mt-3">
              <Checkbox
                disabled={!editForm}
                checked={values?.isToggleAllowed}
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
          )}
        </div>

        {/* Timer by conditions */}
        <Box
          className="timer"
          sx={{ mt: !values?.isToggleAllowed && `0!important` }}
        >
          {values?.isToggleAllowed == true ? (
            <BootstrapTextField
              disabled={!editForm}
              label="Common Timer"
              placeholder="Time in Sec"
              size="small"
              type="number"
              name="timer"
              value={Number(values.commonTimer)}
              onChange={(e) =>
                setValues({ ...values, commonTimer: e.target.value })
              }
              sx={{ my: 2 }}
            />
          ) : (
            values?.sections?.length > 0 && (
              <Fade in={!values?.isToggleAllowed}>
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
                  {values?.sections.map((e, ind) => {
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
                        <h6 className="pt-2 basis-[32%]">{e.section.title}</h6>

                        <TextField
                          disabled={!editForm}
                          placeholder="Time in Sec"
                          size="small"
                          type="text"
                          name="timer"
                          value={values?.sections[ind]?.timer}
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
        {/* Markng type */}
        <div>
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
              value={values?.markingType}
              disabled={!editForm}
            />
            {/* Sections,Positive Marks,Negative Marks */}
            {values?.sections?.length > 0 &&
              (values.markingType === "overall" ? (
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
                  {values?.sections?.map((e, ind) => {
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
                        <h6 className="pt-2 basis-[40%]">{e.section.title}</h6>

                        <div className="basis-[30%]">
                          <TextField
                            className="basis-[30%]"
                            placeholder="positiveMarks"
                            size="small"
                            type="number"
                            name="positiveMarks"
                            value={e.positiveMarks}
                            onChange={(e) =>
                              handleOverallSection(
                                e.target.value,
                                e.target.name
                              )
                            }
                            disabled={!editForm}
                          />
                        </div>
                        <div className="basis-[30%]">
                          <TextField
                            placeholder="negativeMarks"
                            size="small"
                            type="number"
                            name="negativeMarks"
                            value={e.negativeMarks}
                            onChange={(e) =>
                              handleOverallSection(
                                e.target.value,
                                e.target.name
                              )
                            }
                            disabled={!editForm}
                          />
                        </div>
                      </Box>
                    );
                  })}
                </Box>
              ) : (
                <Fade in={values.markingType === "sectional" ? true : false}>
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

                    {values?.sections?.map((e, ind) => {
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
                          <h6 className="pt-2 basis-[40%]">
                            {e.section.title}
                          </h6>

                          <div className="basis-[30%]">
                            <TextField
                              placeholder="positiveMarks"
                              size="small"
                              type="number"
                              name="positiveMarks"
                              disabled={!editForm}
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
                          <div className="basis-[30%]">
                            <TextField
                              placeholder="negativeMarks"
                              size="small"
                              type="number"
                              name="negativeMarks"
                              disabled={!editForm}
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
                      );
                    })}
                  </Box>
                </Fade>
              ))}
          </div>
        </div>

        {/* is unattempeted marks */}

        <div>
          <label htmlFor="isUnattemptedMarks" className="text-sm mt-3">
            <Checkbox
              checked={values?.isUnattemptedMarks}
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
              disabled={!editForm}
            />
            Allow Unattempted Marks
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
                value={values?.unattemptedNegativeMarks}
                disabled={!editForm}
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
                value={values?.unattemptedThreshold}
                disabled={!editForm}
              />
            </div>
          )}
        </div>

        <div>
          <div className="startDate">
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
              data={values?.startDate}
              onChange={handleChange}
              setData={(val) => setValues({ ...values, startDate: val })}
              name="startDate"
              disabled={!editForm}
            />
          </div>
        </div>

        <div>
          <InputLabel
            htmlFor="outlined-adornment-amount"
            //shrink
            sx={{
              fontSize: 20,
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              color: "#455564",
            }}
          >
            Price
          </InputLabel>
          <FormControl fullWidth sx={{ width: "100%" }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-amount"
              size="small"
              name="price"
              value={values?.price}
              type="number"
              disabled={!editForm}
              startAdornment={
                <InputAdornment position="start">
                  <IndianRupee size={15} />
                </InputAdornment>
              }
              onChange={handleChange}
            />
          </FormControl>
        </div>

        <div>
          <div className="flex flex-wrap  items-center">
            <label htmlFor="goalTracker" className="text-sm basis-1/3">
              <Checkbox
                disabled={!editForm}
                checked={values?.isGoalTracker}
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
            <label htmlFor="scorePercetile" className="text-sm basis-1/3">
              <Checkbox
                disabled={!editForm}
                checked={values?.isScorePercentile}
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
            <label htmlFor="calculatorAllowed" className="text-sm basis-1/3">
              <Checkbox
                disabled={!editForm}
                checked={values?.isCalculatorAllowed}
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
            <label htmlFor="isOnboarding" className="text-sm basis-1/3">
              <Checkbox
                disabled={!editForm}
                checked={values?.isOnboarding}
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
            <label htmlFor="isPercentile" className="text-sm basis-1/3">
              <Checkbox
                disabled={!editForm}
                checked={values?.isPercentile}
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
            <label htmlFor="isWindowPeriod" className="text-sm basis-1/3">
              <Checkbox
                disabled={!editForm}
                checked={values?.isWindowPeriod}
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

        <BootstrapTextField
          label="Attempts Allowed"
          placeholder="Enter here..."
          error={false}
          size="small"
          onChange={handleChange}
          name="attemptAllowed"
          value={values?.attemptAllowed}
          disabled={!editForm}
        />
        {/* Instructions Tag */}
        <div>
          <div className="flex flex-wrap items-center">
            <div className="instructions text-sm basis-1/2">
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
                sx={{ minWidth: 120, width: "300px" }}
              >
                <Select
                  value={values?.instruction_id}
                  onChange={(e) =>
                    setValues({ ...values, instruction_id: e.target.value })
                  }
                  size="small"
                  disabled={!editForm}
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
            <div className="terms text-sm basis-1/2">
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
                sx={{ minWidth: 120, width: "300px" }}
              >
                <Select
                  disabled={!editForm}
                  value={values?.terms_id}
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

              {/* <SingleSelect
                  style={{ width: "300px" }}
                  size="small"
                  placeholder="Select Terms"
                  name="terms"
                  data={termsList.data}
                  setData={(val) => setValues({ ...values, terms: val })}
                  value={values}
                  id="terms"
                /> */}
            </div>
            {/* Percentile Tag */}
            <div className="percentile text-sm basis-1/2">
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
                sx={{ minWidth: 120, width: "300px" }}
              >
                <Select
                  value={values?.percentileId}
                  onChange={(e) =>
                    setValues({ ...values, percentileId: e.target.value })
                  }
                  size="small"
                  disabled={!editForm}
                >
                  {percentileList?.data.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </Box>

      {editForm && (
        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
          <CustomButton
            style={{
              ...CustomButtonStyle,
              width: 117,
              height: 39,
              borderRadius: 6,
            }}
            onClick={handleMockBasicEdit}
          >
            Save
          </CustomButton>
        </Stack>
      )}
    </div>
  );
};

export default MockBasicForm;
