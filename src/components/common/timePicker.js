import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

// Import necessary dayjs plugins
dayjs.extend(utc);

export default function TimePickerComp({
  setValue,
  value,
  label,
  style,
  selectedDate,
  ...props
}) {
  console.log("value", dayjs(value));
  console.log("end time", dayjs(props.endTime));

  // Function to determine if a specific time should be disabled
  const shouldDisableTime = (value, view) => {
    if (!dayjs.isDayjs(value)) {
      // If value is not a valid Dayjs object, disable the time
      return true;
    }

    // Extract min and max hour and minute from props
    const minHour = dayjs(props.startTime).hour();
    const maxHour = dayjs(props.endTime).hour();
    const minMinute = dayjs(props.startTime).minute();
    const maxMinute = dayjs(props.endTime).minute();

    // Check if the current value falls within the allowed range
    if (view === "hours") {
      return value.hour() < minHour || value.hour() > maxHour;
    } else if (view === "minutes") {
      return (
        (value.hour() === minHour && value.minute() < minMinute) ||
        (value.hour() === maxHour && value.minute() > maxMinute)
      );
    }

    return false;
  };

  const handleChange = (newValue) => {

    const combinedDateTime = dayjs
      .utc(newValue.format("YYYY-MM-DD") + "T" + newValue.format("HH:mm"))
      .format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    console.log("🚀 ~ handleChange ~ newValue:", combinedDateTime); 

    setValue(combinedDateTime);
};


  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          sx={{
            width: "100%",
            "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
              fontSize: "15px",
              height: style?.height || "0.4375em",
            },
            ...style,
          }}
          renderInput={(params) => (
            <input
              {...params.inputProps}
              value={value || ""} // Ensure value is always defined
              placeholder="Select time"
              style={{
                ...params.inputProps?.style,
                width: "100%",
                textAlign: "center",
              }}
              {...props}
            />
          )}
          ampm={false}
          value={value ? dayjs.utc(value) : null}
          disabled={props?.disabled || false} // Set default value for disabled prop
          onChange={handleChange}
          shouldDisableTime={props.controlTime && shouldDisableTime} // Enable/disable time based on controlTime prop
        />
      </LocalizationProvider>
  );
}
