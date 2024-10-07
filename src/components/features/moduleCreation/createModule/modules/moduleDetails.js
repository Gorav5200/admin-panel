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
  AppBar,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { FormInputIcon, IndianRupee } from "lucide-react";
import {
  IconButton,
  InputLabel,
  Stack,
  TextField,
  Box,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import BootstrapTextField from "../../../../common/bootstrapTextField";
import SingleSelect, { MultipleSelect } from "../../../../common/selectFields";
import List from "@mui/material/List";
import { CustomButton, CustomButtonStyle } from "../../../../../styles/muiRoot";
import { createHandleChange } from "../../../../../services/common";
import DatePickerComp from "../../../../common/datePicker";
import IconlessRadio from "../../../../common/radioGroup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { instructionsApi, subjectApi } from "../../../../../services/Constant";

import { useGetSubjectListQuery } from "../../../../../services/apis/dataManagement/subject";
import { useSelector } from "react-redux";
import { setPastPaperDetail } from "../../../../../ducks/pastPaperSlice";
import { Empty } from "antd";
import {
  setModuleDetails,
  setActiveView,
} from "../../../../../ducks/addModuleSlice";

const ModuleDetails = () => {
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

  const { moduleDetails } = useSelector((state) => state.addModule);
  const { entity } = useSelector((state) => state.entity);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [values, setValues] = useState(moduleDetails);
  const [entityInd, setEntityInd] = useState(null);
  const handleChange = createHandleChange(values, setValues);

  useEffect(() => {
    if (moduleDetails) {
      setValues(moduleDetails);
    }
  }, []);

  const {
    data: sectionData,
    loading: sectionLoad,
    isError: sectionErr,
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
    } else if (!values.subject) {
      err.subject = "Section must be selected.";
    }

    return err;
  };

  const handleSave = (e) => {
    const validationErrors = validationSchema();
    if (Object.keys(validationErrors).length === 0) {
      dispatch(setModuleDetails(values));
      dispatch(setActiveView("mocktest"));
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
    const selectedIndex = entity?.findIndex(
      (entity) => entity._id === values.entity
    );
    setEntityInd(selectedIndex);
  }, [values.entity]);

  console.log("🚀 ~ CreateDetail ~ values:", values);

  return (
    <div className=" bg-white rounded-md ">
      <AppBar
        position="static"
        color="secondary"
        sx={{ boxShadow: "none", borderRadius: 1 }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <h5 className="font-inter text-xl font-semibold">
              Enter Module Details
            </h5>
          </Toolbar>
        </Container>
      </AppBar>
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
            label="Title"
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
                {!entity ? (
                  <MenuItem value="" disabled>
                    Error loading Entity
                  </MenuItem>
                ) : entity?.length === 0 ? (
                  <MenuItem value="" disabled>
                    <Empty className="mx-auto" />
                  </MenuItem>
                ) : Array.isArray(entity) ? (
                  entity?.map((e, ind) => (
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
                  {!entity ? (
                    <MenuItem value="" disabled>
                      Error loading entity
                    </MenuItem>
                  ) : entity.length === 0 ? (
                    <MenuItem value="" disabled>
                      <Empty className="mx-auto" />
                    </MenuItem>
                  ) : Array.isArray(entity) ? (
                    entity?.[entityInd]?.entityType?.map((e) => (
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
                Select Subject
              </InputLabel>

              {/* Subject or topic field */}

              <FormControl sx={{ width: "100%" }}>
                <Select
                  labelId="demo-simple-select-label"
                  size="small"
                  id="demo-simple-select"
                  placeholder="Select section"
                  name="subject"
                  disabled={!values.entityType}
                  value={values?.subject}
                  onChange={handleChange}
                >
                  {!sectionData ? (
                    <MenuItem value="" disabled>
                      Error loading entity
                    </MenuItem>
                  ) : sectionData?.data.length === 0 ? (
                    <MenuItem value="" disabled>
                      <Empty className="mx-auto" />
                    </MenuItem>
                  ) : Array.isArray(sectionData?.data) ? (
                    sectionData?.data.map((e) => (
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

              {/* <MultipleSelect
                  size="small"
                  disabled={!values.entityType}
                  data={sectionData?.data || []}
                  style={{ width: "50em", ml: 0 }}
                  placeholder="Select section"
                  name="subject"
                  value={values?.subject?.map((e) => e.section._id)}
                
                /> */}
            </div>
          </div>
        </Collapse>

        {/* description */}

        <div>
          <BootstrapTextField
            label="Description"
            multiline
            variant="filled"
            placeholder="Enter here..."
            rows={3}
            error={false}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "description",
                  value: e.target.value,
                },
              })
            }
            value={values.description}
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

export default ModuleDetails;
