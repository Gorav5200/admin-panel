import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import DOMPurify from "dompurify";
import moment from "moment";
import debounce from "lodash/debounce";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { CustomButton } from "../styles/muiRoot";
import BootstrapTextField from "../components/common/bootstrapTextField";
import { LineChart, X } from "lucide-react";
import { Empty, message } from "antd";
import { MarkChatRead } from "@mui/icons-material";

export const dateFormatting = (date) => {
  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleDateString();
  const formattedTime = dateObject.toLocaleTimeString();
  return { date: formattedDate, time: formattedTime };
};

export const dateFormattingString = (dateString) => {
  const dateObj = new Date(dateString);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = dateObj.toLocaleString("en-us", { weekday: "short" }); // Get short day name (e.g., Mon)
  const month = months[dateObj.getMonth()]; // Get month name (e.g., Dec)
  const dayOfMonth = dateObj.getDate(); // Get day of the month (e.g., 24)
  const year = dateObj.getFullYear(); // Get full year (e.g., 2018)

  let hours = dateObj.getHours(); // Get hours (e.g., 10)
  const minutes = dateObj.getMinutes(); // Get minutes (e.g., 33)
  const ampm = hours >= 12 ? "pm" : "am"; // Determine AM or PM

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes
    } ${ampm}`;
  return `${day}, ${month} ${dayOfMonth} ${year} `;
};
export function GroupNaming({ names, maxNames }) {
  if (!names || names.length === 0) {
    return null;
  }

  const visibleNames = names.slice(0, maxNames);
  const remainingCount = names.length - maxNames;

  return (
    <div>
      {visibleNames.map((name, index) => (
        <span key={index}>
          {name}
          {visibleNames.length - 1 !== index && ","}{" "}
        </span>
      ))}
      {remainingCount > 0 && <span>{`& ${remainingCount} more`}</span>}
    </div>
  );
}

export const truncateString = (str, numWords) => {
  const words = str?.split(" ");

  if (words?.length > numWords) {
    const truncatedWords = words.slice(0, numWords);
    return truncatedWords.join(" ") + "...";
  }

  return str;
};

export function randomColors(colors) {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export function HTMLConverter({ children }) {
  const sanitizedHtml = DOMPurify.sanitize(children);
  return <>{ReactHtmlParser(sanitizedHtml)}</>;
}

export const checkQuestionType = (type) => {
  switch (type) {
    case 0:
      return "TITA";
    case 1:
      return "SCQ";
    case 2:
      return "MCQ";
    case 3:
      return "TFQ";
    case 4:
      return "TITA";
    default:
      return "TITA"; // Or handle the default case as needed
  }
};

export const createHandleChange = (values, setValues, validate) => (e) => {
  const name = e.target.name;
  let value = e.target.value;
  console.log("values:", values);
  if (e.target.type === "checkbox") {
    value = e.target.checked;
  }

  setValues((prevValues) => ({
    ...prevValues,
    [name]: value,
  }));
  if (validate) {
    validate(name, value);
  }
};

export const filterData = debounce((data, searchQuery) => {
  console.log("🚀 ~ filterData ~ searchQuery:", searchQuery);

  if (!searchQuery || searchQuery === "" || undefined || null) {
    return data;
  }

  const lowercasedQuery = searchQuery.replace(/\s/g, "").toLowerCase();

  const filteredData = data.filter((item) =>
    item.title.replace(/\s/g, "").toLowerCase().includes(lowercasedQuery)
  );

  return filteredData;
}, 200);

export const findDuration = (start, end) => {
  const startTime = moment(start);
  const endTime = moment(end);
  const duration = moment.duration(endTime.diff(startTime));

  if (duration.asMinutes() < 60) {
    return `${duration.minutes()} mins`;
  } else {
    return `${duration.hours()} hours ${duration.minutes()} Minutes`;
  }
};

export function ChangePageHandler() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [refetchData, setRefetchData] = React.useState(false);

  const handlePageChange = (data) => {
    setPage(data.page);
    setRowsPerPage(data.rowsPerPage);
    setRefetchData(true);


  };

  return { handlePageChange, page, rowsPerPage, refetchData };
}

export const validateName = (value) => {
  const trimmedValue = String(value).trim(); // Convert to string and trim
  return trimmedValue.length > 0;
};

export const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const validateMobile = (value) => {
  return value.length === 10 && !isNaN(value);
};

export const validateSelectArray = (value) => {
  return value.length > 0;
};

export const validateSelectValue = (value) => {
  return value !== undefined && value !== null;
};

// Dummy data for using the select field
export const sections = [
  {
    name: "VARC",
    sectionId: "6504462efc904d4529989195",
  },
  {
    name: "LRDI",
    sectionId: "650445ecfc904d452998918f",
  },
  {
    name: "Quants",
    sectionId: "6504460dfc904d4529989192",
  },
];

export const subTopics = [
  { _id: "65044824fc904d45299891a1", title: " Percentages" },
  {
    _id: "65044824fc904d45299891a1",
    title: "Percentages",
  },
];

export const topics = [
  {
    value: "64feef6274d1bdc726bdc5c8",

    title: "Arithmatic",
  },
  {
    value: "64feef6274d1bdc726bdc5c8",

    title: "Arithmatic",
  },
];

export const truncateTitle = (title, length) => {
  const words = title?.split(" ");
  if (words?.length > length) {
    return words?.slice(0, length).join(" ") + "...";
  }
  return title;
};

export const getSectionsDetail = (data, examId) => {
  const getParticularSection = data?.find((e) =>
    e.entityType.some((sec) => sec._id === examId)
  );
  return getParticularSection || {};
};

export const RewardChart = ({ handleChange, values }) => {
  const [errors, setErrors] = useState({});

  const handleUpdate = (updatedValues) => {
    handleChange({
      target: {
        name: "rewardGrantChart",
        value: updatedValues,
      },
    });
  };

  const handleCreateData = (e, index) => {
    const { value, name } = e.target;
    const updatedData = [...values?.rewardGrantChart];
    updatedData[index] = { ...updatedData[index], [name]: value };

    const newErrors = { ...errors };
    if (!newErrors[index]) {
      newErrors[index] = {};
    }

    if (name === "floorValue" && value > 100) {
      newErrors[index] = {
        ...newErrors[index],
        floorValue: "Floor Value should not be more than 100",
      };
    } else if (name === "floorValue") {
      delete newErrors[index].floorValue;
    }

    if (name === "multiplier" && value > 20) {
      newErrors[index] = {
        ...newErrors[index],
        multiplier: "Multiplier should not be more than 20",
      };
    } else if (name === "multiplier") {
      delete newErrors[index].multiplier;
    }

    // Clean up empty error objects
    if (Object.keys(newErrors[index]).length === 0) {
      delete newErrors[index];
    }

    setErrors(newErrors);
    handleUpdate(updatedData);
  };

  const handleAdd = () => {
    const prevData = [...values?.rewardGrantChart];
    prevData.unshift({
      floorValue: "",
      multiplier: "",
    });
    handleUpdate(prevData);

    const newErrors = {};
    prevData.forEach((item, index) => {
      if (errors[index - 1]) {
        newErrors[index] = { ...errors[index - 1] };
      }
    });
    setErrors(newErrors);
  };

  const handleRemove = (index) => {
    if (values?.rewardGrantChart.length === 1) {
      message.info("At least one Reward Chart Required");
      return;
    }
    const updatedData = [...values?.rewardGrantChart];
    updatedData.splice(index, 1);
    handleUpdate(updatedData);

    const newErrors = {};
    Object.keys(errors).forEach((key) => {
      console.log("🚀 ~ Object.keys ~ key:", key);
      const errorIndex = parseInt(key);

      if (errorIndex < index) {
        newErrors[errorIndex] = errors[errorIndex];
      } else if (errorIndex > index) {
        newErrors[errorIndex - 1] = errors[errorIndex];
      }
    });
    setErrors(newErrors);
  };
  console.log("🚀 ~ RewardChart ~ errors:", errors);
  return (
    <List>
      <ListItem
        secondaryAction={
          <CustomButton
            sx={{
              height: "fit-content",
              width: "fit-content",
            }}
            onClick={handleAdd}
          >
            + Add
          </CustomButton>
        }
        sx={{
          transition: "transform all 1s ease-in-out",
          border: "1px solid #E0E3E7",
          borderRadius: 2,
        }}
      >
        <ListItemAvatar>
          <LineChart className="text-gray-700" />
        </ListItemAvatar>
        <ListItemText className="text-xl font-inder font-medium">
          Add Reward Chart
        </ListItemText>
      </ListItem>

      <Card
        sx={{
          border: "1px solid #E0E3E7",
          boxShadow: "none",
          borderTop: "none",
          mt: -1,
          maxHeight: 250,
          overflow: "scroll",
        }}
      >
        <CardContent disablePadding>
          {values?.rewardGrantChart?.length === 0 ? (
            <Empty description="No Fields" />
          ) : (
            values.rewardGrantChart?.map((item, index) => (
              <Fade in={true} key={index}>
                <div className="flex gap-5 mt-2">
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <BootstrapTextField
                      label="Floor Value"
                      placeholder="Enter Number"
                      size="small"
                      type="number"
                      name="floorValue"
                      value={item.floorValue || ""}
                      onChange={(e) => handleCreateData(e, index)}
                      sx={{ my: 2 }}
                      error={!!errors[index]?.floorValue}
                      helperText={errors[index]?.floorValue}
                    />
                  </Box>
                  <Divider orientation="vertical" variant="middle" flexItem />
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
                      name="multiplier"
                      value={item.multiplier || ""}
                      onChange={(e) => handleCreateData(e, index)}
                      sx={{ my: 2 }}
                      error={!!errors[index]?.multiplier}
                      helperText={errors[index]?.multiplier}
                    />
                  </Box>
                  <IconButton
                    sx={{ width: 30, height: 30 }}
                    onClick={() => handleRemove(index)}
                  >
                    <X className="text-gray-700" />
                  </IconButton>
                </div>
              </Fade>
            ))
          )}
        </CardContent>
      </Card>
    </List>
  );
};



export const PartialMarks = ({ handleChange, values }) => {
  console.log("🚀 ~ PartialMarks ~ handleChange, values:", values);
  const [errors, setErrors] = useState({});

  const handleUpdate = (updatedValues) => {
    handleChange(updatedValues);
  };

  const handleCreateData = (e, index) => {
    const { value, name } = e.target;
    const updatedData = [...values?.partialMarks];
    updatedData[index] = { ...updatedData[index], [name]: value };

    const newErrors = { ...errors };
    if (!newErrors[index]) {
      newErrors[index] = {};
    }

    if (name === "percentage" && value > 100) {
      newErrors[index] = {
        ...newErrors[index],
        percentage: "Percentage Value should not be more than 100",
      };
    } else if (name === "percentage") {
      delete newErrors[index].percentage;
    }

    if (name === "weightage" && value > 1) {
      newErrors[index] = {
        ...newErrors[index],
        weightage: "weightage should not be more than 1",
      };
    } else if (name === "weightage") {
      delete newErrors[index].weightage;
    }

    // Clean up empty error objects
    if (Object.keys(newErrors[index]).length === 0) {
      delete newErrors[index];
    }

    setErrors(newErrors);
    handleUpdate(updatedData);
  };

  const handleAdd = () => {
    const prevData = [...values?.partialMarks];
    prevData.unshift({
      percentage: "",
      weightage: "",
    });

    handleUpdate(prevData);

    const newErrors = {};
    prevData.forEach((item, index) => {
      if (errors[index - 1]) {
        newErrors[index] = { ...errors[index - 1] };
      }
    });
    setErrors(newErrors);
  };

  const handleRemove = (index) => {

    const updatedData = [...values?.partialMarks];
    updatedData.splice(index, 1);
    handleUpdate(updatedData);

    const newErrors = {};
    Object.keys(errors).forEach((key) => {
      console.log("🚀 ~ Object.keys ~ key:", key);
      const errorIndex = parseInt(key);

      if (errorIndex < index) {
        newErrors[errorIndex] = errors[errorIndex];
      } else if (errorIndex > index) {
        newErrors[errorIndex - 1] = errors[errorIndex];
      }
    });
    setErrors(newErrors);
  };
  console.log("🚀 ~ RewardChart ~ errors:", errors);
  return (
    <List sx={{ height: "max-content" }}>
      <ListItem
        secondaryAction={
          <CustomButton
            sx={{
              height: "fit-content",
              width: "fit-content",
            }}
            onClick={handleAdd}
          >
            + Add
          </CustomButton>
        }
        sx={{
          transition: "transform all 1s ease-in-out",
          border: "1px solid #E0E3E7",
          borderRadius: 2,
          bgcolor: "var(--light-grey)",
        }}
      >
        <ListItemAvatar>
          <MarkChatRead className="text-gray-700" />
        </ListItemAvatar>
        <ListItemText className="text-xl font-inder font-medium">
          Add Partial Marks
        </ListItemText>
      </ListItem>
      <Fade in={values?.partialMarks?.length > 0}>
        <Card
          sx={{
            border: "1px solid #E0E3E7",
            boxShadow: "none",
            borderTop: "none",
            mt: -1,
            maxHeight: 250,
            overflow: "scroll",
            bgcolor: "transparent",
          }}
        >
          <CardContent disablePadding>
            {values.partialMarks?.map((item, index) => (
              <div className="flex gap-5 mt-2">
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <BootstrapTextField
                    label="Precentage"
                    placeholder="Enter Number"
                    size="small"
                    type="number"
                    name="percentage"
                    value={item.percentage || ""}
                    onChange={(e) => handleCreateData(e, index)}
                    sx={{ my: 2 }}
                    error={!!errors[index]?.percentage}
                    helperText={errors[index]?.percentage}
                  />
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box
                  sx={{
                    mt: !values?.isRewardGrantAward && `0!important`,
                    width: "100%",
                  }}
                >
                  <BootstrapTextField
                    label="Weightage"
                    placeholder="Enter Number"
                    size="small"
                    type="number"
                    name="weightage"
                    value={item.weightage || ""}
                    onChange={(e) => handleCreateData(e, index)}
                    sx={{ my: 2 }}
                    error={!!errors[index]?.weightage}
                    helperText={errors[index]?.weightage}
                  />
                </Box>
                <IconButton
                  sx={{ width: 30, height: 30 }}
                  onClick={() => handleRemove(index)}
                >
                  <X className="text-gray-700" />
                </IconButton>
              </div>
            ))}
          </CardContent>
        </Card>
      </Fade>
    </List>
  );
};

export function capitalizeFirstLetter(str) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1)?.toLowerCase();
}



